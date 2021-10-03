<script lang="ts">
  import Input from "$lib/Input.svelte";
  import { browser } from '$app/env';

  let spectatorLink = ""
  let blueLink = ""
  let redLink = ""

  if (browser) {
    function uuidv4() {
      return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
      });
    }
    const code = uuidv4()

    spectatorLink = window.location.protocol + "//" + window.location.host + "/spectator/" + code
    blueLink = window.location.protocol + "//" + window.location.host + "/captain/" + code + "_100"
    redLink = window.location.protocol + "//" + window.location.host + "/captain/" + code + "_200"
  }
</script>

<div style="margin: auto 0;"></div>
<h1>Your Room Links</h1>
<p>Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua.</p>

<h4>Spectator</h4>
<Input bind:value={spectatorLink} placeholder="Link for Spectator" disabled readonly />

<h4>Team 1</h4>
<Input value={blueLink} placeholder="Link for Spectator" disabled readonly />

<h4>Team 2</h4>
<Input value={redLink} placeholder="Link for Spectator" disabled readonly />

<style>
	p {
		text-align: center;
		font-size: 20px;
		margin: 2rem 10rem;
	}

  h4:not(:first-of-type) {
    margin-top: 1rem;
  }
</style>