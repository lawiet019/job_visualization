import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/pages/index'
import Search from '@/pages/search'
import Beijing from '@/pages/beijing'
import Left from '@/components/left'
import Front from '@/pages/front'
import Java from '@/pages/java'
import Php from '@/pages/php'
import Design from '@/pages/design'
import Product from '@/pages/product'
import Data from '@/pages/data'
import Shanghai from '@/pages/shanghai'
import Shenzhen from '@/pages/shenzhen'
import Guangzhou from '@/pages/guangzhou'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Index',
      component: Index,
      children: [ 
　　　{ 
　　　　path: '/beijing', 
 　　　 name: 'Beijing',
        component: Beijing,
　　  },
      { 
　　　　path: '/', 
 　　　 name: 'Search',
        component: Search,
　　  },
      { 
　　　　path: '/front', 
 　　　 name: 'Front',
        component: Front,
　　  },
      { 
　　　　path: '/php', 
 　　　 name: 'Php',
        component: Php,
　　  },
      { 
　　　　path: '/java', 
 　　　 name: 'Java',
        component: Java,
　　  },
      { 
　　　　path: '/design', 
 　　　 name: 'Design',
        component: Design,
　　  },
      { 
　　　　path: '/product', 
 　　　 name: 'Product',
        component: Product
　　  },
      { 
　　　　path: '/data', 
 　　　 name: 'Data',
        component: Data
　　  },
      { 
　　　　path: '/shanghai', 
 　　　 name: 'Shanghai',
        component: Shanghai
　　  },
      { 
　　　　path: '/shenzhen', 
 　　　 name: 'Shenzhen',
        component: Shenzhen
　　  },
      { 
　　　　path: '/guangzhou', 
 　　　 name: 'Guangzhou',
        component: Guangzhou
　　  }
　　]
    },
    {
      path: '/left',
      name: 'Left',
      component: Left
    }
  ]
})
