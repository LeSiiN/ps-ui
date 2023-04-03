<script lang="ts">
	// Svelte
	import { fade } from 'svelte/transition';

	// Stores
	import { showComponent } from './stores/GeneralStores';
	import { showUi } from './stores/GeneralStores';

	// Enums
	import { UIComponentsEnum } from './enums/UIComponentsEnum';

	// PS-UI components
	import StatusBar from './components/StatusBar.svelte';
	import Menu from './components/Menu.svelte';
	import Input from './components/Input.svelte';
	import GameLauncher from './games/GameLauncher.svelte';
	import { EventHandler } from './../utils/eventHandler';
	import { showImageMock } from './../utils/mockEvent';
	import Image from './components/Image.svelte';

	EventHandler();
	showImageMock();
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

		{#if $showComponent === UIComponentsEnum.Game}
			<GameLauncher />
		{/if}
		{#if $showComponent === UIComponentsEnum.Image}
			<Image />
		{/if}
		yep
	</main>
{/if}
