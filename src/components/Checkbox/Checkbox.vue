<template>
  <div>
    <div class="checkbox-form">
      <div class="answers">
        <label v-for="(option, i) of options" :key="i" class="item">
          <span :for="option">{{ option }}</span>
          <input
            :id="option"
            v-model="checked"
            type="checkbox"
            :value="option"
            @change="onChange"
          />
          <span class="checkmark" />
        </label>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    options: {
      type: Array,
      required: false,
      default: () => []
    }
  },
  data() {
    return {
      checked: []
    };
  },
  methods: {
    onChange() {
      this.$emit("input", this.checked);
    }
  }
};
</script>

<style>
.checkbox-form {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.checkbox-form .answers {
  display: flex;
  flex-direction: column;
  align-items: left;
  width: 100%;
}

.checkbox-form label {
  margin-left: 1em;
}

.checkbox-form .item {
  display: block;
  position: relative;
  padding-left: 35px;
  margin-bottom: 12px;
  cursor: pointer;
  font-size: 1em;
  height: 25px;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  display: flex;
  align-items: center;
}

.checkbox-form .item input {
  position: absolute;
  opacity: 0;
  cursor: pointer;
  height: 0;
  width: 0;
}

.checkbox-form .checkmark {
  position: absolute;
  top: 0;
  left: 0;
  height: 25px;
  width: 25px;
  border: 0.085rem solid #d8d8d8;
}

.checkbox-form .item:hover input ~ .checkmark {
  background-color: transparent;
}

.checkbox-form .item input:checked ~ .checkmark {
  background-color: transparent;
}

.checkbox-form .checkmark:after {
  content: "";
  position: absolute;
  display: none;
}

.checkbox-form .item input:checked ~ .checkmark:after {
  display: block;
}

.checkbox-form .item .checkmark:after {
  left: 5px;
  top: 5px;
  width: 15px;
  height: 15px;
  background-color: #d8d8d8;
}
</style>
