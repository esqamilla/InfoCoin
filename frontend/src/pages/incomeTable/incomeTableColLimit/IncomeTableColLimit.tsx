import {Tooltip} from 'antd';
import style from './income-table-col-limit.module.scss'
import React, {FC} from 'react'
import {QuestionCircleOutlined} from '@ant-design/icons';
import Paragraph from 'antd/lib/typography/Paragraph';

export interface TableColLimit {
  key: number;
  id: number;
  filledMoney: number;
  limit: number;
  color: string;
  icon: string;
  categoryName: string;
}

interface IncomeTableColLimitProps {
	limit: TableColLimit;
}

const IncomeTableColLimit: FC<IncomeTableColLimitProps> = ({ limit }) => {
  return (
    <Tooltip
      title={
        <>
          <div>Категория: {limit.categoryName}</div>
          <div>Лимит: {limit.filledMoney} / {limit.limit}</div>
        </>
      }
    >
      <div
        className={style.limit}
        style={{
          border: `2px solid ${limit.color}`,
        }}
        key={limit.key}
      >
      <span
        className={style.progress}
        style={{
        width: limit.filledMoney / limit.limit <= 1 ? (limit.filledMoney / limit.limit * 100 + "%") : "100%",
        background: limit.filledMoney < limit.limit ? "#92DC84" : "#F3A37C"
        }}
      />
        <QuestionCircleOutlined style={{ color: limit.color }} className={style.icon} />
        <Paragraph
          className={style.limitText}
          ellipsis
        >
          {limit.filledMoney} / {limit.limit}
        </Paragraph>
      </div>
    </Tooltip>
  )
}

export default IncomeTableColLimit