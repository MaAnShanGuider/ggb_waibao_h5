import qs from "qs";

export const mergeUrl = ({ path, query, state }) => {
	let _query = {};

	if (!query) return path;

	for (let i in query) {
		if (query[i] !== undefined && query[i] !== "") {
			_query[i] = query[i];
		}
	}
	let queryString = qs.stringify(_query);
	return path + "?" + queryString;
};

export const setLocalStorageItem = (key, value) => {
	let _value = value;

	if (typeof value == "object") {
		_value = JSON.stringify(value);
	}

	localStorage.setItem(key, _value);
};
export const isString = (x) => {
	return Object.prototype.toString.call(x) === '[object String]';
};

export const isObject = (obj) => {
	return Object.prototype.toString.call(obj) === '[object Object]';
};
export const isJSON = (str, pass_object) => {
	if (pass_object && isObject(str)) return true;

	if (!isString(str)) return false;

	str = str.replace(/\s/g, '').replace(/\n|\r/, '');

	if (/^\{(.*?)\}$/.test(str)) { return /"(.*?)":(.*?)/g.test(str); }

	if (/^\[(.*?)\]$/.test(str)) {
		return str.replace(/^\[/, '')
			.replace(/\]$/, '')
			.replace(/},{/g, '}\n{')
			.split(/\n/)
			.map(function (s) { return isJSON(s, {}); })
			.reduce(function (prev, curr) { return !!curr; });
	}

	return false;
};
export const getLocalStorageItem = (key) => {
	let _value = localStorage.getItem(key);

	if (_value === 'null') {
		return null;
	} else {
		return isJSON(_value, {}) ? JSON.parse(_value) : _value;

	}
};
export const removeLocalStorageItem = (key) => {
	localStorage.removeItem(key);
};
export const clearLocalStorageItem = () => {
	localStorage.clear();
};
export const setCookie = (cname, cvalue, exdays = 1) => {
	let d = new Date();
	d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
	// let expires = "expires=" + d.toGMTString();
	let expires = "expires=" + d.toUTCString();
	document.cookie = cname + "=" + cvalue + "; " + expires;
};

export const getCookie = cname => {
	let name = cname + "=";
	let ca = document.cookie.split(';');
	for (let i = 0; i < ca.length; i++) {
		let c = ca[i].trim();
		if (c.indexOf(name) == 0) return c.substring(name.length, c.length);
	}
	return "";
};

export const removeCookie = (cname) => {
	setCookie(cname, null, -1);
};

/**
 * 加法
 * @param {*} arg1
 * @param {*} arg2
 */
export const accAdd = (arg1, arg2) => {
	let r1; let r2; let
		m;
	try { r1 = arg1.toString().split(".")[1].length; } catch (e) { r1 = 0; }
	try { r2 = arg2.toString().split(".")[1].length; } catch (e) { r2 = 0; }
	m = 10 ** Math.max(r1, r2);
	return (arg1 * m + arg2 * m) / m;
};
/**
 * 减法
 * @param {*} arg1
 * @param {*} arg2
 */
export const accSub = (arg1, arg2) => {
	let r1; let r2; let m; let
		n;
	try { r1 = arg1.toString().split(".")[1].length; } catch (e) { r1 = 0; }
	try { r2 = arg2.toString().split(".")[1].length; } catch (e) { r2 = 0; }
	m = 10 ** Math.max(r1, r2);
	// 动态控制精度长度
	n = (r1 >= r2) ? r1 : r2;
	return ((arg1 * m - arg2 * m) / m).toFixed(n);
};
// 乘法
export const accMul = (arg1, arg2) => {
	let m = 0;
	let s1 = arg1.toString();
	let s2 = arg2.toString();
	let uns = 0;
	console.log(arg1, arg2);
	try { m += s1.split(".")[1].length; } catch (e) { uns = 1; }
	try { m += s2.split(".")[1].length; } catch (e) { uns = 1; }
	return (Number(s1.replace(".", "")) * Number(s2.replace(".", ""))) / 10 ** m;
};
// 除法
export const accDiv = (arg1, arg2) => {
	let t1 = 0;
	let t2 = 0;
	let r1;
	let r2;
	try { t1 = arg1.toString().split(".")[1].length; } catch (e) { t1 = 0; }
	try { t2 = arg2.toString().split(".")[1].length; } catch (e) { t2 = 0; }

	r1 = Number(arg1.toString().replace(".", ""));

	r2 = Number(arg2.toString().replace(".", ""));
	return (r1 / r2) * 10 ** (t2 - t1);
};
export function copyText(text) {
	return new Promise<void>(function (resolve, reject) {
		// 复制链接
		let input = document.createElement('input');
		input.value = text;
		document.body.appendChild(input);
		input.select();
		input.setSelectionRange(0, input.value.length);
		document.body.removeChild(input);
		resolve();
	});
}
export function isWeixin() {
	let ua = navigator.userAgent.toLowerCase();
	if (ua.match(/MicroMessenger/i).toString() == "micromessenger") {
		return true;
	} else {
		return false;
	}
}
export const initPage = {};
