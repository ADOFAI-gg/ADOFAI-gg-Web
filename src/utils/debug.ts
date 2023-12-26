import { writable } from 'svelte/store';

export const debugData = writable({
  emailVerificationNotification: false
});
