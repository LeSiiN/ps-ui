import { UIComponentsEnum } from '../enums/UIComponentsEnum';
import { GamesEnum } from '../enums/GamesEnum';
import { ConnectingGameMessageEnum } from '../enums/GameConnectionMessages';
import { showComponent } from './GeneralStores';
import type { IGameSettings } from './../interfaces/IGameSettings';
import { writable, type Writable } from 'svelte/store';

export const gameSettings: Writable<IGameSettings> = writable({
	game: '',
	amountOfAnswers: 0,
	gameTime: 0,
	maxAnswersIncorrect: 0,
	triggerEvent: '',
});
export const currentGameActive: Writable<GamesEnum> | undefined = writable();
export const connectionText: Writable<ConnectingGameMessageEnum> = writable();
export const showLoading: Writable<boolean> = writable();

export function setupGame(data): void {
	showComponent.set(UIComponentsEnum.Game);

	const game = data.data;

	switch (data.data.game) {
		case GamesEnum.MemoryGame: {
			currentGameActive.set(GamesEnum.MemoryGame);
			connectionText.set(ConnectingGameMessageEnum.Connecting);

			gameSettings.set({
				game: GamesEnum.MemoryGame,
				gameTime: game.gameTime || 2,
				amountOfAnswers: game.amountOfAnswers || 15,
				maxAnswersIncorrect: game.maxAnswersIncorrect || 2,
				triggerEvent: game.triggerEvent || 'memorygame-callback',
			});
		}
	}
}
