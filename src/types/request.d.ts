import * as axios from 'axios';

// 补充，而不是覆盖
declare module 'axios' {
	interface AxiosResponse<T = any > {
		code: string | number,
		msg: string,
		(config: AxiosRequestConfig): Promise<any>,
	}
}