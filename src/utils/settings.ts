import { browser } from '$app/environment';
import Cookies from 'js-cookie';
import { writable } from 'svelte/store';

export const useSolidBackground = writable(browser ? !!Cookies.get('_adofaigg-solid-bg') : false);

useSolidBackground.subscribe((v) => {
  if (v) {
    Cookies.set('_adofaigg-solid-bg', '1');
  } else {
    Cookies.remove('_adofaigg-solid-bg');
  }

  if (browser) {
    if (v) {
      document.body.classList.remove('image-bg');
    } else {
      document.body.classList.add('image-bg');
    }
  }
});

export const reduceMotion = writable(browser ? !!Cookies.get('_adofaigg-reduce-motion') : false);

reduceMotion.subscribe((v) => {
  if (v) {
    Cookies.set('_adofaigg-reduce-motion', '1');
  } else {
    Cookies.remove('_adofaigg-reduce-motion');
  }

  if (browser) {
    if (v) {
      document.body.classList.remove('enable-motion');
    } else {
      document.body.classList.add('enable-motion');
    }
  }
});
