import React, {FC} from 'react';
import 'antd/dist/antd.css'
import Layout from './components/layout/Layout';
import { Route, Routes } from "react-router-dom";
import { routes } from './routes/routes';

const App: FC = () => {
  return (
    <Layout>
      <Routes>
        {Object.values(routes).map((route) => {
          return <Route path={route.path} element={route.element} key={route.path} />;
        })}
      </Routes>
    </Layout>
  );
}

export default App;
