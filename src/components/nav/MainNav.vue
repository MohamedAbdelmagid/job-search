<template>
  <header class="w-full text-sm" :class="headerHeight">
    <div class="fixed left-0 top-0 h-16 w-full bg-white">
      <div
        class="mx-auto flex h-full flex-nowrap border-b border-brand-gray-1 px-8"
      >
        <router-link
          :to="{ name: 'Home' }"
          class="flex h-full items-center text-xl"
        >
          SoftBanks Careers
        </router-link>
        <nav class="ml-12 h-full">
          <ul class="flex h-full list-none">
            <li
              v-for="page in pages"
              :key="page.title"
              class="ml-9 h-full first:ml-0"
            >
              <router-link
                :to="page.link"
                class="flex h-full items-center py-2.5"
              >
                {{ page.title }}
              </router-link>
            </li>
          </ul>
        </nav>

        <div class="my-auto ml-auto">
          <ProfileImage v-if="userStore.isLoggedIn" />
          <ActionButton v-else text="Sign in" @click="userStore.loginUser" />
        </div>
      </div>

      <SubNav v-if="userStore.isLoggedIn" />
    </div>
  </header>
</template>

<script>
import ActionButton from "@/components/shared/ActionButton.vue";
import ProfileImage from "@/components/nav/ProfileImage.vue";
import SubNav from "@/components/nav/SubNav.vue";

import { useUserStore } from "@/stores/user";
import { mapStores } from "pinia";

export default {
  name: "MainNav",
  data() {
    return {
      pages: [
        {
          title: "Teams",
          link: "/",
        },
        {
          title: "Locations",
          link: "/",
        },
        {
          title: "Life at SoftBanks",
          link: "/",
        },
        {
          title: "How we hire",
          link: "/",
        },
        {
          title: "Students",
          link: "/",
        },
        {
          title: "Jobs",
          link: "/jobs/results",
        },
      ],
    };
  },
  computed: {
    ...mapStores(useUserStore),
    headerHeight() {
      return {
        "h-16": !this.userStore.isLoggedIn,
        "h-32": this.userStore.isLoggedIn,
      };
    },
  },
  components: {
    ActionButton,
    ProfileImage,
    SubNav,
  },
};
</script>
