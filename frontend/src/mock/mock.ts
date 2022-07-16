import Item from "antd/lib/list/Item";
import {IncomeData} from "../types/types";

export const incomeTableData: any = [{
	key: 1,
	name: `Edrward 0`,
	age: 32,
	address: `London Park no. -1	`,
}];

for (let i = 0; i < 10; i++) {
	incomeTableData.push({
		key: i,
		age: 32,
		address: `London Park no. ${i}`,
	});
}

export const incomeTableDataTest: IncomeData = {
	categories: [
		{
			id: 1,
			title: "Кофе и рестораны",
			icon: "icon",
			color: "#17A7F9",
			endDate: null
		},
		{
			id: 2,
			title: "Питание",
			icon: "icon",
			color: "#F1D900",
			endDate: null
		}
	],
	limits: [
		{
			id: 1,
			limit: 5000,
			startDate: "01.07.2022",
			endDate: "31.07.2022",
			category: {
				id: 1,
				title: "Кофе и рестораны",
				icon: "icon",
				color: "#17A7F9",
				endDate: null
			},
		},
		{
			id: 2,
			limit: 10000,
			startDate: "01.07.2022",
			endDate: "31.07.2022",
			category: {
				id: 2,
				title: "Питание",
				icon: "icon",
				color: "#F1D900",
				endDate: null
			},
		}
	],
	financeItems: [
		{
			id: 1,
			cost: 100,
			description: "Описание с большущим текстом, который тянется и тянется и нет ему конца, а нужно это для того, чтобы проверить кнопку редактирования",
			date: "03.07.2022",
			categoryId: 1,
		},
		{
			id: 2,
			cost: 200,
			description: "Описание к трате...",
			date: "03.07.2022",
			categoryId: 1,
		},
		{
			id: 3,
			cost: 300,
			description: "Описание к трате...",
			date: "04.07.2022",
			categoryId: 1,
		},
		{
			id: 4,
			cost: 400,
			description: "Описание к трате...",
			date: "04.07.2022",
			categoryId: 2,
		},
		{
			id: 5,
			cost: 6000,
			description: "Описание к трате...",
			date: "05.07.2022",
			categoryId: 2,
		}
	]
};

export const dataTest = [
	{
		categoryId: 1,
		data: [
			{
				date: "03.07.2022",
				items: [
					{
						id: 1,
						cost: 100,
						description: "Описание к трате...",
					},
					{
						id: 2,
						cost: 200,
						description: "Описание к трате...",
					}
				]
			},
			{
				date: "04.07.2022",
				items: [
					{
						id: 3,
						cost: 300,
						description: "Описание к трате...",
					}
				]
			},
		]
	},
	{
		categoryId: 2,
		data: [
			{
				date: "04.07.2022",
				items: [
					{
						id: 4,
						cost: 400,
						description: "Описание к трате...",
					}
				]
			},
			{
				date: "05.07.2022",
				items: [
					{
						id: 5,
						cost: 500,
						description: "Описание к трате...",
					}
				]
			},
		]
	}
]

export const dataTest2 = [
	{
		date: "03.07.2022",
		categories: [
			{
				categoryId: 1,
				items: [
					{
						id: 1,
						cost: 100,
						description: "Описание к трате...",
					},
					{
						id: 2,
						cost: 200,
						description: "Описание к трате...",
					}
				]
			}
		]
	},
	{
		date: "04.07.2022",
		categories: [
			{
				categoryId: 1,
				items: [
					{
						id: 3,
						cost: 300,
						description: "Описание к трате...",
					}
				]
			},
			{
				categoryId: 2,
				items: [
					{
						id: 4,
						cost: 400,
						description: "Описание к трате...",
					}
				]
			}
		]
	},
	{
		date: "05.07.2022",
		categories: [
			{
				categoryId: 2,
				items: [
					{
						id: 5,
						cost: 500,
						description: "Описание к трате...",
					}
				]
			}
		]
	},
]