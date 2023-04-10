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
	import { EventHandler, handleKeyUp } from './../utils/eventHandler';
	import Image from './components/Image.svelte';
	import { notificationMock } from './../utils/mockEvent';
	import Notification from './components/Notification.svelte';

	EventHandler();
	notificationMock();
	document.onkeyup = handleKeyUp;
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
		{#if $showComponent === UIComponentsEnum.Notification}
			<Notification />
		{/if}
	</main>
{/if}
