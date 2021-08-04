<template id="SynConfirmationCheckbox">
  <div>
    <div class="app-class" v-click-outside="onClickOutside">
      <div class="cancel-choice-wrapper" v-if="cancelMaskVisible">
        <label class="flex-label cancel-choice-icon" @click="cancelSelection">
          {{ cancelMsg }}
        </label>
        <div class="checkbox-msg">
          <span v-bind:style="{ fontSize: '1rem' }"> Cancel choice </span>
        </div>
      </div>

      <div class="checkbox-wrapper" v-bind:class="disabled ? 'disabled' : ''">
        <transition name="goingHome">
          <label
            @click="showCancelMask"
            class="flex-label"
            v-bind:class="classSelector('ok')"
            v-show="inputShowCondition('ok')"
          >
            <i class="pi pi-check" style="fontsize: 1.4rem"></i>
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
            <i class="pi pi-times" style="fontsize: 1.3rem"></i>
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

type DataType = {
  id: number;
  operator: string;
  state: string;
  role: string;
  isDisabled: boolean;
};

export default defineComponent({
  name: "ConfirmationCheckbox",
  template: "#SynConfirmationCheckbox",
  directives: {
    clickOutside: vClickOutside.directive,
  },
  emits: ["update:modelValue"],
  props: {
    cancelMsg: {
      type: String,
      default: "<",
    },
    data: {
      type: Object as () => Required<DataType>,
      required: true,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    modelValue: {
      type: String,
      default: null,
      required: false,
    },
  },
  setup(props, { emit }) {
    const cancelMaskVisible = ref(false);
    const radioValue = ref<string>("");

    const activateClassName = "active-selection";

    watch(props, () => {
      console.log(
        "🚀 ~ file: ConfirmationCheckbox.vue ~ line 118 ~ setup ~ radioValue",
        radioValue.value,
        props.modelValue
      );
      radioValue.value = props.modelValue;
    });

    watch(radioValue as any, (currentValue) => {
      console.log(
        "🚀 ~ file: ConfirmationCheckbox.vue ~ line 129 ~ watch ~ currentValue",
        currentValue
      );
      emit("update:modelValue", currentValue);
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
      radioValue.value == "" ? classes.push(`opt-${val}-inactive`) : "";
      if (radioValue.value == val) {
        classes.push(activateClassName);
        switch (val) {
          case "ok":
            classes.push(`opt-${val}-active`);
            break;
          case "nok":
            classes.push(`opt-${val}-active`);
            break;
          case "na":
            classes.push(`opt-${val}-active`);
            break;
          default:
            break;
        }
      }
      return classes;
    };
    const showCancelMask = () => {
      if (radioValue.value === "") {
        cancelMaskVisible.value = false;
      } else {
        cancelMaskVisible.value = true;
      }
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
