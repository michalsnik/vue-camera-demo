<template>
  <div id="app">
    <vue-camera
      ref="camera"
      :capture-on-click="true"
      class="camera"
      @capture="onCapture"
    />
    <img
      :src="img"
      class="preview"
    >
    <button
      class="trigger"
      @click="$refs.camera.capture()"
    />
  </div>
</template>

<script>
import VueCamera from "./components/VueCamera.vue";

export default {
  name: "App",
  components: {
    VueCamera
  },
  data() {
    return {
      img: ""
    };
  },
  methods: {
    onCapture(img) {
      this.img = img;
    }
  }
};
</script>

<style>
body {
  margin: 0;
}
</style>

<style lang="scss" scoped>
.camera {
  width: 100vw;
  height: 100vh;
}

.preview {
  position: fixed;
  left: 15px;
  bottom: 15px;
  z-index: 10;
  width: 80px;
  height: 60px;
  border-radius: 2px;
  object-fit: cover;
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
}
</style>
