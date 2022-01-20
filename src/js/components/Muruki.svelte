<script>
  import { fly, fade, scale } from "svelte/transition";
  import * as csInterface from "cep-interface";
  import Config from "../../config";
  import Textfield from "./Textfield.svelte";
  import Textarea from "./Textarea.svelte";
  import {
    projectArry,
    state,
    inputarry,
    artworkArry,
    harvest,
    dom,
    consol,
  } from "../app/store";
  import Repeater from "./Repeater.svelte";
  import Smartobject from "./Smartobject.svelte";
  import Addbutton from "./Addbutton.svelte";
  import Imagefield from "./Imagefield.svelte";
  import Nav from "./Nav.svelte";
  import Auth from "./Auth.svelte";
  // import { goto } from "$app/navigation";
  import Folder from "./Folder.svelte";

  let project;
  export let session;
  export let slug;
  let input_json;

  let title = "";
  let proj_string = [];

  $: {
    project = $projectArry[$state.pi];

    if (project !== undefined) {
      title = project.title.rendered;
      if (project.proj_string !== "") {
        proj_string = JSON.parse(project.proj_string);
        $inputarry = proj_string.fields;
        $artworkArry = proj_string.posts;
      }
    }
  }
  let editor;

  // TODO: fvdv
  function addReapeter() {
    let myReapeter = {
      fields: [],
      meta: "repeater",
      layer_name: "",
      is_active: true,
    };
    deactivate();
    $inputarry = [...$inputarry, myReapeter];

    let i = $inputarry.length - 1;
    activate(i);

    console.log($inputarry);
  }

  function addSmartObject() {
    let mySmartObj = {
      fields: [],
      meta: "smart_object",
      layer_name: "",
      is_active: true,
    };
    deactivate();
    $inputarry = [...$inputarry, mySmartObj];

    let i = $inputarry.length - 1;
    activate(i);
  }

  function addFolder() {
    let myFolder = {
      fields: [],
      meta: "folder",
      layer_name: "",
      is_active: true,
    };
    deactivate();
    $inputarry = [...$inputarry, myFolder];

    let i = $inputarry.length - 1;
    activate(i);
  }

  function addField() {
    let mycodeInput = {
      field_input: "",
      field_label: "Label (Optional)",
      meta: "textfield",
      layer_name: "",
      is_active: true,
    };
    console.log($dom.active.is);
    if ($dom.active.is === true) {
      insert(mycodeInput);
      console.log($inputarry);
      return;
    }

    $inputarry = [...$inputarry, mycodeInput];
    console.log($inputarry);
  }

  function insert(fieldObj) {
    $inputarry[$dom.active.i].fields = [
      ...$inputarry[$dom.active.i].fields,
      fieldObj,
    ];
  }

  function addImage() {
    let myimage = {
      field_input: "",
      field: "",
      field_label: "Label (Optional)",
      meta: "image_field",
      layer_name: "",
      is_active: true,
    };

    if ($dom.active.is === true) {
      insert(myimage);
      return;
    }

    $inputarry = [...$inputarry, myimage];
    console.log($inputarry);
  }

  function addTextArea() {
    let myTextarea = {
      field_input: "",
      field_label: "Label (Optional)",
      meta: "textarea",
      layer_name: "",
      is_active: true,
    };
    console.log($dom.active.is);
    if ($dom.active.is === true) {
      insert(myTextarea);
      return;
    }

    $inputarry = [...$inputarry, myTextarea];
  }

  function removeField(i) {
    $inputarry.splice(i, 1);
    $inputarry = $inputarry;
    deactivate();
  }

  function removeSubField(i, ii) {
    $inputarry[i].fields.splice(ii, 1);
    $inputarry = $inputarry;
  }

  function saveArtwork() {
    for (let i = 0; i < $inputarry.length; i++) {
      let t = $inputarry[i].meta;
      if ($inputarry[i].layer_name === "") {
        alert("Fill Fields");
        return;
      }

      if (t === "repeater" || t === "smart_object" || t === "folder") {
        for (let ii = 0; ii < $inputarry[i].fields.length; ii++) {
          if ($inputarry[i].fields[ii].layer_name === "") {
            alert("Fill Fields 2");
            return;
          }
        }
      }
    }

    $artworkArry = [...$artworkArry, $inputarry];

    // Clearing Fields after saving
    clearFields();
    console.log($artworkArry);
  }

  function updateArtwork() {
    $artworkArry[$state.ai] = $inputarry;
    $state.ai = undefined;
  }

  function newArtwork() {
    clearFields();
    deactivate();
    $state.ai = undefined;
  }

  function clearFields() {
    $inputarry = $inputarry.map((fieldObj, i) => {
      let clearedObj = {};

      if ($inputarry[i].meta === "image_field") {
        $inputarry[i].field.value = "";
        clearedObj.field = fieldObj.field;
      }

      if (
        $inputarry[i].meta === "smart_object" ||
        $inputarry[i].meta === "folder"
      ) {
        clearedObj.fields = $inputarry[i].fields.map((innerFieldObj, ii) => {
          let clearedInnerObj = {};
          if ($inputarry[i].fields[ii].meta === "image_field") {
            $inputarry[i].fields[ii].field.value = "";
            clearedInnerObj.field = innerFieldObj.field;
          }

          clearedInnerObj.field_input = "";
          clearedInnerObj.field_label = "Label (Optional)";
          clearedInnerObj.layer_name = innerFieldObj.layer_name;
          clearedInnerObj.meta = innerFieldObj.meta;
          clearedInnerObj.is_active = true;

          return clearedInnerObj;
        });
      }

      clearedObj.field_input = "";
      clearedObj.field_label = "Label (Optional)";
      clearedObj.layer_name = fieldObj.layer_name;
      clearedObj.meta = fieldObj.meta;
      clearedObj.is_active = true;

      return clearedObj;
    });

    $inputarry = $inputarry;
  }

  function repeat() {
    if ($inputarry[$dom.active.i].fields[0].meta === "textfield") {
      addField();
    }
  }

  function activate(i) {
    if (!$inputarry[i].is_active) {
      deactivate();
      $dom.active.is = true;
      $dom.mode.nested = true;
      $dom.active.i = i;
      $inputarry[i].is_active = true;
    }
  }

  function deactivate() {
    $dom.active.is = false;
    $dom.mode.nested = false;
    $inputarry.forEach((field, i) => {
      if (
        field.meta === "repeater" ||
        field.meta === "folder" ||
        field.meta === "smart_object"
      ) {
        $inputarry[i].is_active = false;
      }
    });
  }

  function downloadJson(content, fileName, contentmeta) {
    let jsonData = JSON.stringify(content);
    const a = document.createElement("a");
    let file = new Blob([jsonData], { meta: contentmeta });
    a.href = URL.createObjectURL(file);
    a.download = fileName;
    a.click();
  }

  function sanitizeArry() {
    console.log($artworkArry);

    $harvest = $artworkArry.map((_, i) => {
      let sanitizedArry = $artworkArry[i].map((_, ii) => {
        let newObj = {};
        let t = $artworkArry[i][ii].meta;

        if (t === "image_field") {
          let strry = $artworkArry[i][ii].field_input.split("\\");
          $artworkArry[i][ii].field_input = strry[strry.length - 1];
        }
        newObj[$artworkArry[i][ii].layer_name] =
          $artworkArry[i][ii].field_input;
        newObj.meta =
          $artworkArry[i][ii].meta + "*" + $artworkArry[i][ii].layer_name;

        if (t === "repeater" || t === "smart_object" || t === "folder") {
          let newSubArry = $artworkArry[i][ii].fields.map((_, iii) => {
            let newSubObj = {};
            let t = $artworkArry[i][ii].fields[iii].meta;

            if (t === "image_field") {
              let strrry =
                $artworkArry[i][ii].fields[iii].field_input.split("\\");
              $artworkArry[i][ii].fields[iii].field_input =
                strrry[strrry.length - 1];
            }

            newSubObj[$artworkArry[i][ii].fields[iii].layer_name] =
              $artworkArry[i][ii].fields[iii].field_input;
            newSubObj.meta =
              $artworkArry[i][ii].fields[iii].meta +
              "*" +
              $artworkArry[i][ii].fields[iii].layer_name;

            //TODO: Add another map for a nest

            return newSubObj;
          });
          newObj[$artworkArry[i][ii].layer_name] = newSubArry;
        }

        return newObj;
      });
      return sanitizedArry;
    });
  }

  function handleActivate(event) {
    activate(event.detail.index);
  }

  function handleRemoveField(event) {
    removeField(event.detail.index);
  }

  function handleRemoveSubField(event) {
    removeSubField(event.detail.i, event.detail.ii);
  }

  function handleDownloadJson() {
    sanitizeArry();
    console.log($harvest);
    let postObj = {
      title,
      artworks: $harvest,
      globals: {
        colors: "",
      },
    };
    downloadJson(postObj, "artworks.json", "application/json");
  }

  async function publish() {
    let project = {
      title,
      fields: $inputarry,
      posts: $artworkArry,
    };

    let user = JSON.parse(localStorage.getItem("user"));
    let token = JSON.parse(localStorage.getItem("token"));

    let body = {
      title: title,
      status: "publish",
      author: user.id,
      content: "",
      proj_string: JSON.stringify(project),
      proj_json: JSON.stringify($harvest),
    };

    $consol = token;

    if (token) {
      $consol = $state.rest + "/wp/v2/project";
      let res = await fetch($state.rest + "/wp/v2/project", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
        body: JSON.stringify(body),
      });

      const data = await res.json();
      $consol = data;
      if (res.ok) {
        $consol = data;

        const res = await fetch(
          `${$state.rest}/wp/v2/project?author=${user.id}`
        );

        if (res.ok) {
          projects = await res.json();
          $projectArry = projects;
        }
        // goto(`/${data.slug}`, { replaceState: true });
      }
      console.log(data);
    } else {
      //login
    }
  }

  async function editPost() {
    let user = JSON.parse(localStorage.getItem("user"));
    let token = JSON.parse(localStorage.getItem("token"));
    sanitizeArry();

    let projectbody = {
      title,
      fields: $inputarry,
      posts: $artworkArry,
    };

    let json = {
      title,
      artworks: $harvest,
      globals: {
        colors: "",
      },
    };
    $consol = json;
    let body = {
      title: title,
      status: "publish",
      author: user.id,
      content: "",
      proj_string: JSON.stringify(projectbody),
      proj_json: JSON.stringify(json),
    };

    console.log(body, project);
    console.log(project.slug);
    if (token) {
      const res = await fetch($state.rest + "/wp/v2/project/" + project.id, {
        body: JSON.stringify(body),
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
      });
      const data = await res.json();

      console.log(data, "Im PUTTTTYYYYYYY");
      if (res.ok) {
        //  goto(`/${data.slug}`, { replaceState: true });

        const res = await fetch(
          `${$state.rest}/wp/v2/project?author=${user.id}`
        );

        if (res.ok) {
          projects = await res.json();
          $projectArry = projects;
        }
      }
    }
  }

  function saveFields() {
    if ($dom.mode.design && $inputarry.length > 0) {
    }
    $dom.mode.design = !$dom.mode.design;
  }

  function generateFields() {
    let fields = JSON.parse(input_json);
    $inputarry = fields;
    input_json = "";
  }

  function runScrapper() {
    const host = `$.global["${Config.id}"]`;

    csInterface.evalExtendscript(host + ".scrape()").then((data) => {
      $inputarry = data.fields;
      $dom.mode.design = !$dom.mode.design;
      //alert($inputarry.length);
    });
  }

  function runRuka() {
    alert("ruka");
    const host = `$.global["${Config.id}"]`;

    sanitizeArry();
    // let theArtworks = JSON.stringify($harvest);
    // alert(typeof theArtworks);
    let aarts = JSON.stringify({ title, artworks: $harvest });
    csInterface.evalExtendscript(host + ".ruka(" + aarts + ")");
  }

  function gotoArtwork(i) {
    $state.ai = i;
    $inputarry = $artworkArry[$state.ai];
  }
</script>

<Nav>
  <div class="min-h-full flex">
    <div class="p-5 min-h-full w-1/12 bg-gray-800 relative">
      <!-- Cards -->
      <div class="fixed w-1/12 overflow-hidden">
        <div
          on:click={() => {
            $dom.show_menu = !$dom.show_menu;
          }}
          class="flex flex-row text-gray-200 text-2xl mb-4"
        >
          <div>
            {#if $dom.show_menu}
              <div class="mt-1">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class=" h-5 w-5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fill-rule="evenodd"
                    d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                    clip-rule="evenodd"
                  />
                </svg>
              </div>
            {/if}
            {#if !$dom.show_menu}
              <div class="mt-1 ">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-5 w-5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fill-rule="evenodd"
                    d="M7.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l2.293 2.293a1 1 0 010 1.414z"
                    clip-rule="evenodd"
                  />
                </svg>
              </div>
            {/if}
          </div>
          <div>
            {#if $dom.show_menu}
              <div class="mt-1 pr-2">
                <svg
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
                    d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"
                  />
                </svg>
              </div>
            {/if}
            {#if !$dom.show_menu}
              <div class="mt-1 pr-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 19a2 2 0 01-2-2V7a2 2 0 012-2h4l2 2h4a2 2 0 012 2v1M5 19h14a2 2 0 002-2v-5a2 2 0 00-2-2H9a2 2 0 00-2 2v5a2 2 0 01-2 2z"
                  />
                </svg>
              </div>
            {/if}
          </div>
          <div>Projects</div>
        </div>
        <div class="w-full flex flex-row justify-between">
          <div class="text-gray-200 text-2xl">Artworks</div>

          <div class="flex flex-row text-gray-300 p-2">
            <div class="pl-2">
              <svg
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
                  d="M4 6h16M4 10h16M4 14h16M4 18h16"
                />
              </svg>
            </div>
            <div class="pl-2">
              <svg
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
                  d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"
                />
              </svg>
            </div>
          </div>
        </div>
        <div style="height: 90vh; overflow: auto;">
          <!-- <pre
            class="text-xs text-white">
            {JSON.stringify($inputarry, null, 2)}
          </pre> -->
          <ul class="mt-10 flex flex-col-reverse">
            {#each $artworkArry as flyer, i}
              <div
                on:click={() => gotoArtwork(i)}
                class="border-b border-gray-600  text-sm flex flex-row"
              >
                <!-- <div class="rounded-lg p-2">Image</div> -->
                <div class="text-gray-400  p-2">
                  {#each flyer as field}
                    <div class="p-1">
                      {field.layer_name} :{field.field_input}<br />
                    </div>
                  {/each}
                </div>
              </div>
            {/each}
          </ul>
        </div>
      </div>
    </div>
    <div class="w-11/12 bg-gray-700">
      <!-- Edit Area -->
      <section class="w-full py-10 px-7 ">
        <!-- Title . Rendered -->
        {#if !$state.loggedin}
          <Auth />
        {/if}
        <input
          type="text"
          bind:value={title}
          placeholder="Title"
          class="bg-transparent border-0 focus:border-0 focus:ring-0 py-3 text-gray-200  text-4xl"
        />
        <div class="bg-transparent w-full border-white border-b-2 mb-4" />
      </section>
      <section class="w-full">
        <div class="container mx-auto w-full m-8 flex flex-row">
          {#if !$dom.show_menu}
            {#if $dom.mode.design}
              <div
                transition:scale={{ y: 400, duration: 400 }}
                class="m-4 w-1/5 px-10"
              >
                <div class="flex w-full flex-col mb-12">
                  <!--Add Button -->
                  <Addbutton on:click={addField} color={"bg-yellow-500"}
                    ><span id="icon text-white" /><span
                      class="text-center w-full"
                      slot="text">TextField</span
                    ></Addbutton
                  >
                  <Addbutton on:click={addTextArea} color={"bg-purple-500"}
                    ><span id="icon text-white" /><span
                      class="text-center w-full"
                      slot="text">TextArea</span
                    ></Addbutton
                  >
                  <Addbutton on:click={addImage} color={"bg-pink-500"}
                    ><span id="icon text-white" /><span
                      class="text-center w-full"
                      slot="text">Image Field</span
                    ></Addbutton
                  >
                  <Addbutton on:click={addSmartObject} color={"bg-blue-500"}
                    ><span id="icon text-white" /><span
                      class="text-center w-full"
                      slot="text">Smart Object</span
                    ></Addbutton
                  >
                  <Addbutton on:click={addFolder} color={"bg-green-500"}
                    ><span id="icon text-white" /><span
                      class="text-center w-full"
                      slot="text">Add Folder</span
                    ></Addbutton
                  >
                </div>

                <!-- <textarea
                  bind:value={input_json}
                  name=""
                  id=""
                  cols="15"
                  rows="5"
                /> -->
                <!-- <Addbutton on:click={generateFields} color={"bg-gray-500"}>
                  <span id="icon text-white" /><span
                    class="text-center w-full"
                    slot="text">Generate Fields</span
                  >
                </Addbutton> -->
                <Addbutton on:click={runScrapper} color={"bg-gray-500"}
                  ><span id="icon text-white" /><span
                    class="text-center w-full"
                    slot="text">Generate</span
                  ></Addbutton
                >
                <Addbutton on:click={saveFields} color={"bg-gray-500"}
                  ><span id="icon text-white" /><span
                    class="text-center w-full"
                    slot="text">Save Fields</span
                  ></Addbutton
                >
              </div>
            {/if}
          {/if}

          <div class="m-4 w-4/5 px-10">
            {#key $inputarry}
              {#each $inputarry as input, i}
                {#if input.meta === "textfield"}
                  <Textfield
                    obj={$inputarry[i]}
                    {i}
                    on:removeField={handleRemoveField}
                  />
                {/if}

                {#if input.meta === "textarea"}
                  <Textarea
                    on:removeField={handleRemoveField}
                    obj={$inputarry[i]}
                    {i}
                  />
                {/if}

                {#if input.meta === "image_field"}
                  <Imagefield
                    on:removeField={handleRemoveField}
                    obj={$inputarry[i]}
                    {i}
                  />
                {/if}

                {#if input.meta === "repeater"}
                  <Repeater on:repeat={repeat} obj={$inputarry[i]} {i} />
                {/if}

                {#if input.meta === "smart_object"}
                  <Smartobject
                    on:activate={handleActivate}
                    on:deactivate={deactivate}
                    on:removeField={handleRemoveField}
                    on:removeSubField={handleRemoveSubField}
                    obj={$inputarry[i]}
                    {i}
                  />
                {/if}

                {#if input.meta === "folder"}
                  <Folder
                    on:activate={handleActivate}
                    on:deactivate={deactivate}
                    on:removeField={handleRemoveField}
                    on:removeSubField={handleRemoveSubField}
                    obj={$inputarry[i]}
                    {i}
                  />
                {/if}
              {/each}
            {/key}
            <!-- <pre
              class="text-xs text-white">{JSON.stringify($consol, null, 2)}</pre> -->
          </div>

          {#if !$dom.mode.design}
            {#if !dom.show_menu}
              <div
                transition:scale
                class="container mx-auto h-full w-1/5 flex flex-col px-10 justify-center items-center"
              >
                {#if $state.ai === !undefined}
                  <Addbutton on:click={newArtwork} color={"bg-yellow-500"}
                    ><span id="icon text-white" /><span
                      class="text-center w-full"
                      slot="text">New Artwork</span
                    ></Addbutton
                  >
                {/if}
                {#if $state.ai === undefined}
                  <Addbutton on:click={saveArtwork} color={"bg-yellow-500"}
                    ><span id="icon text-white" /><span
                      class="text-center w-full"
                      slot="text">Save Artwork</span
                    ></Addbutton
                  >
                {:else}
                  <Addbutton on:click={updateArtwork} color={"bg-yellow-500"}
                    ><span id="icon text-white" /><span
                      class="text-center w-full"
                      slot="text">Update Artwork</span
                    ></Addbutton
                  >
                {/if}
                {#if $state.pi === undefined}
                  <Addbutton on:click={publish} color={"bg-yellow-500"}
                    ><span id="icon text-white" /><span
                      class="text-center w-full"
                      slot="text">Publish</span
                    ></Addbutton
                  >
                {:else}
                  <Addbutton on:click={editPost} color={"bg-yellow-500"}
                    ><span id="icon text-white" /><span
                      class="text-center w-full"
                      slot="text">Update</span
                    ></Addbutton
                  >
                {/if}
                <Addbutton on:click={handleDownloadJson} color={"bg-yellow-500"}
                  ><span id="icon text-white" /><span
                    class="text-center w-full"
                    slot="text">Download JSON</span
                  ></Addbutton
                >
                <Addbutton on:click={saveFields} color={"bg-gray-500"}
                  ><span id="icon text-white" /><span
                    class="text-center w-full"
                    slot="text">Edit Fields</span
                  ></Addbutton
                >

                <Addbutton on:click={runRuka} color={"bg-gray-500"}
                  ><span id="icon text-white" /><span
                    class="text-center w-full"
                    slot="text">Ruka</span
                  ></Addbutton
                >
              </div>
            {/if}
          {/if}
        </div>
      </section>
    </div>
  </div>
</Nav>

<style global>
  @font-face {
    font-display: swap;
    font-family: Fira Mono;
    font-style: normal;
    font-weight: 400;
    src: url(/_app/assets/fira-mono-cyrillic-ext-400-normal-b3140dd3.woff2)
        format("woff2"),
      url(/_app/assets/fira-mono-all-400-normal-0d19eb5d.woff) format("woff");
    unicode-range: U+0460-052f, U+1c80-1c88, U+20b4, U+2de0-2dff, U+a640-a69f,
      U+fe2e-fe2f;
  }
  @font-face {
    font-display: swap;
    font-family: Fira Mono;
    font-style: normal;
    font-weight: 400;
    src: url(/_app/assets/fira-mono-cyrillic-400-normal-046b609f.woff2)
        format("woff2"),
      url(/_app/assets/fira-mono-all-400-normal-0d19eb5d.woff) format("woff");
    unicode-range: U+0400-045f, U+0490-0491, U+04b0-04b1, U+2116;
  }
  @font-face {
    font-display: swap;
    font-family: Fira Mono;
    font-style: normal;
    font-weight: 400;
    src: url(/_app/assets/fira-mono-greek-ext-400-normal-8659ae46.woff2)
        format("woff2"),
      url(/_app/assets/fira-mono-all-400-normal-0d19eb5d.woff) format("woff");
    unicode-range: U+1f??;
  }
  @font-face {
    font-display: swap;
    font-family: Fira Mono;
    font-style: normal;
    font-weight: 400;
    src: url(/_app/assets/fira-mono-greek-400-normal-1f8b3a07.woff2)
        format("woff2"),
      url(/_app/assets/fira-mono-all-400-normal-0d19eb5d.woff) format("woff");
    unicode-range: U+0370-03ff;
  }
  @font-face {
    font-display: swap;
    font-family: Fira Mono;
    font-style: normal;
    font-weight: 400;
    src: url(/_app/assets/fira-mono-latin-ext-400-normal-b6331a25.woff2)
        format("woff2"),
      url(/_app/assets/fira-mono-all-400-normal-0d19eb5d.woff) format("woff");
    unicode-range: U+0100-024f, U+0259, U+1e??, U+2020, U+20a0-20ab, U+20ad-20cf,
      U+2113, U+2c60-2c7f, U+a720-a7ff;
  }
  @font-face {
    font-display: swap;
    font-family: Fira Mono;
    font-style: normal;
    font-weight: 400;
    src: url(/_app/assets/fira-mono-latin-400-normal-a2f9dbe8.woff2)
        format("woff2"),
      url(/_app/assets/fira-mono-all-400-normal-0d19eb5d.woff) format("woff");
    unicode-range: U+00??, U+0131, U+0152-0153, U+02bb-02bc, U+02c6, U+02da,
      U+02dc, U+2000-206f, U+2074, U+20ac, U+2122, U+2191, U+2193, U+2212,
      U+2215, U+feff, U+fffd;
  }
  html {
    -webkit-text-size-adjust: 100%;
    line-height: 1.15;
    -moz-tab-size: 4;
    -o-tab-size: 4;
    tab-size: 4;
  }
  body {
    font-family: system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial,
      sans-serif, Apple Color Emoji, Segoe UI Emoji;
    margin: 0;
  }
  hr {
    color: inherit;
    height: 0;
  }
  abbr[title] {
    -webkit-text-decoration: underline dotted;
    text-decoration: underline dotted;
  }
  b,
  strong {
    font-weight: bolder;
  }
  code,
  kbd,
  pre,
  samp {
    font-family: ui-monospace, SFMono-Regular, Consolas, Liberation Mono, Menlo,
      monospace;
    font-size: 1em;
  }
  small {
    font-size: 80%;
  }
  sub,
  sup {
    font-size: 75%;
    line-height: 0;
    position: relative;
    vertical-align: baseline;
  }
  sub {
    bottom: -0.25em;
  }
  sup {
    top: -0.5em;
  }
  table {
    border-color: inherit;
    text-indent: 0;
  }
  button,
  input,
  optgroup,
  select,
  textarea {
    font-family: inherit;
    font-size: 100%;
    line-height: 1.15;
    margin: 0;
  }
  button,
  select {
    text-transform: none;
  }
  [type="button"],
  [type="reset"],
  [type="submit"],
  button {
    -webkit-appearance: button;
  }
  ::-moz-focus-inner {
    border-style: none;
    padding: 0;
  }
  :-moz-focusring {
    outline: 1px dotted ButtonText;
  }
  :-moz-ui-invalid {
    box-shadow: none;
  }
  legend {
    padding: 0;
  }
  progress {
    vertical-align: baseline;
  }
  ::-webkit-inner-spin-button,
  ::-webkit-outer-spin-button {
    height: auto;
  }
  [type="search"] {
    -webkit-appearance: textfield;
    outline-offset: -2px;
  }
  ::-webkit-search-decoration {
    -webkit-appearance: none;
  }
  ::-webkit-file-upload-button {
    -webkit-appearance: button;
    font: inherit;
  }
  summary {
    display: list-item;
  }
  blockquote,
  dd,
  dl,
  figure,
  h1,
  h2,
  h3,
  h4,
  h5,
  h6,
  hr,
  p,
  pre {
    margin: 0;
  }
  button {
    background-color: transparent;
    background-image: none;
  }
  fieldset,
  ol,
  ul {
    margin: 0;
    padding: 0;
  }
  ol,
  ul {
    list-style: none;
  }
  html {
    font-family: ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont,
      Segoe UI, Roboto, Helvetica Neue, Arial, Noto Sans, sans-serif,
      Apple Color Emoji, Segoe UI Emoji, Segoe UI Symbol, Noto Color Emoji;
    line-height: 1.5;
  }
  body {
    font-family: inherit;
    line-height: inherit;
  }
  *,
  :after,
  :before {
    border: 0 solid;
    box-sizing: border-box;
  }
  hr {
    border-top-width: 1px;
  }
  img {
    border-style: solid;
  }
  textarea {
    resize: vertical;
  }
  input::-moz-placeholder,
  textarea::-moz-placeholder {
    color: #9ca3af;
    opacity: 1;
  }
  input:-ms-input-placeholder,
  textarea:-ms-input-placeholder {
    color: #9ca3af;
    opacity: 1;
  }
  input::placeholder,
  textarea::placeholder {
    color: #9ca3af;
    opacity: 1;
  }
  [role="button"],
  button {
    cursor: pointer;
  }
  :-moz-focusring {
    outline: auto;
  }
  table {
    border-collapse: collapse;
  }
  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    font-size: inherit;
    font-weight: inherit;
  }
  a {
    color: inherit;
    text-decoration: inherit;
  }
  button,
  input,
  optgroup,
  select,
  textarea {
    color: inherit;
    line-height: inherit;
    padding: 0;
  }
  code,
  kbd,
  pre,
  samp {
    font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas,
      Liberation Mono, Courier New, monospace;
  }
  audio,
  canvas,
  embed,
  iframe,
  img,
  object,
  svg,
  video {
    display: block;
    vertical-align: middle;
  }
  img,
  video {
    height: auto;
    max-width: 100%;
  }
  [hidden] {
    display: none;
  }
  *,
  :after,
  :before {
    --tw-translate-x: 0;
    --tw-translate-y: 0;
    --tw-rotate: 0;
    --tw-skew-x: 0;
    --tw-skew-y: 0;
    --tw-scale-x: 1;
    --tw-scale-y: 1;
    --tw-transform: translateX(var(--tw-translate-x))
      translateY(var(--tw-translate-y)) rotate(var(--tw-rotate))
      skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x))
      scaleY(var(--tw-scale-y));
    --tw-border-opacity: 1;
    --tw-ring-inset: var(--tw-empty);
    --tw-ring-offset-width: 0px;
    --tw-ring-offset-color: #fff;
    --tw-ring-color: rgba(59, 130, 246, 0.5);
    --tw-ring-offset-shadow: 0 0 #0000;
    --tw-ring-shadow: 0 0 #0000;
    --tw-shadow: 0 0 #0000;
    --tw-blur: var(--tw-empty);
    --tw-brightness: var(--tw-empty);
    --tw-contrast: var(--tw-empty);
    --tw-grayscale: var(--tw-empty);
    --tw-hue-rotate: var(--tw-empty);
    --tw-invert: var(--tw-empty);
    --tw-saturate: var(--tw-empty);
    --tw-sepia: var(--tw-empty);
    --tw-drop-shadow: var(--tw-empty);
    --tw-filter: var(--tw-blur) var(--tw-brightness) var(--tw-contrast)
      var(--tw-grayscale) var(--tw-hue-rotate) var(--tw-invert)
      var(--tw-saturate) var(--tw-sepia) var(--tw-drop-shadow);
    border-color: rgba(229, 231, 235, var(--tw-border-opacity));
  }
  [multiple],
  [type="date"],
  [type="datetime-local"],
  [type="email"],
  [type="month"],
  [type="number"],
  [type="password"],
  [type="search"],
  [type="tel"],
  [type="text"],
  [type="time"],
  [type="url"],
  [type="week"],
  select,
  textarea {
    --tw-shadow: 0 0 #0000;
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
    background-color: #fff;
    border-color: #6b7280;
    border-radius: 0;
    border-width: 1px;
    font-size: 1rem;
    line-height: 1.5rem;
    padding: 0.5rem 0.75rem;
  }
  [multiple]:focus,
  [type="date"]:focus,
  [type="datetime-local"]:focus,
  [type="email"]:focus,
  [type="month"]:focus,
  [type="number"]:focus,
  [type="password"]:focus,
  [type="search"]:focus,
  [type="tel"]:focus,
  [type="text"]:focus,
  [type="time"]:focus,
  [type="url"]:focus,
  [type="week"]:focus,
  select:focus,
  textarea:focus {
    --tw-ring-inset: var(--tw-empty);
    --tw-ring-offset-width: 0px;
    --tw-ring-offset-color: #fff;
    --tw-ring-color: #2563eb;
    --tw-ring-offset-shadow: var(--tw-ring-inset) 0 0 0
      var(--tw-ring-offset-width) var(--tw-ring-offset-color);
    --tw-ring-shadow: var(--tw-ring-inset) 0 0 0
      calc(1px + var(--tw-ring-offset-width)) var(--tw-ring-color);
    border-color: #2563eb;
    box-shadow: var(--tw-ring-offset-shadow), var(--tw-ring-shadow),
      var(--tw-shadow);
    outline: 2px solid transparent;
    outline-offset: 2px;
  }
  input::-moz-placeholder,
  textarea::-moz-placeholder {
    color: #6b7280;
    opacity: 1;
  }
  input:-ms-input-placeholder,
  textarea:-ms-input-placeholder {
    color: #6b7280;
    opacity: 1;
  }
  input::placeholder,
  textarea::placeholder {
    color: #6b7280;
    opacity: 1;
  }
  ::-webkit-datetime-edit-fields-wrapper {
    padding: 0;
  }
  ::-webkit-date-and-time-value {
    min-height: 1.5em;
  }
  select {
    -webkit-print-color-adjust: exact;
    background-image: url("data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3E%3Cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='m6 8 4 4 4-4'/%3E%3C/svg%3E");
    background-position: right 0.5rem center;
    background-repeat: no-repeat;
    background-size: 1.5em 1.5em;
    color-adjust: exact;
    padding-right: 2.5rem;
  }
  [multiple] {
    -webkit-print-color-adjust: unset;
    background-image: none;
    background-position: 0 0;
    background-repeat: unset;
    background-size: initial;
    color-adjust: unset;
    padding-right: 0.75rem;
  }
  [type="checkbox"],
  [type="radio"] {
    -webkit-print-color-adjust: exact;
    --tw-shadow: 0 0 #0000;
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
    background-color: #fff;
    background-origin: border-box;
    border-color: #6b7280;
    border-width: 1px;
    color: #2563eb;
    color-adjust: exact;
    display: inline-block;
    flex-shrink: 0;
    height: 1rem;
    padding: 0;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
    vertical-align: middle;
    width: 1rem;
  }
  [type="checkbox"] {
    border-radius: 0;
  }
  [type="radio"] {
    border-radius: 100%;
  }
  [type="checkbox"]:focus,
  [type="radio"]:focus {
    --tw-ring-inset: var(--tw-empty);
    --tw-ring-offset-width: 2px;
    --tw-ring-offset-color: #fff;
    --tw-ring-color: #2563eb;
    --tw-ring-offset-shadow: var(--tw-ring-inset) 0 0 0
      var(--tw-ring-offset-width) var(--tw-ring-offset-color);
    --tw-ring-shadow: var(--tw-ring-inset) 0 0 0
      calc(2px + var(--tw-ring-offset-width)) var(--tw-ring-color);
    box-shadow: var(--tw-ring-offset-shadow), var(--tw-ring-shadow),
      var(--tw-shadow);
    outline: 2px solid transparent;
    outline-offset: 2px;
  }
  [type="checkbox"]:checked,
  [type="radio"]:checked {
    background-color: currentColor;
    background-position: 50%;
    background-repeat: no-repeat;
    background-size: 100% 100%;
    border-color: transparent;
  }
  [type="checkbox"]:checked {
    background-image: url("data:image/svg+xml;charset=utf-8,%3Csvg viewBox='0 0 16 16' fill='%23fff' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M12.207 4.793a1 1 0 0 1 0 1.414l-5 5a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L6.5 9.086l4.293-4.293a1 1 0 0 1 1.414 0z'/%3E%3C/svg%3E");
  }
  [type="radio"]:checked {
    background-image: url("data:image/svg+xml;charset=utf-8,%3Csvg viewBox='0 0 16 16' fill='%23fff' xmlns='http://www.w3.org/2000/svg'%3E%3Ccircle cx='8' cy='8' r='3'/%3E%3C/svg%3E");
  }
  [type="checkbox"]:checked:focus,
  [type="checkbox"]:checked:hover,
  [type="radio"]:checked:focus,
  [type="radio"]:checked:hover {
    background-color: currentColor;
    border-color: transparent;
  }
  [type="checkbox"]:indeterminate {
    background-color: currentColor;
    background-image: url("data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 16 16'%3E%3Cpath stroke='%23fff' stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M4 8h8'/%3E%3C/svg%3E");
    background-position: 50%;
    background-repeat: no-repeat;
    background-size: 100% 100%;
    border-color: transparent;
  }
  [type="checkbox"]:indeterminate:focus,
  [type="checkbox"]:indeterminate:hover {
    background-color: currentColor;
    border-color: transparent;
  }
  [type="file"] {
    background: unset;
    border-color: inherit;
    border-radius: 0;
    border-width: 0;
    font-size: unset;
    line-height: inherit;
    padding: 0;
  }
  [type="file"]:focus {
    outline: 1px auto -webkit-focus-ring-color;
  }
  @media (min-width: 720px) {
    h1 {
      font-size: 2.4rem;
    }
  }
  .container {
    width: 100%;
  }
  @media (min-width: 640px) {
    .container {
      max-width: 640px;
    }
  }
  @media (min-width: 768px) {
    .container {
      max-width: 768px;
    }
  }
  @media (min-width: 1024px) {
    .container {
      max-width: 1024px;
    }
  }
  @media (min-width: 1280px) {
    .container {
      max-width: 1280px;
    }
  }
  @media (min-width: 1536px) {
    .container {
      max-width: 1536px;
    }
  }
  .fixed {
    position: fixed;
  }
  .absolute {
    position: absolute;
  }
  .relative {
    position: relative;
  }
  .-top-4 {
    top: -1rem;
  }
  .-right-4 {
    right: -1rem;
  }
  .-top-6 {
    top: -1.5rem;
  }
  .bottom-0 {
    bottom: 0;
  }
  .right-0 {
    right: 0;
  }
  .left-4 {
    left: 1rem;
  }
  .z-0 {
    z-index: 0;
  }
  .z-10 {
    z-index: 10;
  }
  .float-right {
    float: right;
  }
  .m-8 {
    margin: 2rem;
  }
  .m-4 {
    margin: 1rem;
  }
  .mx-auto {
    margin-left: auto;
    margin-right: auto;
  }
  .my-2 {
    margin-bottom: 0.5rem;
    margin-top: 0.5rem;
  }
  .mb-4 {
    margin-bottom: 1rem;
  }
  .mt-20 {
    margin-top: 5rem;
  }
  .mb-5 {
    margin-bottom: 1.25rem;
  }
  .mb-6 {
    margin-bottom: 1.5rem;
  }
  .mb-3 {
    margin-bottom: 0.75rem;
  }
  .mt-3 {
    margin-top: 0.75rem;
  }
  .-mb-3 {
    margin-bottom: -0.75rem;
  }
  .-mt-2 {
    margin-top: -0.5rem;
  }
  .mb-8 {
    margin-bottom: 2rem;
  }
  .mt-1 {
    margin-top: 0.25rem;
  }
  .mt-10 {
    margin-top: 2.5rem;
  }
  .mb-12 {
    margin-bottom: 3rem;
  }
  .ml-8 {
    margin-left: 2rem;
  }
  .mt-8 {
    margin-top: 2rem;
  }
  .mt-4 {
    margin-top: 1rem;
  }
  .mr-3 {
    margin-right: 0.75rem;
  }
  .mb-16 {
    margin-bottom: 4rem;
  }
  .block {
    display: block;
  }
  .inline-block {
    display: inline-block;
  }
  .flex {
    display: flex;
  }
  .hidden {
    display: none;
  }
  .h-full {
    height: 100%;
  }
  .h-4 {
    height: 1rem;
  }
  .h-10 {
    height: 2.5rem;
  }
  .h-3 {
    height: 0.75rem;
  }
  .h-8 {
    height: 2rem;
  }
  .h-6 {
    height: 1.5rem;
  }
  .h-5 {
    height: 1.25rem;
  }
  .h-screen {
    height: 100vh;
  }
  .min-h-full {
    min-height: 100%;
  }
  .w-1\/4 {
    width: 25%;
  }
  .w-3\/4 {
    width: 75%;
  }
  .w-full {
    width: 100%;
  }
  .w-1\/5 {
    width: 20%;
  }
  .w-4\/5 {
    width: 80%;
  }
  .w-4 {
    width: 1rem;
  }
  .w-1\/12 {
    width: 8.333333%;
  }
  .w-11\/12 {
    width: 91.666667%;
  }
  .w-3 {
    width: 0.75rem;
  }
  .w-8 {
    width: 2rem;
  }
  .w-6 {
    width: 1.5rem;
  }
  .w-5 {
    width: 1.25rem;
  }
  .w-1\/2 {
    width: 50%;
  }
  .rotate-45 {
    --tw-rotate: 45deg;
  }
  .rotate-45,
  .transform {
    transform: var(--tw-transform);
  }
  .appearance-none {
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
  }
  .flex-row {
    flex-direction: row;
  }
  .flex-col {
    flex-direction: column;
  }
  .flex-col-reverse {
    flex-direction: column-reverse;
  }
  .items-center {
    align-items: center;
  }
  .justify-end {
    justify-content: flex-end;
  }
  .justify-center {
    justify-content: center;
  }
  .justify-between {
    justify-content: space-between;
  }
  .rounded-3xl {
    border-radius: 1.5rem;
  }
  .rounded-full {
    border-radius: 9999px;
  }
  .rounded-lg {
    border-radius: 0.5rem;
  }
  .rounded-md {
    border-radius: 0.375rem;
  }
  .rounded {
    border-radius: 0.25rem;
  }
  .rounded-xl {
    border-radius: 0.75rem;
  }
  .border {
    border-width: 1px;
  }
  .border-0 {
    border-width: 0;
  }
  .border-2 {
    border-width: 2px;
  }
  .border-4 {
    border-width: 4px;
  }
  .border-b {
    border-bottom-width: 1px;
  }
  .border-b-2 {
    border-bottom-width: 2px;
  }
  .border-dashed {
    border-style: dashed;
  }
  .border-gray-700 {
    --tw-border-opacity: 1;
    border-color: rgba(55, 65, 81, var(--tw-border-opacity));
  }
  .border-red-600 {
    --tw-border-opacity: 1;
    border-color: rgba(220, 38, 38, var(--tw-border-opacity));
  }
  .border-gray-400 {
    --tw-border-opacity: 1;
    border-color: rgba(156, 163, 175, var(--tw-border-opacity));
  }
  .border-green-700 {
    --tw-border-opacity: 1;
    border-color: rgba(4, 120, 87, var(--tw-border-opacity));
  }
  .border-blue-700 {
    --tw-border-opacity: 1;
    border-color: rgba(29, 78, 216, var(--tw-border-opacity));
  }
  .border-gray-600 {
    --tw-border-opacity: 1;
    border-color: rgba(75, 85, 99, var(--tw-border-opacity));
  }
  .border-white {
    --tw-border-opacity: 1;
    border-color: rgba(255, 255, 255, var(--tw-border-opacity));
  }
  .bg-gray-400 {
    --tw-bg-opacity: 1;
    background-color: rgba(156, 163, 175, var(--tw-bg-opacity));
  }
  .bg-gray-900 {
    --tw-bg-opacity: 1;
    background-color: rgba(17, 24, 39, var(--tw-bg-opacity));
  }
  .bg-red-500 {
    --tw-bg-opacity: 1;
    background-color: rgba(239, 68, 68, var(--tw-bg-opacity));
  }
  .bg-yellow-300 {
    --tw-bg-opacity: 1;
    background-color: rgba(252, 211, 77, var(--tw-bg-opacity));
  }
  .bg-red-200 {
    --tw-bg-opacity: 1;
    background-color: rgba(254, 202, 202, var(--tw-bg-opacity));
  }
  .bg-gray-800 {
    --tw-bg-opacity: 1;
    background-color: rgba(31, 41, 55, var(--tw-bg-opacity));
  }
  .bg-pink-200 {
    --tw-bg-opacity: 1;
    background-color: rgba(251, 207, 232, var(--tw-bg-opacity));
  }
  .bg-transparent {
    background-color: transparent;
  }
  .bg-pink-400 {
    --tw-bg-opacity: 1;
    background-color: rgba(244, 114, 182, var(--tw-bg-opacity));
  }
  .bg-pink-500 {
    --tw-bg-opacity: 1;
    background-color: rgba(236, 72, 153, var(--tw-bg-opacity));
  }
  .bg-green-700 {
    --tw-bg-opacity: 1;
    background-color: rgba(4, 120, 87, var(--tw-bg-opacity));
  }
  .bg-blue-700 {
    --tw-bg-opacity: 1;
    background-color: rgba(29, 78, 216, var(--tw-bg-opacity));
  }
  .bg-blue-200 {
    --tw-bg-opacity: 1;
    background-color: rgba(191, 219, 254, var(--tw-bg-opacity));
  }
  .bg-white {
    --tw-bg-opacity: 1;
    background-color: rgba(255, 255, 255, var(--tw-bg-opacity));
  }
  .bg-blue-400 {
    --tw-bg-opacity: 1;
    background-color: rgba(96, 165, 250, var(--tw-bg-opacity));
  }
  .bg-purple-200 {
    --tw-bg-opacity: 1;
    background-color: rgba(221, 214, 254, var(--tw-bg-opacity));
  }
  .bg-purple-400 {
    --tw-bg-opacity: 1;
    background-color: rgba(167, 139, 250, var(--tw-bg-opacity));
  }
  .bg-purple-500 {
    --tw-bg-opacity: 1;
    background-color: rgba(139, 92, 246, var(--tw-bg-opacity));
  }
  .bg-yellow-200 {
    --tw-bg-opacity: 1;
    background-color: rgba(253, 230, 138, var(--tw-bg-opacity));
  }
  .bg-yellow-400 {
    --tw-bg-opacity: 1;
    background-color: rgba(251, 191, 36, var(--tw-bg-opacity));
  }
  .bg-yellow-500 {
    --tw-bg-opacity: 1;
    background-color: rgba(245, 158, 11, var(--tw-bg-opacity));
  }
  .bg-gray-700 {
    --tw-bg-opacity: 1;
    background-color: rgba(55, 65, 81, var(--tw-bg-opacity));
  }
  .bg-blue-500 {
    --tw-bg-opacity: 1;
    background-color: rgba(59, 130, 246, var(--tw-bg-opacity));
  }
  .bg-gray-500 {
    --tw-bg-opacity: 1;
    background-color: rgba(107, 114, 128, var(--tw-bg-opacity));
  }
  .bg-gray-200 {
    --tw-bg-opacity: 1;
    background-color: rgba(229, 231, 235, var(--tw-bg-opacity));
  }
  .bg-yellow-700 {
    --tw-bg-opacity: 1;
    background-color: rgba(180, 83, 9, var(--tw-bg-opacity));
  }
  .bg-green-200 {
    --tw-bg-opacity: 1;
    background-color: rgba(167, 243, 208, var(--tw-bg-opacity));
  }
  .bg-gray-100 {
    --tw-bg-opacity: 1;
    background-color: rgba(243, 244, 246, var(--tw-bg-opacity));
  }
  .p-5 {
    padding: 1.25rem;
  }
  .p-2 {
    padding: 0.5rem;
  }
  .p-4 {
    padding: 1rem;
  }
  .p-1 {
    padding: 0.25rem;
  }
  .p-3 {
    padding: 0.75rem;
  }
  .p-0 {
    padding: 0;
  }
  .p-8 {
    padding: 2rem;
  }
  .py-1 {
    padding-bottom: 0.25rem;
    padding-top: 0.25rem;
  }
  .px-3 {
    padding-left: 0.75rem;
    padding-right: 0.75rem;
  }
  .py-2 {
    padding-bottom: 0.5rem;
    padding-top: 0.5rem;
  }
  .py-10 {
    padding-bottom: 2.5rem;
    padding-top: 2.5rem;
  }
  .px-7 {
    padding-left: 1.75rem;
    padding-right: 1.75rem;
  }
  .py-3 {
    padding-bottom: 0.75rem;
    padding-top: 0.75rem;
  }
  .px-10 {
    padding-left: 2.5rem;
    padding-right: 2.5rem;
  }
  .px-2 {
    padding-left: 0.5rem;
    padding-right: 0.5rem;
  }
  .px-6 {
    padding-left: 1.5rem;
    padding-right: 1.5rem;
  }
  .pl-2 {
    padding-left: 0.5rem;
  }
  .pl-4 {
    padding-left: 1rem;
  }
  .pr-2 {
    padding-right: 0.5rem;
  }
  .pr-12 {
    padding-right: 3rem;
  }
  .text-center {
    text-align: center;
  }
  .align-baseline {
    vertical-align: baseline;
  }
  .font-sans {
    font-family: ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont,
      Segoe UI, Roboto, Helvetica Neue, Arial, Noto Sans, sans-serif,
      Apple Color Emoji, Segoe UI Emoji, Segoe UI Symbol, Noto Color Emoji;
  }
  .text-2xl {
    font-size: 1.5rem;
    line-height: 2rem;
  }
  .text-xl {
    font-size: 1.25rem;
    line-height: 1.75rem;
  }
  .text-sm {
    font-size: 0.875rem;
    line-height: 1.25rem;
  }
  .text-xs {
    font-size: 0.75rem;
    line-height: 1rem;
  }
  .text-4xl {
    font-size: 2.25rem;
    line-height: 2.5rem;
  }
  .text-7xl {
    font-size: 4.5rem;
    line-height: 1;
  }
  .font-bold {
    font-weight: 700;
  }
  .font-medium {
    font-weight: 500;
  }
  .leading-none {
    line-height: 1;
  }
  .text-gray-200 {
    --tw-text-opacity: 1;
    color: rgba(229, 231, 235, var(--tw-text-opacity));
  }
  .text-gray-300 {
    --tw-text-opacity: 1;
    color: rgba(209, 213, 219, var(--tw-text-opacity));
  }
  .text-pink-500 {
    --tw-text-opacity: 1;
    color: rgba(236, 72, 153, var(--tw-text-opacity));
  }
  .text-yellow-500 {
    --tw-text-opacity: 1;
    color: rgba(245, 158, 11, var(--tw-text-opacity));
  }
  .text-white {
    --tw-text-opacity: 1;
    color: rgba(255, 255, 255, var(--tw-text-opacity));
  }
  .text-green-600 {
    --tw-text-opacity: 1;
    color: rgba(5, 150, 105, var(--tw-text-opacity));
  }
  .text-red-600 {
    --tw-text-opacity: 1;
    color: rgba(220, 38, 38, var(--tw-text-opacity));
  }
  .text-pink-900 {
    --tw-text-opacity: 1;
    color: rgba(131, 24, 67, var(--tw-text-opacity));
  }
  .text-gray-400 {
    --tw-text-opacity: 1;
    color: rgba(156, 163, 175, var(--tw-text-opacity));
  }
  .text-purple-900 {
    --tw-text-opacity: 1;
    color: rgba(76, 29, 149, var(--tw-text-opacity));
  }
  .text-yellow-900 {
    --tw-text-opacity: 1;
    color: rgba(120, 53, 15, var(--tw-text-opacity));
  }
  .text-yellow-600 {
    --tw-text-opacity: 1;
    color: rgba(217, 119, 6, var(--tw-text-opacity));
  }
  .text-red-700 {
    --tw-text-opacity: 1;
    color: rgba(185, 28, 28, var(--tw-text-opacity));
  }
  .no-underline {
    text-decoration: none;
  }
  .shadow-lg {
    --tw-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1),
      0 4px 6px -2px rgba(0, 0, 0, 0.05);
  }
  .shadow,
  .shadow-lg {
    box-shadow: var(--tw-ring-offset-shadow, 0 0 #0000),
      var(--tw-ring-shadow, 0 0 #0000), var(--tw-shadow);
  }
  .shadow {
    --tw-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06);
  }
  .outline-none {
    outline: 2px solid transparent;
    outline-offset: 2px;
  }
  .ring-0 {
    --tw-ring-offset-shadow: var(--tw-ring-inset) 0 0 0
      var(--tw-ring-offset-width) var(--tw-ring-offset-color);
    --tw-ring-shadow: var(--tw-ring-inset) 0 0 0
      calc(var(--tw-ring-offset-width)) var(--tw-ring-color);
    box-shadow: var(--tw-ring-offset-shadow), var(--tw-ring-shadow),
      var(--tw-shadow, 0 0 #0000);
  }
  .drop-shadow {
    --tw-drop-shadow: drop-shadow(0 1px 2px rgba(0, 0, 0, 0.1))
      drop-shadow(0 1px 1px rgba(0, 0, 0, 0.06));
  }
  .drop-shadow,
  .filter {
    filter: var(--tw-filter);
  }
  .transition {
    transition-duration: 0.15s;
    transition-property: background-color, border-color, color, fill, stroke,
      opacity, box-shadow, transform, filter, -webkit-backdrop-filter;
    transition-property: background-color, border-color, color, fill, stroke,
      opacity, box-shadow, transform, filter, backdrop-filter;
    transition-property: background-color, border-color, color, fill, stroke,
      opacity, box-shadow, transform, filter, backdrop-filter,
      -webkit-backdrop-filter;
    transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  }
  .hover\:bg-gray-700:hover {
    --tw-bg-opacity: 1;
    background-color: rgba(55, 65, 81, var(--tw-bg-opacity));
  }
  .hover\:bg-red-600:hover {
    --tw-bg-opacity: 1;
    background-color: rgba(220, 38, 38, var(--tw-bg-opacity));
  }
  .hover\:bg-gray-400:hover {
    --tw-bg-opacity: 1;
    background-color: rgba(156, 163, 175, var(--tw-bg-opacity));
  }
  .hover\:bg-yellow-500:hover {
    --tw-bg-opacity: 1;
    background-color: rgba(245, 158, 11, var(--tw-bg-opacity));
  }
  .hover\:text-white:hover {
    --tw-text-opacity: 1;
    color: rgba(255, 255, 255, var(--tw-text-opacity));
  }
  .hover\:text-gray-900:hover {
    --tw-text-opacity: 1;
    color: rgba(17, 24, 39, var(--tw-text-opacity));
  }
  .focus\:border-0:focus {
    border-width: 0;
  }
  .focus\:shadow-lg:focus {
    --tw-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1),
      0 4px 6px -2px rgba(0, 0, 0, 0.05);
  }
  .focus\:shadow-lg:focus,
  .focus\:shadow-md:focus {
    box-shadow: var(--tw-ring-offset-shadow, 0 0 #0000),
      var(--tw-ring-shadow, 0 0 #0000), var(--tw-shadow);
  }
  .focus\:shadow-md:focus {
    --tw-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1),
      0 2px 4px -1px rgba(0, 0, 0, 0.06);
  }
  .focus\:outline-none:focus {
    outline: 2px solid transparent;
    outline-offset: 2px;
  }
  .focus\:ring-0:focus {
    --tw-ring-offset-shadow: var(--tw-ring-inset) 0 0 0
      var(--tw-ring-offset-width) var(--tw-ring-offset-color);
    --tw-ring-shadow: var(--tw-ring-inset) 0 0 0
      calc(var(--tw-ring-offset-width)) var(--tw-ring-color);
  }
  .focus\:ring-0:focus,
  .focus\:ring:focus {
    box-shadow: var(--tw-ring-offset-shadow), var(--tw-ring-shadow),
      var(--tw-shadow, 0 0 #0000);
  }
  .focus\:ring:focus {
    --tw-ring-offset-shadow: var(--tw-ring-inset) 0 0 0
      var(--tw-ring-offset-width) var(--tw-ring-offset-color);
    --tw-ring-shadow: var(--tw-ring-inset) 0 0 0
      calc(3px + var(--tw-ring-offset-width)) var(--tw-ring-color);
  }
  .focus\:ring-pink-700:focus {
    --tw-ring-opacity: 1;
    --tw-ring-color: rgba(190, 24, 93, var(--tw-ring-opacity));
  }
  .focus\:ring-blue-700:focus {
    --tw-ring-opacity: 1;
    --tw-ring-color: rgba(29, 78, 216, var(--tw-ring-opacity));
  }
  .focus\:ring-purple-700:focus {
    --tw-ring-opacity: 1;
    --tw-ring-color: rgba(109, 40, 217, var(--tw-ring-opacity));
  }
  .focus\:ring-yellow-700:focus {
    --tw-ring-opacity: 1;
    --tw-ring-color: rgba(180, 83, 9, var(--tw-ring-opacity));
  }
  .group:hover .group-hover\:flex {
    display: flex;
  }
  @media (min-width: 768px) {
    .md\:right-0 {
      right: 0;
    }
    .md\:mt-0 {
      margin-top: 0;
    }
    .md\:-ml-8 {
      margin-left: -2rem;
    }
    .md\:flex {
      display: flex;
    }
    .md\:w-3\/5 {
      width: 60%;
    }
    .md\:w-2\/5 {
      width: 40%;
    }
    .md\:max-w-md {
      max-width: 28rem;
    }
    .md\:flex-row {
      flex-direction: row;
    }
    .md\:pr-7 {
      padding-right: 1.75rem;
    }
    .md\:pt-4 {
      padding-top: 1rem;
    }
  }
  @media (min-width: 1024px) {
    .lg\:relative {
      position: relative;
    }
    .lg\:z-0 {
      z-index: 0;
    }
    .lg\:z-10 {
      z-index: 10;
    }
    .lg\:p-6 {
      padding: 1.5rem;
    }
    .lg\:text-2xl {
      font-size: 1.5rem;
      line-height: 2rem;
    }
  }
</style>
