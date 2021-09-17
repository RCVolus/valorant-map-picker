import { writable } from "svelte/store";

export const selectedMap = writable<string>()
export const banned = writable<string[]>([])
export const picked = writable<string[]>([])