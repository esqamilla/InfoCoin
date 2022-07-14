import React, {FC, ReactElement, ReactNode} from 'react'
import style from "./finance-layout.module.scss"
import Contanier from '../container/Contanier'
import {FinanceTabs as FinanceTabsType} from '../../types/types'
import FinanceTabs from '../financeTabs/FinanceTabs';
import {Path} from '../../routes/path';

interface FinanceLayoutProps {
	selectedTab: FinanceTabsType;
	children: ReactElement;
  tableLink: Path;
  calendarLink: Path;
}

const FinanceLayout: FC<FinanceLayoutProps> = ({ selectedTab, children, tableLink, calendarLink }) => {
  return (
	<div className={style.mainWrapper}>
		<Contanier>
			<FinanceTabs
        selectedTab={selectedTab}
        tableLink={tableLink}
        calendarLink={calendarLink}
        tabContent={children}
      />
		</Contanier>
	</div>
  )
}

export default FinanceLayout