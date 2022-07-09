import * as React from 'react';
import './App.css';
import { BrowserRouter as Router, useLocation } from "react-router-dom";
import { Spin } from 'antd';
import useStores from '@extends/hooks/useStores';
import { useEffect } from 'react';
import { observer } from 'mobx-react';
import { renderRoutes } from "./routers/config";
import { rootConfig } from "./layouts/root";

interface Props {
	/** The user's name */
}
// _props
const App: React.FC<Props> = observer(() => {
	console.log(process.env.NODE_ENV == "development" ? "/" : "/jxnt/");
	const { homeMain } = useStores();
	console.log(homeMain.showLoding);

	// useEffect(() => { 

	// }, []);
	return (
		<Router basename={process.env.NODE_ENV == "development" ? "/" : "/jxnt/"}>
			{
				renderRoutes(rootConfig)
			}

			{homeMain.showLoding
				&& <div className="Spins">
					<Spin></Spin>
				</div>
			}

		</Router>
	);
});

export default App;
