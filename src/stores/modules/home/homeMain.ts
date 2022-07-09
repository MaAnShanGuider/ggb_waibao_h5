import { observable, action, computed, makeAutoObservable } from 'mobx';

const homeMain = makeAutoObservable({
	id: "0101",
	showLoding: false,
	currentTools: null,
	mapLayers: [],
	selectedMapLayers: {}, // 侧边栏勾选的图层
	navigatorLayers: null, // 导航图层
	nodeTime: [], // 时间节点列表
	currentNodeTime: {}, // 当前时间节点
	defaultNavigator: {}, // 默认导航中心点
	comparedTimeInfo: null, // 数据对比的对比时间段
	searchLayers: null, // 侧边栏搜索图层
	// 默认-2，都没勾选
	footerTimeLineSettingsStatus: -2, // -3: 只勾选矢量联动  -2: 都没勾选 -1: 都勾选  0: 只勾选减少   1: 只勾选新增
	get newData() {
		return "xxx-aaa" + this.id;
	},
	changeFooterTimeLineSettingsStatus: action(function (value) {
		
		if (this.comparedTimeInfo != null) {
			if (value == "1" || value == "0") {
				this.comparedTimeInfo = { // 这里只是组装参数
					...this.comparedTimeInfo,
					status: value,
				};
			// } else if (value == "-1") {
			} else {
				this.comparedTimeInfo = {
					tm1: this.comparedTimeInfo.tm1,
					tm2: this.comparedTimeInfo.tm2,
				};
			}
		}
		
		this.footerTimeLineSettingsStatus = value;

	}),
	changeSearchLayers: action(function (value) {
		this.searchLayers = value;
	}),

	changeLodingTrue: action(function () { 
		
		this.showLoding = true;
	}),
	changeLodingFalse: action(function () { 
		this.showLoding = false;
	}),
	changeData: action(function (value) {
		// console.log(this);
		this.id = value;
	}),
	changeCurrentTools: action(function (value) {
		this.currentTools = value;
	}),
	changeMapLayers: action(function (value) {
		this.mapLayers = value;
	}),
	changeSelectedMapLayers: action(function (value) {
		this.selectedMapLayers = value;
	}),
	changeNavigatorLayers: action(function (value) {
		this.navigatorLayers = value;
	}),
	changeNodeTime: action(function (value) {
		this.nodeTime = value;
	}),
	changeCurrentNodeTime: action(function (value) {
		this.currentNodeTime = value; 
	}),
	changeDefaultNavigator: action(function (value) {
		this.defaultNavigator = value;
	}),
	changeComparedTimeInfo: action(function (value) {
		this.comparedTimeInfo = value;
	}),
});

export default homeMain;
