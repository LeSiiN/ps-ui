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
