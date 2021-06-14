<template>
  <VeeForm v-slot="{ handleSubmit }" as="div" v-if="!formState.completed">
    <form @submit.prevent="handleSubmit($event, onSubmit)">
      <div class="field">
        <Field name="name" rules="required" v-slot="{ field, errors }">
          <label for="name">Name</label>
          <input
            v-bind="field"
            type="text"
            :class="['form__input', errors[0] ? 'invalid' : '']"
          />
          <span class="invalid">{{ errors[0] }}</span>
        </Field>
      </div>
      <div class="field">
        <label for="email">Email</label>
        <Field name="email" type="email" rules="required|email" id="email" />
        <ErrorMessage name="email" />
      </div>
      <div class="field">
        <label for="message">Message</label>
        <Field name="message" as="textarea" rules="required" id="message" />
        <ErrorMessage name="message" />
      </div>
      <input type="submit" value="submit" />
    </form>
  </VeeForm>

  <!-- loading -->
  <div v-else-if="formState.loading">
    <div class="lds-roller">
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </div>
  </div>

  <!-- message -->
  <div v-else>
    <h2>{{ formState.message }}</h2>
    <p>We will never share your information with anyone else.</p>
  </div>
</template>

<script>
import { Form as VeeForm, Field, ErrorMessage } from 'vee-validate';
// eslint-disable-next-line no-unused-vars
import * as rules from './validation';

export default {
  name: 'Form',
  components: { VeeForm, Field, ErrorMessage },
  data() {
    return {
      formState: {
        completed: false,
        loading: false,
        message: '',
      },
    };
  },
  methods: {
    onSubmit(data) {
      console.log(data);
      this.formState.completed = !this.formState.completed;
      this.formState.loading = !this.formState.loading;
      setTimeout(() => {
        this.formState.loading = !this.formState.loading;
        // do some checking for whether it was successful or not.
        this.formState.message = 'Thank you!';
      }, 5000);
    },
  },
};
</script>

<style>
input.invalid {
  border: 1px solid red;
  border-radius: 2px;
}
span.invalid {
  color: red;
}

/* spinner */
.lds-roller {
  display: inline-block;
  position: relative;
  width: 80px;
  height: 80px;
}
.lds-roller div {
  animation: lds-roller 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite;
  transform-origin: 40px 40px;
}
.lds-roller div:after {
  content: ' ';
  display: block;
  position: absolute;
  width: 7px;
  height: 7px;
  border-radius: 50%;
  background: salmon;
  margin: -4px 0 0 -4px;
}
.lds-roller div:nth-child(1) {
  animation-delay: -0.036s;
}
.lds-roller div:nth-child(1):after {
  top: 63px;
  left: 63px;
}
.lds-roller div:nth-child(2) {
  animation-delay: -0.072s;
}
.lds-roller div:nth-child(2):after {
  top: 68px;
  left: 56px;
}
.lds-roller div:nth-child(3) {
  animation-delay: -0.108s;
}
.lds-roller div:nth-child(3):after {
  top: 71px;
  left: 48px;
}
.lds-roller div:nth-child(4) {
  animation-delay: -0.144s;
}
.lds-roller div:nth-child(4):after {
  top: 72px;
  left: 40px;
}
.lds-roller div:nth-child(5) {
  animation-delay: -0.18s;
}
.lds-roller div:nth-child(5):after {
  top: 71px;
  left: 32px;
}
.lds-roller div:nth-child(6) {
  animation-delay: -0.216s;
}
.lds-roller div:nth-child(6):after {
  top: 68px;
  left: 24px;
}
.lds-roller div:nth-child(7) {
  animation-delay: -0.252s;
}
.lds-roller div:nth-child(7):after {
  top: 63px;
  left: 17px;
}
.lds-roller div:nth-child(8) {
  animation-delay: -0.288s;
}
.lds-roller div:nth-child(8):after {
  top: 56px;
  left: 12px;
}
@keyframes lds-roller {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
