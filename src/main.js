import { createApp } from "vue";

import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

import "@/index.css";
import JobSearchApp from "@/JobSearchApp.vue";
import router from "@/router";

library.add(faSearch);

createApp(JobSearchApp)
  .use(router)
  .component("font-awesome-icon", FontAwesomeIcon)
  .mount("#app");
