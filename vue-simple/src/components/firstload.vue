<style scoped lang='scss'>
  
</style>

<template>
    <div id="firstload" :class="[isIOS?'iosPage':'','page', 'depage']">
       
    </div>
</template>

<script>


    export default {
        data() {
            return {
                //数据 json格式
                
            }
        },
        components: {
            //组件
        },
        computed: {
            //计算属性
        },
        created() {
            //实例创建但未显示,在此请求接口 使用this访问实例
        },
        mounted() {
            //html元素被替换挂载到，可以访问html
        },
        methods: {
            //处理事件,页面的点击，键盘事件或者框架中定义的事件
            
        },
        updated() {
            //数据更新
        }
    };
</script>