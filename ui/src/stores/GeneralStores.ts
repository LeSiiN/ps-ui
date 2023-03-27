import { UIComponentsEnum } from './../enums/UIComponentsEnum';
import { writable, type Writable } from 'svelte/store';
import { GamesEnum } from './../enums/GamesEnum';
import { gameSettings } from './GameSettingsStore';

export const showComponent: Writable<UIComponentsEnum | string> = writable(
	UIComponentsEnum.Connecting
);

export const showUi: Writable<boolean> = writable(true);

export function hideUi(): void {
	showUi.set(false);
	showComponent.set(undefined);
}

export function setupGame(data): void {
	const game = data.data;

	switch (data.data.game) {
		case GamesEnum.MemoryGame: {
			gameSettings.set({
				game: 'MemoryGame',
				gameTime: game.gameTime || 10,
				amountOfAnswers: game.amountOfAnswers || 15,
				maxAnswersIncorrect: game.maxAnswersIncorrect || 2,
				triggerEvent: game.triggerEvent || 'memorygame-callback',
			});
		}
	}
}
