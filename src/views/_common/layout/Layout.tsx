import { Outlet, useOutlet } from 'react-router';
import React, { memo, Suspense, useState, useEffect, useMemo, useReducer, useRef } from 'react';
import type { FunctionComponent, Dispatch, JSXElementConstructor, ReactElement } from 'react';
import { BackTop, Layout as ALayout, Menu, Spin } from 'antd';
import { Link, useLocation, useNavigate, useRoutes } from 'react-router-dom';
import { equals, filter, isEmpty, isNil, last, map, not, reduce } from 'ramda';
import type { RouteMatch, RouteObject } from 'react-router';
import KeepAlive from '@views/_common/KeepAlive';
import { ViewProvider } from '@extends/hooks/useView';
// import type { RouteConfig } from '@/router/configure';
import Header from './Header';
import Sidebar from './Sidebar';
import "./layout.scss";
import { menuData, systemMenuData } from "./menuJson";
import { rootConfig } from "../../../layouts/root";
import type { Action } from './Reducer';
import { ActionType, reducer } from './Reducer';
 
function Redirect({ to }) {
	let navigate = useNavigate();
	useEffect(() => {
	  navigate(to);
	}, []); // 这里必须是[]
	return null;
}
export interface RouteObjectDto extends RouteObject {
	name: string
	meta?: { title?: string, keepAlive?: boolean }
}
function makeRouteObject(routes: RouteInstance[], dispatch: Dispatch<Action>): Array<RouteObjectDto> {
	return map((route) => {
		if (route.redirectTo) {
			return {
				path: route.path,
				name: route.name,
				meta: route.meta,
				element: <Redirect to={ route.redirectTo } />,
				// element: <div>111</div>,
				children: isNil(route.children) ? undefined : makeRouteObject(route.children, dispatch),
			};
		}
		// console.log(route.path, route?.meta?.keepAlive);
		
		if (route?.meta?.keepAlive) {
			return {
				path: route.path,
				name: route.name,
				meta: route.meta,
				element: (
					<ViewProvider value={{ name: route.name }}>
						<route.component name={route.name} dispatch={dispatch} />
					</ViewProvider>
				),
				children: isNil(route.children) ? undefined : makeRouteObject(route.children, dispatch),
			};
		} else {
			return {
				path: route.path,
				name: route.name,
				meta: route.meta,
				element: (<route.component name={route.name} />
				),
				children: isNil(route.children) ? undefined : makeRouteObject(route.children, dispatch),
			};
		}
		
	}, routes);
}

function getLatchRouteByEle(ele: ReactElement): RouteMatch[] | null {
	const data = ele?.props.value;
	const matches = data.matches as RouteMatch[];
	return isNil(data.outlet) ? matches : getLatchRouteByEle(data.outlet);
}
function getMatchRouteObj(ele: ReactElement | null) {
	if (isNil(ele)) {
		return null;
	}
	
	const matchRoute = getLatchRouteByEle(ele);
	if (isNil(matchRoute)) {
		return null;
	}                  
	const selectedKeys: string[] = map((res) => {
		return (res.route as RouteObjectDto).name;
	}, matchRoute);
	const data = last(matchRoute)?.route as RouteObjectDto;
	// console.log(data);

	return {
		key: last(matchRoute)?.pathname ?? '',
		title: data?.meta?.title ?? '',
		name: data?.name ?? '',
		selectedKeys,
		keepAlive: data?.meta?.keepAlive ?? false,
		include: isNil(data.children),
	};
}
function mergePtah(path: string, paterPath = '') {
	// let pat = getGoto(path)
	path = path.startsWith('/') ? path : '/' + path;
	return paterPath + path;
}
interface Props {
	route: RouteInstance
}

export const MenuContext = React.createContext<LayoutType.currentHeaderTagEntry>({ current: 'home' });
const Layout: FunctionComponent<Props> = ({ route }: Props) => {
	const eleRef = useRef<ReactElement<any, string | JSXElementConstructor<any>> | null>();
	const location = useLocation();
	const navigate = useNavigate();
	const [keepAliveList, dispatch] = useReducer(reducer, []);
	const [current, setCurrent] = useState<string>("home");
	// console.log(route);
	// 生成子路由
	const routeObject = useMemo(() => {
		if (route.children) {
			return makeRouteObject(route.children, dispatch);
		}
		return [];
	}, [route.children]);

	// 匹配 当前路径要渲染的路由
	const ele = useRoutes(routeObject, location);

	return (
		<MenuContext.Provider value={{
			current,
			setCurrent,
		}}>
			<div className="c-layout-main" >
				<Outlet />
			</div>
		</MenuContext.Provider>
	);
};
export default memo(Layout);