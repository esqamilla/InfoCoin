import React, {FC} from 'react'
import style from "./income-calendar.module.scss"
import FinanceLayout from '../../components/financeLayout/FinanceLayout'
import {Path} from '../../routes/path'

const IncomeCalendar: FC = () => {
  return (
    <FinanceLayout
      selectedTab={"calendar"}
      tableLink={Path.IncomeTable}
      calendarLink={Path.IncomeCalendar}
    >
      <>calendar</>
    </FinanceLayout>
  )
}

export default IncomeCalendar