<script lang="ts">
	// Svelte
	import { fade } from 'svelte/transition';

	// Stores
	import { showComponent } from './stores/GeneralStores';
	import { showUi } from './stores/GeneralStores';

	// Enums
	import { UIComponentsEnum } from './enums/UIComponentsEnum';
	import { GamesEnum } from './enums/GamesEnum';

	// PS-UI components
	import StatusBar from './components/StatusBar.svelte';
	import Menu from './components/Menu.svelte';
	import Input from './components/Input.svelte';
	import ConnectingGame from './components/ConnectingGame.svelte';
</script>

{#if $showUi === true}
	<main class="min-h-screen min-w-full" transition:fade={{ duration: 100 }}>
		{#if $showComponent === UIComponentsEnum.StatusBar}
			<StatusBar />
		{/if}

		{#if $showComponent === UIComponentsEnum.Menu}
			<Menu />
		{/if}

		{#if $showComponent === UIComponentsEnum.Input}
			<Input />
		{/if}

		{#if $showComponent === UIComponentsEnum.Connecting}
			<ConnectingGame game={GamesEnum.NumberMaze} />
		{/if}
	</main>
{/if}
