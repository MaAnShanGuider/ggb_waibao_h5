declare namespace HomeType {
	interface TreeNodeType {
		label: string,
		value: string | number,
		children?: TreeType[]
	}
	interface TreeContextType {
		selectedRecord: Record<string, any>,
		setSelectedRecord?: React.Dispatch<any>,

		// expandRecord: Record<string, any>,
		// setExpandRecord?: React.Dispatch<any>,
	}
	type FooterTimeNodeType = {
		name: string,
		value: string | number,
	}
	type ComparedModalType = {
		changeNum: number,
		newArea: number,
		newNum: number,
		plantName: string,
		reduceArea: number,
		reduceNum: number,

		newViolationArea?: number,
		newViolationNum?: number,
		reduceViolationArea?: number,
		reduceViolationNum?: number,
		plantCode?:number,
	}
	type FeatureGeometryType = {
		bbox: [],
		crs: {
			properties: Record<string, any>,
			name: string,
		},
		geometry: {
			coordinates: [],
			type: string,

		},
		geometry_name: string,
		id: string,
		properties: {
			nf_id?: string,
			nt_id?: string,
			xm_id: string,
			nfdk_id: string,

		},
		type: string,
	}
	type FeaturesType = {
		bbox: [],
		crs: {
			properties: Record<string, any>,
			name: string,
		},
		features: FeatureGeometryType[],
	}
	type GeoJsonType = {
		coordinates: [any],
		crs: Record<string, any>,
		type: string,
	}
	interface ComparedModalListInfoType {
		key: React.Key;
		area: number;
		geoJson: HomeType.GeoJsonType;
		mk: string,
		nfId?: string,
		ntId?: string,
		type: string,
		plantCode?: string,
		plantName?: string,
		adName?: string,
		planterId?: string,
		planterName?: string,

	}

	interface LegendEntry {
		layoutId?: string, // 布局id
		layoutType?: string, // 布局类型0：农田，1：农房
		layoutKey?: string, // 树节点唯一key
		layoutFilling?: string, // 填充
		layoutFrame?: string, // 边框
		layoutFrameWidth?: string, // 边框width
		layoutValue?: string,
	}
	type SideBarSearchResultType = {
		list: {
			plantName: string,
			plantCode: string,
			adName: string,
			list: { geoJson: GeoJsonType }[]
		}[],
	}
} 
