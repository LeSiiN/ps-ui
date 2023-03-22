<script lang="ts">
	import type { GamesEnum } from './../enums/GamesEnum';
	import { ConnectingGameMessageEnum } from './../enums/GameConnectionMessages';
	import { onMount } from 'svelte';
	import Skull from './../assets/svgs/Skull.svelte';

	export let game: GamesEnum;

	const skullColor: string = '#02f1b5';

	let showLoading: boolean = true;
	let loadingBar: HTMLDivElement;
	let loaded: boolean = false;
	let connectionText: ConnectingGameMessageEnum =
		ConnectingGameMessageEnum.Connecting;

	const connect = new Promise((resolve) => {
		let width = 0;

		setTimeout(() => {
			let interval = setInterval(() => {
				width++;

				loadingBar.style.width = `${width}%`;

				if (width === 100) {
					clearInterval(interval);
					resolve(true);
				}
			}, 30);
		}, 2000);
	});

	function openGame(game: GamesEnum): void {
		setTimeout(() => {}, 2000);
	}

	onMount(() => {
		connect
			.then(() => {
				loaded = true;
				connectionText = ConnectingGameMessageEnum.Connected;
			})
			.then(() => {
				openGame(game);
			});
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
