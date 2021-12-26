import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)
const routes=[
    {
        path:'/',
        component:()=>import('../home'),
        redirect:'/navBar/homePage'
    },
    {
        path:'/navBar',
        component:()=>import('../home'),
        children:[
            //导航栏路由
            //主页
            {
                path:'homePage',
                component:()=>import('../navBar/homePage')
            },
            //本地音乐
            {
                path:'localMusic',
                component:()=>import('../navBar/localmusic')
            },
            //网络资源
            {
                path:'netResources',
                component:()=>import('../navBar/netResources')
            },
            //个人歌单
            {
                path:'personalSongList',
                component:()=>import('../navBar/personalSongList')
            }
        ]
    }
]


const router=new VueRouter({
    routes
})


export default router;