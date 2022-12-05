import './bootstrap'
import '../css/app.css'
import axios from 'axios'
import { App as VueApp, createApp } from 'vue'
import App from './components/App.vue'
import router from './router'
import store from './store'

// import "./validator/rules";
// import TrimDirective from "./directives/trim";
// import CapitalizeDirective from "./directives/capitalize";
// import Datepicker from 'vue3-datepicker';
// import ClickOutside from "./directives/click-outside";
// import Accordion from "./directives/accordion";

// import Multiselect from '@vueform/multiselect'
// import "@vueform/multiselect/themes/default.css";

// import VueEasyLightbox from 'vue-easy-lightbox'

const bootstrap = async () => {
    const vm: VueApp<Element> = createApp(App).use(store).use(router)
    // vm.component("Multiselect", Multiselect);
    // vm.component("Datepicker", Datepicker);
    // vm.use(VueEasyLightbox)

    vm.mount('#app')
    vm.config.globalProperties.$http = axios

    // vm.directive("trim", TrimDirective);
    // vm.directive("capitalize", CapitalizeDirective);
    // vm.directive("click-outside", ClickOutside);
    // vm.directive("accordion", Accordion);
}
bootstrap()
