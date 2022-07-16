import {Button, Dropdown, Menu, Tooltip} from 'antd';
import style from './income-table-title.module.scss'
import React, {FC, useState} from 'react'
import {CloseOutlined, DeleteOutlined, EditOutlined, EllipsisOutlined, QuestionCircleOutlined} from '@ant-design/icons';
import Paragraph from 'antd/lib/typography/Paragraph';
import {Category} from '../../../types/types';
import concatClasses from '../../../utils/concatClasses';

export interface TableColLimit {
  key: number;
  id: number;
  filledMoney: number;
  limit: number;
  color: string;
  icon: string;
  categoryName: string;
}

interface IncomeTableTitleProps {
	category?: Category;
  title?: string;
}

const menu = (
  <Menu
    items={[
      // {
      //   key: '1',
      //   label: (
      //     <Button
      //       type="link"
      //       icon={<CloseOutlined />}
      //       className={style.btnClose}
      //     />
      //   ),
      // },
      {
        key: '2',
        label: (
          <Button
            type="link"
            icon={<EditOutlined />}
            className={style.btnMenu}
          >
            Редактировать
          </Button>
        ),
      },
      {
        key: '3',
        label: (
          <Button
            type="link"
            icon={<DeleteOutlined />}
            className={style.btnMenu}
            danger
          >
            Удалить
          </Button>
        ),
      },
    ]}
  />
);

const IncomeTableTitle: FC<IncomeTableTitleProps> = ({ category, title }) => {
  const [isHover, setHover] = useState<boolean>(false);

  return (
    <div className={style.colTitleWrapper}>
      {category && (
        <span
          className={style.background}
          style={{ backgroundColor: category.color }}
        />
      )}
      <span
        className={concatClasses(style.hoverBackground, isHover ? style.isHover : "")}
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
      >
        <Dropdown
          overlay={menu}
          placement="bottomRight"
          arrow
          trigger={['hover']}
          align={{
            offset: [-7, -30]
          }}
        >
          <Button
            type={"link"}
            icon={<EllipsisOutlined className={style.btnIcon} />}
            className={style.btn}
          />
        </Dropdown>
      </span>
      {category && (
        <>
          <QuestionCircleOutlined style={{ color: category.color }} className={style.icon} />
          <Paragraph
            className={style.title}
            ellipsis
          >
            {category.title}
          </Paragraph>
        </>
      )}
      {title && (
        <div className={style.secondTitle}>{title}</div>
      )}
    </div>
  )
}

export default IncomeTableTitle