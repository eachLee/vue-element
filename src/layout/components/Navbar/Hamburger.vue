<template>
  <div
    style="padding: 0 15px;"
    @click="toggleClick"
  >
    <svg
      :class="{'is-active':isActive}"
      class="hamburger"
      width="28px"
      height="34px"
      viewBox="0 0 28 34"
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
      xmlns:xlink="http://www.w3.org/1999/xlink"
    >
      <g
        id="蓝色"
        stroke="none"
        stroke-width="1"
        fill="none"
        fill-rule="evenodd"
      >
        <g
          id="CCHR首页-蓝色"
          transform="translate(-15.000000, -8.000000)"
          fill="#FFFFFF"
          fill-rule="nonzero"
        >
          <g id="顶部">
            <g
              id="编组-5"
              transform="translate(15.000000, 8.000000)"
            >
              <g id="logo">
                <g id="Logo">
                  <path
                    d="M0,0 C2.46558451,-4.52920526e-16 4.46433566,1.99875116 4.46433566,4.46433566 L4.46433566,29.0573427 C4.46433566,31.5229272 2.46558451,33.5216783 0,33.5216783 L0,33.5216783 L0,33.5216783 L0,0 Z"
                    id="矩形"
                  ></path>
                  <path
                    d="M27.4125874,16.6826638 C27.3995453,16.6825663 27.3864917,16.6825175 27.3734266,16.6825175 C24.5401672,16.6825175 22.2433566,18.979328 22.2433566,21.8125874 L22.2433566,26.7279412 C22.2433566,29.689777 20.4914353,32.3711837 17.779021,33.5608392 L17.779021,33.5608392 L17.779021,33.5608392 L17.779021,21.5776224 C17.779021,16.4950578 21.8992536,12.3748252 26.9818182,12.3748252 C27.1262087,12.3748252 27.2698226,12.3781505 27.4125874,12.3847287 L27.4125874,16.6826638 Z"
                    id="路径"
                  ></path>
                  <circle
                    id="椭圆形"
                    cx="16.6825175"
                    cy="10.8867133"
                    r="4.22937063"
                  ></circle>
                  <path
                    d="M15.7426573,16.6826638 C15.7296153,16.6825663 15.7165616,16.6825175 15.7034965,16.6825175 C12.8702371,16.6825175 10.5734266,18.979328 10.5734266,21.8125874 L10.5734266,26.7279412 C10.5734266,29.689777 8.82150526,32.3711837 6.10909091,33.5608392 L6.10909091,33.5608392 L6.10909091,33.5608392 L6.10909091,21.5776224 C6.10909091,16.4950578 10.2293236,12.3748252 15.3118881,12.3748252 C15.4562787,12.3748252 15.5998925,12.3781505 15.7426573,12.3847287 L15.7426573,16.6826638 Z"
                    id="路径-copy"
                    transform="translate(10.925874, 22.967832) scale(-1, 1) translate(-10.925874, -22.967832) "
                  ></path>
                </g>
              </g>
            </g>
          </g>
        </g>
      </g>
    </svg>
  </div>
</template>

<script>
export default {
  name: 'Hamburger',
  props: {
    isActive: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    toggleClick() {
      this.$emit('toggleClick')
    }
  }
}
</script>

<style scoped>
.hamburger {
  display: inline-block;
  vertical-align: middle;
  transform: rotate(0deg);
  transition: 0.5s;
}

.hamburger.is-active {
  transform: rotate(360deg);
  transition: 0.5s;
}
</style>
