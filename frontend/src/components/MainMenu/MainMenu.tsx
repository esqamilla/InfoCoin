import React, {FC, useEffect, useState} from 'react'
import { Menu } from 'antd';
import style from "./main-menu.module.scss";
import {Link, useLocation} from 'react-router-dom';
import { MainMenuItems } from '../../types/types';
import {Path} from '../../routes/path';

const MainMenu: FC = ({}) => {
  const { pathname: path } = useLocation();

  return (
    <Menu mode="horizontal" className={style.menu} defaultSelectedKeys={[path.replace("/", "") as MainMenuItems]}>
      <Menu.SubMenu
        key={"finance"}
        title={<Link to="/finance">Финансы</Link>}
        popupClassName='antd__popup'
        popupOffset={[-30, -20]}
      >
        <Menu.Item key={"income"}>
          <Link to="/incomeTable">Доходы</Link>
        </Menu.Item>
        <Menu.Item key={"expenses"}>
          <Link to="/expenses">Расходы</Link>
        </Menu.Item>
      </Menu.SubMenu>
      <Menu.Item key={"savings"}>
        <Link to="/savings">Накопления</Link>
      </Menu.Item>
      <Menu.Item key={"reports"}>
        <Link to="/reports">Отчеты</Link>
      </Menu.Item>
      <Menu.Item key={'notes'}>
        <Link to={`/${Path.Notes}`}>Заметки</Link>
      </Menu.Item>
    </Menu>
  )
}

export default MainMenu