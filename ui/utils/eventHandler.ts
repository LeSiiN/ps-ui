import { setStatusBar } from '../src/stores/StatusBarStores';
import { hideUi } from '../src/stores/GeneralStores';
import { onMount, onDestroy } from 'svelte';

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
				setStatusBar(event.data as any);
			}
			case 'hideUi': {
				hideUi();
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
