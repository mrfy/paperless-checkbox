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
      <transition
        @after-enter="transitionComplete"
        mode="out-in"
        name="goingHome"
      >
        <label for="option-1" v-show="condition('ok')" class="option option-1">
          <span>OK</span>
        </label>
      </transition>
      <transition
        mode="out-in"
        @after-enter="transitionComplete"
        name="goingHome"
      >
        <label for="option-2" v-show="condition('nok')" class="option option-2">
          <span>NOK</span>
        </label>
      </transition>
      <transition
        mode="out-in"
        @after-enter="transitionComplete"
        name="goingHome"
      >
        <label for="option-3" v-show="condition('na')" class="option option-3">
          <span>N/A</span>
        </label>
      </transition>
      <!-- v-bind:class="classSelector('na')" -->
      <!-- <transition name="operator-slide-fade">
        <div v-if="radioValue != ''" id="operatordiv" class="operator">
          <span>
            J. Smith
            <br />
            Operator
          </span>
        </div>
      </transition> -->
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
import { computed, defineComponent, ref } from "@vue/composition-api";

export default defineComponent({
  name: "Checkbox",
  template: "#Syn-Checkbox-Button",
  props: {
    radioValue: {
      type: String,
      default: "",
    },
  },
  setup(props) {
    const show = ref(true);
    const leaveTransition = "leaveTransitionCss";
    const activateTransition = "activateTransitionCss";

    const condition = (val: string): boolean => {
      if (props.radioValue == "" || props.radioValue == val) {
        return true;
      } else {
        return false;
      }
    };
    const resetCheckbox = () => {
      props.radioValue = "";
    };
    const classSelector = (val: string): string => {
      if (props.radioValue != "" && props.radioValue == val) {
        return activateTransition;
      } else if (props.radioValue != "" && props.radioValue != val) {
        return leaveTransition;
      } else {
        return "";
      }
    };

    const leave = (el: any) => {
      console.log("leave!! :>> ", el);
    };

    const transition = computed((): string => {
      return props.radioValue != "" ? "no" : "";
    });

    const transitionComplete = (el: any) => {
      console.log("transitionCompletd :>> ", el);
      // for passed 'el' that DOM element as the argument, something ...
    };

    return {
      transitionComplete,
      transition,
      leave,
      show,
      resetCheckbox,
      condition,
      classSelector,
    };
  },
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
@import "styles.scss";
</style>
