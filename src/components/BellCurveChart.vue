<template>
  <div style="position: absolute; top: 25%; z-index: -99" class="hello">
    <canvas id="myCanvas"></canvas>
    <div class="label label1">Stage A</div>
    <div class="label label2">Stage B</div>
    <div class="label label3">Stage C</div>
  </div>
</template>

<script>
export default {
  name: "HelloWorld",
  props: {
    msg: String,
  },
  data() {
    return {
      c: null,
      ctx: null,
      activeDotIndex: -1,
    };
  },
  mounted() {
    this.redrawBellCurve();
    window.addEventListener("resize", () => {
      this.c.width = window.innerWidth;
      this.c.height = window.innerHeight;
      this.redrawBellCurve();
    });
  },
  methods: {
    redrawBellCurve() {
      this.c = document.getElementById("myCanvas");
      this.ctx = this.c.getContext("2d");

      // Set canvas dimensions to match the viewport
      this.c.width = window.innerWidth;
      this.c.height = window.innerHeight / 2;

      // Define the parameters of the bell curve
      const mean = this.c.width / 2; // Center of the canvas
      const stdDev = this.c.width / 12; // Adjust this value to change the slope

      // Scale factor for the y-axis (vertical stretching)
      const yScale = 2; // Adjust this value to control the vertical size of the curve
      const section1Boundary = 30; // First section ends at 30% of canvas width
      const section2Boundary = 70; // Second section ends at 70% of canvas width

      this.ctx.beginPath();

      for (let x = 0; x < this.c.width; x++) {
        // Calculate the corresponding y-coordinate based on the normal distribution formula
        const y =
          this.c.height / 2 -
          Math.exp(-((x - mean) ** 2) / (2 * stdDev ** 2)) *
            (this.c.height / 6) *
            yScale;

        if (x === 0) {
          this.ctx.moveTo(x, y);
        } else {
          this.ctx.lineTo(x, y);
        }
      }

      this.ctx.stroke();

      const section1X = (this.c.width * section1Boundary) / 100;
      const section2X = (this.c.width * section2Boundary) / 100;

      this.ctx.strokeStyle = "purple"; // Set line color to red
      this.ctx.lineWidth = 2; // Set line width

      this.ctx.beginPath();
      this.ctx.moveTo(section1X, 0);
      this.ctx.lineTo(section1X, this.c.height);
      this.ctx.moveTo(section2X, 0);
      this.ctx.lineTo(section2X, this.c.height);
      this.ctx.stroke();
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
.label {
  position: absolute;
  top: 100%; /* Adjust the vertical position as needed */
  transform: translateY(-50%);
  width: 100px; /* Adjust the width as needed */
  text-align: center;
  background-color: #ccc;
  padding: 10px;
}

.label1 {
  left: 10%; /* Adjust the percentage position */
}

.label2 {
  left: 45%; /* Adjust the percentage position */
}

.label3 {
  right: 7%; /* Adjust the percentage position */
}
</style>
