<template>
    <div class="nav">
        <fa-megamenu-horizontal :data="data"></fa-megamenu-horizontal>
        <fa-megamenu-burger :data="data"></fa-megamenu-burger>
    </div>
</template>

<script>
    import Horizontal from './menu/Horizontal.vue';
    import Burger from './menu/Burger.vue';

    export default {
        name: 'fa-megamenu',
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
            'fa-megamenu-horizontal': Horizontal,
            'fa-megamenu-burger': Burger
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