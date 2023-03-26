<script lang="ts">
	import { showComponent } from './../stores/GeneralStores';
	import { onDestroy, onMount } from 'svelte';
	import fetchNui from './../../utils/fetch';
	import Skull from './../assets/svgs/Skull.svelte';
	import { memoryGameSettingsStore } from './../stores/GameSettingsStore';
	import type { IGameSettings } from './../interfaces/IGameSettings';

	const skullColor: string = '#02f1b5';

	let gameContainer: HTMLDivElement;
	let inputs: NodeListOf<HTMLDivElement>;
	let correctInputs: Array<HTMLDivElement> = [];
	let answer: Array<string> = [];
	let gameTime: number = 0;
	let answersCorrect: number = 0;
	let answersIncorrect: number = 0;
	let maxAnswersIncorrect: number;
	let amountOfAnswers: number;
	let gameActive: boolean;
	let hackSuccess: boolean;

	function resetGame(): void {
		answer = [];
		answersCorrect = 0;
		answersIncorrect = 0;
		correctInputs = [];
		hackSuccess = false;
		gameActive = false;
		gameContainer.innerHTML = '';
	}

	onMount(() => {
		setupGame();
	});

	async function setupGame(): Promise<void> {
		gameActive = true;

		await setupGameSettings();
		await addSquares();
		await generateAnswer();
		await setCorrectAnswers();
		await showAnswer();
	}

	async function setupGameSettings(): Promise<void> {
		return new Promise((resolve) => {
			memoryGameSettingsStore.subscribe((setting: IGameSettings) => {
				maxAnswersIncorrect = setting.maxAnswersIncorrect || 2;
				gameTime = setting.gameTime || 10;
				setting.triggerEvent || '';
				amountOfAnswers = setting.amountOfAnswers || 15;
			});

			resolve();
		});
	}

	/**
	 * Returns a random integer between the `min` and `max` parameters (inclusive), as a string.
	 * If the generated number already exists in the `answer` array, generate a new random number
	 * until a unique number is found.
	 *
	 * @param min - The minimum number that can be generated (inclusive).
	 * @param max - The maximum number that can be generated (inclusive).
	 * @returns A string representation of a random number between `min` and `max` (inclusive).
	 */
	function randomNumber(min: number, max: number): string {
		let number = `${Math.floor(Math.random() * (max - min) + min)}`;

		while (answer.includes(number)) {
			number = `${Math.floor(Math.random() * (max - min) + min)}`;
		}

		return number;
	}

	/**
	 * Generates 25 clickable squares and adds them to the game container.
	 * Each square has the classes 'ps-border-green', 'ps-bg-green-w-opacity', 'cursor-pointer',
	 * and 'input', and triggers the 'guessAnswer' function when clicked.
	 * Returns a Promise that resolves when the squares have been added.
	 */
	async function addSquares(): Promise<void> {
		return new Promise((resolve) => {
			for (let index = 0; index < 25; index++) {
				let input = document.createElement('div');

				input.classList.add(
					'ps-border-green',
					'ps-bg-green-w-opacity',
					'cursor-pointer',
					'input'
				);
				input.addEventListener('click', (event: PointerEvent) =>
					guessAnswer(event)
				);
				input.setAttribute('data-answer', `${index}`);

				gameContainer?.append(input);
			}

			resolve();
		});
	}

	/**
	 * Generates an array of 7 random numbers between 0 and 25, representing the positions
	 * of the correct answers in the grid. The numbers are added to the `answer` array.
	 *
	 * @returns A Promise that resolves after the `answer` array has been generated.
	 */
	async function generateAnswer(): Promise<void> {
		return new Promise((resolve) => {
			for (let answers = 0; answers < amountOfAnswers; answers++) {
				const number = randomNumber(0, 25);

				answer.push(number);
			}

			resolve();
		});
	}

	/**
	 * Handles a user's guess when they click on a square.
	 * If the guess is correct, increments the `answersCorrect` counter and checks if the game has ended.
	 * If the guess is incorrect, increments the `answersIncorrect` counter and checks if the maximum number of incorrect answers has been reached.
	 * Adds the `correctAnswers` or `incorrectAnswers` class to the clicked square depending on the guess.
	 *
	 * @param event - The click event object.
	 */
	function guessAnswer(event: any): void {
		const correctAnswer: string =
			event.target.attributes.getNamedItem('data-correct').value;

		if (correctAnswer === 'true') {
			answersCorrect++;

			if (answersCorrect === answer.length) {
				endGame(true);
			}
			event.target.classList.add('correctAnswers');
		}

		if (correctAnswer === 'false') {
			answersIncorrect++;

			if (answersIncorrect == maxAnswersIncorrect) {
				endGame(false);
			}

			event.target.classList.add('incorrectAnswers');
		}
	}

	/**
	 * Finds all HTML elements with the class 'input' and adds a 'data-correct' attribute
	 * with the value 'true' to those that have a 'data-answer' attribute that matches
	 * one of the values in the 'answer' array.
	 *
	 * @returns A Promise that resolves when the correct answers have been marked.
	 */
	async function setCorrectAnswers(): Promise<void> {
		return new Promise((resolve) => {
			inputs = document.querySelectorAll('.input');

			inputs.forEach((input: HTMLDivElement) => {
				if (answer.includes(input.getAttribute('data-answer'))) {
					input.setAttribute('data-correct', 'true');
					correctInputs.push(input);
				} else {
					input.setAttribute('data-correct', 'false');
				}
			});

			resolve();
		});
	}

	/**
	 * Adds a CSS class to the HTML elements in the `correctInputs` array, causing them to be
	 * styled as correct answers for a short time. Then removes the CSS class after a delay
	 * of 2 seconds and resolves a Promise. Used to show the correct answers to the user.
	 *
	 * @returns A Promise that resolves after the correct answers have been shown and the
	 * CSS class has been removed.
	 */
	async function showAnswer(): Promise<void> {
		return new Promise((resolve) => {
			setTimeout(() => {
				correctInputs.forEach((input: HTMLDivElement) => {
					input.classList.add('correctAnswers');
				});

				setTimeout(() => {
					correctInputs.forEach((input: HTMLDivElement) => {
						input.classList.remove('correctAnswers');
					});

					resolve();
				}, 1000);
			}, 200);
		});
	}

	function endGame(success: boolean): void {
		hackSuccess = success;
		gameActive = false;

		setTimeout(() => {
			showComponent.set(undefined);
			fetchNui('memorygame-callback', { success: success });
		}, 2000);

		resetGame();
	}

	// Remove all event listeners attached to the input elements to prevent memory leaks
	onDestroy(() => {
		requestAnimationFrame(() => {
			inputs.forEach((input: HTMLDivElement) => {
				input.removeEventListener(null, null);
			});
		});
	});
</script>

<div class="flex items-center justify-center min-h-screen ">
	<div
		class="flex items-center flex-col w-[500px]  ps-bg-darkblue p-10 shadow-lg shadow-black"
	>
		<div class="w-[20%]">
			<Skull color={skullColor} />
		</div>
		<h1 class="ps-font-arcade text-white text-xl mt-5">Memory Minigame</h1>
		<p class="ps-text-lightgrey mt-5">
			Lorem ipsum dolor sit, amet consectetur adipisicing elit. Harum quia
			quidem eos soluta voluptatem ipsum, voluptates repudiandae! Dolorum
			facere, aperiam, dolores inventore, odio perspiciatis animi non
			quibusdam quidem minus libero?
		</p>
		<p class="ps-text-lightgrey mt-5">Some description</p>
		{#if gameActive}
			<div
				class="h-[440px] w-[440px] mt-14 grid grid-cols-5 grid-rows-5 gap-x-[10px] gap-y-[10px]"
				bind:this={gameContainer}
			/>
		{/if}
		{#if !gameActive}
			<div class="flex flex-1 items-center justify-center self-stretch">
				{#if hackSuccess === true}
					<h1 class="ps-font-arcade text-white text-xl mt-5">
						System successfully hacked
					</h1>
				{:else}
					<h1 class="ps-font-arcade text-white text-3xl mt-5">
						Firewall won
					</h1>
				{/if}
			</div>
		{/if}
	</div>
</div>

<style>
	:global(.correctAnswers) {
		background-color: var(--color-green) !important;
		pointer-events: none;
	}

	:global(.incorrectAnswers) {
		background-color: red !important;
		pointer-events: none;
	}
</style>
