import { lazy } from "react";

export const loginConfig: RouteInstance[] = [
	{
		name: "loginMain",
		component: lazy(() => import("../views/login/main/Content")),
		path: "/login/main",
	}
];