import { writable, type Writable } from 'svelte/store';
import type { IStatusBar } from './../interfaces/IStatusBar';
import type { UIComponentsEnum } from './../enums/UIComponentsEnum';

export const showComponent: Writable<UIComponentsEnum> = writable();

export const statusBarStore: Writable<IStatusBar> = writable({
	title: '',
	description: '',
	items: [],
});

export const showUi: Writable<boolean> = writable(true);
