<template>
    <div class="menu">
        <div class="menu__bar">
            <fa-menu-megamenu v-for="(item,key) in menuData" :key="key" :item="item" :item-class="key" :display="display" :vue-router="vueRouter" v-on:click="$emit('click')"></fa-menu-megamenu>
        </div>
        <fa-menu-burger :data="menuData" :vue-router="vueRouter" v-on:click="$emit('click')"></fa-menu-burger>
    </div>
</template>

<script>
    import MegaMenu from './menu/MegaMenu.vue';
    import Burger from './menu/Burger.vue';

    export default {
        name: 'fa-menu',
        data: function() {
            return {
                menuData: {}
            };
        },
        props: {
            'feed': {
                type: String
            },
            'data': {
                type: Object,
                default: null
            },
            'cache': {
                type: Boolean,
                default: false
            },
            'display': {
                type: String,
                default: 'multilevel'
            },
            'vueRouter': {
                type: Boolean,
                default: false,
                required: false
            }
        },
        created: function() {
            var self = this;
            
            if (this.data) {
                this.menuData = this.data;
            } else {
                var local = this.localGet();
                
                if (this.cache && local !== null) {
                    this.menuData = local;
                } else {
                    this.$http.get(this.feed).then(function(response) {
                        self.menuData = response.data;
                        self.localSave(self.menuData);
                    });
                }
            }
        },
        methods: {
            localSave: function(data) {
                if (!this.cache || typeof(Storage) === "undefined")
                    return;
                    
                sessionStorage.setItem("fa-menu", JSON.stringify(data));
            },
            localGet: function() {
                if (typeof(Storage) === "undefined")
                    return null;
                    
                var data = sessionStorage.getItem('fa-menu');
                if (data)
                    return JSON.parse(data);
                    
                return null;
            }
        },
        components: {
            'fa-menu-megamenu': MegaMenu,
            'fa-menu-burger': Burger
        }
    }
</script>

<style lang="scss">
    .menu {
        &__bar {
            display: flex;
        }
    }
</style>