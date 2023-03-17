<script lang="ts">
	import { showComponent } from './stores/StatusBarStores';
	import { showUiStore } from './stores/GeneralStores';
	import { UIComponentsEnum } from './enums/UIComponentsEnum';

	// PS-UI components
	import StatusBar from './components/StatusBar.svelte';
	import Menu from './components/Menu.svelte';
</script>

<main class="min-h-screen min-w-full">
	{#if $showUiStore === true}
		{#if $showComponent === UIComponentsEnum.StatusBar}
			<StatusBar />
		{/if}

		{#if $showComponent === UIComponentsEnum.Menu}
			<Menu />
		{/if}
	{/if}
</main>
