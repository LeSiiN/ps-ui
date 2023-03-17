<script lang="ts">
	import { showComponent, showUi } from './stores/stores';
	import StatusBar from './components/StatusBar.svelte';
	import { UIComponentsEnum } from './enums/UIComponentsEnum';
</script>

<main class="min-h-screen min-w-full">
	{#if $showUi}
		{#if $showComponent === UIComponentsEnum.StatusBar}
			<StatusBar />
		{/if}
	{/if}
</main>
