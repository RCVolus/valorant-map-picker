<script lang="ts">
  import { selectedMap, banned, picked } from "../store"

  export let src : string
  export let name : string
  export let uuid : string

  function selectMap () {
    if ($selectedMap === uuid) {
      selectedMap.set(undefined)
    } else {
      selectedMap.set(uuid)
    }
  }
</script>

<div class="map" 
class:selected={$selectedMap === uuid}
class:banned={$banned.includes(uuid)}
class:picked={$picked.includes(uuid)}
on:click={selectMap}>
  <div class="text">
    <p>{$banned.includes(uuid) ? "Banned" : $picked.includes(uuid) ? `Round ${$picked.indexOf(uuid)}` : ""}</p>
    <h2>{name}</h2>
  </div>
  <div class="img-conatiner">
    <img {src} alt={name}>
  </div>
</div>

<style>
  .map {
    display: block;
    pointer-events: all;
    cursor: pointer;
    min-width: 200px;
    max-width: 250px;
    flex-grow: 1;
    height: auto;
    background: rgb(118, 128, 121);
    position: relative;
    --border-width: 3px;
    z-index: 1;
  }

  .map:hover::before,
  .map:hover::after {
    transform: scaleY(1);
  }

  .map::before,
  .map::after {
    content: '';
    position: absolute;
    left: -10px;
    border-color: rgb(118, 128, 121);
    border-style: solid;
    width: calc(100% + 20px);
    height: 50%;
    transform-origin: center;
    transform: scaleY(0);
    transition: transform 0.3s ease;
  }

  .map::before {
    top: -15px;
    border-width: var(--border-width) var(--border-width) 0;
  }

  .map::after {
    bottom: -15px;
    border-width: 0 var(--border-width) var(--border-width);
  }

  .map.selected .img-conatiner::before {
    background: linear-gradient(to bottom, rgba(255,70,85,0), rgba(255,70,85,.25));
  }

  .img-conatiner {
    overflow: hidden;
    position: relative;
    height: 100%;
    width: 100%;
  }

  .img-conatiner::before {
    content: '';
    width: 100%;
    height: 100%;
    left: 0;
    top: 0;
    position: absolute;
    background: linear-gradient(to bottom, rgba(0,0,0,0), rgba(0,0,0,.45));
    z-index: 5;
  }

  .banned .img-conatiner img {
    filter: grayscale(0.9);
  }

  img {
    position: absolute;
    height: 100%;
    object-fit: cover;
    left: 50%;
    transform: translateX(-50%);
  }

  .text {
    position: absolute;
    text-align: center;
    width: 100%;
    left: 0;
    bottom: 25px;
    z-index: 10;
  }

  p {
    color: rgb(236, 232, 225);
    font-size: 2rem;
    font-weight: 800;
  }

  .banned p {
    color: rgb(255, 70, 85);
  }

  .picked p {
    color: rgb(251, 251, 66);
  }

  h2 {
    color: rgb(236, 232, 225);
    line-height: 1;
  }
</style>