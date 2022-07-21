export interface FinanceItem {
	CategoryID: number;
	Cost: number;
	Date: string;
	Description: string;
	FinanceID: number;
	FinanceItemID: number;
}

export interface Category {
	CategoryID: number;
	Color: string;
	EndDate: string | null;
	Icon: string;
	Name: string;
	StartDate: string | null;
	TypeId: number;
}

export interface Finances {
	financeId: number;
	userId: number;
	typeId: number;
	categoryId: number;
}

export interface Limits {
	CategoryID: number;
	EndDate: string | null;
	LimitID: number;
	LimitValue: number;
	StartDate: string | null;
}

export interface Notes {
	NoteID: number,
	Name: string,
	Description: string,
	UserID: number
}

export interface Notes {
	id: number;
	name: string;
	email: string;
	password: string;
	photo: string | null;
}