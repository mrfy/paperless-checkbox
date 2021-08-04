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
.checkbox-wrapper {
  display: flex;
  margin: auto auto;
  height: 40px;
  width: 180px;
  border-radius: 15px;
}

.checkbox-wrapper label:first-of-type {
  border-radius: 5px 0 0 5px;
}

.checkbox-wrapper label:last-of-type {
  border-radius: 0 5px 5px 0;
}

.checkbox-wrapper label:hover {
  cursor: pointer;
}

.app-class {
  display: inline-block;
  position: relative;
}

.cancel-choice-icon {
  font-size: 2rem !important;
  color: rgb(255, 255, 255);
  background-color: grey;
  font-family: "primeicons";
  border-radius: 5px 0 0 5px;
}

.cancel-choice-wrapper {
  position: absolute;
  display: flex;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
}

.flex-label {
  border: 1px solid rgba(0, 0, 0, 0.2);
  flex: 1 0 1em;
  overflow: hidden;
  max-width: 60px;
  font-size: large;
  margin-right: -1px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.goingHome-leave-active {
  transition: all 0.25s ease;
}

.goingHome-enter,
.goingHome-leave-to {
  flex: 0 1 0em;
  opacity: 0.3;
}

.goingHome-enter-to {
  opacity: 1;
}

.goingHome-enter-active {
  transition: all 0.25s ease;
}

.active-selection {
  min-width: 60px;
  border-radius: 5px 0 0 5px !important;
  transition: all 0.1s ease-in-out;
}
.checkbox-msg {
  word-wrap: none;
  display: flex;
  flex: 1 0 1em;
  overflow: hidden;
  border: 1px solid rgba(0, 0, 0, 0.2);
  border-radius: 0 5px 5px 0;
  background-color: rgb(255, 255, 255);
  justify-content: space-around;
  align-items: center;
}

.checkbox-msg-slide-leave-active {
  transition: all 0.25s ease;
}

.checkbox-msg-slide-enter,
.checkbox-msg-slide-leave-to {
  flex: 0 1 0em;
  overflow: hidden;
  opacity: 0;
}

input[type="radio"] {
  display: none;
}

.opt-ok-active {
  background-color: #689f38;
  color: rgb(255, 255, 255);
}

.opt-nok-active {
  background-color: #d32f2f;
  color: rgb(255, 255, 255);
}

.opt-na-active {
  background-color: grey;
  color: rgb(255, 255, 255);
}

.disabled {
  cursor: not-allowed !important;
  pointer-events: none !important;
  opacity: 0.3;
  background-color: #ccc;
  border-radius: 5px 5px 5px 5px;
}

/*
  Display hover for no-touch devices only
*/
@media (hover: hover) and (pointer: fine) {
  .app-class:hover .cancel-choice-icon {
    cursor: pointer;
  }

  .opt-ok-inactive:hover {
    text-shadow: 1px 0px 0px #689f38;
    color: #689f38;
  }

  .opt-nok-inactive:hover {
    text-shadow: 1px 0px 0px #d32f2f;
    color: #d32f2f;
  }

  .opt-na-inactive:hover {
    font-weight: bold;
  }
}
</style>
