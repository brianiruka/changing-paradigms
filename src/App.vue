<template>
  <div id="app">
    <draggable-dot></draggable-dot>
    <BellCurveChart msg="Bell" />
  </div>
</template>

<script>
import BellCurveChart from "./components/BellCurveChart.vue";
import DraggableDot from "./components/DraggableDot.vue";

export default {
  name: "App",
  components: {
    BellCurveChart,
    DraggableDot,
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
