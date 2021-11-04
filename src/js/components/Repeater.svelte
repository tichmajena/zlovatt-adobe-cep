<script>
  import Textfield from "./Textfield.svelte";
  import Textarea from "./Textarea.svelte";
  import { createEventDispatcher } from "svelte";

  const dispatch = createEventDispatcher();

  export let obj;
  export let i;

  function repeat() {
    dispatch("repeat");
  }
</script>

<input type="text" bind:value={obj.layer_name} />
<div class="border-4 border-green-700 p-5 relative">
  {#each obj.fields as input, ii}
    {#if input.type === "textfield"}
      <Textfield obj={obj.fields[ii]} />
    {/if}

    <!--  If input === textareaField -->
    {#if input.type === "textarea"}
      <Textarea obj={obj.fields[ii]} />
    {/if}
  {/each}
  <button
    on:click={repeat}
    class="bg-green-700 p-5 rounded-full text-white absolute bottom-0 right-0"
    ><svg
      xmlns="http://www.w3.org/2000/svg"
      class="h-6 w-6"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="2"
        d="M12 6v6m0 0v6m0-6h6m-6 0H6"
      />
    </svg></button
  >
</div>
