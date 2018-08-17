import vMediaQuery from 'v-media-query';
import Header from './components/Header.vue';
import Navigation from './components/Navigation.vue';
import Search from './components/Search.vue';

function plugin (Vue) {
    Vue.use(vMediaQuery);
    Vue.component('fa-header', Header);
    Vue.component('fa-navigation', Navigation);
    Vue.component('fa-search', Search);
}

if (typeof window !== 'undefined' && window.Vue) {
  window.Vue.use(plugin)
}

export default plugin

export {
    Header,
    Navigation,
    Search
}