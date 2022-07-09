declare namespace Api {
	interface BasicReponse<T> {
		[x: string]: SetStateAction<any[]>;
		msg: string,
		code: number | string,
		success?: boolean,
		data?: T,
		rows?: T;
		total?: number;
		img?: string,
		uuid?: string,
		token?: string,
		rows?:[],
	}
	interface GisReponse<T> {
		features?: [],
		[x: string]: SetStateAction<any[]>;
		
	}
	interface LoginResponse {

	}
	interface ntYearListType {
		name?: any;
		year?: string,
		halfYear?: string,

	}

	interface errorList { 
		errorCount: any,
		errorList: any,
		successCount: any,
		totalCount:any,
	}

}
