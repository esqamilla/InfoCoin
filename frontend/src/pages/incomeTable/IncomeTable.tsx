import React, {FC, useEffect, useState} from 'react'
import style from "./income-table.module.scss"
import FinanceLayout from '../../components/financeLayout/FinanceLayout'
import {Path} from '../../routes/path'
import {Affix, Button, Table, Tag, Tooltip} from 'antd'
// import {dataTest, dataTest2, incomeTableData, incomeTableDataTest} from '../../mock/mock'
// import {FinanceItem} from '../../types/types'
import {EditOutlined, PlusOutlined, QuestionCircleOutlined} from '@ant-design/icons'
import Paragraph from 'antd/lib/typography/Paragraph'
import IncomeTableColLimit, {TableColLimit} from './incomeTableColLimit/IncomeTableColLimit'
import IncomeTableTitle from './incomeTableTitle/IncomeTableTitle'
import concatClasses from '../../utils/concatClasses'
import IncomeTableFinanceItem from './incomeTableFinanceItem/IncomeTableFinanceItem'
import Modal from '../../components/modal/Modal'
import {Category, FinanceItem, Limits} from '../../models/Models'
import {createGetRequest} from '../../api/Api'
import {formatDate} from '../../utils/dateHelper'
import CategoryModal from './CategoryModal/CategoryModal'
import FinanceItemModal from './financeItemModal/FinanceItemModal'

interface TransformedTableData {
  date: string;
  categories: ({
    categoryId: number;
    items: ({
      id: number;
      cost: number;
      description: string;
    } | undefined)[];
  } | undefined)[];
}

const IncomeTable: FC = () => {
  const [incomeData, setIncomeData] = useState<any | null>(undefined);
  const [categoryModalVisible, setCategoryModalVisible] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [financeItemModalVisible, setFinanceItemModalVisible] = useState<boolean>(false);
  const [categories, setCategories] = useState<Category[] | []>([]);
  const [financeItems, setFinanceItems] = useState<FinanceItem[] | null>(null);
  const [limits, setLimits] = useState<Limits[] | []>([]);

  const reloadData = async () => {
    setLoading(true);

    await createGetRequest("Category").then(data => setCategories(data));
    await createGetRequest("FinanceItem").then(data => setFinanceItems(data));
    await createGetRequest("Limits").then(data => setLimits(data));

    setLoading(false);
  }

  const initialColumns = [
    {
      title: <IncomeTableTitle
        categories={categories}
        limits={limits}
        isLimits
        title={"Лимиты"}
        reloadData={reloadData}
      />,
      width: 190,
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
        limits.map((item, index) => <IncomeTableColLimit key={index} limit={item}/>)
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

  const initialColumnRightSide = [
    {
      title: (<PlusOutlined className={style.addIcon} onClick={() => setCategoryModalVisible(true)} />),
      width: 100,
      dataIndex: 'add',
      key: 'add',
      fixed: 'right',
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
    },
  ]

  useEffect(() => {
    createGetRequest("Category").then(data => setCategories(data));
    createGetRequest("FinanceItem").then(data => setFinanceItems(data));
    createGetRequest("Limits").then(data => setLimits(data));
  }, [])

  const transformatorApiDataToTableData = (apiData: FinanceItem[]) => {
    const test = apiData.map((item) => (formatDate(item.Date)));
    const dateArray = test.filter((el, id: number) => test.indexOf(el) === id);
    let usedCategoriesIdList: number[] = [];

    const transformedData = dateArray.map((dateItem) => ({
      date: dateItem,
      categories: apiData
        .map((itemForCategory) => {
          if (formatDate(itemForCategory.Date) === dateItem && !usedCategoriesIdList.includes(itemForCategory.FinanceID)) {
            usedCategoriesIdList.push(itemForCategory.CategoryID)
            return {
              categoryId: itemForCategory.CategoryID,
              items: apiData
                .map((itemForFinanceItems) => {
                  if (formatDate(itemForFinanceItems.Date) === dateItem && itemForFinanceItems.CategoryID === itemForCategory.CategoryID)
                    return {
                      id: itemForFinanceItems.FinanceItemID,
                      cost: itemForFinanceItems.Cost,
                      description: itemForFinanceItems.Description
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
    const newColumns = categories.map((category, index) => ({
      title: (
        <IncomeTableTitle
          limit={limits.find(limit => limit.CategoryID === category.CategoryID)}
          category={category}
          key={index}
          reloadData={reloadData}
        />
      ),
      width: 260,
      dataIndex: category.CategoryID,
      key: category.CategoryID,
    }))

    setColumns([...initialColumns, ...newColumns, ...initialColumnRightSide])

    const transformedData: TransformedTableData[] = transformatorApiDataToTableData(financeItems ?? []);

    const data = transformedData.map((itemD, index: number) => ({
      key: index,
      limits: limits.map((limit, index: number) => (
        {
          key: index,
          id: limit.CategoryID,
          filledMoney: financeItems ? financeItems.reduce((prev: number, current: FinanceItem) => (
            limit.CategoryID === current.CategoryID ? (prev + current.Cost) : prev
          ), 0) : 0,
          limit: limit.LimitValue,
          color: categories.find(category => category.CategoryID === limit.CategoryID)?.Color ?? "#fff",
          icon: categories.find(category => category.CategoryID === limit.CategoryID)?.Icon ?? "",
          categoryName: categories.find(category => category.CategoryID === limit.CategoryID)?.Name ?? "Ошибка"
        }
      )),
      date: itemD.date,
      ...Object.fromEntries(itemD.categories.map((category) => [
        category?.categoryId,
        category?.items.map((item: any, index) =>
          <IncomeTableFinanceItem
            key={index}
            tooltipText=''
            date={itemD.date}
            categories={categories}
            category={category.categoryId}
            cost={item.cost}
            description={item.description}
            reloadData={reloadData}
            financeItemId={item.id}
          />
        )
      ])),
    }))

    setIncomeData(data);
  }, [categories, financeItems, limits])

  return (
    <>
      <FinanceLayout
        selectedTab={"table"}
        tableLink={Path.IncomeTable}
        calendarLink={Path.IncomeCalendar}
      >
        <div className={style.wrapper}>
          <Button
            type='primary'
            onClick={() => setFinanceItemModalVisible(true)}
          >
            Добавить трату
          </Button>
          <Table
            dataSource={incomeData}
            columns={columns}
            loading={!incomeData || loading}
            pagination={false}
            bordered
            scroll={{
              x: "calc(500px + 50%)",
              y: 600,
            }}
          />
        </div>
      </FinanceLayout>

      <CategoryModal
        title={"ДОБАВЛЕНИЕ КАТЕГОРИИ"}
        visible={categoryModalVisible}
        setVisible={setCategoryModalVisible}
        reloadData={reloadData}
      />

      <FinanceItemModal
        title={"ДОБАВЛЕНИЕ ТРАТЫ"}
        visible={financeItemModalVisible}
        setVisible={setFinanceItemModalVisible}
        categories={categories}
        reloadData={reloadData}
      />
    </>
  )
}

export default IncomeTable