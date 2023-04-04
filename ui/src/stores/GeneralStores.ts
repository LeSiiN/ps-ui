import { UIComponentsEnum } from './../enums/UIComponentsEnum';
import { writable, type Writable } from 'svelte/store';
import { currentGameActive } from './GameLauncherStore';

export const showComponent: Writable<UIComponentsEnum | string> = writable(
	UIComponentsEnum.Game
);

export const showUi: Writable<boolean> = writable(true);

export function hideUi(): void {
	showUi.set(false);
	showComponent.set(undefined);
	currentGameActive.set(undefined);
}
