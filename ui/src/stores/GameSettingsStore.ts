import type { IGameSettings } from './../interfaces/IGameSettings';
import { writable, type Writable } from 'svelte/store';

export const gameSettings: Writable<IGameSettings> = writable({});
