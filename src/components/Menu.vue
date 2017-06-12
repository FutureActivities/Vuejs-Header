<template>
    <div class="menu">
        <fa-menu-horizontal :data="data"></fa-menu-horizontal>
        <fa-menu-burger :data="data"></fa-menu-burger>
    </div>
</template>

<script>
    import Horizontal from './menu/Horizontal.vue';
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
            'fa-menu-horizontal': Horizontal,
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