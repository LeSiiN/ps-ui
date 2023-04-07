import type { UIComponentsEnum } from './../enums/UIComponentsEnum';
import { writable, type Writable } from 'svelte/store';
import { currentGameActive } from './GameLauncherStore';

export const showComponent: Writable<UIComponentsEnum | string> = writable();

export const showUi: Writable<boolean> = writable();

export function hideUi(): void {
	showUi.set(false);
	showComponent.set(undefined);
	currentGameActive.set(undefined);
}
