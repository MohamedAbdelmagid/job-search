<template>
  <header class="w-full text-sm">
    <div class="h-16 w-full bg-white">
      <div
        class="mx-auto flex h-full flex-nowrap border-b border-brand-gray-1 px-8"
      >
        <a :href="url" class="flex h-full items-center text-xl">
          SoftBanks Careers
        </a>
        <nav class="ml-12 h-full">
          <ul class="flex h-full list-none">
            <li
              v-for="page in pages"
              :key="page.title"
              class="ml-9 h-full first:ml-0"
            >
              <a href="" class="flex h-full items-center py-2.5">
                {{ page.title }}
              </a>
            </li>
          </ul>
        </nav>

        <div class="ml-auto my-auto">
          <ProfileImage v-if="isLoggedIn" />
          <ActionButton v-else @click="loginUser" />
        </div>
      </div>
    </div>
  </header>
</template>

<script>
import ActionButton from "@/components/ActionButton.vue";
import ProfileImage from '@/components/ProfileImage.vue';

export default {
  name: "MainNav",
  data() {
    return {
      url: "https://careers.google.com",
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
          link: "/",
        },
      ],
      isLoggedIn: false
    };
  },
  methods: {
    loginUser() {
      this.isLoggedIn = true
    }
  },
  components: {
    ActionButton,
    ProfileImage,
  },
};
</script>
