import React, { useState, useEffect, useContext } from 'react';
import {
	useParams,
	useNavigate,
	useLocation,
	useSearchParams,
} from "react-router-dom";
import { Menu } from 'antd';
import type { MenuProps } from 'antd';
import MenuItem from 'antd/lib/menu/MenuItem';
import { cloneDeep } from "lodash";
import { UpOutlined, DownOutlined, } from '@ant-design/icons';
import { MenuContext } from './Layout';
import { menuData, systemMenuData } from "./menuJson";
import "./layout.scss";

// type MenuItem = Required<MenuProps>['items'][number];

interface Props {

}

const Sidebar: React.FC<Props> = (props) => {
	const { current, setCurrent } = useContext<LayoutType.currentHeaderTagEntry>(MenuContext);
	// const [sideData, setSideData] = useState<LayoutType.menuEntry[]>([]);
	const [sideData, setSideData] = useState<MenuProps[]>([]);
	let navigate = useNavigate();
	let location = useLocation();
	// let [search, setSearchParams] = useSearchParams();
	let params = useParams();
	const _menuData: MenuItem[] = [

	];
	// console.log(location, search.get("type"));
	// useEffect(() => {
	// 	console.log(props);

	// 	// console.log(props.location);
	// }, [props]);

	useEffect(() => {
		let menuEntry: LayoutType.menuEntry[] = menuData.find((ele) => ele.path == current)?.children || [];

		let path = location.pathname;
		menuEntry.forEach(e => {
			e.show = false;
			if (e.children) {
				e.children.forEach(val => {
					if (val.path == path) { 
						e.show = true;
					}
				});
			} 	
		});
		setSideData(menuEntry);
		return null;
	}, [current, props]);

	const handleNavigae = (item: LayoutType.menuEntry) => {
		if (location.pathname + location.search != item.path) { // 自己不用跳自己
			if (location.pathname == item.path.split("?")[0]) { // 同个url，不同query，直接replace
				navigate(item.path, { replace: true });

			} else { // push
				navigate(item.path);
			}
		}
	};

	const _renderMenuItem = (ele, i) => {

		if (ele.children && ele.children.length > 0) {
			return (
				<div 
					key={ele.path}
					className="boxListMenu"
					onClick={
						() => {
							let m = cloneDeep(sideData);
							m[i].show = !m[i].show;
							setSideData(m);
						}
					}
				>
					<div className="boxMar">
						<div>
							<i className={"g-m-r-4 iconfont " + ele.icon} style={ele.show ? { color: '#0C70F8' } : { color: '#81B6FB' }} />
							<span style={ele.show ? { color: '#0C70F8' } : { color: '#333333' }}>{ele.label}</span>
						</div>
						{ele.show ? <DownOutlined className="g-fs-8"/> : <UpOutlined className="g-fs-8"/>}
					</div>
					{ele.show
						&& <div>
							{ele.children.map(el2 => _renderMenuItem(el2, i))}
						</div>
					}
				</div>
			);
		} else {
			return (
				<div
					key={ele.path}
					className={"layout-side-menu-item " + (location.pathname + location.search == ele.path ? "layout-side-menu-item-active" : " ")}
					onClick={() => handleNavigae(ele)}
				>
					<i className={"g-m-r-4 iconfont " + ele.icon} style={location.pathname + location.search == ele.path ? { color: '#0C70F8' } : { color: '#81B6FB' }} />
					{ele.label}
				</div>
			);
		}
	};
	return (
		<div className="layout-side">
			<div className="layout-side-menu">
				{/* {
					sideData.map((ele) => (
						<div
							key={ele.path}
							className={"layout-side-menu-item " + (location.pathname + location.search == ele.path ? "layout-side-menu-item-active" : " ")}
							onClick={() => handleNavigae(ele)}
						>
							{ele.label}
						</div>
				 ))
				} */}

				{
					sideData.map((ele, i) => {
						return _renderMenuItem(ele, i);
					})
				}
				{/* <Menu items={_menuData]} /> */}
			</div>
		</div>
	);
};
export default Sidebar;
