import React, {FC} from 'react'
import { Col, Layout, Row } from 'antd';
import Contanier from '../container/Contanier';
import style from "./header.module.scss";
import {Link, useParams} from 'react-router-dom';
import logo from "../../assets/images/logo.svg";
import concatClasses from '../../utils/concatClasses';
import ProfilePopover from '../ProfilePopover/ProfilePopover';
import MainMenu from '../MainMenu/MainMenu';

const { Header: MainHeader } = Layout;

const Header: FC = ({}) => {
  const isAuth = true;
  const params = useParams();

  console.log("params", params);

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
                <MainMenu />
              </Col>
              <Col flex="50px" className={concatClasses(style.col, style.colCenter)}>
                <ProfilePopover />
              </Col>
            </>
          )}
        </Row>
      </Contanier>
    </MainHeader>
  )
}

export default Header