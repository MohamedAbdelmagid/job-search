<template>
  <img
    :src="imageURL"
    alt="Profile Image"
    class="h-8 w-8 rounded-3xl object-contain"
  />
</template>

<script>
export default {
  name: "ProfileImage",
  data() {
    return {
      imageURL: "https://thumbs.dreamstime.com/b/default-avatar-profile-vector-user-profile-default-avatar-profile-vector-user-profile-profile-179376714.jpg",
    };
  },
};
</script>
