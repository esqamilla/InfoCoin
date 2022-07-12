import {FolderAddOutlined} from '@ant-design/icons'
import React, {FC, ReactNode} from 'react'
import style from './home.module.scss'

interface HomeItemProps {
  icon: ReactNode;
  title: string;
  description: string;
}

const HomeItem: FC<HomeItemProps> = ({ icon, title, description }) => {
  return (
	  <div className={style.item}>
      <div className={style.itemWrapper}>
        {icon}
        <div className={style.itemTitle}>
          {title}
        </div>
      </div>
      <div className={style.itemDesc}>
        {description}
      </div>
    </div>
  )
}

export default HomeItem