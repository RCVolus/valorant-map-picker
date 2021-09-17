<script lang="ts">
  import Line from "./Line.svelte"
</script>

<footer>
  <Line big />
  <img src="img/rcv-grau.png" width="130" alt="RCV Logo" class="logo">
  <Line />
</footer>

<style>
  footer {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .logo {
    margin: 1rem 2rem;
  }
</style>