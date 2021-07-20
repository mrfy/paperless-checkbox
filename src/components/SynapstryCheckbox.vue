<template id="Syn-Checkbox-Button">
  <div>
    <div class="app-class" v-click-outside="onClickOutside">
      <div class="cancel-choice-wrapper" v-if="cancelMaskVisible">
        <label class="flex-label cancel-choice-icon" @click="cancelSelection">
          {{ cancelMsg }}
        </label>
        <div class="checkbox-msg">
          <span v-bind:style="{ fontSize: '1rem' }">
            Cancel choice
          </span>
        </div>
      </div>

      <div class="checkbox-wrapper" v-bind:class="disabled ? 'disabled' : ''">
        <transition name="goingHome">
          <label
            @click="showCancelMask"
            class="flex-label"
            v-bind:class="[classSelector('ok')]"
            v-show="inputShowCondition('ok')"
          >
            <i class="pi pi-check" style="fontSize: 1.4rem"></i>
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
            @click="showCancelMask"
            class="flex-label"
            v-bind:class="classSelector('nok')"
            v-show="inputShowCondition('nok')"
          >
            <i class="pi pi-times" style="fontSize: 1.3rem"></i>
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
            @click="showCancelMask"
            class="flex-label"
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

        <transition name="checkbox-msg-slide">
          <div v-if="radioValue != ''" class="checkbox-msg">
            {{ data.operator }}
            <br />
            {{ data.role }}
          </div>
        </transition>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, watch } from "vue";
import vClickOutside from "click-outside-vue3";
import "primeicons/primeicons.css";

export default defineComponent({
  name: "Checkbox",
  template: "#Syn-Checkbox-Button",
  directives: {
    clickOutside: vClickOutside.directive,
  },
  directives: {
    clickOutside: vClickOutside.directive,
  },
  emits: ["radioVal"],
  props: {
    cancelMsg: {
      type: String,
      default: "<",
    },
    data: {
      type: Object,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    cancelMsg: {
      type: String,
      default: "< Cancel choice",
    },
  },
  setup(_, { emit }) {
    const cancelMaskVisible = ref<boolean>(false);
    const radioValue = ref<string>("");
    const activateClassName = "active-selection";

    watch(radioValue, (currentValue: string) => {
      emit("checkboxValue" as any, currentValue);
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
      const cssClasses: string[] = [];
      radioValue.value == "" ? cssClasses.push(`opt-${val}-inactive`) : "";
      if (radioValue.value == val) {
        cssClasses.push(activateClassName);
        switch (val) {
          case "ok":
            cssClasses.push(`opt-${val}-active`);
            break;
          case "nok":
            cssClasses.push(`opt-${val}-active`);
            break;
          case "na":
            cssClasses.push(`opt-${val}-active`);
            break;
          default:
            break;
        }
      }
      return cssClasses;
    };

    const showCancelMask = () => {
      if (radioValue.value != "") {
        cancelMaskVisible.value = true;
      } else {
        cancelMaskVisible.value = false;
      }
      console.log(`classes`, val, classes);
      return classes;
    };

    const cancelSelection = () => {
      cancelMaskVisible.value = false;
      radioValue.value = "";
    };

    const onClickOutside = () => {
      cancelMaskVisible.value = false;
    };

    const cancelSelection = () => {
      cancelMaskVisible.value = false;
      radioValue.value = "";
    };

    const onClickOutside = () => {
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
      onClickOutside,
    };
  },
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
@import "styles.scss";
</style>
