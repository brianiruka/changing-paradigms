<template>
  <div>
    <button @click="addDot">Add a Dot</button>
    <input
      v-if="showLabelInput"
      v-model="labelInput"
      @blur="saveLabel"
      @keyup.enter="saveLabel"
      placeholder="Enter label"
    />
    <div
      v-for="(dot, index) in dots"
      :key="index"
      class="draggable-dot"
      @mousedown="startDrag(index, $event)"
      @dblclick="startLabelEditing(index)"
      :style="{
        left: dot.x + '%',
        top: dot.y + '%',
        backgroundColor: dot.backgroundColor,
        display: dot.userId == userId ? 'block' : dot.public ? 'block' : 'none',
      }"
    >
      <div class="dot-label" style="position: absolute; bottom: 20px">
        {{ dot.label }}
      </div>
    </div>
  </div>
</template>

<script>
import io from "socket.io-client";
const socket = io("/socket:3000"); // Replace with your server address

export default {
  data() {
    return {
      dots: [],
      dragging: false,
      activeDotIndex: -1,
      showLabelInput: false,
      labelInput: "",
      editingIndex: null,
      userId: null,
      draggingDotIndex: null,
      dotColor: null,
    };
  },
  created() {
    this.userId = Math.random().toString(36).substr(2, 9);
    this.dotColor = `rgb(${Math.random() * 255}, ${Math.random() * 255}, ${
      Math.random() * 255
    })`;
    socket.on("initDots", (allDots) => {
      console.log("init");
      // Add all dots from allDots to this.dots array
      this.dots = [...allDots];
    });
    socket.on("addDot", (newDot) => {
      // Handle the received new dot data here
      if (newDot.userId !== this.userId) {
        // Handle the received new dot data here
        this.dots.push(newDot);
      }
    });
    socket.on("save-label", (updatedDot) => {
      // Handle the received new dot data here

      if (updatedDot.userId !== this.userId) {
        // Handle the received new dot data here
        let foundDot = this.dots.find((dot) => dot.dotId === updatedDot.dotId);
        foundDot.label = updatedDot.label;
      }
    });

    socket.on("make-public", (updatedDot) => {
      // Handle the received new dot data here
      if (updatedDot.userId !== this.userId) {
        // Handle the received new dot data here
        let foundDot = this.dots.find((dot) => dot.dotId === updatedDot.dotId);
        foundDot.public = updatedDot.public;
      }
    });

    // Listen for the "drag" event from the server
    socket.on("drag", (draggedDot) => {
      // Handle the received updated dot data here
      if (draggedDot.userId !== this.userId) {
        // Handle the received new dot data here
        let foundDot = this.dots.find((dot) => dot.dotId === draggedDot.dotId);
        foundDot.x = draggedDot.x;
        foundDot.y = draggedDot.y;
      }
      // Update your Vue component's data or perform other actions
    });
  },
  methods: {
    addDot() {
      // Add a new dot to the list of dots

      const randomX = Math.floor(Math.random() * (90 - 10 + 1)) + 10;

      const newDot = {
        x: randomX,
        y: 10,
        label: "",
        backgroundColor: this.dotColor,
        userId: this.userId,
        dotId: Math.random().toString(36).substr(2, 9),
        public: false,
      };
      this.dots.push(newDot);
      socket.emit("addDot", newDot);
    },
    startDrag(index) {
      const dot = this.dots[index];

      // Start dragging the dot
      if (dot.userId !== this.userId) {
        return;
      }
      if (!dot.public) {
        dot.public = true;
        socket.emit("make-public", dot);
      }
      console.log("start drag");

      this.dragging = true;
      this.activeDotIndex = index;
      this.draggingDotIndex = index;

      // Calculate the initial offset from the mouse cursor to the dot's position

      // Register mousemove and mouseup event listeners to continue dragging
      this.onMouseMoveListener = (e) => this.handleDrag(e);
      this.onMouseUpListener = () => this.stopDrag();

      window.addEventListener("mousemove", this.onMouseMoveListener);
      window.addEventListener("mouseup", this.onMouseUpListener);
    },
    handleDrag(event) {
      console.log("dragging");
      if (this.dragging && this.activeDotIndex !== -1) {
        const pageWidth = window.innerWidth;
        const pageHeight = window.innerHeight;
        const xPercentage = (event.clientX / pageWidth) * 100;
        const yPercentage = (event.clientY / pageHeight) * 100;
        // Update dot's x and y with the percentages
        this.dots[this.activeDotIndex].x = xPercentage;
        this.dots[this.activeDotIndex].y = yPercentage;
      }
      socket.emit("drag", this.dots[this.activeDotIndex]);
    },
    stopDrag() {
      // Stop dragging
      this.dragging = false;
      this.activeDotIndex = -1;
      console.log("stop drag");

      // Remove mousemove and mouseup event listeners using the stored references
      window.removeEventListener("mousemove", this.onMouseMoveListener);
      window.removeEventListener("mouseup", this.onMouseUpListener);
    },
    startLabelEditing(index) {
      // Start editing the label of the clicked dot
      const dot = this.dots[index];
      if (dot.userId !== this.userId) {
        return;
      }
      this.editingIndex = index;
      this.labelInput = dot.label;
      this.showLabelInput = true;
    },
    saveLabel() {
      // Save the edited label and stop editing
      if (this.editingIndex !== null) {
        this.dots[this.editingIndex].label = this.labelInput;
        this.showLabelInput = false;

        // Broadcast the label update event to other users
        socket.emit("save-label", this.dots[this.editingIndex]);
        this.editingIndex = null;
      }
    },
  },
};
</script>

<style scoped>
.draggable-dot {
  position: absolute;
  cursor: grab;
  width: 20px;
  height: 20px;
  background-color: purple;
  border-radius: 50%;
  color: black;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
  user-select: none;
}

input {
  position: absolute;
  top: 10px;
  left: 120px; /* Adjust this position as needed */
}
</style>
