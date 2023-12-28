import { createApp } from "vue";
import { createPinia } from "pinia";

import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

import "@/index.css";
import JobSearchApp from "@/JobSearchApp.vue";
import router from "@/router";

library.add(faSearch);

const pinia = createPinia()

createApp(JobSearchApp)
  .component("font-awesome-icon", FontAwesomeIcon)
  .use(router)
  .use(pinia)
  .mount("#app");
