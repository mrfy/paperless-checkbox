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
        fill-rule="evenodd"
        d="M 22.59375 3.5 L 8.0625 18.1875 L 1.40625 11.5625 L 0 13 L 8.0625 21 L 24 4.9375 Z"
      />
    </svg>
  </section>
</template>

<script>
export default {
  data() {
    return {
      isLiked: "red",
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
}
.unlike {
  color: #000;
}
</style>
