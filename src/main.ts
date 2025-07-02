import { createApp } from "vue";
import App from "./App.vue";
import { Amplify } from "aws-amplify";
import outputs from "../amplify_outputs.json";
import PrimeVue from "primevue/config";
import Aura from "@primeuix/themes/aura";
import ToastService from 'primevue/toastservice';
import { definePreset } from "@primeuix/themes";

Amplify.configure(outputs);

const MyPreset = definePreset(Aura, {
    semantic: {
        primary: {
            50: '{blue.50}',
            100: '{blue.100}',
            200: '{blue.200}',
            300: '{blue.300}',
            400: '{blue.400}',
            500: '{blue.500}',
            600: '{blue.600}',
            700: '{blue.700}',
            800: '{blue.800}',
            900: '{blue.900}',
            950: '{blue.950}'
        }
    }
});

createApp(App)
  .use(PrimeVue, {
    theme: {
      preset: MyPreset,
      options: {
        darkModeSelector: false,
      },
    },
  })
  .use(ToastService)
  .mount("#app");
