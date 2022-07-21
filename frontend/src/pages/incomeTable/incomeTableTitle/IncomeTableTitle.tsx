import {Button, Dropdown, Menu, Tooltip} from 'antd';
import style from './income-table-title.module.scss'
import React, {FC, useState} from 'react'
import {CloseOutlined, DeleteOutlined, EditOutlined, EllipsisOutlined, QuestionCircleOutlined} from '@ant-design/icons';
import Paragraph from 'antd/lib/typography/Paragraph';
import concatClasses from '../../../utils/concatClasses';
import {Category, Limits} from '../../../models/Models';
import CategoryModal from '../CategoryModal/CategoryModal';
import LimitModal from '../LimitModal/LimitModal';
import {createDeleteRequest} from '../../../api/Api';

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
  limit?: Limits;
  isLimits?: boolean;
  categories?: Category[];
  limits?: Limits[];
  reloadData: () => void;
}

const IncomeTableTitle: FC<IncomeTableTitleProps> = ({
  category,
  title,
  limit,
  isLimits = false,
  categories,
  limits,
  reloadData
}) => {
  const [isHover, setHover] = useState<boolean>(false);
	const [visible, setVisible] = useState(false);

  const menu = (
    <Menu
      items={[
        {
          key: '2',
          label: (
            <Button
              type="link"
              icon={<EditOutlined />}
              className={style.btnMenu}
              onClick={() => setVisible(true)}
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
              onClick={() => (
                createDeleteRequest("Category", category?.CategoryID ?? 0).then(reloadData)
              )}
            >
              Удалить
            </Button>
          ),
        },
      ]}
    />
  );

  const menuLimits = (
    <Menu
      items={[
        {
          key: '2',
          label: (
            <Button
              type="link"
              icon={<EditOutlined />}
              className={style.btnMenu}
              onClick={() => setVisible(true)}
            >
              Редактировать
            </Button>
          ),
        },
      ]}
    />
  );

  return (
    <>
      <div className={style.colTitleWrapper}>
        {category && (
          <span
            className={style.background}
            style={{ backgroundColor: category.Color }}
          />
        )}
        <span
          className={concatClasses(style.hoverBackground, isHover ? style.isHover : "")}
          onMouseEnter={() => setHover(true)}
          onMouseLeave={() => setHover(false)}
        >
          <Dropdown
            overlay={!isLimits ? menu : menuLimits}
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
            <QuestionCircleOutlined style={{ color: category.Color }} className={style.icon} />
            <Paragraph
              className={style.title}
              ellipsis
            >
              {category.Name}
            </Paragraph>
          </>
        )}
        {title && (
          <div className={style.secondTitle}>{title}</div>
        )}
      </div>

      {!isLimits ? (
        <CategoryModal
          title={category ? "Редактирование категории" : "Добавление категории"}
          visible={visible}
          setVisible={setVisible}
          category={category}
          limit={limit}
          reloadData={reloadData}
        />
      ) : (
        <LimitModal
          title={"Редактирование лимитов"}
          visible={visible}
          setVisible={setVisible}
          categories={categories ?? []}
          limits={limits ?? []}
          reloadData={reloadData}
        />
      )}
    </>
  )
}

export default IncomeTableTitle