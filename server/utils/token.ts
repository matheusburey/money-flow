import jwt from "jsonwebtoken";

const JWT_CONFIG = {
	accessSecret: process.env.JWT_SECRET as string,
	refreshSecret: process.env.JWT_REFRESH_SECRET as string,
	accessExpiresIn: "30m",
	refreshExpiresIn: "7d",
};

export const generateAccessToken = (userId: string) => {
	return jwt.sign({ userId }, JWT_CONFIG.accessSecret, {
		expiresIn: JWT_CONFIG.accessExpiresIn,
	} as jwt.SignOptions);
};

export const generateRefreshToken = (userId: string) => {
	return jwt.sign({ userId }, JWT_CONFIG.refreshSecret, {
		expiresIn: JWT_CONFIG.refreshExpiresIn,
	} as jwt.SignOptions);
};

export const decodeToken = (token: string) => {
	try {
		const decoded = jwt.verify(token, JWT_CONFIG.accessSecret) as {
			userId: string;
		};
		return decoded?.userId;
	} catch (_error) {
		return null;
	}
};

export const verifyRefreshToken = (token: string) => {
	try {
		const decoded = jwt.verify(token, JWT_CONFIG.refreshSecret) as {
			userId: string;
		};
		return decoded?.userId;
	} catch (_error) {
		return null;
	}
};
