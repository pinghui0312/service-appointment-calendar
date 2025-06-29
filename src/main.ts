<<<<<<< HEAD
import "./assets/main.css";
=======
>>>>>>> dev
import { createApp } from "vue";
import App from "./App.vue";
import { Amplify } from "aws-amplify";
import outputs from "../amplify_outputs.json";
<<<<<<< HEAD
=======
import "./styles.css";
>>>>>>> dev

Amplify.configure(outputs);

createApp(App).mount("#app");
