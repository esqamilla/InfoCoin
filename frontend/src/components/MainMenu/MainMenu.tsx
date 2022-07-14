import React, {FC} from 'react'
import { Menu } from 'antd';
import style from "./main-menu.module.scss";
import {Link} from 'react-router-dom';
import { MainMenuItems } from '../../types/types';

const MainMenu: FC = ({}) => {
  return (
    <Menu mode="horizontal" className={style.menu} defaultOpenKeys={[MainMenuItems.None]}>
      <Menu.SubMenu
        key={MainMenuItems.Finance}
        title={<Link to="/finance">Финансы</Link>}
        popupClassName='antd__popup'
        popupOffset={[-30, -20]}
      >
        <Menu.Item key={MainMenuItems.Income}>
          <Link to="/incomeTable">Доходы</Link>
        </Menu.Item>
        <Menu.Item key={MainMenuItems.Expenses}>
          <Link to="/expenses">Расходы</Link>
        </Menu.Item>
      </Menu.SubMenu>
      <Menu.Item key={MainMenuItems.Savings}>
        <Link to="/savings">Накопления</Link>
      </Menu.Item>
      <Menu.Item key={MainMenuItems.Reports}>
        <Link to="/reports">Отчеты</Link>
      </Menu.Item>
      <Menu.Item key={MainMenuItems.Notes}>
        <Link to="/notes">Заметки</Link>
      </Menu.Item>
    </Menu>
  )
}

export default MainMenu