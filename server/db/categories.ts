import type { Prisma, Category } from "@prisma/client";
import prisma from "~~/lib/prisma";

interface ICategory {
	id: string;
	name: string;
	description: string | null;
	color: string;
	icon: string;
	type: string;
}

export const getCategories = async (userId: string): Promise<ICategory[]> => {
	return await prisma.category.findMany({
		where: {
			userId,
		},
		select: {
			id: true,
			name: true,
			description: true,
			color: true,
			icon: true,
			type: true,
		},
	});
};

export const createCategory = async (
	categoryData: Prisma.CategoryCreateInput,
): Promise<ICategory> => {
	return await prisma.category.create({
		data: categoryData,
		select: {
			id: true,
			name: true,
			description: true,
			color: true,
			icon: true,
			type: true,
		},
	});
};

export const createDefaultCategories = async (
	userId: string,
): Promise<void> => {
	await prisma.category.createMany({
		data: [
			// ===== EXPENSE =====
			{
				name: "Saúde",
				color: "#FF8A80", // vermelho suave (urgência / saúde)
				icon: "HealthAndSafety",
				userId,
				type: "expense",
			},
			{
				name: "Lazer",
				color: "#FFCC80", // laranja suave (diversão)
				icon: "Restaurant",
				userId,
				type: "expense",
			},
			{
				name: "Casa",
				color: "#A5D6A7", // verde suave (lar, natureza)
				icon: "House",
				userId,
				type: "expense",
			},
			{
				name: "Transporte",
				color: "#81D4FA", // azul claro (mobilidade)
				icon: "Bus",
				userId,
				type: "expense",
			},
			{
				name: "Entretenimento",
				color: "#CE93D8", // roxo suave (diversão)
				icon: "Movie",
				userId,
				type: "expense",
			},
			{
				name: "Educação",
				color: "#FFF59D", // amarelo suave (conhecimento)
				icon: "GraduationCap",
				userId,
				type: "expense",
			},
			{
				name: "Presente",
				color: "#F48FB1", // rosa suave (carinho)
				icon: "Gift",
				userId,
				type: "expense",
			},

			// ===== INCOME =====
			{
				name: "Salário",
				color: "#81C784", // verde confiança
				icon: "Banknote",
				userId,
				type: "income",
			},
			{
				name: "Freelance",
				color: "#4DB6AC", // verde-água (trabalho flexível)
				icon: "HandCoins",
				userId,
				type: "income",
			},
			{
				name: "Presente",
				color: "#A5D6A7", // verde claro (entrada positiva)
				icon: "Gift",
				userId,
				type: "income",
			},
			{
				name: "Juros",
				color: "#90CAF9", // azul claro (finanças / bancos)
				icon: "Coins",
				userId,
				type: "income",
			},
			{
				name: "Outros",
				color: "#B39DDB", // roxo suave (categoria neutra)
				icon: "PiggyBank",
				userId,
				type: "income",
			},
		],
	});
};
