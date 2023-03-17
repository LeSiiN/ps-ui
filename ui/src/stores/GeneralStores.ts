import { writable, type Writable } from 'svelte/store';
import { showComponent } from './StatusBarStores';

export const showUiStore: Writable<boolean> = writable(true);

export function hideUi(): void {
	showUiStore.set(false);
	showComponent.set(undefined);
}
