import { createAccount } from "~~/server/db/bankAccount";
import { createDefaultCategories } from "~~/server/db/categories";
import { createUser, getUserByEmail } from "~~/server/db/users";
import { userTransformer } from "~~/server/transformers/user";

export default defineEventHandler(async (event) => {
	const { name, email, password } = await readBody(event);

	// Input validation
	if (!name || !email || !password) {
		throw createError({
			statusCode: 400,
			message: "Preencha todos os campos",
		});
	}

	if (password.length < 8) {
		throw createError({
			statusCode: 400,
			message: "Senha deve ter pelo menos 8 caracteres",
		});
	}

	// Check if user already exists
	const existingUser = await getUserByEmail(email);

	if (existingUser) {
		throw createError({
			statusCode: 400,
			message: "Email já cadastrado",
		});
	}

	try {
		// Hash password
		const hashedPassword = await hashPassword(password);

		const userData = {
			name,
			email,
			password: hashedPassword,
			profileImage: "https://www.gravatar.com/avatar/?d=mp",
		};

		// Create new user
		const user = await createUser(userData);
		await createAccount({ user: { connect: { id: user.id } } });
		await createDefaultCategories(user.id);

		const accessToken = generateAccessToken(user.id);
		const refreshToken = generateRefreshToken(user.id);

		return {
			accessToken,
			refreshToken,
			user: userTransformer(user),
		};
	} catch (_error) {
		throw createError({
			statusCode: 500,
			message: "Erro ao cadastrar usuário",
		});
	}
});
