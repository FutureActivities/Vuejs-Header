<template>
    <div class="menu">
        <div class="menu__bar">
            <fa-menu-megamenu v-for="(item,key) in data" :key="key" :item="item" :item-class="key" :display="display" :vue-router="vueRouter" v-on:click="$emit('click')"></fa-menu-megamenu>
        </div>
        <fa-menu-burger :data="data" :vue-router="vueRouter" v-on:click="$emit('click')"></fa-menu-burger>
    </div>
</template>

<script>
    import MegaMenu from './menu/MegaMenu.vue';
    import Burger from './menu/Burger.vue';

    export default {
        name: 'fa-menu',
        data: function() {
            return {
                data: {}
            };
        },
        props: {
            'feed': {
                type: String
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
            
            var local = this.localGet();
            
            if (this.cache && local !== null) {
                this.data = local;
            } else {
                this.$http.get(this.feed).then(function(response) {
                    this.data = response.data;
                    this.localSave(this.data);
                });
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