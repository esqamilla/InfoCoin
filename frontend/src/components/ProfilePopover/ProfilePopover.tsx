import React, {FC, useState} from 'react'
import { Button, Popover } from 'antd';
import style from "./profile-popover.module.scss";
import concatClasses from '../../utils/concatClasses';
import {ExportOutlined, UserOutlined} from '@ant-design/icons';

const popoverContent = (
  <div className={style.popover}>
    <div className={style.popoverTitle}>
      <UserOutlined className={style.popoverIcon} />
      <div className={style.popoverWrapper}>
        <div className={style.title}>Пользователь</div>
        <div className={style.name}>
          {"Иванов Иван"}
        </div>
      </div>
    </div>
    <Button type="link" className={style.popoverLink}>Сменить пароль</Button>
    <Button type="link" className={style.popoverLink}>Редактировать профиль</Button>
    <Button type="link" className={style.popoverLink} icon={<ExportOutlined />}>Выход</Button>
  </div>
)

const ProfilePopover: FC = () => {
  const [isPopoverOpen, setPopoverOpen] = useState<boolean>(false);

  return (
    <Popover
      placement="bottomRight"
      content={popoverContent}
      trigger="click"
      onVisibleChange={(visible) => setPopoverOpen(visible)}
    >
      <Button
        className={concatClasses(style.roundBtn, isPopoverOpen ? style.roundBtnOpen : "")}
        type={"primary"}
        icon={<UserOutlined />}
      />
    </Popover>
  )
}

export default ProfilePopover