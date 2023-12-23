<template>
  <li class="mb-7">
    <router-link to="/jobs/1" class="mx-auto block rounded border border-solid border-brand-gray-2 bg-white hover:shadow-gray">
      <div class="mx-8 border-b border-solid border-brand-gray-2 pt-5 pb-2">
        <h2 class="mb-2 text-2xl">Vue Developer</h2>
        <div class="flex flex-row align-middle">
          <div class="mr-5">
            <span>SoftBanks</span>
          </div>
          <div>
            <span>Nasir City, Cairo, Eygpt</span>
          </div>
        </div>
      </div>
      <div class="px-8 py-4">
        <ul class="list-disc pl-8">
          <li>Bachelor's degree or equivalent practical experience</li>
          <li>5 years of experience in program management.</li>
          <li>
            Experience analyzing data through querying database (e.g., SQL)
            using spreadsheet software, and creating statistical models.
          </li>
        </ul>
      </div>
    </router-link>
  </li>
</template>

<script>
export default {
  name: "JobListing"
}
</script>