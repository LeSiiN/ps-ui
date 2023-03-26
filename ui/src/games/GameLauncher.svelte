<script lang="ts">
	import { ConnectingGameMessageEnum } from '../enums/GameConnectionMessages';
	import { createEventDispatcher, onMount } from 'svelte';
	import Skull from '../assets/svgs/Skull.svelte';
	import MemoryGame from './MemoryGame.svelte';
	import { EventHandler } from './../../utils/eventHandler';
	import * as mock from './../../utils/mockEvent';

	EventHandler();
	mock.newMemoryGameMock();

	const skullColor: string = '#02f1b5';

	let showLoading: boolean = true;
	let loadingBar: HTMLDivElement;
	let connectionText: ConnectingGameMessageEnum =
		ConnectingGameMessageEnum.Connecting;

	/** Asynchronously connects to a game and resolves the Promise when completed.
	 * Uses a loading bar to show progress, incrementing by 1% every 30ms until it reaches 100%.
	 *
	 * @returns Promise that resolves when the loading bar reaches 100%.
	 */
	async function connectToGame(): Promise<void> {
		return new Promise((resolve) => {
			let width = 0;
			setTimeout(() => {
				let interval = setInterval(() => {
					width++;
					loadingBar.style.width = `${width}%`;

					if (width === 100) {
						clearInterval(interval);
						resolve();
					}
				}, 30);
			}, 1000);
		});
	}

	// Declare an async function to initialize the game
	async function init(): Promise<void> {
		await connectToGame();
		await setupGame();
	}

	// Declare an async function to open the game
	async function setupGame(): Promise<void> {
		return new Promise((resolve) => {
			showLoading = false;

			resolve();
		});
	}

	// Call init() on mount
	onMount(() => {
		connectToGame();
		init();
	});
</script>

{#if showLoading}
	<div class="flex min-h-screen justify-center items-center">
		<div
			class="flex flex-col h-[400px] w-[700px] ps-bg-darkblue shadow-md shadow-black justify-center items-center"
		>
			<span class="w-40"><Skull color={skullColor} /></span>
			<p class="text-white text-3xl mt-2">{connectionText}</p>

			<!-- Loading wrapper -->
			<div class="flex mt-10 ps-border-green border-4 w-[80%] h-10">
				<!-- Loading bar progress -->
				<div
					bind:this={loadingBar}
					class="ps-bg-green opacity-40 will-change-auto w-0"
				>
					l
				</div>
			</div>
		</div>
	</div>
{/if}

<MemoryGame />
