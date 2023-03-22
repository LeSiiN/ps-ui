import { UIComponentsEnum } from './../enums/UIComponentsEnum';
import { writable, type Writable } from 'svelte/store';

export const showComponent: Writable<UIComponentsEnum> = writable(
	UIComponentsEnum.Input
);

export const showUi: Writable<boolean> = writable(true);

export function hideUi(): void {
	showUi.set(false);
	showComponent.set(undefined);
}
