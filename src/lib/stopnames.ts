import { writable } from 'svelte/store';

export const vinzonsHall = writable({
    location: 'Vinzons Hall',
    personCount: 0,
    timestamp: "2000-01-00_00-00-00"
});

export const krusNaLigas = writable({
    location: 'Krus na Ligas',
    personCount: 0,
    timestamp: "2000-01-00_00-00-00"
});

export const AECH = writable({
    location: 'AECH',
    personCount: 0,
    timestamp: "2000-01-00_00-00-00"
});

export const area2 = writable({
    location: 'Area 2',
    personCount: 0,
    timestamp: "2000-01-00_00-00-00"
});