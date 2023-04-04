import type { IImage } from './../src/interfaces/IImage';
export default function mockEventCall(data: unknown = {}) {
	window.dispatchEvent(new MessageEvent('message', { data }));
}

export function newMemoryGameMock() {
	setTimeout(() => {
		mockEventCall({
			action: 'newMemoryGame',
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
				url: 'https://i.ytimg.com/vi/1I_AWK_BCRc/maxresdefault.jpg',
			},
		});
	}, 100);
}
