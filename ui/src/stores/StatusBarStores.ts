import { writable, type Writable } from 'svelte/store';
import type { IStatusBar } from '../interfaces/IStatusBar';

export const statusBarStore: Writable<IStatusBar> = writable({
	title: '',
	description: '',
	items: [],
});

export function showStatusBar(data: IStatusBar) {
	statusBarStore.set({
		title: data.title,
		description: data.description,
		items: data.items,
	});
}
