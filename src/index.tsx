import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from "mobx-react";
import store from "@stores/index";
import './index.css';
import { ConfigProvider } from 'antd-mobile';
import zhCN from 'antd-mobile/es/locales/zh-CN';
import { createRoot } from 'react-dom/client';
import App from './App';
import reportWebVitals from './reportWebVitals';
import "@assets/css/global.scss";
import 'moment/locale/zh-cn';
import 'antd-mobile/es/global';

const root = createRoot(document.getElementById('root'));

root.render(
	// <React.StrictMode>
	// 	<App />
	// </React.StrictMode>,
	< ConfigProvider locale={zhCN} >
		<Provider {...store}>
			<App />

		</Provider>
	</ConfigProvider >,
	
);

reportWebVitals();
