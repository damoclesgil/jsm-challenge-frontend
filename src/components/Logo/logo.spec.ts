import { shallowMount } from "@vue/test-utils";
import Logo from "./Logo.vue";

describe("Logo.vue", () => {
  it("should render a normal logo when size is default", () => {
    const size = "normal";
    const wrapper = shallowMount(Logo, {
      props: { size }
    });
    expect(wrapper.find(".logo-normal").classes()).toContain("logo-normal");
  });
});
