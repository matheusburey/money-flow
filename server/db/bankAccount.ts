import type { BankAccount, Prisma } from "@prisma/client";
import prisma from "~~/lib/prisma";

export const getAccounts = async (userId: string): Promise<BankAccount[]> => {
	return await prisma.bankAccount.findMany({
		where: {
			userId,
		},
	});
};

export const createAccount = async (
	accountData: Prisma.BankAccountCreateInput,
): Promise<BankAccount> => {
	if (!accountData.icon) accountData.icon = "Landmark";
	return await prisma.bankAccount.create({
		data: accountData,
	});
};

export const getAccountById = async (
	id: string,
): Promise<BankAccount | null> => {
	return await prisma.bankAccount.findUnique({
		where: { id },
	});
};

export const updateAccount = async (
	id: string,
	data: Prisma.BankAccountUpdateInput,
): Promise<BankAccount | null> => {
	return await prisma.bankAccount.update({
		where: { id },
		data,
	});
};
