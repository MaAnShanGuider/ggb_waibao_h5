let baseUrl = "";
let vision = "";
let picUrl = "";
let pdfUrl = '';
let course = '';
const uploadUrl = "";
let wsurl = '';
let baseGisUrl = "";
console.log("当前环境:", process.env.NODE_ENV, process.env);

// baseUrl = "https://pay.gugubao.cn" + vision;
// baseUrl = "https://api.yunzhanyan.com" + vision;
// baseUrl = "http://192.168.110.25/prod-api" + vision;
// baseUrl = "http://192.168.110.20/prod-api" + vision;

if (process.env.NODE_ENV == "development") {
	// baseUrl = `http://192.168.110.95:8080`; // 席
	baseGisUrl = "https://dev.zjzsmap.com";
	baseUrl = "https://dev.zjzsmap.com/jxnt/prod-api";
	// baseUrl = `http://192.168.110.10:8080`; // 超	
	pdfUrl = 'https://dev.zjzsmap.com/jxnt';
	picUrl = "https://dev.zjzsmap.com/jxnt";
	course = 'http://192.168.110.95:8082';
	wsurl = 'wss://dev.zjzsmap.com/jxnt/prod-api/pushMessage/';
}
if (process.env.NODE_ENV == "production") {
	
	baseUrl = "/jxnt/prod-api";
	baseGisUrl = "";
	picUrl = "/jxnt";
	pdfUrl = '/jxnt';
	course = location.origin + '/common';
	wsurl = 'wss://dev.zjzsmap.com/jxnt/prod-api/pushMessage/';
}
if (process.env.NODE_ENV == "ceshi") {
	baseUrl = "/jxnt/prod-api"; // 外网
	picUrl = "/jxnt";
	baseGisUrl = "https://dev.zjzsmap.com";

	pdfUrl = 'https://dev.zjzsmap.com/jxnt';
	course = location.origin + '/common';
	wsurl = 'wss://dev.zjzsmap.com/jxnt/prod-api/pushMessage/';
}
export default {
	baseUrl,
	uploadUrl,
	picUrl,
	pdfUrl,
	course,
	wsurl,
	baseGisUrl
};

export const TOKEN_KEY = "token";
export const USER_INFO = "userInfo";
export const MENU_KEY = "menuData";
export const TABLE_INFO_KEY = "tableInfo";
export const AREA_KEY = "areaInfo";
export const GOODS_KEY = "goodsInfo";
export const TASK_ROUTE_KEY = "taskRouteKey";
// export const CUSTOMER_SERVICE_TEL = "400-0571-758";
export const CUSTOMER_SERVICE_TEL = "057186832985";
