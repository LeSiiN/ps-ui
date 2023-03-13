<script lang="ts">
	import StatusBar from './components/StatusBar.svelte';
	import { ComponentsEnum } from './enums/components';
	import type { IStatusBarItem } from './interfaces/IStatusBarItem';
	import { component } from './stores/stores';

	let items: Array<IStatusBarItem> = [
		{
			key: 'Gang',
			value: 'Ballas',
		},
		{
			key: 'Dominance',
			value: '20%',
		},
	];
</script>

<main class="min-h-screen min-w-full">
	{#if $component === ComponentsEnum.StatusBar}
		<StatusBar
			header="Area dominance"
			description="Write a small description here"
			{items}
		/>
	{/if}
</main>
