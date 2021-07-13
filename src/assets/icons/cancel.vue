<template>
  <section class="svg">
    <svg
      version="1.1"
      id="Capa_1"
      xmlns="http://www.w3.org/2000/svg"
      xmlns:xlink="http://www.w3.org/1999/xlink"
      x="0px"
      y="0px"
      viewBox="0 0 24 24"
      width="24px"
      height="24px"
      xml:space="preserve"
      :style="{}"
      @click="toggleSVG"
    >
      <path
        d="M 4.7070312 3.2929688 L 3.2929688 4.7070312 L 10.585938 12 L 3.2929688 19.292969 L 4.7070312 20.707031 L 12 13.414062 L 19.292969 20.707031 L 20.707031 19.292969 L 13.414062 12 L 20.707031 4.7070312 L 19.292969 3.2929688 L 12 10.585938 L 4.7070312 3.2929688 z"
      />
    </svg>
  </section>
</template>

<script>
export default {
  data() {
    return {
      isLiked: "black",
    };
  },
  methods: {
    toggleSVG() {
      return "";
    },
  },
};
</script>

<style>
.like {
  fill: red;
  font-weight: bolder;
}
.unlike {
  color: #000;
}
</style>
