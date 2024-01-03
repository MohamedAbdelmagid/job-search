<template>
  <ul>
    <li v-for="spotlight in spotlights" :key="spotlight.id">
      <slot :spotlight="spotlight"></slot>
    </li>
  </ul>
</template>

<script>
import axios from 'axios';

export default {
  name: "SpotLights",
  data() {
    return {
      spotlights: [],
    }
  },
  created() {
    const spotlightsURL = import.meta.env.VITE_API_URL + "/spotlights"
    axios.get(spotlightsURL).then(res => {
      this.spotlights = res.data;
    })
  }
}
</script>