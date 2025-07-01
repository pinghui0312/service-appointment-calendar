import { createApp } from "vue";
import App from "./App.vue";
import { Amplify } from "aws-amplify";
import outputs from "../amplify_outputs.json";
import PrimeVue from "primevue/config";
import Aura from "@primeuix/themes/aura";
import ToastService from 'primevue/toastservice';

Amplify.configure(outputs);

createApp(App)
  .use(PrimeVue, {
    theme: {
      preset: Aura,
      options: {
        darkModeSelector: false,
      },
    },
  })
  .use(ToastService)
  .mount("#app");
