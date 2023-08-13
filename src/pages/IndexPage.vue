<template>
  <q-page class="flex flex-center">
    <div>{{ socketToken }}</div>
  </q-page>
</template>

<script>
import { defineComponent } from 'vue'
import useUser from 'src/stores/useUser'
import { mapState } from 'pinia';
export default defineComponent({
  name: 'IndexPage',
  computed: {
    ...mapState(useUser, ['socketToken']),
  }
})
</script>
