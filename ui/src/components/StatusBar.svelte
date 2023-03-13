<script lang="ts">
	import type { IStatusBarItem } from 'src/interfaces/IStatusBarItem';

	export let header: string;
	export let description: string;
	export let items: Array<IStatusBarItem>;
</script>

<div class="flex min-h-screen justify-center items-end pb-5">
	<div class="w-[300px] min-h-[100px] ps-bg-darkblue rounded-xl p-5">
		<div class="pl-2 ps-text-lightgrey">
			<h1 class="font-bold text-lg">{header}</h1>
			<p class="ps-text-small mt-[-5px]">{description}</p>

			{#if items}
				<div class="mt-2">
					{#each items as item}
						<div class="flex">
							<p class="ps-text-lightgrey ps-text-small">
								{item.key}:
							</p>
							<p class="ml-1 ps-text-green ps-text-small">
								{item.value}
							</p>
						</div>
					{/each}
				</div>
			{/if}
		</div>
	</div>
</div>
