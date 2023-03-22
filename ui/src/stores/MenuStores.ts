import type { IMenu } from './../interfaces/IMenu';
import { writable, type Writable } from 'svelte/store';

export const menuStore: Writable<Array<IMenu>> = writable([
	{
		header: 'Menu item',
		text: 'Some text',
		icon: 'fa-solid fa-user',
		color: 'white',
		subMenu: false,
	},
	{
		header: 'Submenu',
		icon: 'fa-solid fa-user',
		color: 'white',
		subMenu: true,
	},
]);

export const menuIdShown: Writable<string> = writable();

export function setupMenu(data: Array<IMenu>): void {
	menuStore.set(data);
}
