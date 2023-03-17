import type { IMenu } from './../interfaces/IMenu';
import { writable, type Writable } from 'svelte/store';

export const menuStore: Writable<Array<IMenu>> = writable([]);
