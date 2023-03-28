import { UIComponentsEnum } from './../enums/UIComponentsEnum';
import { writable, type Writable } from 'svelte/store';
import { GamesEnum } from './../enums/GamesEnum';
import { currentGameActive, gameSettings } from './GameSettingsStore';

export const showComponent: Writable<UIComponentsEnum | string> = writable(
	UIComponentsEnum.Connecting
);

export const showUi: Writable<boolean> = writable(true);

export function hideUi(): void {
	showUi.set(false);
	showComponent.set(undefined);
	currentGameActive.set(undefined);
}

export function setupGame(data): void {
	currentGameActive.set(GamesEnum.MemoryGame);
	const game = data.data;

	switch (data.data.game) {
		case GamesEnum.MemoryGame: {
			gameSettings.set({
				game: 'MemoryGame',
				gameTime: game.gameTime,
				amountOfAnswers: game.amountOfAnswers,
				maxAnswersIncorrect: game.maxAnswersIncorrect,
				triggerEvent: game.triggerEvent || 'memorygame-callback',
			});
		}
	}
}
