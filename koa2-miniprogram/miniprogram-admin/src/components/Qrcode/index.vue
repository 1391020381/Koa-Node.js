<template>
  <div class="qrcode-wrap">
    <div id="qrcode" />
  </div>
</template>

<script>
import QRCode from 'qrcodejs2'
export default {
  name: 'Qrcode',
  components: {},
  props: {
    text: {
      type: String,
      require: true,
      default: ''
    },
    width: {
      type: Number,
      require: true,
      default: 200
    },
    height: {
      type: Number,
      require: true,
      default: 200
    }
  },
  data() {
    return {
      qrcode: ''
    }
  },
  computed: {},
  watch: {},
  created() { },
  mounted() {
  },
  activated() { },
  update() { },
  beforeDestroy() {
    this.qrcode.clear()
  },
  methods: {
    initQrcode({ text, width, height }) {
      this.qrcode = new QRCode('qrcode', {
        text: text,
        width: width,
        height: height,
        colorDark: '#000000',
        colorLight: '#ffffff',
        correctLevel: QRCode.CorrectLevel.H
      })
    }
  },
  filter: {}
}
</script>

<style lang="scss" scoped>
</style>
