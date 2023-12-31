import { createApp } from "vue";
import { createPinia } from "pinia";

import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faSearch, faAngleDown, faAngleUp } from "@fortawesome/free-solid-svg-icons";

import "@/index.css";
import JobSearchApp from "@/JobSearchApp.vue";
import router from "@/router";

library.add(faSearch);
library.add(faAngleDown);
library.add(faAngleUp);

const pinia = createPinia()

createApp(JobSearchApp)
  .use(router)
  .use(pinia)
  .component("font-awesome-icon", FontAwesomeIcon)
  .mount("#app");
