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