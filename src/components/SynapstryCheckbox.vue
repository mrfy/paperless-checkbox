<template id="Syn-Checkbox-Button">
  <div>
    <div class="wrapper">
      <input
        type="radio"
        name="select"
        value="ok"
        id="option-1"
        v-model="radioValue"
      />
      <input
        type="radio"
        name="select"
        value="nok"
        id="option-2"
        v-model="radioValue"
      />
      <input
        type="radio"
        name="select"
        value="na"
        id="option-3"
        v-model="radioValue"
      />
      <transition name="slide-fade">
        <label for="option-1" v-show="condition('ok')" class="option option-1">
          <span>OK</span>
        </label>
      </transition>
      <transition name="slide-fade">
        <label for="option-2" v-show="condition('nok')" class="option option-2">
          <span>NOK</span>
        </label>
      </transition>
      <transition name="slide-fade">
        <label for="option-3" v-show="condition('na')" class="option option-3">
          <span>N/A</span>
        </label>
      </transition>
      <transition name="operator-slide-fade">
        <div v-if="radioValue != ''" id="operatordiv" class="operator">
          <span>
            J. Smith
            <br />
            Operator
          </span>
        </div>
      </transition>
    </div>
    <br />
    <button @click="resetCheckbox">Reset checkbox</button>
    <br />

    {{ radioValue }}
    <div id="example-1">
      <button @click="show = !show">
        Toggle render
      </button>
      <transition name="slide-fade">
        <p v-if="show">hello</p>
      </transition>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, ref } from "@vue/composition-api";

export default defineComponent({
  name: "Checkbox",
  template: "#Syn-Checkbox-Button",
  props: {
    msg: String,
  },
  setup() {
    const radioValue = ref("");
    const show = ref(true);
    const resetCheckbox = () => {
      radioValue.value = "";
    };

    const condition = (val: string): boolean => {
      if (radioValue.value == "" || radioValue.value == val) {
        return true;
      } else {
        return false;
      }
    };

    return { show, radioValue, resetCheckbox, condition };
  },
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
@import "styles.scss";
</style>
