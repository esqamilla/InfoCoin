import {DownloadOutlined} from '@ant-design/icons';
import {Button, DatePicker, Segmented} from 'antd'
import {SegmentedValue} from 'antd/lib/segmented';
import React, {FC, useEffect, useState} from 'react'
import {reportsSections} from '../../data/data';
import {IncomeData, ReportsSections} from '../../types/types';
import style from "./reports.module.scss"
import ReportChart from './reportChart/ReportChart';
import moment from 'moment';
import {Category, FinanceItem} from '../../models/Models';
import {createGetRequest} from '../../api/Api';

const { RangePicker } = DatePicker;

const Reports: FC = () => {
  const [selectedSection, setSelectedSection] = useState<SegmentedValue>("Расходы");
  const [sectionData, setSectionData] = useState<IncomeData | null>(null);
  const [categories, setCategories] = useState<Category[] | undefined>();
  const [financeItems, setFinanceItems] = useState<FinanceItem[] | undefined>();
  

  useEffect(() => {
    createGetRequest("Category").then(data => setCategories(data));
    createGetRequest("FinanceItem").then(data => setFinanceItems(data));
  }, [])

  useEffect(() => {
    if (selectedSection === "Расходы")
      setSectionData({
        categories: categories,
        financeItems: financeItems,
      })
    else if (selectedSection === "Доходы")
      setSectionData(null)
    else if (selectedSection === "Анализ бюджета")
      setSectionData(null)
  }, [selectedSection])

  const onChangeSection = (value: SegmentedValue) => {
    setSelectedSection(value)
  }

  return (
	  <div className={style.wrapper}>
      <Segmented
        options={reportsSections}
        onChange={onChangeSection}
        className={style.sections}
        size="large"
        block
      />

      <div className={style.content}>
        <div className={style.header}>
          <RangePicker
            size="large"
            className={style.rangePicker}
            format={"DD MMMM YYYY"}
            defaultValue={[moment().subtract(1, "months"), moment()]}
          />
          <Button
            type='link'
            className={style.btn}
            icon={<DownloadOutlined className={style.icon} />}
          />
        </div>

        <div className={style.chart}>
          <ReportChart chartData={sectionData} />
        </div>
      </div>
    </div>
  )
}

export default Reports