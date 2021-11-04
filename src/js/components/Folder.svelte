<script>
  import Textfield from "./Textfield.svelte";
  import Textarea from "./Textarea.svelte";
  import { createEventDispatcher } from "svelte";
  import CloseButton from "./CloseButton.svelte";
  import Imagefield from "./Imagefield.svelte";

  const dispatch = createEventDispatcher();

  export let obj;
  export let i;
  export let ii;

  function deactivate() {
    dispatch("deactivate");
  }

  function removeSubField() {
    dispatch("removeSubField", {
      i,
      ii,
    });
  }

  function removeField() {
    dispatch("removeField", { index: i });
  }
  function activate() {
    dispatch("activate", { index: i });
  }
</script>

{#if obj.is_active}
  <div class="w-full relative flex justify-end pr-12 z-10">
    <button
      on:click={deactivate}
      class="bg-green-700 px-3 py-1 rounded-full text-white text-sm -mb-3"
      >Get Out</button
    >
  </div>
{/if}

<div
  on:click={() => {
    activate(i);
  }}
  class:bg-green-200={obj.is_active}
  class:bg-white={!obj.is_active}
  class="border-4 border-green-700 p-8 rounded-xl z-0 relative mb-8"
>
  <input
    type="text"
    placeholder="Layer Name"
    class="rounded border-0 outline-none py-2 text-sm focus:outline-none focus:shadow-md focus:ring focus:ring-green-700 bg-green-400 absolute -top-6 left-4"
    bind:value={obj.layer_name}
  />

  <div class="absolute -top-4 -right-4">
    {#if ii >= 0}
      <CloseButton on:click={removeSubField} />
    {:else if ii === undefined}
      <CloseButton on:click={removeField} />
    {/if}
  </div>
  {#each obj.fields as input, ii}
    {#if input.meta === "textfield"}
      <Textfield obj={obj.fields[ii]} {i} {ii} on:removeSubField />
      <!-- <pre>{JSON.stringify(obj, null, 2)}</pre> -->
    {/if}

    <!--  If input === textareaField -->
    {#if input.meta === "textarea"}
      <Textarea obj={obj.fields[ii]} {i} {ii} on:removeSubField />

      <!-- <pre>{JSON.stringify(obj, null, 2)}</pre> -->
    {/if}

    {#if input.meta === "image_field"}
      <Imagefield obj={obj.fields[ii]} {i} {ii} on:removeSubField />
    {/if}
  {/each}
</div>
