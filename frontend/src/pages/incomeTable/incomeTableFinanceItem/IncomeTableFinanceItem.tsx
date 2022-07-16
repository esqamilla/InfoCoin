import {Button, Tooltip} from 'antd';
import style from './income-table-finance-item.module.scss'
import React, {FC} from 'react'
import {EditOutlined} from '@ant-design/icons';

interface IncomeTableFinanceItemProps {
	cost: number;
  description: string;
  tooltipText?: string;
}

const IncomeTableFinanceItem: FC<IncomeTableFinanceItemProps> = ({ cost, description, tooltipText = "Редактировать" }) => {
  return (
    <div className={style.finacneItem}>
      {cost} — {description}
      <Tooltip title={tooltipText}>
        <Button
          className={style.btnEdit}
          type='link'
          size='small'
          icon={<EditOutlined />}
        />
      </Tooltip>
    </div>
  )
}

export default IncomeTableFinanceItem