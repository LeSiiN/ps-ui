export interface IStatusBar {
	title: string;
	description: string;
	items: Array<IStatusBarItem>;
}

export interface IStatusBarItem {
	key: string;
	value: string;
}