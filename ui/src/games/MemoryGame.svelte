<script lang="ts">
	import { onMount } from 'svelte';
	import Skull from './../assets/svgs/Skull.svelte';

	const skullColor: string = '#02f1b5';

	let gameContainer: HTMLDivElement;
	let inputs: NodeListOf<HTMLDivElement>;
	let correctInputs: Array<HTMLDivElement> = [];
	let answer: Array<string> = [];

	onMount(() => {
		setupGame();
	});

	async function setupGame(): Promise<void> {
		try {
			await addSquares();
			await generateAnswer();
			await appendCorrectInputs();
			await showAnswer();
		} catch {
			console.trace("Couldn't setup game");
		}
	}

	/**
	 * Generates a random integer between 'min' (inclusive) and 'max' (exclusive) using Math.floor.
	 *
	 * @param min - The minimum value for the random number (inclusive).
	 * @param max - The maximum value for the random number (exclusive).
	 * @returns A random integer between 'min' and 'max'.
	 */
	function randomNumber(min: number, max: number): string {
		return `${Math.floor(Math.random() * (max - min) + min)}`;
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
				let element = document.createElement('div', {
					is: 'kekw',
				});

				element.classList.add(
					'ps-border-green',
					'ps-bg-green-w-opacity',
					'cursor-pointer',
					'input'
				);
				element.addEventListener('click', guessAnswer);
				element.setAttribute('data-answer', `${index}`);
				gameContainer.append(element);
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
			// Generate 7 random numbers between 0 and 25 and add them to the `answer` array
			answer.push(randomNumber(0, 2));
			answer.push(randomNumber(3, 6));
			answer.push(randomNumber(7, 10));
			answer.push(randomNumber(11, 14));
			answer.push(randomNumber(15, 18));
			answer.push(randomNumber(19, 22));
			answer.push(randomNumber(23, 25));

			resolve();
		});
	}

	function guessAnswer(): void {}

	/**
	 * Finds all HTML elements with the class 'input' and adds a 'data-correct' attribute
	 * with the value 'true' to those that have a 'data-answer' attribute that matches
	 * one of the values in the 'answer' array.
	 *
	 * @returns A Promise that resolves when the correct answers have been marked.
	 */
	async function appendCorrectInputs(): Promise<void> {
		return new Promise((resolve) => {
			inputs = document.querySelectorAll('.input');

			inputs.forEach((input: HTMLDivElement) => {
				if (answer.includes(input.getAttribute('data-answer'))) {
					input.setAttribute('data-correct', 'true');
					correctInputs.push(input);
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
			correctInputs.forEach((input: HTMLDivElement) => {
				console.trace();
				input.classList.add('correctAnswers');
			});

			setTimeout(() => {
				correctInputs.forEach((input: HTMLDivElement) => {
					input.classList.remove('correctAnswers');
				});

				resolve();
			}, 2000);
		});
	}

	function startGame(): void {}
</script>

<div class="flex items-center justify-center min-h-screen">
	<div class="flex items-center flex-col w-[500px] ps-bg-darkblue p-10">
		<div class="w-[20%] border">
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
		<div
			class="h-[440px] w-[440px] mt-14 grid grid-cols-5 grid-rows-5 gap-x-[10px] gap-y-[10px]"
			bind:this={gameContainer}
		/>
	</div>
</div>

<style>
	:global(.correctAnswers) {
		background-color: var(--color-green) !important;
	}
</style>
