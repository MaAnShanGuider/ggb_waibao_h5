import {
	equals,
	filter,
	find,
	findIndex,
	isEmpty,
	last,
	map,
	mergeRight,
	pick,
	length,
	append,
	slice,
	pipe,
	not,
	curry,
	ifElse,
	is,
} from 'ramda';
import { useNavigate } from 'react-router-dom';
import type { NavigateFunction } from 'react-router-dom';

// eslint-disable-next-line no-shadow
export enum ActionType {
	del = 'DEL',
	add = 'ADD',
	update = 'UPDATE',
	clear = 'CLEAR',
}

export interface ViewDto {
	key: string
	title: string
	name: string
}

interface ActionDelDto {
	key: string
	activeKey?: string
	navigate: NavigateFunction
}
interface ActionDel {
	type: ActionType.del
	payload: ActionDelDto
}

interface ActionClear {
	type: ActionType.clear
	payload: undefined
}
interface ActionTypeAddPayload {
	key: string
	title: string
	name: string
	selectedKeys: string[]
}
interface ActionAdd {
	type: ActionType.add
	payload: ActionTypeAddPayload
}
interface ActionUp {
	type: ActionType.update
	payload: Partial<ViewDto> | ViewDto[]
}
const isArray = is(Array);
function delKeepAlive(keepAliveList: Array<ViewDto>, { key, navigate, activeKey }: ActionDelDto) {
	const index = findIndex((item) => equals(item.key, key), keepAliveList);
	if (equals(index, -1)) {
		return keepAliveList;
	}
	let pathname = '';
	if (length(keepAliveList) > 1) {
		const data = keepAliveList[index];
		// 如果删除是  当前渲染  需要移动位置
		if (data && equals(data.key, activeKey)) {
			// 如果是最后一个 那么  跳转到上一个
			if (equals(index, keepAliveList.length - 1)) {
				pathname = keepAliveList[index - 1].key;
			} else {
				// 跳转到最后一个
				pathname = last(keepAliveList)?.key ?? '';
			}
		}
	}
	if (!isEmpty(pathname)) {
		navigate({ pathname });
	}
	return filter((item) => !equals(item.key, key), keepAliveList);
}
function addKeepAlive(state: Array<ViewDto>, matchRouteObj: ActionTypeAddPayload) {
	if (state.some((item) => equals(item.key, matchRouteObj.key))) {
		return state;
	}
	return append(
		pick(['key', 'title', 'name'], matchRouteObj),
		length(state) >= 10 ? slice(1, length(state), state) : state
	);
}
const updateKeepAlive = curry((state: Array<ViewDto>, keepAlive: Partial<ViewDto>) => {
	return map((item) => (equals(item.key, keepAlive.key) ? mergeRight(item, keepAlive) : item), state);
});
const updateKeepAliveList = curry((state: Array<ViewDto>, keepAlive: Array<ViewDto>) => {
	return map((item) => {
		const data = find((res) => equals(res.key, item.key), keepAlive);
		if (data) {
			item = mergeRight(item, data ?? {});
		}
		return item;
	}, state);
});
export type Action = ActionDel | ActionAdd | ActionClear | ActionUp
export const reducer = (state: Array<ViewDto>, action: Action): ViewDto[] => {
	switch (action.type) {
		case ActionType.add:
			return addKeepAlive(state, action.payload);
		case ActionType.del:
			return delKeepAlive(state, action.payload);
		case ActionType.clear:
			return [];
		case ActionType.update:
			return ifElse(isArray, updateKeepAliveList(state), updateKeepAlive(state))(action.payload) as any;
		default:
			return state;
	}
};