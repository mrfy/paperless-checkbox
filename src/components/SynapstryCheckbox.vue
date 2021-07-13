<template id="Syn-Checkbox-Button">
  <div>
    <div class="wrapper" @mouseover="overWrapper">
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
    <!-- <br />
    <button @click="resetCheckbox">Reset checkbox</button>
    <br /> -->

    <!-- {{ radioValue }} -->
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
import { computed, defineComponent, ref } from "@vue/composition-api";
import nokSVGComponent from "@/assets/icons/cancel.vue";
import checkmarkSVGComponent from "@/assets/icons/checkmark.vue";

export default defineComponent({
  name: "Checkbox",
  template: "#Syn-Checkbox-Button",
  components: {
    nokSVGComponent,
    checkmarkSVGComponent,
  },
  props: {
    radioValue: {
      type: String,
      default: "",
    },
  },
  setup(props) {
    const show = ref(true);
    const activateTransition = "activeSelection";

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
    const classSelector = (val: string): string[] => {
      const classes = [];
      if (props.radioValue == val) {
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
      console.log(`classes`, val, classes);
      return classes;
    };

    const overWrapper = (e: any) => {
      if (props.radioValue != "") {
        console.log(`e`, e);
      }
    };

    return {
      show,
      resetCheckbox,
      condition,
      classSelector,
      overWrapper,
    };
  },
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
@import "styles.scss";
</style>
