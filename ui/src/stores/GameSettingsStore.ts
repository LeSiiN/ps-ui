import type { IGameSettings } from './../interfaces/IGameSettings';
import { writable, type Writable } from 'svelte/store';
import type { GamesEnum } from 'src/enums/GamesEnum';

export const gameSettings: Writable<IGameSettings> = writable({});
export const currentGameActive: Writable<GamesEnum> | undefined = writable();
