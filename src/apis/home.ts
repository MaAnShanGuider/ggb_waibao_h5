import Request, { gisGet } from "@utils/http";

export const ntBasicLayersTreePost = (data) => {
	// return Request<Api.LoginResponse>({
	return Request<[]>({
		url: "/gis/nodeLayer/getTree",
		method: "post",
		data,
	});
};

export const ntNavigatorGet = (params) => {
	// return Request<Api.LoginResponse>({
	return Request<{
		adId: string,
		adName: string,
		children?: [],
		geoBox: any,
		geoJson: any,
		geoCenter: {
			coordinates: [number, number]
		},
	}>({
		url: "/gis/navi/getNaviPoint",
		method: "get",
		params,
	});
};

export const ntAllLayersTimeGet = (data) => {
	// return Request<Api.LoginResponse>({
	return Request<{ tm: string, imageUrl: string }[]>({
		url: "/baseData/xm/getXmTm",
		method: "post",
		data,
	});
};

export const userInfoSettingsGetPost = (data) => {
	// return Request<Api.LoginResponse>({
	return Request<{ configValue: string }[]>({
		url: "/system/user/getUserConfig",
		method: "post",
		data,
	});
};
export const userInfoSettingsConfigSetPost = (data) => {
	// return Request<Api.LoginResponse>({
	return Request({
		url: "/system/user/setUserConfig",
		method: "post",
		data,
	});
};

export const ntComparedLayersPost = (params) => {
	// return Request<Api.LoginResponse>({
	return Request<HomeType.ComparedModalType[]>({
		url: "/statis/nt/ntDifTm",
		method: "get",
		params,
	});
};
export const nwComparedLayersPost = (params) => {
	// return Request<Api.LoginResponse>({
	return Request<HomeType.ComparedModalType[]>({
		url: "/statis/nf/nfDifTm",
		method: "get",
		params,
	});
};

export const featuresInfoGet = (url) => {
	return gisGet({
		url,
		method: "get",
		headers: {
			"Accept": "*/*"
		}
	});
};

export const nfDataGet = (params) => {
	return Request<{ info: Record<string, any> }>({
		url: "/baseData/nf/info",
		method: "get",
		params: {
			...params,
			needGeom: true,
		},
	});
};

export const nfSearchGet = ({ name, tm }) => {
	return Request<{ list: Record<string, any>[] }>({
		url: "/baseData/nf/search/list",
		method: "get",
		params: {
			name,
			needGeom: true,
			tm,
		},
	});
};
export const nfSearchDetailGet = ({ xmId, nfOwnerId }) => {
	return Request<{ list: Record<string, any>[] }[]>({
		url: "/baseData/nf/searchNfDetailList",
		method: "get",
		params: {
			xmId,
			needGeom: true,
			nfOwnerId,
		},
	});
};
export const ntDataGet = (params, needGeom = true) => {
	// return Request<{ info: Record<string, any> }>({
	return Request<{
		geoJson?: Record<string, any>,
		planterName?: string,
		ownerName?: string,
		planterId?: string,
		ownerId?: string,
		contractTime?: string,
	}>({
		url: "/baseData/nt/get",
		method: "get",
		params: {
			...params,
			needGeom,

		},
	});
};

export const ntSearchGet = ({ planterName, tm }) => {
	return Request<[]>({
		url: "/baseData/nt/searchNtList",
		method: "get",
		params: {
			planterName,
			needGeom: true,
			tm,
		},
	});
};
export const ntSearchDetailGet = ({ xmId, planterId }) => {
	return Request<HomeType.SideBarSearchResultType[]>({
		url: "/baseData/nt/searchNtDetailList",
		method: "get",
		params: {
			xmId,
			needGeom: true,
			planterId,
		},
	});
};
// 
export const nfDiffDataGet = (params) => {
	return Request<{
		showPits: HomeType.ComparedModalListInfoType[],
		showPitsNum: number,
	}>({
		url: "/statis/nf/nfDifTmList",
		method: "get",
		params,
	});
};
export const ntDiffDataGet = (params) => {
	return Request<{
		showPits: HomeType.ComparedModalListInfoType[],
		showPitsNum: number,
	}>({
		url: "/statis/nt/ntDifTmList",
		method: "get",
		params,
	});
};

export const nfClusterfeaturesInfoGet = (url) => {
	return gisGet({
		url,
		method: "get",
	});
};

export const getLegendList = (params) => {
	return Request<HomeType.LegendEntry[]>({
		url: "/baseData/layout/list",
		method: "get",
		params,
	});
};

export const ntntList = ({ xmId, planterId }) => {
	return Request<HomeType.ComparedModalListInfoType[]>({
		url: "/baseData/nt/ntList",
		method: "get",
		params: {
			xmId,
			needGeom: true,
			planterId,
		},
	});
};
