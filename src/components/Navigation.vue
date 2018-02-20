<template>
    <nav class="nav" v-bind:class="{ 'nav--show': navActive, 'nav--desktop': desktopView, 'nav--burger': burgersticky }">
        <div class="nav__mobile" v-on:click="navToggle"><slot name="icon"></slot></div>
        <div class="nav__wrapper">
            <div class="nav__background" v-on:click="navToggle"></div>
            <div class="nav__container">
                <div class="nav__close" v-on:click="navToggle"><slot name="close-icon"></slot></div>
                <slot></slot>
            </div>
        </div>
    </nav>
</template>

<script>
    export default {
        name: 'fa-navigation',
        data: function() {
            return {
                desktopView: false,
                navActive: false
            }
        },
        props: {
            breakpoint: {
                type: Number,
                default: 1024
            },
            /* Show burger icon when scrolling */
            burgersticky: {
                type: Boolean,
                default: false
            },
            value: {
                type: Boolean,
                default: false
            }
        },
        watch: {
            '$mq.resize': function() {
                if (this.$mq.above(this.breakpoint))
                    this.desktopView = true;
                else
                    this.desktopView = false;
            },
            value: function(newValue) {
                this.navActive = newValue;
                this.setBodyClass();
            }
        },
        methods: {
            navToggle: function(event) {
                this.navActive = !this.navActive;
                this.$emit('input', this.navActive);
            },
            setBodyClass: function() {
                if (this.navActive)
                    document.body.className += " noscroll";
                else
                    document.body.className = document.body.className.replace(" noscroll", "");
            }
        },
        created: function() {
            if (this.$mq.above(this.breakpoint))
                this.desktopView = true;
        }
    }
</script>

<style lang="scss">
    .nav {
        &__wrapper {
            display: block;
            padding: 0;
            position: fixed;
            z-index: 999;
            top: 0;
            left: 0;
            height: 100%;
            width: 100%;
            visibility: hidden;
        }
        &__background {
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            z-index: 1;
            display: none;
        }
        &__container {
            width: 320px;
            padding: 40px 10px;
            padding-top: 12px;
            height: 100%;
            right: -320px;
            -webkit-transition: all 0.5s ease;
            transition: all 0.5s ease;
            position: absolute;
            z-index: 2;
        }
        &__mobile {
            cursor: pointer;
            &:before {
                font-family: FontAwesome;
                content: "\f0c9";
            }
        }
        &__close {
            cursor: pointer;
            display: block;
            float: right;
            padding: 0 10px;
            &:before {
                font-family: FontAwesome;
                content: "\f00d";
            }
        }
        &--show {
            .nav__wrapper {
                visibility: visible;
            }
            .nav__background {
                display: block;
            }
            .nav__container {
                right: 0;
                margin: 0;
            }
        }
    }
    
    header:not(.header--sticky) .nav--desktop,
    .header--sticky .nav--desktop:not(.nav--burger) {
        .nav__wrapper {
            position: inherit;
            visibility: visible;
            height: auto;
        }
        .nav__container {
            position: inherit;
            transition: none;
            padding: 0;
            width: auto;
            right: auto;
            height: auto;
        }
        .nav__mobile {
            display: none;
        }
        .nav__close {
            display: none;
        }
    }
</style>