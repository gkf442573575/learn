<style lang="scss" scoped>
#container {
  height: 100%;
  text-align: left;
}
</style>
<template>
  <div id="container" ref="container" style="height:300px" />
</template>
<script>
import * as monaco from 'monaco-editor';
export default {
  props: {
    editorOptions: {
      type: Object,
      default: function() {
        return {
          selectOnLineNumbers: true,
          roundedSelection: false,
          readOnly: false, // 只读
          cursorStyle: 'line', // 光标样式
          automaticLayout: false, // 自动布局
          glyphMargin: true, // 字形边缘
          useTabStops: false,
          fontSize: 28, // 字体大小
          autoIndent: true // 自动布局
        };
      }
    }
  },
  data() {
    return {
      themeOption: [
        {
          value: 'vs',
          label: '默认'
        },
        {
          value: 'hc-black',
          label: '高亮'
        },
        {
          value: 'vs-dark',
          label: '深色'
        }
      ],
      theme: 'vs',
      codesCopy: null, // 内容备份
      codes: '',
      language: 'sql'
    };
  },
  watch: {
    /*
    hints: (newVal, oldVal) => {
      if (newVal.length > 0) {
        this.monacoEditor.trigger('提示', 'editor.action.triggerSuggest', {})
      }
    }
    */
  },
  mounted() {
    this.initEditor();
  },
  beforeDestroy() {
    this.monacoEditor && this.monacoEditor.dispose();
  },
  methods: {
    initEditor() {
      this.$refs.container.innerHTML = '';
      this.monacoEditor = monaco.editor.create(document.getElementById('container'), {
        value: this.codesCopy || this.codes,
        language: this.language,
        theme: this.theme, // vs, hc-black, or vs-dark
        editorOptions: this.editorOptions
      });
      this.$emit('onMounted', this.monacoEditor); // 编辑器创建完成回调
      this.monacoEditor.onDidChangeModelContent(event => {
        // 编辑器内容changge事件
        const codeVal = this.monacoEditor.getValue();
        this.codesCopy = codeVal;
        this.$emit('onCodeChange', codeVal, event);
      });
      // 编辑器随窗口自适应
      window.addEventListener('resize', () => {
        this.initEditor();
      });
    },
    RunResult() {
      // eslint-disable-next-line no-console
      console.log(this.monacoEditor.getValue());
    }
  }
};
</script>
