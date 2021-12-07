<template>
  <div>
    <div @click="getCopyText">点击我读取剪切板内容</div>
    <div>{{copyData}}</div>
    <div>{{copyDataPlain}}</div>
    <div @click="setCopyText">点击我设置剪切板内容</div>
  </div>
</template>

<script>
export default {
  name: 'GET_COPY',
  data() {
    return {
      copyData: '',
      copyDataPlain: ''
    };
  },
  created() {

  },
  methods: {
    getCopyText() {
      this.pasteHandler()
    },
    setCopyText() {
      this.copyText('我是设置的值')
    },
    copyText(text) {
      let copyBox = document.createElement('input')
      copyBox.value = text
      document.body.appendChild(copyBox)
      copyBox.select()
      document.execCommand('copy')
      copyBox.style.display = 'none'
      copyBox.remove()
    },
    // 获取剪切板的数据
    async pasteHandler() {
      const clipboardItems = await window.navigator.clipboard.read();
      let textHtml, textPlain;
      for (const clipboardItem of clipboardItems) {
        for (const type of clipboardItem.types) {
          const item = await clipboardItem.getType(type);
          if (item && item.type == 'text/html') {
            textHtml = await item.text();
          }
          if (item && item.type == 'text/plain') {
            textPlain = await item.text();
          }
        }
      }
      this.copyDataPlain = textPlain;
      this.copyData = textHtml;
      return { textHtml, textPlain }
    }
  }
}
</script>

<style>
</style>