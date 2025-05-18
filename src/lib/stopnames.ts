import { writable } from 'svelte/store';

export const vinzonsHall = writable({
    location: 'Vinzons Hall',
    personCount: 0,
});

export const krusNaLigas = writable({
    location: 'Krus na Ligas',
    personCount: 0,
});

export const AECH = writable({
    location: 'AECH',
    personCount: 0,
});

export const area2 = writable({
    location: 'Area 2',
    personCount: 0,
});