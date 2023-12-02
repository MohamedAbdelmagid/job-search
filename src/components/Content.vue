<template>
  <main>
    <section class="flex h-screen flex-col pb-20 pt-10">
      <div class="grid grid-cols-12">
        <div class="col-span-1 col-start-1"></div>
        <div class="col-span-5 col-start-2">
          <HeadLine />
          <JobSearchForm />
        </div>
        <div class="col-span-5 col-start-7"></div>
        <div class="col-span-1 col-start-12"></div>
      </div>
    </section>
  </main>
</template>

<script>
import HeadLine from "@/components/HeadLine.vue";
import JobSearchForm from "./JobSearchForm.vue";

export default {
  name: "Content",
  components: {
    HeadLine,
    JobSearchForm,
  },
};
</script>
