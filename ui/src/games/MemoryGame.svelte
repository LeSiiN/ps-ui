<script lang="ts">
	import { onMount } from 'svelte';
	import Skull from './../assets/svgs/Skull.svelte';

	const skullColor: string = '#02f1b5';

	let gameContainer: HTMLDivElement;
	let inputs: NodeListOf<HTMLDivElement>;

	function addSquares(): void {
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
			gameContainer.append(element);
		}

		setAnswer();
	}

	async function guessAnswer(): Promise<void> {
		await showAnswer();
		startGame();
	}

	async function showAnswer(): Promise<void> {
		appendCorrectAnswers();

		return new Promise((resolve) => {
			setTimeout(() => {
				resolve();
			}, 2000);
		});
	}

	function startGame(): void {}

	/** Generate random number for generating correct inputs */
	function randomNumber(min: number, max: number): number {
		return Math.random() * (max - min) + min;
	}

	function setAnswer(): void {
		for (let index = 0; index < 5; index++) {
			console.log('a.s');
		}
	}

	function appendCorrectAnswers(): void {
		inputs = document.querySelectorAll('.input');
	}

	onMount(() => {
		addSquares();
		guessAnswer();
	});
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
	:global(div[data-answer='answer']) {
		background: red;
	}
</style>
