import React, { useState, useEffect, useCallback, useContext } from 'react';
import { CaretDownOutlined, BellOutlined, UserOutlined } from '@ant-design/icons';
import { Popover, Menu, Dropdown, Avatar, Tooltip } from 'antd';
import {
	useParams,
	useNavigate,
	useLocation
} from "react-router-dom";
import { clearLocalStorageItem, getLocalStorageItem } from '@utils/utils';
import { menuData, systemMenuData, paintMenuData } from "./menuJson";
import { MenuContext } from "./Layout";

interface Props {
	
}

const Header : React.FC<Props> = (props) => {
	const [show, setShow] = useState(false);
	const [nickname, setNickname] = useState<string>('用户');
	const { current, setCurrent } = useContext<LayoutType.currentHeaderTagEntry>(MenuContext);
	let navigate = useNavigate();
	let location = useLocation();
	let params = useParams();

	const hiddenTab = ['system', "paint"];

	const handleLogOut = () => {
		clearLocalStorageItem();
		navigate("/login/main");
	};
	const menu = (
		<Menu>
			<Menu.Item key="logout" onClick={handleLogOut}>
				<div>退出登录</div>
			</Menu.Item>
		</Menu>
	);
	
	const handleNavigate = (item: LayoutType.menuHeaderEntry) => {
		
		if (item.children[0].children) {
			handleNavigate(item.children[0]);
		} else { 
			navigate(item.children[0].path);
		}
		
	};
	useEffect(() => {
		let tempCurrent = location.pathname.split("/")[1];
		setCurrent(tempCurrent);
		return null;
	}, [location.pathname]);

	useEffect(() => {
		setNickname(getLocalStorageItem("nickname"));
	}, []);

	return (
		<header className="layout-header">
			<div className="layout-header-left">
				<div className="layout-header-logo" />
				<span className="layout-header-left-title">祉数镇农业农村一张图</span>
				<div className="layout-header-left-tabs">
					{
						menuData.map((ele: LayoutType.menuHeaderEntry) => {
							if (hiddenTab.includes(ele.path)) { // 不显示系统
								return null;
							}
							return (
								<div
									className={current == ele.path ? 'layout-header-left-tabs-active' : ''}
									key={ele.path}
									onClick={() => handleNavigate(ele)}
								>
									{ele.label}
								</div>
							);
						})
					}
				</div>
			</div>
			<div className="layout-header-right">
				<Tooltip placement="bottom" title="绘制地块">
					<div
						className="layout-header-right-tads g-tc g-lh-24 g-m-r-12"
						onClick={() => navigate(paintMenuData[0].path)}
					>
						<i className="iconfont g-fs-14 icon-dikuaihuizhi"></i>
					</div>
				</Tooltip>
				<Tooltip placement="bottom" title="后台管理">
					<div
						className="layout-header-right-tads g-tc g-lh-24 g-m-r-24"
						onClick={() => navigate(systemMenuData[0].path)}
					>
						<i className="iconfont g-fs-14 icon-houtaiguanli-houtaiguanli"></i>
					</div>
				</Tooltip>
				<div className="layout-header-right-avatar">
					<img src={require("../../../assets/images/avatar.png")} alt="" />
				</div>
				<Dropdown overlay={menu} placement="bottomRight" arrow>
					<div className="layout-header-right-user">
						<span>欢迎您！{nickname}</span>
						<CaretDownOutlined />
					</div>
				</Dropdown>
			</div>
		</header>
	);
};
export default Header;
