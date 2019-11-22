import Vue from 'vue'
import Input from 'element-ui/lib/input'
import Button from 'element-ui/lib/button'
import RadioGroup from 'element-ui/lib/radio-group'
import RadioButton from 'element-ui/lib/radio-button'
import Message from 'element-ui/lib/message'
import 'element-ui/lib/theme-chalk/base.css'
import 'element-ui/lib/theme-chalk/input.css'
import 'element-ui/lib/theme-chalk/button.css'
import 'element-ui/lib/theme-chalk/radio-group.css'
import 'element-ui/lib/theme-chalk/radio-button.css'
import 'element-ui/lib/theme-chalk/message.css'

import App from './App.vue'
import router from './router'
import store from './store'
import DownloadExcel from '../lib'

Vue.config.productionTip = false

Vue.use(DownloadExcel)
Vue.component(Input.name, Input)
Vue.component(Button.name, Button)
Vue.component(RadioGroup.name, RadioGroup)
Vue.component(RadioButton.name, RadioButton)
Vue.prototype.$message = Message

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
