<template>
    <a v-if="url" :class="classes" :href="url" v-on:click="click"><slot></slot></a>
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
            classes: {
                type: Array,
                default: function () { return [] },
                required: false
            },
            url: {
                type: String,
                required: false
            }
        },
        methods: {
            click: function(event) {
              this.$emit('click', event);
            }
        }
    }
</script>