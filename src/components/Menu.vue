<template>
    <div class="nav">
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
            }
        },
        created: function() {
            var self = this;

            this.$http.get(this.feed).then(function(response) {
                this.data = response.data;
            });
        },
        components: {
            'fa-menu-horizontal': Horizontal,
            'fa-menu-burger': Burger
        }
    }
</script>

<style lang="scss">
    .nav {
        &__bar {
            display: flex;
        }
    }
</style>