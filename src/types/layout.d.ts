declare namespace LayoutType {
	interface menuHeaderEntry {
		label: string,
		path: string,
		// xiugaile
		children?: LayoutType.menuEntry[],
	}
	interface menuEntry {
		show?: boolean;
		label: string,
		path: string,
		tag: string,
		icon?: string,
		children?: menuEntry[],
	}

	interface currentHeaderTagEntry {
		current: string,
		setCurrent?: React.Dispatch<React.SetStateAction<string>>
	}
}
