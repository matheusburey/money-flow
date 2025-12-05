import type { Prisma, Transaction } from "@prisma/client";
import prisma from "~~/lib/prisma";

export const getRecentTransactions = async (userId: string, gte: Date) => {
  return prisma.transaction.findMany({
    where: {
      userId,
      date: {
        gte,
      },
    },
    orderBy: { date: "desc" },
    select: {
      id: true,
      amount: true,
      description: true,
      date: true,
      type: true,
      category: {
        select: {
          id: true,
          icon: true,
          name: true,
          color: true,
        },
      },
    },
  });
};

export const getTransactions = async (
  userId: string,
  gte: Date
): Promise<Transaction[]> => {
  return await prisma.transaction.findMany({
    where: {
      userId,
      date: {
        gte,
      },
    },
  });
};

export const createTransaction = async (
  transactionData: Prisma.TransactionCreateInput
): Promise<Transaction> => {
  return await prisma.transaction.create({
    data: transactionData,
  });
};

export const updateTransaction = async (
  id: string,
  data: Prisma.TransactionUpdateInput
): Promise<Transaction | null> => {
  return await prisma.transaction.update({
    where: { id },
    data,
  });
};

export const deleteTransaction = async (
  id: string
): Promise<Transaction | null> => {
  return await prisma.transaction.delete({
    where: { id },
  });
};
