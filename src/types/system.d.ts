declare namespace SystemType {

	interface ListResponse<T> {
		list?: T;
		rows?: T;
		total?: number;
		code?: number;
		msg?: string;
	}

	interface DictEntry {
		createBy?: string;
		createTime?: string;
		create_time?: string;
		dict_name?: string;
		dict_sort?: string;
		dict_type?: string;
		dict_uuid?: string;
		remark?: string;
		searchValue?: string;
		updateBy?: string;
		updateTime?: string;
	}

	interface DictItemEntry {
		bz?: string;
		createBy?: string;
		createTime?: string;
		create_time?: string;
		dict_label?: string;
		dict_sort?: string;
		dict_type?: string;
		dict_value?: string;
		dict_value_uuid?: string;
		remark?: string;
		searchValue?: string;
		updateBy?: string;
		updateTime?: string;
	}

	interface MenuEntry {
		children?: MenuEntry[];
		component?: string;
		createBy?: string;
		createTime?: string;
		icon?: string;
		isCache?: string;
		isFrame?: string;
		menuId?: number;
		menuName?: string;
		menuType?: string;
		orderNum?: string;
		parentId?: number;
		parentName?: string;
		path?: string;
		perms?: string;
		remark?: string;
		searchValue?: string;
		status?: string;
		updateBy?: string;
		updateTime?: string;
		visible?: string;
	}

	interface RoleEntry {
		admin?: boolean;
		createBy?: string;
		createTime?: string;
		dataScope?: string;
		delFlag?: string;
		deptCheckStrictly?: boolean;
		deptIds?: string;
		flag?: boolean;
		menuCheckStrictly?: boolean;
		menuIds?: string;
		remark?: string;
		roleGroupId?: number;
		roleId?: number;
		roleKey?: string;
		roleName?: string;
		roleSort?: number;
		searchValue?: string;
		status?: string;
		updateBy?: string;
		updateTime?: string;
	}

	interface GroupEntry {
		ancestors?: string;
		children?: GroupEntry[];
		children_role?: RoleEntry[];
		createBy?: string;
		createTime?: string;
		delFlag?: string;
		orderNum?: number;
		parentName?: string;
		remark?: string;
		roleGroupId?: number;
		roleGroupName?: string;
		roleGroupParentId?: number;
		searchValue?: string;
		status?: number;
		updateBy?: string;
		updateTime?: string;
	}

	interface AllRoleEntry {
		group_list?: GroupEntry[];
		role_list?: RoleEntry[];
	}

	interface DeptEntry {
		// ancestors: null
		children?: DeptEntry[];
		createBy?: string;
		createTime?: string;
		delFlag?: string;
		deptId?: number;
		deptName?: string;
		email?: string;
		leader?: string;
		orderNum?: number;
		parentId?: number;
		parentName?: string;
		phone?: string;
		remark?: string;
		searchValue?: string;
		status?: string;
		updateBy?: string;
		updateTime?: string;

		id?: number;
		label?: string;
		name?: string;
	}

	interface UserEntry {
		admin?: boolean;
		avatar?: string;
		createBy?: string;
		createTime?: string;
		delFlag?: string;
		dept?: DeptEntry;
		deptId?: number;
		email?: string;
		findRoleID?: number;
		// is_forbidden: null
		loginDate?: string;
		loginIp?: string;
		nickName?: string;
		oldPassword?: string;
		phonenumber?: string;
		// postIds: null
		remark?: string;
		// roleIds: null
		// roles: []
		salt?: string;
		searchValue?: string;
		sex?: string;
		status?: string;
		updateBy?: string;
		updateTime?: string;
		userId?: number;
		userName?: string;
		userUuid?: string;
	}

	interface UserInfoEntry {
		roleIds?: number[];
		roles?: RoleEntry[];
		userinfo?: UserEntry;
	}

	interface AreaEntry {
		area_regions?: {
			area_code?: string;
			area_name?: string;
		}[];
	}

}
