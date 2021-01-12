import Checkbox from "./Checkbox.vue";
import { mount } from "@vue/test-utils";

describe("Checkbox", () => {
  it("emits an event with option selected", () => {
    const wrapper = mount(Checkbox, {
      props: {
        options: ["Especial", "Normal", "Trabalhoso"]
      }
    });

    wrapper.vm.checked = "Especial";
    wrapper.vm.onChange();

    expect(wrapper.emitted().input[0]).toEqual(["Especial"]);
  });
});
