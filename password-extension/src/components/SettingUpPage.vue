<template>
  <div class='loader' v-bind="this.loading()">
  </div>
</template>

<script>
import router from '../router'
export default {
  name: 'SettingUpPage',
  methods: {
    loading () {
      setTimeout(() => {
        router.push({ path: '/home' })
      }, 300)
    }
  }
}
</script>
