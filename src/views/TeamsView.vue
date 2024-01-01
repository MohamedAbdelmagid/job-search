<template>
  <HeaderContainer>
    <template v-slot:title>
      <h1 class="w-full text-4xl font-normal">Teams</h1>
    </template>
    <template v-slot:subtitle>
      <h2 class="my-4 w-full text-base font-light">
        Together, we create access to information and build products that
        improve people's lives. Want to be a Googler? Find your role.
      </h2>
    </template>
  </HeaderContainer>
</template>

<script>
import HeaderContainer from "@/components/shared/HeaderContainer.vue";

export default {
  name: "TeamsView",
  components: {
    HeaderContainer,
  },
};
</script>
