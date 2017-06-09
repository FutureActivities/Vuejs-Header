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
            },
            'minutes': {
                type: Number,
                default: 60
            }
        },
        created: function() {
            var self = this;
            
            var local = this.localGet();
            var age = this.localAge();
            
            if (this.cache && local !== null && age !== null && this.minutes >= age) {
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
                    
                localStorage.setItem("fa-menu", JSON.stringify(data));
                localStorage.setItem("fa-menu-age", new Date().getTime());
            },
            localGet: function() {
                if (typeof(Storage) === "undefined")
                    return null;
                    
                var data = localStorage.getItem('fa-menu');
                if (data)
                    return JSON.parse(data);
            },
            localAge: function() {
                if (typeof(Storage) === "undefined")
                    return null;
                    
                var age = localStorage.getItem('fa-menu-age');
                if (age)
                    return this.timeDifference(age, new Date().getTime());
                
                return null;
            },
            timeDifference: function(oldDate, newDate) {
                return Math.floor((newDate - oldDate) / 60000);
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