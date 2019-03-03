import Vue from 'vue';
import Router from 'vue-router';


import Index from '@/components/index';
import Firstload from '@/components/firstload';

Vue.use(Router)

const routers = [{
    path: '/',
    name: 'index',
    meta: {
        title: '首页'
    },
    component: Index
},{
    path: '/firstload',
    name: 'firstload',
    meta: {
        title: '初次登录'
    },
    component: Firstload
}]
//路由配置
const RouterConfig = {
    // mode: 'history',
    routes: routers
};
const router = new Router(RouterConfig);
// 路由跳转前
router.beforeEach((to, from, next) => {
    if (to.name == 'index' && to.params && to.params.open) {
        next();
    } else {
        if (to.path != '/firstload') {
            let firstload = document.querySelector("input[name=firstload]").getAttribute('value');
            let islogin = document.querySelector("input[name=islogin]").getAttribute('value');
            if (firstload == 'true' || islogin == 'false') {
                next({
                    path: '/firstload'
                })
            } else {
                next();
            }
        } else {
            next();
        }
    }

});
// 路由跳转后
router.afterEach(() => {
    window.scrollTo(0, 0);
});

export default router;