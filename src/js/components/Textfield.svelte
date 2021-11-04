<script>
  import { createEventDispatcher } from "svelte";
  import CloseButton from "./CloseButton.svelte";
  import MoveIcon from "./MoveIcon.svelte";
  import Numbering from "./Numbering.svelte";

  const dispatch = createEventDispatcher();

  export let obj;
  export let i;
  export let ii;

  function removeSubField() {
    dispatch("removeSubField", {
      i,
      ii,
    });
  }

  function removeField() {
    dispatch("removeField", {
      i,
    });
  }

  // TODO: More index for nested layer
</script>

<!--  If input === codeInput -->

<div class="flex flex-row relative mb-6">
  {#if ii >= 0}
    <Numbering num={ii} />
  {:else if ii === undefined}
    <Numbering num={i} />
  {/if}

  <div class="container mx-auto w-full flex flex-row lg:relative lg:z-0">
    <div class="w-1/12 flex items-center">
      <MoveIcon />
    </div>
    <div
      class="border-4 w-11/12 lg:z-0 relative rounded-lg lg:p-6 p-3 border-gray-400 border-dashed"
    >
      <div class="absolute -top-4 -right-4">
        {#if ii >= 0}
          <CloseButton on:click={removeSubField} />
        {:else if ii === undefined}
          <CloseButton on:click={removeField} />
        {/if}
      </div>
      <div class="md:flex flex flex-col-reverse w-full md:flex-row">
        <div class="bg-yellow-200 p-4 md:pr-7 rounded-md md:w-3/5">
          <input
            type="text"
            tooltip
            bind:value={obj.field_label}
            class="mb-3 md:mt-0 mt-3 outline-one focus:outline-none bg-transparent p-0 text-sm border-0 focus:ring-0 ring-0 text-yellow-900"
          />

          <input
            bind:value={obj.field_input}
            class=" rounded border-0 outline-none text-yellow-900 text-md font-medium focus:outline-none focus:shadow-lg focus:ring focus:ring-yellow-700 w-full"
            placeholder="Layer Content"
            type="text"
          />
        </div>
        <div
          class="relative h-10 lg:z-10 md:right-0 pl-4 pr-2 -mb-3 md:-ml-8 md:pt-4 md:w-2/5 group"
        >
          <input
            bind:value={obj.layer_name}
            class=" rounded border-0 outline-none py-1 text-sm focus:outline-none focus:shadow-md w-full focus:ring focus:ring-yellow-700 bg-yellow-400"
            placeholder="Layer Name"
            type="text"
          />
          <div
            class="absolute w-4/5 rounded -top-6 flex-col items-center hidden mb-6 group-hover:flex transition"
          >
            <span
              class="relative z-10 p-2 mx-auto text-xs leading-none text-yellow-900 whitespace-no-wrap bg-yellow-500 rounded shadow-lg"
              >Layer Name</span
            >
            <div class="w-3 h-3 -mt-2 rotate-45 bg-yellow-500" />
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
<!-- <pre>{JSON.stringify(obj, null, 2)}</pre> -->
