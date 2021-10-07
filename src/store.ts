import { writable } from 'svelte/store';
import type { Side } from "../types/Room";
import { Phase, Turn } from "../types/enums";

export const selectedMap = writable<string>();
export const banns = writable<string[]>([]);
export const picks = writable<{[mapId: string]: Side}>({});
export const phase = writable<Phase>(Phase.BAN);
export const turn = writable<Turn>(Turn.BLUE);
