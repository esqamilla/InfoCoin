import React, {FC, useEffect, useState} from 'react'
import style from "./income-table.module.scss"
import FinanceLayout from '../../components/financeLayout/FinanceLayout'
import {Path} from '../../routes/path'
import {Affix, Button, Table, Tag, Tooltip} from 'antd'
import {dataTest, dataTest2, incomeTableData, incomeTableDataTest} from '../../mock/mock'
import {FinanceItem} from '../../types/types'
import {EditOutlined, QuestionCircleOutlined} from '@ant-design/icons'
import Paragraph from 'antd/lib/typography/Paragraph'
import IncomeTableColLimit, {TableColLimit} from './incomeTableColLimit/IncomeTableColLimit'
import IncomeTableTitle from './incomeTableTitle/IncomeTableTitle'
import concatClasses from '../../utils/concatClasses'
import IncomeTableFinanceItem from './incomeTableFinanceItem/IncomeTableFinanceItem'

const IncomeTable: FC = () => {
  const initialColumns = [
    {
      title: <IncomeTableTitle title={"Лимиты"}/>,
      width: 130,
      dataIndex: 'limits',
      key: 'limits',
      fixed: 'left',
      align: "center",
      onCell: (_: any, index: number) => {
        if (index === 0) {
          return {
            rowSpan: 101
          }
        }
        if (index > 0) return {
          colSpan: 0,
        }
      },
      render: (limits: TableColLimit[]) => (
        limits.map((item) => <IncomeTableColLimit limit={item}/>)
      )
    },
    {
      title: <>Дата</>,
      width: 180,
      dataIndex: 'date',
      key: 'date',
      fixed: 'left',
      align: "center",
      render: (date: string) => (
        <div className={style.date}>{date}</div>
      )
    },
  ]

  const [columns, setColumns] = useState<any | null>(initialColumns);
  const [incomeData, setIncomeData] = useState<any | null>(undefined);

  const transformatorApiDataToTableData = (apiData: FinanceItem[]) => {
    const test = apiData.map((item) => (item.date));
    const dateArray = test.filter((el, id: number) => test.indexOf(el) === id);
    let usedCategoriesIdList: number[] = [];

    const transformedData = dateArray.map((dateItem) => ({
      date: dateItem,
      categories: apiData
        .map((itemForCategory) => {
          if (itemForCategory.date === dateItem && !usedCategoriesIdList.includes(itemForCategory.categoryId)) {
            usedCategoriesIdList.push(itemForCategory.categoryId)
            return {
              categoryId: itemForCategory.categoryId,
              items: apiData
                .map((itemForFinanceItems) => {
                  if (itemForFinanceItems.date === dateItem && itemForFinanceItems.categoryId === itemForCategory.categoryId)
                    return {
                      id: itemForFinanceItems.id,
                      cost: itemForFinanceItems.cost,
                      description: itemForFinanceItems.description
                    }
                })
                .filter(item => item)
            }
          }
          usedCategoriesIdList = []
        })
        .filter(item => item)
    }))

    return transformedData
  }

  useEffect(() => {
    const newColumns = incomeTableDataTest.categories.map((category, index) => ({
      title: <IncomeTableTitle category={category} key={index} />,
      width: 260,
      dataIndex: category.id,
      key: category.id,
    }))

    setColumns([...initialColumns, ...newColumns])

    const transformedData: {
        date: string;
        categories: ({
            categoryId: number;
            items: ({
                id: number;
                cost: number;
                description: string;
            } | undefined)[];
        } | undefined)[];
    }[] = transformatorApiDataToTableData(incomeTableDataTest.financeItems);

    // const columnsObj = .reduce(function(target, key, index) {
    //   target[index] = key;
    //   return target;
    // }, {})
    const testData = transformedData.map((item, index: number) => ({
      // key: index,
      // limits: incomeTableDataTest.limits.map((limit) => <div>0 / {limit.limit}</div>),
      // date: item.date,
      ...item.categories.map((category: any) => ({
        [category.categoryId]: category.items.map((item: any) => <div>{item.cost} — {item.description}</div>)
      }))
    }))

    console.log("testData", testData)

    const data = transformedData.map((item: any, index: any) => ({
      key: index,
      limits: incomeTableDataTest.limits.map((limit, index: number) => (
        {
          key: index,
          id: limit.category.id,
          filledMoney: incomeTableDataTest.financeItems.reduce((prev, current) => (
              limit.category.id === current.categoryId ? (prev + current.cost) : prev
            ), 0),
          limit: limit.limit,
          color: limit.category.color,
          icon: limit.category.icon,
          categoryName: limit.category.title
        }
      )),
      date: item.date,
      1: item.categories.map((category: any) => {
        if (1 === category.categoryId)
          return category.items.map((item: any) => <IncomeTableFinanceItem tooltipText='Редактировать трату' cost={item.cost} description={item.description} />)
        else
          <></>
      }),
      2: item.categories.map((category: any) => {
        if (2 === category.categoryId)
          return category.items.map((item: any) => <IncomeTableFinanceItem tooltipText='Редактировать трату' cost={item.cost} description={item.description} />)
        else
          <></>
      }),
    }))

    console.log("data", data)

    setIncomeData(data);
  }, [incomeTableDataTest])

  return (
    <FinanceLayout
      selectedTab={"table"}
      tableLink={Path.IncomeTable}
      calendarLink={Path.IncomeCalendar}
    >
      <Table
        dataSource={incomeData}
        columns={columns}
        loading={!incomeData}
        pagination={false}
        bordered
        scroll={{
          x: "calc(00px + 50%)",
          // y: 100,
        }}
      />
    </FinanceLayout>
  )
}

export default IncomeTable