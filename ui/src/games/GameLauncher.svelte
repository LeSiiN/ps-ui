<script lang="ts">
	import { UIComponentsEnum } from './../enums/UIComponentsEnum';
	import { GamesEnum } from '../enums/GamesEnum';
	import { ConnectingGameMessageEnum } from '../enums/GameConnectionMessages';
	import { onMount } from 'svelte';
	import Skull from '../assets/svgs/Skull.svelte';
	import MemoryGame from './MemoryGame.svelte';
	import { showComponent } from './../stores/GeneralStores';

	const skullColor: string = '#02f1b5';

	let game: GamesEnum;
	let showLoading: boolean = true;
	let loadingBar: HTMLDivElement;
	let loaded: boolean = false;
	let connectionText: ConnectingGameMessageEnum =
		ConnectingGameMessageEnum.Connecting;

	// Declare a promise to connect to the game
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

		showLoading = false;
		await setupGame(GamesEnum.MemoryGame);
	}

	// Declare an async function to open the game
	async function setupGame(game: GamesEnum): Promise<void> {
		return new Promise((resolve) => {
			showLoading = false;

			showComponent.set(UIComponentsEnum.MemoryGame);

			resolve();
		});
	}

	// Call init() on mount
	onMount(() => {
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

			{#if !loaded}
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
			{/if}
		</div>
	</div>
{/if}

{#if !showLoading && $showComponent === UIComponentsEnum.MemoryGame}
	<MemoryGame />
{/if}
