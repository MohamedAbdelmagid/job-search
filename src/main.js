import { createApp } from "vue";
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

import "@/index.css";
import JobSearchApp from "@/JobSearchApp.vue";

library.add(faSearch)

createApp(JobSearchApp).component("font-awesome-icon", FontAwesomeIcon).mount("#app");
