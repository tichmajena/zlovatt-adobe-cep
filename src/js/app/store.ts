import { readable, derived, writable } from "svelte/store";

export const prefix = writable("");

export const time = readable(new Date(), function start(set) {
  const interval = setInterval(() => {
    set(new Date());
  }, 1000);

  return function stop() {
    clearInterval(interval);
  };
});

export const start = new Date();

export const inputarry = writable([]);
export const artworkArry = writable([]);
export const harvest = writable([]);
export const dom = writable({
  active: {
    i: 0,
    is: false,
  },
  mode: {
    nested: false,
    design: true,
  },
  show_menu: false,
});
