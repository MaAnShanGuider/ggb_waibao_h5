import Request from "@utils/http";
import { System } from "typescript";

export const LoginPost = (data) => {
	// return Request<Api.LoginResponse>({
	return Request<Api.LoginResponse>({
		url: "/login",
		method: "post",
		data,
	});
};

export const CaptchaGet = () => {
	return Request<{msg: string, uuid: string}>({
		url: "/captchaImage",
		method: "get"
	});
};

export const pricelist = (data) => {
	return Request({
		url: "/food/pricelist",
		method: "post",
		data,
	});
};

// 角色授权保存
export const getLoginUser = (params) => {
	return Request<SystemType.UserEntry>({
		url: "/getInfo",
		method: "get",
		params,
	});
};
