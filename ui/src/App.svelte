<script lang="ts">
	import { showComponent } from './stores/GeneralStores';
	import { showUi } from './stores/GeneralStores';
	import { UIComponentsEnum } from './enums/UIComponentsEnum';

	// PS-UI components
	import StatusBar from './components/StatusBar.svelte';
	import Menu from './components/Menu.svelte';
	import Input from './components/Input.svelte';
	import { fade } from 'svelte/transition';
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
	</main>
{/if}
