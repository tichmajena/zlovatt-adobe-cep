<script>
  // import { goto, prefetchRoutes } from "$app/navigation";
  import { onMount } from "svelte";
  import { state } from "../app/store";
  export let projects = [];
  let site = "https://www.shuva.co.zw/muruki/wp-json";

  onMount(async () => {
    const res = await fetch(`${site}/wp/v2/project?author=${$state.user.id}`);

    projects = await res.json();
  });

  let deleting = false;
  let selected = [];
  let check = false;
  let yes;
  //import "../app.css";
  import { dom } from "../app/store";

  import { tweened } from "svelte/motion";
  import { cubicOut } from "svelte/easing";
  import { cubicIn } from "svelte/easing";

  const the_margin = tweened(0, {
    duration: 400,
    easing: cubicOut,
  });

  const the_width = tweened(100, {
    duration: 400,
    easing: cubicOut,
  });

  $: {
    if ($dom.show_menu) {
      the_margin.set(20);
      the_width.set(80);
    } else {
      the_margin.set(0);
      the_width.set(100);
    }
  }
  // let mobile_menu = false;

  // function menuToggle() {
  //   mobile_menu = !mobile_menu;
  // }

  function select(e) {
    console.log(yes);
    let i = +e.srcElement.id;
    selected = [...selected, projects[i].id];
  }

  function trash() {
    deleting = true;
    selected.forEach(async (id) => {
      console.log("trashing:", id);
      const res = await fetch(`/${id}.json`, {
        method: "DELETE",
        body: JSON.stringify({ status: "trash" }),
      });

      console.log(res);

      if (res.ok) {
        deleting = false;
        goto(`/`, { invalidate: true });
      }
      const data = await res.json();
      console.log(data);
    });
  }
</script>

<div class="fixed w-full h-full z-0">
  <div class="w-1/5 bg-gray-900 h-full">
    {#if check}
      <div class="p-4">
        <button on:click={trash} class="bg-red-500">Delete</button>
      </div>
    {/if}
    <div class="text-white p-5">
      <div class="text-white text-2xl mb-4">My Projects</div>
      <div>
        <ul>
          {#each projects as project, i}
            <a sveltekit:prefetch href={project.slug}>
              <li class="border-b border-gray-700 hover:bg-gray-700 text-2xl">
                {project.title.rendered}
                <div class="text-sm text-green-600">
                  {project.formatted_date}
                </div>
              </li>
            </a>
            {#if check}
              <label for={i}>
                <input
                  id={i}
                  group={yes}
                  value={i}
                  type="checkbox"
                  on:click={select}
                />
              </label>
            {/if}
          {/each}
        </ul>
      </div>
    </div>
  </div>
  <div class="w-4/5" />
</div>

<div
  style="margin-left:{$the_margin}%;width:{$the_width}%; height:100%"
  class={$dom.show_menu ? "absolute min-h-full z-10" : "absolute h-full z-10"}
>
  <slot />
</div>
