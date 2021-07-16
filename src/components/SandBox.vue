<template>
  <div class="hello">
    <h2>{{ msg }} <span>(cancel on second-click)</span></h2>

    <div v-for="type in form_type" :key="type" class="parentClass">
      <span>
        {{ type }}. Wyłączyć maszynę, wykonac serwis, przegląd, sporządzić
        raport
      </span>
      <CheckBox @checkboxValue="setCheckboxVal" :key="type" />
      <br />
      <!-- {{ checked }} -->
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import CheckBox from "@/components/SynapstryCheckbox.vue";
import { ref } from "@vue/composition-api";

export default Vue.extend({
  name: "SandBox",
  props: {
    msg: String,
  },
  components: {
    CheckBox,
  },
  setup() {
    const checked = ref("");
    const form_type = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    // const form_type = [1];

    function setCheckboxVal(val: string) {
      checked.value = val;
    }
    return {
      setCheckboxVal,
      form_type,
      checked,
    };
  },
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.hello {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
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
  margin: auto auto;
}
.parentClass span {
  margin-right: 20px;
}
</style>
