<script lang="ts">
	import { statusBarStore } from './../stores/stores';

	import { EventHandler } from './../../utils/eventHandler';
	EventHandler();
</script>

<div class="flex min-h-screen justify-center items-end pb-5">
	<div class="w-[300px] min-h-[100px] ps-bg-darkblue rounded-xl p-5">
		<div class="pl-2 ps-text-lightgrey">
			{#if $statusBarStore.title}<h1 class="font-bold text-lg">
					{$statusBarStore.title}
				</h1>{/if}
			{#if $statusBarStore.description}<p class="ps-text-small mt-[-5px]">
					{$statusBarStore.description}
				</p>{/if}

			{#if $statusBarStore.items}
				<div class="mt-2">
					{#each $statusBarStore.items as item}
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
