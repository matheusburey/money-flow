import type { User } from "@prisma/client";

export const userTransformer = (user: User) => {
	return {
		id: user.id,
		name: user.name,
		email: user.email,
		profileImage: user.profileImage,
		createdAt: user.createdAt,
		updatedAt: user.updatedAt,
	};
};
