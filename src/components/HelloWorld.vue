<template>
  <div class="hello">
    <h1>{{ msg }}</h1>

    <div v-for="type in form_type" :key="type" class="parentClass">
      <span>
        {{ type }}. Wyłączyć maszynę, wykonac serwis, przegląd, sporządzić
        raport
      </span>
      <CheckBox />
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import CheckBox from "@/components/SynapstryCheckbox.vue";

export default Vue.extend({
  name: "HelloWorld",
  props: {
    msg: String,
  },
  components: {
    CheckBox,
  },
  setup() {
    const form_type = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

    return {
      form_type,
    };
  },
});
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
.parentClass {
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 1em 1em;
}
.parentClass span {
  margin-right: 20px;
}
</style>
