import type { Prisma, User } from "@prisma/client";
import prisma from "~~/lib/prisma";

export const getAllUsers = async (): Promise<User[]> => {
	return await prisma.user.findMany();
};

export const createUser = async (
	userData: Prisma.UserCreateInput,
): Promise<User> => {
	return await prisma.user.create({
		data: userData,
	});
};

export const getUserByEmail = async (email: string): Promise<User | null> => {
	return await prisma.user.findUnique({
		where: { email },
	});
};

export const getUserById = async (id: string): Promise<User | null> => {
	return await prisma.user.findUnique({
		where: { id },
	});
};

export const updateUser = async (
	id: string,
	data: Prisma.UserUpdateInput,
): Promise<User | null> => {
	return await prisma.user.update({
		where: { id },
		data,
	});
};
