import React, {FC, ReactElement} from 'react'
import style from "./finance-tabs.module.scss"
import {FinanceTabs as FinanceTabsType} from '../../types/types'
import {Tabs} from 'antd';
import {CalendarOutlined, UnorderedListOutlined} from '@ant-design/icons';
import {Link} from 'react-router-dom';
import {Path} from '../../routes/path';

const { TabPane } = Tabs;

interface FinanceLayoutProps {
	selectedTab: FinanceTabsType;
  tabContent: ReactElement;
  tableLink: Path;
  calendarLink: Path;
}

const FinanceTabs: FC<FinanceLayoutProps> = ({ selectedTab, tabContent, tableLink, calendarLink }) => {
  return (
	<div className={style.mainWrapper}>
		<Tabs defaultActiveKey={selectedTab} type={"card"}>
			<TabPane
        tab={
          <Link to={`/${tableLink}`}>
            <UnorderedListOutlined />
          </Link>
        }
        key="table"
      >
			  {tabContent}
			</TabPane>
			<TabPane
        tab={
          <Link to={`/${calendarLink}`}>
            <CalendarOutlined />
          </Link>}
        key="calendar"
      >
			  {tabContent}
			</TabPane>
		</Tabs>
	</div>
  )
}

export default FinanceTabs