import { writable, derived } from 'svelte/store';
import type { Side } from '../types/Room';
import { Phase, Turn } from '../types/enums';

export const phase = writable<Phase>(Phase.NONE);
export const turn = writable<Turn>(Turn.BLUE);
export const selectedSide = writable<[string, 'attacker' | 'defender']>();
export const isSpectator = writable(false);

export const teams = writable<[string, string]>(['Blue', 'Red'])

class Maps {
	public loading = writable(false);
	public error = writable(undefined);
	private availableMaps = writable<any[]>([]);
	public selectedMap = writable<string>();
	public bans = writable<string[]>([]);
	public picks = writable<{ [mapId: string]: Side }>({});

	constructor() {
		this.get();
	}

	get maps() {
		return derived(
			[this.availableMaps],
			([$availableMaps]) => {
				return $availableMaps
			}
		);
	}

	private async get() {
		this.loading.set(true);
		this.error.set(undefined);

		try {
			const mapResponse = await fetch('https://valorant-api.com/v1/maps');
			const maps = await mapResponse.json();
			this.availableMaps.set(maps.data.filter(m => {
				m.displayName !== 'Split'
			}));
		} catch (e) {
			this.error.set(e);
		} finally {
			this.loading.set(false);
		}
	}
}

export const MapStore = new Maps();
