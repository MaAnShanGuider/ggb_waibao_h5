import { CreatePortal } from "@views/_common/portal";
import React, { useState, useEffect, } from "react";
import type { PortalProps } from "@views/_common/portal/typings";
import useStores from "@extends/hooks/useStores";
import { observer } from "mobx-react";
import Draggable from "@views/_common/draggable/Draggable";
import { CloseOutlined } from "@ant-design/icons";
import { Button, Form, Select, Table, Tooltip } from "antd";
import { ntComparedLayersPost, ntDiffDataGet } from "@apis/home";
import { ColumnsType } from "antd/lib/table/interface";
import { cloneDeep } from "lodash";

interface ComparedProps extends PortalProps {
}

const { Option } = Select;

const tableTitleEnum = {
	"0": "",
	"1": "新增全部",
	"2": "新增违建",
	"3": "减少全部",
	"4": "减少违建",
};
const Compared: React.FC<ComparedProps> = observer(({ onClose, onSure, }) => {

	const { homeMain } = useStores();
	const [form] = Form.useForm();

	const [info, setInfo] = useState<HomeType.ComparedModalType[]>([]);
	const [tm, setTm] = useState({ tm1: null, tm2: null });
	const [showTable, setShowTable] = useState<boolean>(false);
	const [page, setPage] = useState<Record<string, any>>({
		pageNum: 1,
		total: 0,
		type: 0,
		plantName: "",
		pageSize: 500,
		status: 0,
	});
	const [listInfo, setListInfo] = useState<HomeType.ComparedModalListInfoType[]>([]);
	const [tm1ListInfo, setTm1ListInfo] = useState([]);
	const [tm2ListInfo, setTm2ListInfo] = useState([]);
	const [disableTm2, setDisableTm2] = useState(true);
	const [tempStatus, setTempStatus] = useState(-2);
	const [clickRow, setClickRow] = useState<any>('');
	const handleNavigator = (geoJson, index) => {
		setClickRow(index);
		homeMain.changeNavigatorLayers({
			geoJson,
		});
	};
	const columns: ColumnsType<HomeType.ComparedModalListInfoType> = [
		{
			title: '序号',
			width: "56px",
			key: 'wodiu',
			align: 'center',
			dataIndex: "wodiu",
			render: (text, record, index) => <span>{index + 1}</span>,
		},
		{
			title: '地块编号',
			dataIndex: 'ntCode',
			key: 'ntCode',
			ellipsis: {
				showTitle: false,
			},
			render: text => (
				<Tooltip placement="topLeft" title={text}>
					{text}
				</Tooltip>
			),
			// render: (text, record, index) => {
			// 	return (
			// 		<div style={{ width: "144px" }} title={text} className="g-line-1">{text}</div>
			// 	);
			// },
		},
		{
			title: '面积(亩)',
			dataIndex: 'area',
			width: "80px",
			key: 'area',
			align: 'right',
			render: (text, record, index) => <span>{text}</span>,
		},
		{
			title: '坐落',
			dataIndex: 'adName',
			key: 'adName',
			width: "80px",
			render: (text, record, index) => <span>{text}</span>,
		},
		{
			title: '操作',
			key: 'operation',
			width: "80px",
			dataIndex: 'operation',
			render: (text, record, index) => {
				return (
					<span onClick={() => handleNavigator(record.geoJson, index)} className="g-c-blue g-pointer">查看</span>
				);
			},
		},
	];
	const handleChange = (tmType, v) => {
		if (tmType == "tm1") {

			setTm2ListInfo((tm2Info) => {
				let temp = homeMain.nodeTime.filter(ele => new Date(ele.value).getTime() > new Date(v).getTime());

				return temp;
			});
			setDisableTm2(false); // 运行tm2点击
			return;
		}
		if (tmType == "tm2") {
			setTm1ListInfo((tm1Info) => {
				let temp = homeMain.nodeTime.filter(ele => new Date(ele.value).getTime() <= new Date(v).getTime());

				return temp;
			});
			return;
		}
	};

	// useEffect(() => { },)
	const handleRequestList = (type, _pageNum, plantName = null, status = 1) => {
		// console.log(page.pageSize);

		ntDiffDataGet({
			tm1: tm.tm1,
			tm2: tm.tm2,
			plantCode: type,
			pageSize: page.pageSize,
			pageNum: _pageNum,
			status,
		}).then((res) => {
			console.log(res.data.showPits);

			setListInfo(res.data.showPits);
			setPage({
				status,
				pageNum: _pageNum,
				total: res.data.showPitsNum,
				pageSize: page.pageSize,
				type,
				plantName: plantName ?? page.plantName,
			});
		}).catch(error => {
			console.error(error);
		});
	};
	const handleInitRequest = (type, plantName, status) => {
		setShowTable(true);
		let pages = cloneDeep(page);
		pages.status = status;
		pages.plantName = plantName;
		// console.log(pages);

		setPage(pages);
		handleRequestList(type, 1, plantName, status);
	};
	const onFinish = (values: any) => {
		/**
		 * 这里会存在一个估计他们也发现不了的bug，就是这边改变了状态之后，
		 * 底部的时间节点设置还会是之前的，
		 */
		homeMain.changeFooterTimeLineSettingsStatus(-1);

		let params = { tm1: null, tm2: null };

		if (values.tm1 < values.tm2) {
			params.tm1 = values.tm1;
			params.tm2 = values.tm2;
		} else {
			params.tm1 = values.tm2;
			params.tm2 = values.tm1;
		}
		setTm(params);
		ntComparedLayersPost(values).then((res) => {
			homeMain.changeComparedTimeInfo(values);
			setInfo(res.data);

		}).catch(error => {
			console.error(error);
		});
	};
	const handleFormChange = (chagnedValues, allValues) => {
		console.log(chagnedValues, allValues);
	};
	const onFinishFailed = (errorInfo: any) => {
		console.log('Failed:', errorInfo);
	};
	useEffect(() => {
		if (homeMain.nodeTime.length > 0) {
			setTm1ListInfo(() => {
				let temp = homeMain.nodeTime.slice(0, homeMain.nodeTime.length - 1); // 不给最后一位
				return temp;
			});
			setTm2ListInfo(() => {
				let temp = homeMain.nodeTime.slice(1); // 不给第一位
				return temp;
			});
		}
	}, [homeMain.nodeTime]);
	useEffect(() => {
		// 记录footer的临时状态，等关闭后，又给他恢复
		setTempStatus(homeMain.footerTimeLineSettingsStatus);
		return () => {
			console.log("移出事件");
		};
	}, []);
	const handleClose = () => {

		homeMain.changeFooterTimeLineSettingsStatus(tempStatus);
		onSure();
	};
	const getRowClassName = (record, index) => {
		// const clickRow = this.state.clickRow;
		// console.log(record);

		let className = 'normal';
		if (index === clickRow) {
			// console.log("测试", record);

			// const geoJson = JSON.parse(record.geoJsonStr.replace(/\\/g, ""));
			// setMyGeoJson(geoJson);
			className = 'selectTr';
		}

		return className;
	};
	const onClickTab = (record, rowkey) => {
		// console.log(rowkey);
		// const geoJson = JSON.parse(record.geoJsonStr.replace(/\\/g, ""));
		// setMyGeoJson(geoJson);
		// setClickRow(rowkey);
	};
	return (
		<Draggable width={456}>
			<div className="v-home-main-tools-compared-modal ">
				<div className=" __drage-title g-pd-l-13 g-pd-r-6 v-home-main-tools-common-header g-flex g-jc-sb g-ai-c">
					<span className="g-fs-14 g-c-white">数据对比</span>
					<CloseOutlined style={{ color: "white" }} onClick={handleClose} />
				</div>
				<div className=" v-home-main-tools-common-content  compared-modal-content g-flex g-fd-c g-pd-lr-12 g-pd-b-12 g-pd-t-12">
					<Form
						name="homeMainComparedModdalForm"
						labelCol={{ span: 8 }}
						form={form}
						wrapperCol={{ span: 16 }}
						initialValues={{}}
						onFinish={onFinish}
						layout="inline"
						onFinishFailed={onFinishFailed}
						autoComplete="off"
						key="ceshi"
						onValuesChange={handleFormChange}
					>
						<div className="g-fs-14 g-tc g-lh-32 g-m-r-8">更新时间</div>
						<Form.Item
							label=""
							name="tm1"
							rules={[{ required: true, message: '请选择时间' }]}
						>
							<Select
								style={{ width: 122 }}
								onChange={(e) => {
									handleChange("tm1", e);
									form.setFieldsValue({
										tm2: ''
									});
								}}
								getPopupContainer={() => document.body}
							>
								{
									tm1ListInfo.map((ele) => {
										return <Option key={ele.value} value={ele.value}>{ele.label}</Option>;
									})
								}
							</Select>
						</Form.Item>
						<div className="g-fs-14 g-tc g-lh-32 g-m-r-12">至</div>
						<Form.Item
							label=""
							name="tm2"
							rules={[{ required: true, message: '请选择时间' }]}
						>
							<Select
								style={{ width: 122 }}
								disabled={disableTm2}
								// onChange={(e) => handleChange("tm2", e)}

								getPopupContainer={() => document.body}
							>
								{
									tm2ListInfo.map((ele) => {
										return <Option key={ele.value} value={ele.value}>{ele.label}</Option>;
									})
								}
							</Select>

						</Form.Item>
						<Form.Item>
							<Button type="primary" htmlType="submit" size="small">
								查询
							</Button>
						</Form.Item>
					</Form>
					{info.length == 0
						&& <div className="g-m-t-32 g-tc g-ai-c g-c-c33 g-flex g-fd-c" style={{ border: 'none' }}>
							<img width={75} height={77} src={require("../../../../assets/images/zanwu.png")} alt="" />
							<span className="g-m-t-12">暂无数据!</span>
						</div>
					}
					{info.length != 0
						&& <div className="compared-modal-content-list g-m-t-12">
							{
								info.map((ele, index) => {
									return (
										<div key={'sn' + index} className="compared-modal-content-item g-c-cdd g-pd-t-12">
											<div>
												<span>{ele.plantName}</span>
												<span onClick={() => handleInitRequest(ele.plantCode, ele.plantName, 1)} className="g-c-blue g-pointer g-m-lr-12">[增加明细]</span>
												<span onClick={() => handleInitRequest(ele.plantCode, ele.plantName, 2)} className="g-c-blue g-pointer">[减少明细]</span>
											</div>
											<div className="g-flex g-pd-l-36">
												<div className="g-relative g-col">
													<div>
														<span>增加面积:</span>
														<span className="g-c-main6 g-m-l-6">{ele.newArea}亩</span>
													</div>
													<div>
														<span>增加数量:</span>
														<span className="g-c-main6 g-m-l-6">{ele.newNum}块</span>
													</div>
												</div>
												<div className="g-relative g-col">
													<div>
														<span>减少面积:</span>
														<span className="g-c-main6 g-m-l-6">{ele.reduceArea}亩</span>
													</div>
													<div>
														<span>减少数量:</span>
														<span className="g-c-main6 g-m-l-6">{ele.reduceNum}块</span>
													</div>
												</div>
											</div>
										</div>
									);
								})
							}
						</div>
					}

					{
						page.status > 0
							? (
								<div className="g-fs-16 g-fwt-b g-lh-32 g-c-c33 g-m-t-12">{page.plantName}-{page.status == 1 ? '增加明细' : '减少明细'}</div>

							) : null

					}
					{
						showTable
							? <Table
								size="small"
								rowKey="nfId"
								dataSource={listInfo}
								columns={columns}
								scroll={{ y: 240 }}
								pagination={false}
								rowClassName={getRowClassName}
								onRow={(record, rowkey) => {
									// console.log(rowkey);
									return {
										// 点击行 record 指的本行的数据内容，rowkey指的是本行的索引
										onClick: onClickTab.bind(this, record, rowkey)
									};
								}}
								// pagination={{
								// 	current: page.pageNum,
								// 	total: page.total,
								// 	size: "small",
								// 	// defaultPageSize: 5,
								// 	// pageSizeOptions: [5, 10, 20],
								// 	hideOnSinglePage: false,
								// 	showSizeChanger: false,
								// 	onChange(_page, pageSize) {
								// 		console.log(pageSize);

							// 		let p = cloneDeep(page);
							// 		p.pageSize = pageSize;
							// 		setPage(p);
							// 		handleRequestList(page.type, _page, page.plantName, page.status);
							// 	},
							// }}
							/>
							: null
					}
				</div>
			</div>
		</Draggable>
	);
});

const ComparedModal = new CreatePortal<ComparedProps>(Compared, { trasitionType: "slide", zIndex: '1', getContainer: ".v-home-main" });

export default ComparedModal;