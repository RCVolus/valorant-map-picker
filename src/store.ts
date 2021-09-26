import { writable } from 'svelte/store';
import { Phase, Turn } from "../types/Room";

export const selectedMap = writable<string>();
export const banns = writable<string[]>([]);
export const picks = writable<string[]>([]);
export const phase = writable<Phase>(Phase.NONE);
export const turn = writable<Turn>(Turn.BLUE);
