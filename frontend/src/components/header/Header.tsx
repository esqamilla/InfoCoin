import React, {FC} from 'react'
import { Button, Col, Layout, Menu, MenuProps, Popover, Row } from 'antd';
import Contanier from '../container/Contanier';
import style from "./header.module.scss";
import {Link} from 'react-router-dom';
import logo from "../../assets/images/logo.svg";
import concatClasses from '../../utils/concatClasses';
import {ProfileIcon} from '../icons/Icons';
import {ExportOutlined} from '@ant-design/icons';

const { Header: MainHeader } = Layout;

const popoverContent = (
  <div className={style.popover}>
    <div className={style.popoverTitle}>
      <ProfileIcon className={style.popoverIcon} />
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

const Header: FC = () => {
  const isAuth = true;

  return (
	<MainHeader className={style.header}>
    <Contanier>
      <Row align="middle" className={style.wrapper}>
        <Col flex="205px" className={style.col}>
          <Link to="/">
            <img src={logo} className={style.logo} alt="logo" />
          </Link>
        </Col>
        {isAuth && (
          <>
            <Col flex="auto" className={style.col}>
              <Menu mode="horizontal" className={style.menu} defaultOpenKeys={["Finance"]}>
                <Menu.SubMenu
                  key="Finance"
                  title={<Link to="/finance">Финансы</Link>}
                  popupClassName='antd__popup'
                  popupOffset={[-30, -20]}
                >
                  <Menu.Item key="Income">
                    <Link to="/income">Доходы</Link>
                  </Menu.Item>
                  <Menu.Item key="Expenses">
                    <Link to="/expenses">Расходы</Link>
                  </Menu.Item>
                </Menu.SubMenu>
                <Menu.Item key="Savings">
                  <Link to="/savings">Накопления</Link>
                </Menu.Item>
                <Menu.Item key="Reports">
                  <Link to="/reports">Отчеты</Link>
                </Menu.Item>
            </Menu>
            </Col>
            <Col flex="50px" className={concatClasses(style.col, style.colCenter)}>
              <Popover
                placement="bottomRight"
                content={popoverContent}
                trigger="click"
              >
                <Button className={style.roundBtn} type={"primary"}>
                  <ProfileIcon />
                </Button>
              </Popover>
            </Col>
          </>
        )}
      </Row>
    </Contanier>
	</MainHeader>
  )
}

export default Header