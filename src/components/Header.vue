<template>
  <header class="header" v-bind:class="{ 'header--desktop': desktopView }" v-sticky="{ stickyTop: sticky}">
    <div class="header__wrapper">
      <div class="header__content">
        <slot></slot>
      </div>
    </div>
  </header>
</template>

<script>
    import VueSticky from '../lib/sticky.js'

    export default {
        name: 'fa-header',
        data() {
            return {
                desktopView: false
            }
        },
        props: {
            'breakpoint': {
                type: Number,
                default: 1024
            },
            'sticky': {
                type: Number,
                default: -1
            }
        },
        watch: {
            '$mq.resize': 'screenResize'
        },
        methods: {
            screenResize: function() {
                if (this.$mq.above(this.breakpoint))
                    this.desktopView = true;
                else
                    this.desktopView = false;
            }
        },
        created: function() {
            if (this.$mq.above(this.breakpoint))
                this.desktopView = true;
        },
        directives: {
            'sticky': VueSticky,
        }
    }
</script>

<style lang="scss" scoped>
    .header .wrapper {
        position: relative;
    }
    
    .header--sticky .header__wrapper {
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        z-index: 9999;
    }
</style>