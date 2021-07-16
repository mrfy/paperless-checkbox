import { DirectiveBinding } from "vue/types/options";
import { DirectiveOptions } from "vue";

const handleOutsideClick: any = {};
const OutsideClick: DirectiveOptions = {
  bind(el: HTMLElement, binding: DirectiveBinding) {
    handleOutsideClick[el.id] = (e: any) => {
      e.stopPropagation();
      const { handler, exclude } = binding.value;
      let clickedOnExcludedEl = false;
      if (e.target._prevClass !== undefined) {
        for (const className of exclude) {
          clickedOnExcludedEl = e.target._prevClass.includes(className);
          if (clickedOnExcludedEl) {
            break;
          }
        }
      }

      if (!(el.contains(e.target) || clickedOnExcludedEl)) {
        handler();
      }
    };
    document.addEventListener("click", handleOutsideClick[el.id]);
    document.addEventListener("touchstart", handleOutsideClick[el.id]);
  },
  unbind(el: HTMLElement) {
    document.removeEventListener("click", handleOutsideClick[el.id]);
    document.removeEventListener("touchstart", handleOutsideClick[el.id]);
  },
};
export default OutsideClick;
