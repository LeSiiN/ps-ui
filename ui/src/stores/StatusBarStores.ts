import { writable, type Writable } from 'svelte/store';
import type { IStatusBar } from '../interfaces/IStatusBar';
import { UIComponentsEnum } from '../enums/UIComponentsEnum';
import { showUiStore } from './GeneralStores';

export const showComponent: Writable<UIComponentsEnum> = writable(
	UIComponentsEnum.Menu
);

export const statusBarStore: Writable<IStatusBar> = writable({
	title: '',
	description: '',
	items: [],
});

export function setStatusBar(data: IStatusBar) {
	statusBarStore.set({
		title: data.title,
		description: data.description,
		items: data.items,
	});

	showUiStore.set(true);
	showComponent.set(UIComponentsEnum.StatusBar);
}
