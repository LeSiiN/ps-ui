import { GamesEnum } from './../src/enums/GamesEnum';
import type { IGameSettings } from './../src/interfaces/IGameSettings';

export default function mockEventCall(data: unknown = {}) {
	window.dispatchEvent(new MessageEvent('message', { data }));
}

export function newMemoryGameMock() {
	setTimeout(() => {
		mockEventCall({
			action: 'newMemoryGame',
			data: {
				game: 'MemoryGame',
				amountOfAnswers: 15,
				gameTime: 10,
				maxAnswersIncorrect: 2,
				triggerEvent: '',
			},
		});
	}, 100);
}
