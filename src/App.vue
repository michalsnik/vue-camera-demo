<template>
  <div id="app">
    <vue-camera
      :preview="img"
      class="camera"
      @capture="onCapture"
    >
      <template slot-scope="camera">
        <button
          v-if="!camera.isPreviewing"
          class="trigger"
          @click="camera.capture()"
        />
      </template>
    </vue-camera>
  </div>
</template>

<script>
import VueCamera from "vue-camera";

export default {
  name: "App",
  components: {
    VueCamera
  },
  data() {
    return {
      img: null
    };
  },
  methods: {
    onCapture(img) {
      this.img = img;
      setTimeout(() => {
        this.img = null;
      }, 3000);
    }
  }
};
</script>

<style>
body {
  margin: 0;
  font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
}
</style>

<style lang="scss" scoped>
@import "~vue-camera/dist/vue-camera.css";

.camera {
  width: 100vw;
  height: 100vh;
}

.trigger {
  position: fixed;
  bottom: 20px;
  left: 0;
  right: 0;
  z-index: 10;
  margin: auto;
  width: 50px;
  height: 50px;
  outline: none;
  border: 3px solid #fff;
  background: none;
  border-radius: 50%;
  box-shadow: 0 1px 5px 0 rgba(0, 0, 0, 0.1);
}
</style>
