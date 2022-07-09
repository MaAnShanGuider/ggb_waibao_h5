import qs from "qs";
import { message, Modal } from "antd";
import axios, { AxiosResponse, AxiosRequestConfig } from 'axios';
import useStores from '@extends/hooks/useStores';
import constants from "../constants/constants";
import { getLocalStorageItem, clearLocalStorageItem } from "./utils";

const { baseUrl } = constants;

// console.log(GlobalLoading.isLoading);
// GlobalLoading.isLoading = true;
// console.log(GlobalLoading.isLoading);

export const http = function (defaultOptions = {}) {
	
	// axios.defaults.withCredentials = true;
	// axios.defaults.headers = {
	// 	// 'Content-type': 'application/x-www-form-urlencoded'
	// 	'Content-type': 'application/json;charset=UTF-8'
	// };

	// 序列化参数, 如果'Content-type'= 'application/json;charset=UTF-8'
	// 那么就恢复下面的注释
	// axios.defaults.transformRequest = (data) => {
	// 	data = qs.stringify(data);
	// 	return data;
	// };

	axios.interceptors.request.use(function (config) {
		let url = "";
		let tempData = {};

		switch (config.method.toLowerCase()) {
			case "get":
				url = config.url + '?';
				for (const propName of Object.keys(config.params || {})) {
					const value = config.params[propName];
					let part = encodeURIComponent(propName) + "=";
					if (value !== null && typeof (value) !== "undefined") {
						if (typeof value === 'object') {
							for (const key of Object.keys(value)) {
								let params = propName + '[' + key + ']';
								let subPart = encodeURIComponent(params) + "=";
								url += subPart + encodeURIComponent(value[key]) + "&";
							}
						} else {
							url += part + encodeURIComponent(value) + "&";
						}
					}
				}
				url = url.slice(0, -1);
				config.params = {};
				config.url = url;
				break;
			case "post":

				if (!(config.data instanceof FormData)) {
					for (let i in config.data) {
						if (config.data[i] !== null) {
							tempData[i] = config.data[i];
						}
					}
					config.data = tempData;
				}

				break;
			default:
				break;
		}
		return config;
	}, function (error) {
		// 对请求错误做些什么
		return Promise.reject(error);
	});

	// 添加响应拦截器
	axios.interceptors.response.use(function (response) {
		// console.log(response.config.url, /\/geoserver|\/jxnt\/tile/.test(response.config.url));
		if (/(\/geoserver)|(\/jxnt\/tile)/.test(response.config.url)) {
			return response.data; // then回掉里的res就是response.data

		}
		switch (+response.data.code) {
			case 401:
			
				message.warn("token失效");
				clearLocalStorageItem();
				if (process.env.NODE_ENV == "development") {
					location.href = "/login/main";
				} else {
					location.href = "/jxnt/login/main";
				}
				throw new Error(response.data.msg);
			case 403:

				message.error({
					content: response.data.msg
				});
				throw new Error(response.data.msg);
			default:
				break;
		}

		// return response.data; // then回掉里的res就是response.data
		return response.data; // then回掉里的res就是response.data
	}, function (error) {

		console.log("response-error:", error);

		return Promise.reject(error);
	});

	return {
		ajax<T>(options) { // 根据传入的结构，定义传出的结构
			let {
				url,
				type = "GET",
				data = {},
				params = {},
				loading = true,
				headers = {},
				carryToken = true,
				isToast = true,
				showMsg = false,
			} = options;
			let requestUrl = baseUrl + url;
			if (/(http|https):\/\/([\w.]+\/?)\S*/.test(url)
				|| /\/geoserver/.test(url)
				|| /\/jxnt\/tile/.test(url)
			) { // 如果是http或者https或者geoserver或者jxnt的地图服务，那么不加前缀
				requestUrl = url;
			}
			return new Promise<Api.BasicReponse<T>>((resolve, reject) => {

				const _token = getLocalStorageItem("token");

				if (_token && carryToken) {
					headers["Authorization"] = "Bearer " + _token; // 
				} else {
					delete headers["Authorization"]; // 
				}
				axios.request({
					...options,
					headers,
					url: requestUrl,
				}).then((res: Api.BasicReponse<T>) => {
					// Toast.clear();
					switch (+(res.code)) {
						case 200:
							// message.success("操作成功");
							resolve(res);
							break;
						default:
							message.error({
								content: res.msg
							});
							reject(res);
							break;

					}
					
				}).catch(error => {
					// Toast.clear();
					reject(error);
				});
			});
		},
		// async gisGet<T>(options): Promise<Api.GisReponse<T>> {
		async gisGet(options) {
			let headers = {};
			const _token = getLocalStorageItem("token");
			headers["Authorization"] = "Bearer " + _token; // 
			
			return new Promise((resolve, reject) => {

				axios({
					method: "GET",
					url: options.url,
					headers,
					params: options.params || {}
				// }).then((res: Api.GisReponse<T>) => {
				}).then((res) => {
					resolve(res);
				}).catch(error => {
					reject(error);
				});
			});
		},
		gisDELETE(options) {
			let headers = {};
			const _token = getLocalStorageItem("token");
			headers["Authorization"] = "Bearer " + _token; // 
			// if (_token && carryToken) {
			return new Promise((resolve, reject) => {

				axios({
					method: "DELETE",
					url: options.url,
					headers,
					params: options.params || {}
				}).then(res => {
					resolve(res);
				}).catch(error => {
					reject(error);
				});
			});
		},
	};
};
const httpInstance = http();

export const gisGet = httpInstance.gisGet;
export default httpInstance.ajax;
