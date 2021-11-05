<script>
  import { state } from "../app/store";

  let loading = false;

  let err = false;
  let succ = false;
  let password = "";
  let username = "";
  let regUsername = "";
  let regPassword = "";
  let displayName = "";
  let email = "";
  let logres;

  async function login() {
    let body = { username: username, password: password };
    let res = await fetch(`${$state.rest}/jwt-auth/v1/token`, {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
    const data = await res.json();
    logres = data;

    localStorage.setItem("token", JSON.stringify(data.token));
    let chitoro = localStorage.getItem("token");
    let tkn = JSON.parse(chitoro);
    logres = tkn;

    // If login is successful

    if (res.status === 200) {
      // Redirect

      setTimeout(() => {
        // window.location = "/";
      }, 2000);
      // Show Success Message
      succ = true;
    } else {
      setTimeout(() => {
        //  window.location = "/auth/login";
      }, 2000);
      // Show Error Message
      err = true;
    }
  }

  async function testPost() {
    let body = {
      username: regUsername,
      email: email,
      password: regPassword,
      role: "contributor",
    };
    const res = await fetch("/auth/login/register", {
      method: "POST",
      body: JSON.stringify(body),
    });
    const data = await res.json();
    console.log(data.body.message);

    return {
      props: {
        data,
      },
    };
  }
</script>

<section class="bg-grey-lighter h-screen font-sans">
  <div class=" ml-8  mt-8">
    <h1 class=" mb-6 text-7xl ">Login</h1>
  </div>
  <div class="container mx-auto h-full flex justify-center items-center">
    <div class="w-1/2 h-full">
      <div
        class="border-teal p-8 border-t-12 bg-white mb-6 rounded-lg shadow-lg"
      >
        <div class="mb-4">
          <input
            bind:value={username}
            type="text"
            class="block appearance-none bg-gray-200 w-full  text-2xl border border-grey-light hover:border-grey px-2 py-2 rounded shadow"
            placeholder="Username"
          />
        </div>

        <div class="mb-4">
          <input
            bind:value={password}
            type="password"
            class="block appearance-none w-full  border text-2xl border-grey-light hover:border-grey px-2 py-2 bg-gray-200 rounded shadow"
            placeholder="Password"
          />
        </div>

        {#if err}
          <div class="flex items-center justify-between">
            <span
              class="no-underline inline-block align-baseline font-bold text-sm text-red-600 hover:text-blue-dark float-right my-2"
            >
              An error has occured Check your fields.
            </span>
          </div>
        {/if}
        <div>
          <button
            on:click={login}
            class="bg-yellow-700 hover:bg-gray-400 hover:text-gray-900 text-2xl text-white py-2 px-7 rounded"
          >
            Login
          </button>
        </div>
        <div class="text-center">
          <p class="text-grey-dark text-sm mt-4">
            Don't Have an account? <a
              href="#"
              class="no-underline text-yellow-600 font-bold"
              >Create an Account</a
            >.
          </p>
        </div>

        {#if succ}
          <div
            class="flex items-center justify-center mx-auto md:max-w-md w-full bg-green-200 rounded m-4 shadow-lg text text-green-600 p-1 mb:p-2"
          >
            <div
              class="p-2 border-green-700 border-2 mr-3 rounded-full flex justify-center items-center"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="mb:h-8 mb:w-8 h-4 w-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5"
                />
              </svg>
            </div>

            <span class="text-xl"> Login successfull </span>
          </div>
        {/if}
      </div>
      <pre
        class="text-white text-xs">
            {JSON.stringify(logres, null, 2)}
        </pre>
    </div>
  </div>
</section>

<div class="mx-auto p-5 md:max-w-md w-full bg-gray-100 rounded mb-16 shadow-lg">
  <h3 class="text-center text-2xl mb-5">Register</h3>
  <input
    bind:value={regUsername}
    class="w-full rounded mb-5"
    placeholder="Username"
    type="text"
  />
  <input
    bind:value={displayName}
    class="w-full rounded mb-5"
    placeholder="Display Name"
    type="text"
  />
  <input
    bind:value={email}
    class="w-full rounded mb-5"
    placeholder="Email"
    type="text"
  />
  <input
    bind:value={regPassword}
    class="w-full rounded mb-5"
    placeholder="Password"
    type="password"
  />
  <span class="text-red-700 block mb-5">Error, I think pane zvaitika</span>

  <!-- {#if login} -->
  <button
    on:click={login}
    class="px-6 py-2 text-white rounded bg-yellow-700 hover:bg-yellow-500"
  >
    Login
  </button>
  <!-- {:else} -->
  <button
    on:click={testPost}
    class="px-6 py-2 text-white rounded bg-yellow-700 hover:bg-yellow-500"
    >Register
  </button>
  <!-- {/if} -->
</div>
