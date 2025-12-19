export default defineEventHandler(async (event) => {
	const body = await readBody(event);
	const { refreshToken } = body;

	if (!refreshToken) {
		throw createError({
			statusCode: 400,
			message: "Refresh token é obrigatório",
		});
	}

	const userId = verifyRefreshToken(refreshToken);

	if (!userId) {
		throw createError({
			statusCode: 401,
			message: "Refresh token inválido ou expirado",
		});
	}

	const accessToken = generateAccessToken(userId);
	const newRefreshToken = generateRefreshToken(userId);

	return {
		accessToken,
		refreshToken: newRefreshToken,
	};
});
