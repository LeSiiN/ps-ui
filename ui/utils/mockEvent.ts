import type { IImage } from './../src/interfaces/IImage';
export default function mockEventCall(data: unknown = {}) {
	window.dispatchEvent(new MessageEvent('message', { data }));
}

export function newMemoryGameMock() {
	setTimeout(() => {
		mockEventCall({
			action: 'MemoryGame',
			data: {
				game: 'MemoryGame',
				amountOfAnswers: 1,
				gameTime: 5,
				maxAnswersIncorrect: 2,
				triggerEvent: '',
			},
		});
	}, 100);
}

export function showImageMock() {
	setTimeout(() => {
		mockEventCall({
			action: 'ShowImage',
			data: {
				show: true,
				url: 'https://i.ytimg.com/vi/7V15_-32iCU/maxresdefault.jpg',
			},
		});
	}, 100);
}
