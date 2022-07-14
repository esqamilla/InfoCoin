import React, {FC} from 'react'
import style from "./income-table.module.scss"
import FinanceLayout from '../../components/financeLayout/FinanceLayout'
import {Path} from '../../routes/path'

const IncomeTable: FC = () => {
  return (
    <FinanceLayout
      selectedTab={"table"}
      tableLink={Path.IncomeTable}
      calendarLink={Path.IncomeCalendar}
    >
      <>incomeTable</>
    </FinanceLayout>
  )
}

export default IncomeTable