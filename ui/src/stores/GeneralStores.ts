import { UIComponentsEnum } from './../enums/UIComponentsEnum';
import { writable, type Writable } from 'svelte/store';
import { GamesEnum } from './../enums/GamesEnum';
import { memoryGameSettingsStore } from './GameSettingsStore';

export const showComponent: Writable<UIComponentsEnum> = writable(
	UIComponentsEnum.Connecting
);

export const showUi: Writable<boolean> = writable(true);

export function hideUi(): void {
	showUi.set(false);
	showComponent.set(undefined);
}

export function setupGame(data): void {
	switch (data.game) {
		case GamesEnum.MemoryGame:
			showComponent.set(UIComponentsEnum.MemoryGame);
			memoryGameSettingsStore.set({
				gameTime: data.game.gameTime,
				amountOfAnswers: data.game.amountOfAnswers,
				maxAnswersIncorrect: data.game.maxAnswersIncorrect,
				triggerEvent: data.game.maxAnswersIncorrect,
			});
	}
}
