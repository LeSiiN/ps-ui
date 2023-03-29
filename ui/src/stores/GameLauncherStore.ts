import { UIComponentsEnum } from '../enums/UIComponentsEnum';
import { GamesEnum } from '../enums/GamesEnum';
import {
	connectionText,
	currentGameActive,
	gameSettings,
} from './GameSettingsStore';
import { ConnectingGameMessageEnum } from '../enums/GameConnectionMessages';
import { showComponent } from './GeneralStores';

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
