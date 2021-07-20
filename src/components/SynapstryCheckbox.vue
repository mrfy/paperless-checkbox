<template id="Syn-Checkbox-Button">
  <div>
    <div
      class="app-class outside-click-exclude"
      @click="showCancelMask"
      v-click-outside="onClickOutside"
    >
      <div
        v-if="cancelMaskVisible"
        @click="cancelSelection"
        class="back-choice outside-click-exclude"
      >
        {{ cancelMsg }}
      </div>
      <div class="checkbox-wrapper outside-click-exclude">
        <transition name="goingHome">
          <label
            class="flex-label opt-ok"
            v-bind:class="classSelector('ok')"
            v-show="inputShowCondition('ok')"
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
            v-show="inputShowCondition('nok')"
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
            v-show="inputShowCondition('na')"
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
          <div
            v-if="radioValue != ''"
            id="operatordiv"
            class="operator outside-click-exclude"
          >
            <span class="outside-click-exclude">
              J. Smith
              <br />
              Operator
            </span>
          </div>
        </transition>
      </div>
    </div>
    <br />
    <!-- <button @click="resetCheckbox">Reset checkbox</button> -->
    <br />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, watch } from "@vue/composition-api";
import nokSVGComponent from "@/assets/icons/cancel.vue";
import checkmarkSVGComponent from "@/assets/icons/checkmark.vue";
import vClickOutside from "v-click-outside";

export default defineComponent({
  name: "Checkbox",
  template: "#Syn-Checkbox-Button",
  components: {
    nokSVGComponent,
    checkmarkSVGComponent,
  },
  directives: {
    clickOutside: vClickOutside.directive,
  },
  emits: ["radioVal"],
  props: {
    cancelMsg: {
      type: String,
      default: "< Cancel choice",
    },
  },
  setup(props, { emit }) {
    const cancelMaskVisible = ref(false);
    const radioValue = ref("");
    const activateTransition = "activeSelection";

    watch(radioValue, (currentValue) => {
      emit("checkboxValue", currentValue);
    });

    const inputShowCondition = (val: string): boolean => {
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
      const classes: string[] = [];
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
        cancelMaskVisible.value = true;
      } else {
        cancelMaskVisible.value = false;
      }
    };

    const hideCancelMask = () => {
      cancelMaskVisible.value = false;
    };
    const cancelSelection = () => {
      radioValue.value = "";
    };

    const onClickOutside = (event: Event) => {
      cancelMaskVisible.value = false;
    };

    return {
      radioValue,
      cancelMaskVisible,
      cancelSelection,
      resetCheckbox,
      inputShowCondition,
      classSelector,
      showCancelMask,
      hideCancelMask,
      onClickOutside,
    };
  },
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
@import "styles.scss";
</style>
