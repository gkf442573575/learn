<style lang="scss" scoped>
.editor {
  width: 600px;
  height: 800px;
}
</style>
<template>
  <div>
    <sql-editor @onCodeChange="codeChange"></sql-editor>
  
  </div>
</template>

<script>
import SqlEditor from '../components/sqlEditor';
export default {
  components: {
    SqlEditor
  },
  data(){
    return {
      code: ''
    }
  },
  methods: {
    codeChange(val, evt) {
      // eslint-disable-next-line no-console
      console.log('val', val)
      // eslint-disable-next-line no-console
      console.log('evt',evt)
    }
  }
};
</script>
