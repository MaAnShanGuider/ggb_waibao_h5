const systemMenuData: LayoutType.menuEntry[] = [
	{
		label: "人员管理",
		path: "/system/user",
		tag: "system",
		icon: "icon-ziyuan174",
	},
	{
		label: "角色管理",
		path: "/system/role",
		tag: "system",
		icon: "icon-jiaoseguanli",
	},
	{
		label: "菜单管理",
		path: "/system/menu",
		tag: "system",
		icon: "icon-caidanguanli",
	},
	{
		label: "字典管理",
		path: "/system/dict",
		tag: "system",
		icon: "icon-zidianguanli",
	}
];
const paintMenuData: LayoutType.menuEntry[] = [
	{
		label: "绘制图层",
		path: "/paint/main",
		tag: "paint",
	},

];
const menuData: LayoutType.menuHeaderEntry[] = [
	{
		label: "农业管理",
		path: "home",
		children: [
			{
				label: "资源数据",
				path: "/home/main?type=resource",
				tag: "home",
				icon: "icon-shuju",
			},
			{
				label: "智能查询",
				path: "/home/main?type=search",
				tag: "home",
				icon: "icon-sousuo",
			},
			{
				label: "粮食补贴",
				path: "/home/subsidy",
				tag: "home",
				icon: "icon-gangweibutie",
			}
		]
	},
	{
		label: "房屋管理",
		path: "house",
		children: [
			{
				label: "资源数据",
				path: "/house/main?type=resource",
				tag: "house",
				icon: "icon-shuju",
			},
			{
				label: "智能查询",
				path: "/house/main?type=search",
				tag: "house",
				icon: "icon-sousuo",
			},
			{
				label: "违规信息",
				path: "/house/violation",
				tag: "house",
				icon: "icon-fangzi",
			}
		]
		
	},
	{
		label: "监管大屏",
		path: "screen",
		children: [
			{
				label: "监管大屏",
				path: "/screen/main",
				tag: "screen",
				icon: "icon-fenxi",
			}
			
		]
		
	},
	{
		label: "统计分析",
		path: "graphic",
		children: [
			// {
			// 	label: "分析",
			// 	path: "/graphic/analysis",
			// 	tag: "graphic",
			// 	icon: "icon-fenxi",
			// },
			{
				label: "统计",
				path: "/graphic/statistic",
				tag: "graphic",
				icon: "icon-tongji",
				children: [
					{
						label: "种植类别",
						path: "/graphic/plantingType",
						tag: "graphic",
					},
					{
						label: "房屋新增",
						path: "/graphic/housingType",
						tag: "graphic",
					},
					{
						label: "综合统计",
						path: "/graphic/syntheticalType",
						tag: "graphic",
					}
				]
			},
			
		]
		
	},

	//  系统
	{
		label: "系统管理",
		path: "system",
		children: systemMenuData
	},
	// 绘制渲染图层
	{
		label: "绘制",
		path: "paint",
		children: paintMenuData
	},
];

export {
	menuData,
	systemMenuData,
	paintMenuData
};
