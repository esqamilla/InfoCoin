export enum MainMenuItems {
	Finance = "Finance",
	Income = "Income",
	Expenses = "Expenses",
	Savings = "Savings",
	Reports = "Reports",
	Notes = "Notes",
	None = ""
}

export interface AuthorizationData {
	Email: string;
	Password: string;
}

export interface RegistrationData {
	Name: string;
	Email: string,
	Password: string;
	RepeatPassword: string;
}

export interface RecoveryData {
	Email: string;
}

export interface RecoveryCodeData {
	Code: string;
}

export interface RecoveryChangingData {
	NewPassword: string;
	RepeatPassword: string;
}

export type FinanceTabs = "table" | "calendar";

export interface IncomeData {
	categories: Category[],
	limits: Limit[],
	financeItems: FinanceItem[]
}

export interface Category {
	id: number,
	title: string,
	icon: string,
	color: string,
	endDate: string | null
}

export interface Limit {
	id: number,
	limit: number,
	startDate: string,
	endDate: string,
	// categoryId: number,
	category: Category
}

export interface FinanceItem {
	id: number,
	cost: number,
	description: string,
	date: string,
	categoryId: number
}