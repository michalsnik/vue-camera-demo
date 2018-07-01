<template>
  <div
    ref="holder"
    class="vue-camera"
  >
    <div
      v-if="isLoading"
      class="vue-camera-loader"
    >Loading...</div>
    <video
      ref="camera"
      :class="{ 'is-selfie': isSelfie }"
      class="vue-camera-video"
      autoplay
      playsinline
      muted
      @click="() => captureOnClick && capture()"
    />
    <div
      v-if="isMobile"
      class="vue-camera-switcher"
      @click="switchCamera"
    >
      switch
    </div>
  </div>
</template>

<script>
import { isIOS, isMobile } from "@/utils";

function hasGetUserMedia() {
  return Boolean(navigator.mediaDevices && navigator.mediaDevices.getUserMedia);
}

export default {
  props: {
    captureOnClick: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      hasPermissions: false,
      isLoading: true,
      facingMode: isMobile() ? "environment" : "user",
      isMobile: isMobile()
    };
  },
  computed: {
    isSupported: hasGetUserMedia,
    isSelfie() {
      return this.facingMode === "user";
    }
  },
  mounted() {
    if (this.isSupported) this.initUi();
  },
  methods: {
    async initUi() {
      try {
        const { width, height } = await this.setupCamera();
        this.setupCameraDimensions(width, height, 320);
        this.isLoading = false;
      } catch (error) {
        if (error.name === "TypeError" && isIOS()) {
          console.log("safari webview error");
        } else if (error.name === "NotAllowedError") {
          console.log("no access");
        } else {
          console.log("general error");
        }
      }
    },
    async setupCamera() {
      const constraints = {
        audio: false,
        video: {
          facingMode: this.facingMode
        }
      };

      const stream = await navigator.mediaDevices.getUserMedia(constraints);
      const camera = this.$refs.camera;
      camera.srcObject = stream;

      return new Promise(resolve => {
        camera.onloadedmetadata = () => {
          resolve({
            width: camera.videoWidth,
            height: camera.videoHeight
          });
        };
      });
    },
    setupCameraDimensions(width, height, sizing) {
      const aspectRatio = width / height;
      const camera = this.$refs.camera;

      if (width >= height) {
        camera.height = sizing;
        camera.width = aspectRatio * sizing;
      } else {
        camera.width = sizing;
        camera.height = sizing / aspectRatio;
      }
    },
    async switchCamera() {
      const camera = this.$refs.camera;
      this.facingMode =
        this.facingMode === "environment" ? "user" : "environment";

      const constraints = {
        sound: false,
        video: {
          facingMode: this.facingMode
        }
      };

      const stream = await navigator.mediaDevices.getUserMedia(constraints);
      camera.srcObject = stream;
    },
    capture() {
      const { camera } = this.$refs;
      const canvas = document.createElement("canvas");
      canvas.width = camera.videoWidth;
      canvas.height = camera.videoHeight;
      canvas.getContext("2d").drawImage(camera, 0, 0);
      const imgUrl = canvas.toDataURL("image/webp");
      this.$emit("capture", imgUrl);
    }
  }
};
</script>

<style lang="scss" scoped>
.vue-camera {
  width: 100%;
  height: 100%;
  overflow: hidden;
  position: relative;
}

.vue-camera-loader {
  z-index: 10;
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  background: deeppink;
  color: #fff;
  font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
}

.vue-camera-video {
  position: absolute;
  top: 50%;
  left: 50%;
  min-width: 100%;
  min-height: 100%;
  overflow: hidden;
  width: auto;
  transform: translateX(-50%) translateY(-50%);

  &.is-selfie {
    transform: translateX(-50%) translateY(-50%) scale(-1, 1);
  }
}

.vue-camera-switcher {
  position: absolute;
  bottom: 20px;
  right: 15px;
  color: #fff;
}
</style>
