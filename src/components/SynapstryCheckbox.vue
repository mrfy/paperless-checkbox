<template id="Syn-Checkbox-Button">
  <div>
    <div
      class="app-class"
      @mouseover="showCancelMask"
      @mouseout="hideCancelMask"
    >
      <div @click="klick" v-if="radioValue != ''" class="back-choice">
        {{ cancelMsg }}
      </div>
      <div class="checkbox-wrapper">
        <transition name="goingHome">
          <label
            class="flex-label opt-ok"
            v-bind:class="classSelector('ok')"
            v-show="condition('ok')"
          >
            <checkmarkSVGComponent />
            <input
              name="select"
              type="radio"
              value="ok"
              id="option-1"
              v-model="radioValue"
            />
          </label>
        </transition>

        <transition name="goingHome">
          <label
            class="flex-label opt-nok"
            v-bind:class="classSelector('nok')"
            v-show="condition('nok')"
          >
            <nokSVGComponent />
            <input
              name="select"
              type="radio"
              value="nok"
              id="option-2"
              v-model="radioValue"
            />
          </label>
        </transition>
        <transition name="goingHome">
          <label
            class="flex-label opt-na"
            v-bind:class="classSelector('na')"
            v-show="condition('na')"
            >N/A
            <input
              name="select"
              type="radio"
              value="na"
              id="option-3"
              v-model="radioValue"
            />
          </label>
        </transition>

        <transition name="operator-slide">
          <div v-if="radioValue != ''" id="operatordiv" class="operator">
            <span>
              J. Smith
              <br />
              Operator
            </span>
          </div>
        </transition>
      </div>
    </div>
    <br />
    <button @click="resetCheckbox">Reset checkbox</button>
    <br />

    <!-- <div id="example-1">
      <button @click="show = !show">
        Toggle render
      </button>
      <transition name="slide-fade">
        <p v-if="show">hello</p>
      </transition>
    </div> -->
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, watch, watchEffect } from "@vue/composition-api";
import nokSVGComponent from "@/assets/icons/cancel.vue";
import checkmarkSVGComponent from "@/assets/icons/checkmark.vue";

export default defineComponent({
  name: "Checkbox",
  template: "#Syn-Checkbox-Button",
  components: {
    nokSVGComponent,
    checkmarkSVGComponent,
  },
  emits: ["radioVal"],
  props: {
    cancelMsg: {
      type: String,
      default: "< Cancel choice",
    },
  },
  setup(props, { emit }) {
    const clicked = ref(false);
    const show = ref(true);
    const radioValue = ref("");
    const activateTransition = "activeSelection";

    watch(radioValue, (currentValue) => {
      emit("checkboxValue", currentValue);
    });

    const condition = (val: string): boolean => {
      if (radioValue.value == "" || radioValue.value == val) {
        return true;
      } else {
        return false;
      }
    };
    const resetCheckbox = () => {
      radioValue.value = "";
    };
    const classSelector = (val: string): string[] => {
      const classes = [];
      if (radioValue.value == val) {
        classes.push(activateTransition);
        switch (val) {
          case "ok":
            classes.push(`${val}-active`);
            break;
          case "nok":
            classes.push(`${val}-active`);
            break;
          case "na":
            classes.push(`${val}-active`);
            break;
          default:
            break;
        }
      }
      return classes;
    };

    const showCancelMask = (e: any) => {
      if (radioValue.value != "") {
        return "";
      }
    };

    const hideCancelMask = (e: any) => {
      // console.log("hide mask");
    };

    const klick = () => {
      radioValue.value = "";
    };

    return {
      radioValue,
      show,
      klick,
      resetCheckbox,
      condition,
      classSelector,
      showCancelMask,
      hideCancelMask,
    };
  },
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
@import "styles.scss";
</style>
