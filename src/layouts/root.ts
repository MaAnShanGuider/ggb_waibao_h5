import { lazy } from "react";
import { homeConfig } from "./homeConfig";
import { loginConfig } from "./loginConfig";

export const rootConfig: RouteInstance[] = [
	...loginConfig,
	{
		name: "window", // 这个很重要，是再layout.tsx中，找到子路由的
		component: lazy(() => import("../views/_common/layout/Layout")),
		path: "/*",
		children: [
			...homeConfig, // 其他模块的页面组件放这个地方，login单独在上面
		]
	}

];
