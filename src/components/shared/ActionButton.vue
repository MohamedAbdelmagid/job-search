<template>
  <button :class="variant">
    {{ text }}
  </button>
</template>

<script setup>
defineProps({
  text: {
    type: String,
    required: true,
  },
  variant: {
    type: String,
    default: "primary",
    validator(value) {
      return ["primary", "secondary"].includes(value);
    },
  },
});
</script>

<style scoped>
button {
  @apply px-5 py-3 font-medium;
}
.primary {
  @apply rounded bg-brand-blue-1 px-5 py-3 text-white hover:shadow-blue;
}
.secondary {
  @apply bg-transparent text-brand-blue-1 hover:bg-brand-blue-2 hover:text-white;
}
</style>
