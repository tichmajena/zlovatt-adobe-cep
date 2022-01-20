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

export const consol = writable();
export const start = new Date();
export const projectArry = writable([]);
export const state = writable({
  user: undefined,
  loggedin: true,
  rest: "https://www.shuva.co.zw/muruki/wp-json",
  pi: undefined,
  ai: undefined,
});
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
