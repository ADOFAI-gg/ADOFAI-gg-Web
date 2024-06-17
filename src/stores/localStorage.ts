import { browser } from '$app/environment';
import { writable, type Writable } from 'svelte/store';

export function createLocalStorage<T>(name: string, defaultValue: T): Writable<T> {
  const w = writable(defaultValue);

  if (!browser) return w;

  const data = localStorage.getItem(name);

  if (data) {
    try {
      const parsed = JSON.parse(data);
      w.set(parsed as T);
    } catch (e) {
      console.warn(`Failed to load data from local stroage key ${name}`);
    }
  }

  w.subscribe((v) => {
    localStorage.setItem(name, JSON.stringify(v));
  });

  return w;
}
