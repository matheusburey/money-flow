import { compare, hash } from "bcryptjs";

export const hashPassword = (password: string): Promise<string> => {
	return hash(password, 10);
};

export const verifyPassword = async (
	password: string,
	hashedPassword: string,
): Promise<boolean> => {
	try {
		return compare(password, hashedPassword);
	} catch (error) {
		console.error("Error verifying password:", error);
		return false;
	}
};
