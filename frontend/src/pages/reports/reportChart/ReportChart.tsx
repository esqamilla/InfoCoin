import React, {FC, useEffect, useState} from 'react'
import {ChartData as ChartDataType, FinanceItem, IncomeData} from '../../../types/types'
import { Chart as ChartJS, ArcElement, Tooltip, Legend, ChartData } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import {Spin} from 'antd';
import {LoadingOutlined} from '@ant-design/icons';
import style from "./report-chart.module.scss"
import {rublesWithTwoZero} from '../../../utils/moneyHelper';

ChartJS.register(ArcElement, Tooltip, Legend);

interface ReportChartProps {
  chartData: IncomeData | null;
}

const ReportChart: FC<ReportChartProps> = ({ chartData }) => {
  const [transformedData, setTransformedData] = useState<ChartData<"doughnut", number[], unknown> | undefined>();

  useEffect(() => {
    if (chartData) {
      const data: ChartData<"doughnut", number[], unknown> = {
        labels: chartData.categories.map(category => category.title),
        datasets: [
          {
            label: '# of Votes',
            backgroundColor: chartData.categories.map(category => category.color),
            data: Object.values(
              chartData.financeItems.reduce((prev: any, item: FinanceItem) => {
                if (item.categoryId in prev) {
                  prev[item.categoryId] += item.cost
                } else {
                  prev[item.categoryId] = item.cost;
                }
                return prev;
              }, {}),
            ),
            borderWidth: 0,
          }
        ],
      };

      setTransformedData(data);
    } else setTransformedData(undefined)
  }, [chartData])

  return (
    <>
      {transformedData ? (
        <div className={style.wrapper}>
          <Doughnut data={transformedData} className={style.chart} />
          <div className={style.sum}>{rublesWithTwoZero(chartData?.financeItems.reduce((a, b) => a + b.cost, 0) ?? 0) ?? ""}</div>
        </div>
      ) : (
        <Spin indicator={<LoadingOutlined className={style.icon} spin />} />
      )}
    </>
  )
}

export default ReportChart