import Vue from 'vue'
import SectorMenu from './SectorMenu.vue'
const Components = {
    SectorMenu
}

Object.keys(Components).forEach(name => {
  Vue.component(name, Components[name])
})

export default Components