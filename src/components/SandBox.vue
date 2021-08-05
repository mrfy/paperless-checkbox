<template>
  <div class="hello">
    <h2>{{ msg }}<span>(cancel on second-click)</span></h2>
    <div v-for="row in data" class="parentClass" :key="row.id">
      <span>
        {{ row.id }}. Wyłączyć maszynę, wykonac serwis, przegląd, sporządzić
        raport
      </span>
      <CheckBox
        v-bind:key="row.id"
        v-bind:modelValue="val"
        v-bind:data="row"
        v-bind:options="availableOptions"
        v-bind:disabled="row.isDisabled"
        @checkboxValue="setCheckboxVal"
      />
      <br />
    </div>
  </div>
</template>

<script lang="ts">
import CheckBox from "@/components/SynapstryCheckbox.vue";
import { ref, defineComponent, watch } from "vue";

export default defineComponent({
  name: "SandBox",
  components: {
    CheckBox,
  },
  props: {
    msg: { type: String, default: "" },
  },
  setup() {
    const checked = ref("");
    const val = ref("");
    const availableOptions = ["nok", "ok"];
    watch(val, (current) => {
      console.log("wartosc!! ", current);
    });
    // const data = [
    //   {
    //     id: 1,
    //     operator: "J. Smith",
    //     state: "ok",
    //     role: "operator",
    //     isDisabled: false,
    //   },
    //   {
    //     id: 2,
    //     operator: "J. Smith",
    //     state: "ok",
    //     role: "operator",
    //     isDisabled: false,
    //   },
    //   {
    //     id: 3,
    //     operator: "A. Johnson",
    //     state: "nok",
    //     role: "operator",
    //     isDisabled: true,
    //   },
    //   {
    //     id: 4,
    //     operator: "M. Anderson",
    //     state: "nok",
    //     role: "operator",
    //     isDisabled: false,
    //   },
    // ];

    const data = [
      {
        id: 1,
        operator: "J. Smith",
        state: "ok",
        role: "operator",
        isDisabled: false,
      },
    ];

    const form_type = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    //const form_type = [1];

    function setCheckboxVal(val: string) {
      checked.value = val;
    }
    return {
      setCheckboxVal,
      availableOptions,
      form_type,
      checked,
      data,
      val,
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
  margin: 10px;
}
.parentClass span {
  margin-right: 20px;
}
</style>
