import { lazy, useEffect } from "react";
import { Navigate, useNavigate } from "react-router-dom";

function Redirect({ to }) {
	let navigate = useNavigate();
	useEffect(() => {
	  navigate(to);
	});
	return null;
}
  
export const homeConfig: RouteInstance[] = [

	{
		name: "homeMain",
		component: lazy(() => import("../views/home/main/Content")),
		path: "/home/main",
		meta: {
			keepAlive: true
		}
	},
	{
		name: "homeSubsidy",
		component: lazy(() => import("../views/home/subsidy/Content")),
		path: "/home/subsidy",
	},
	{
		name: "重定向",
		path: "/", // 外面的重定向
		redirectTo: "/home/main?type=resource"
		// redirectTo: "/home/subsidy"
	}
];