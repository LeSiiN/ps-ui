import { showComponent, showUi, statusBarStore } from './../src/stores/stores';
import { onMount, onDestroy } from 'svelte';
import { UIComponentsEnum } from './../src/enums/UIComponentsEnum';

interface nuiMessage {
	data: {
		action: string;
		[key: string]: any;
	};
}

export function EventHandler() {
	function mainEvent(event: nuiMessage) {
		switch (event.data.action) {
			case 'ShowStatusBar':
			case 'UpdateStatusBar': {
				statusBarStore.set({
					title: event.data.title,
					description: event.data.description,
					items: event.data.items,
				});

				showUi.set(true);
				showComponent.set(UIComponentsEnum.StatusBar);
			}
			case 'HideStatusBar': {
				showUi.set(false);
				showComponent.set(undefined);
			}
		}
	}

	onMount(() => window.addEventListener('message', mainEvent));
	onDestroy(() => window.removeEventListener('message', mainEvent));
}

export function handleKeyUp(event: KeyboardEvent) {
	const charCode = event.key;
	if (charCode == 'Escape') {
	}
}
