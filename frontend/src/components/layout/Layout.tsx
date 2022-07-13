import React, {FC, ReactElement, useEffect} from 'react'
import { useLocation, useNavigate } from "react-router-dom";
import { Layout as MainLayout } from 'antd';
import style from "./layout.module.scss";
import Header from '../header/Header';
import Contanier from '../container/Contanier';

const { Content } = MainLayout;


interface LayoutProps {
	children: ReactElement;
}

const Layout: FC<LayoutProps> = ({ children }) => {
  const token = "token";
  const navigate = useNavigate();
  const location = useLocation();

	useEffect(() => {
		if (!token) {
			navigate("/authorization", { replace: true, state: location });
		}
  }, [token]);

  return (
    <MainLayout className={style.layout}>
      <Header />
      <MainLayout className={style.mainLayout}>
        <Content>
          <Contanier>
            {children}
          </Contanier>
        </Content>
      </MainLayout>
    </MainLayout>
  )
}

export default Layout