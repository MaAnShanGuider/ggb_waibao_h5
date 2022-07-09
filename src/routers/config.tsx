import React, { Suspense, useEffect } from 'react';
import { Navigate, Route, Routes, useNavigate } from 'react-router-dom';
import Layout from '@views/_common/layout/Layout';
import { getLocalStorageItem } from "@utils/utils";
import { Spin } from 'antd';
import { map } from 'ramda';
 
function Redirect({ to }) {
	let navigate = useNavigate();
	useEffect(() => {
	  navigate(to);
	});
	return null;
}

function renderRoutes(routes, extraProps = {}, switchProps = {}) {
	
	let token = getLocalStorageItem("token");

	return (
		<Routes>
			{map(
				(route) => (
					<Route path={route.path} key={route.name}
						element={<Suspense fallback={<span>加载中...</span>}>
							{
								route.redirectTo
									? <Redirect to={ route.redirectTo} />
									: <route.component route={route} />
							}
						</Suspense>} />
				),
				routes
			)}
		</Routes>
		
	);
	
}

export { renderRoutes };
