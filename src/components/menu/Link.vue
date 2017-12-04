<template>
    <router-link v-if="vueRouter && url" :class="classes" :to="url" v-on:click="click"><slot></slot></router-link>
    <a v-else-if="url" :class="classes" :href="url" v-on:click="click"><slot></slot></a>
    <div v-else :class="classes"><slot></slot></div>
</template>

<script>
    export default {
        name: 'fa-menu-link',
        data: function() {
            return {
                
            }
        },
        props: {
            vueRouter: {
                type: Boolean,
                default: false,
                required: false
            },
            classes: {
                type: Array,
                default: function () { return [] },
                required: false
            },
            url: {
                type: String,
                required: true
            }
        },
        methods: {
            click: function(event) {
              this.$emit('click', event);
            }
        }
    }
</script>