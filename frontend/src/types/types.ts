import {Category as CategoryNew, FinanceItem as FinanceItemNew, Limits as LimitsNew} from "../models/Models";

export type MainMenuItems = "finance"
	| "income"
	| "expenses"
	| "savings"
	| "reports"
	| "notes"
	| "";

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
	categories?: CategoryNew[],
	limits?: LimitsNew[],
	financeItems?: FinanceItemNew[]
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

export type ReportsSections = "Расходы" | "Доходы" | "Анализ бюджета";

export interface ChartData {
	labels: string[];
	datasets: {
		label: string;
		data: number[];
		backgroundColor: string[];
		borderWidth: number;
	}[];
}