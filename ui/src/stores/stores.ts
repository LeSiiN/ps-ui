import { ComponentsEnum } from './../enums/components';
import { writable, type Writable } from 'svelte/store';

export const component: Writable<ComponentsEnum | undefined> = writable(
	ComponentsEnum.StatusBar
);
