import DownloadExcel from './DownloadExcel.vue'

const myPlugin = {
  install: function install (Vue) {
    Vue.component('DownloadExcel', DownloadExcel)
  }
}

export default myPlugin
