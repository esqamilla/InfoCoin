import React from 'react';
import ReactDOM from 'react-dom/client';
import {BrowserRouter} from 'react-router-dom';
import App from './App';
import { ConfigProvider } from "antd";
import rus from "antd/lib/locale/ru_RU";
import moment from "moment";
import "moment/locale/ru";

import './index.scss';

moment.locale("ru");

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <ConfigProvider locale={rus}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </ConfigProvider>
  </React.StrictMode>
);
