<template>
  <div class="login-container">
    <div class="qrcode">
      <Qrcode ref="qrcode" />
    </div>
  </div>
</template>

<script>
import { getQrcode } from '@/api/user.js'
import Qrcode from '@/components/Qrcode'
export default {
  name: 'Login',
  components: {
    Qrcode
  },
  data() {
    return {
      text: ''
    }
  },
  watch: {
    $route: {
      handler: function(route) {
        this.redirect = route.query && route.query.redirect
      },
      immediate: true
    }
  },
  created() {
    this.getQrcode()
  },
  methods: {
    async getQrcode() {
      try {
        const { data, status } = await getQrcode()
        if (status === 0) {
          console.log(data)
          this.$nextTick(() => {
            this.$refs.qrcode.initQrcode({ text: data, width: 400, height: 400 })
          })
        }
      } catch (e) {
        console.log(e)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.login-container {
  min-height: 100%;
  width: 100%;
  background-color: #2d3a4b;
  color: #fff;
  overflow: hidden;
  .qrcode {
    position: absolute;
    left: 50%;
    top: 50%;
    right: 50%;
    bottom: 50%;
    width: 400px;
    height: 400px;
    background: #fff;
    transform: translate(-50%, -50%);
  }
}
</style>
