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
      <label for="option-1" class="option option-1">
        <div class="dot"></div>
        <span>OK</span>
      </label>
      <label for="option-2" class="option option-2">
        <div class="dot"></div>
        <span>NOK</span>
      </label>
      <label for="option-3" class="option option-3">
        <div class="dot"></div>
        <span>N/A</span>
      </label>
    </div>
    <br />
    <button @click="resetCheckbox">Reset checkbox</button>
    <br />
    {{ radioValue }}
  </div>
</template>

<script lang="ts">
import {
  defineComponent,
  onMounted,
  PropType,
  reactive,
  ref,
  watch,
} from "@vue/composition-api";

export default defineComponent({
  name: "Checkbox",
  template: "#Syn-Checkbox-Button",
  props: {
    msg: String,
  },
  setup() {
    const visibleItems = reactive({
      item1: true,
      item2: true,
      item3: true,
    });
    const radioValue = ref("");

    const resetCheckbox = () => {
      radioValue.value = "";
    };

    return { visibleItems, radioValue, resetCheckbox };
  },
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
@import url("https://fonts.googleapis.com/css?family=Lato:400,500,600,700&display=swap");
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: "Lato", sans-serif;
}
html,
body {
  display: grid;
  height: 100%;
  place-items: center;
  background: #0069d9;
  font-family: "Lato", sans-serif;
}
.wrapper {
  display: inline-flex;
  background: #fff;
  height: 100px;
  width: 400px;
  align-items: center;
  justify-content: space-evenly;
  border-radius: 5px;
  padding: 20px 15px;
  box-shadow: 5px 5px 30px rgba(0, 0, 0, 0.2);
}
.wrapper .option {
  background: #fff;
  height: 100%;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  margin: 0 10px;
  border-radius: 5px;
  cursor: pointer;
  padding: 0 10px;
  border: 2px solid lightgrey;
  transition: all 1.1s ease;
}
.wrapper .option .dot {
  height: 20px;
  width: 20px;
  background: #d9d9d9;
  border-radius: 50%;
  position: relative;
}
.wrapper .option .dot::before {
  position: absolute;
  content: "";
  top: 4px;
  left: 4px;
  width: 12px;
  height: 12px;
  background: #696969;
  border-radius: 50%;
  opacity: 0;
  transform: scale(1.5);
  transition: all 1.3s ease;
}
input[type="radio"] {
  display: none;
}

#option-1:checked:checked ~ .option-1 {
  border-color: #95d470;
  background: #95d470;
}

#option-2:checked:checked ~ .option-2 {
  border-color: #ec6262;
  background: #ec6262;
}

#option-3:checked:checked ~ .option-3 {
  border-color: #cecccc;
  background: #cecccc;
}

#option-1:checked:checked ~ .option-1 .dot,
#option-2:checked:checked ~ .option-2 .dot,
#option-3:checked:checked ~ .option-3 .dot {
  background: #fff;
}
#option-1:checked:checked ~ .option-1 .dot::before,
#option-2:checked:checked ~ .option-2 .dot::before,
#option-3:checked:checked ~ .option-3 .dot::before {
  opacity: 1;
  transform: scale(1);
}
.wrapper .option span {
  font-size: 20px;
  color: #808080;
}
#option-1:checked:checked ~ .option-1 span,
#option-2:checked:checked ~ .option-2 span {
  color: #fff;
}
</style>
