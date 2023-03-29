import type { IGameSettings } from './../interfaces/IGameSettings';
import { writable, type Writable } from 'svelte/store';
import type { GamesEnum } from 'src/enums/GamesEnum';
import type { ConnectingGameMessageEnum } from './../enums/GameConnectionMessages';

export const gameSettings: Writable<IGameSettings> = writable({});
export const currentGameActive: Writable<GamesEnum> | undefined = writable();
export const connectionText: Writable<ConnectingGameMessageEnum> = writable();
export const showLoading: Writable<boolean> = writable();
