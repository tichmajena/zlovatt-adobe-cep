<script>
  export let color = "bg-yellow-300";
</script>

<button
  on:click
  class="{color} text-white flex mx-auto mb-4 w-full border-0 focus:outline-none text-sm font-medium py-1 px-3 rounded-3xl"
  ><slot name="icon" /><slot name="text" /></button
>
