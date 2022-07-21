import {Button, Tooltip} from 'antd';
import style from './income-table-finance-item.module.scss'
import React, {FC, useState} from 'react'
import {EditOutlined} from '@ant-design/icons';
import {Category} from '../../../models/Models';
import FinanceItemModal from '../financeItemModal/FinanceItemModal';

interface IncomeTableFinanceItemProps {
	cost: number;
  description: string;
  tooltipText?: string;
  date?: string;
  category?: number;
  categories: Category[];
  reloadData: () => void;
  financeItemId: number;
}

const IncomeTableFinanceItem: FC<IncomeTableFinanceItemProps> = ({
  cost,
  description,
  tooltipText = "Редактировать",
  date,
  category,
  categories,
  reloadData,
  financeItemId
}) => {
  const [visible, setVisible] = useState<boolean>(false);
  const modalObj = {
    date: date,
    category: category,
    cost: cost,
    description: description
  }

  return (
    <>
      <div className={style.finacneItem}>
        <b style={{ fontWeight: 600 }}>{cost}</b> — {description}
        <Tooltip title={tooltipText}>
          <Button
            className={style.btnEdit}
            type='link'
            size='small'
            icon={<EditOutlined />}
            onClick={() => setVisible(true)}
          />
        </Tooltip>
      </div>

      <FinanceItemModal
        title={"Редактировать трату"}
        visible={visible}
        setVisible={setVisible}
        financeItem={modalObj}
        categories={categories}
        reloadData={reloadData}
        financeItemId={financeItemId}
      />
    </>
  )
}

export default IncomeTableFinanceItem