import { showStatusBar } from '../src/stores/StatusBarStores';
import { hideUi, showComponent, showUi } from '../src/stores/GeneralStores';
import { showInput } from './../src/stores/InputStores';

import { onMount, onDestroy } from 'svelte';
import fetchNui from './fetch';
import { UIComponentsEnum } from './../src/enums/UIComponentsEnum';
import { setupGame } from './../src/stores/GameSetupStores';

interface nuiMessage {
	data: {
		action: string;
		[key: string]: any;
	};
}

export function EventHandler() {
	function mainEvent(event: nuiMessage) {
		showUi.set(true);

		switch (event.data.action) {
			case 'ShowStatusBar':
			case 'UpdateStatusBar': {
				showStatusBar(event.data as any);
			}
			case 'ShowMenu': {
			}
			case 'ShowInput': {
				showInput(event.data as any);
			}
			case 'hideUi': {
				hideUi();
			}
			case 'newMemoryGame': {
				setupGame(event.data as any);
			}
		}
	}

	onMount(() => window.addEventListener('message', mainEvent));
	onDestroy(() => window.removeEventListener('message', mainEvent));
}

export function handleKeyUp(event: KeyboardEvent) {
	const charCode = event.key;
	if (charCode == 'Escape') {
		showComponent.subscribe((component: UIComponentsEnum) => {
			switch (component) {
				case UIComponentsEnum.Input:
					fetchNui('input-close', { ok: true });
					break;
			}
		});

		hideUi();
	}
}
