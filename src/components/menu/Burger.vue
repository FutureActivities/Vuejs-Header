<template>
    <div class="menu__mobile-menu">
        <ul v-if="current.length == 0">
            <li v-for="(category,key) in data" v-if="canShow(category)"  class="menu__mobile-menu__item menu__mobile-menu__item--top" :class="[key]">
                <a :href="category.url" v-on:click.stop.prevent="setType(key, category)">{{ category.name }}</a>
            </li>
        </ul>
        
        <ul v-if="current.length > 0">
            <li class="menu__mobile-menu__item menu__mobile-menu__item--back" v-on:click="back">Back</li>
            <li class="menu__mobile-menu__item menu__mobile-menu__item--parent">
                <a  v-if="previous().url !== null" :href="previous().url">{{ previous().name }}</a>
                <span v-else>{{ previous().name }}</span>
            </li>
            <li v-for="category in current" class="menu__mobile-menu__item" :class="[{'menu__mobile-menu__item--children': hasChildren(category.id)}]">
                <a :href="category.url" v-on:click.stop.prevent="item(category)">{{ category.name }}</a>
            </li>
        </ul>
    </div>
</template>

<script>
    export default {
        name: 'fa-menu-burger',
        data: function() {
            return {
                'type': null,
                'history': [],
                'current': []
            };
        },
        props: {
            'data': Object
        },
        methods: {
            hasChildren: function(categoryId) {
                if (this.data[this.type].source)
                    return this.data[this.type].source[categoryId];
                    
                return false;
            },
            
            /**
             * Check if a menu item is visible
             */
            canShow: function(item) {
                if (typeof item.burger === 'undefined')
                    return true;
                    
                return item.burger;
            },

            /**
             * Show the appropriate submenu
             */
            setType: function(key, category) {
                if (typeof category.onclick !== 'undefined') // Optionally override default behaviour
                    return window[category.onclick](category);
                
                if (!('links' in this.data[key]) && category.url)
                    return window.location.href = category.url;

                this.type = key;
                this.addHistory({
                    'name': this.data[key].name,
                    'url': null
                });
                
                var merged = [].concat.apply([], this.data[key].links);
                
                this.addHistory(category);
                this.current = merged;
            },

            /**
             * Show the child menu if available.
             */
            item: function(category) {
                var children = this.hasChildren(category.id);
                if (!children)
                    window.location.href = category.url;

                this.addHistory(category);
                this.current = children;
            },

            /**
             * Pressing back in the burger menu
             */
            back: function() {
                var previous = this.history.pop();
                this.current = previous ? previous.links : [];
            },

            /**
             * Add the current category to the menu history
             * before showing the next level
             */
            addHistory: function(category) {
                this.history.push({
                    'category': category,
                    'links': this.current
                });
            },

            /**
             * Go back to the previous menu
             */
            previous: function() {
                var previous = this.history[this.history.length - 1];
                return previous.category;
            }
        }
    }
</script>

<style lang="scss">
    /*
        Hide this burger menu when:
        - Viewing on desktop and not sticky.
        - Viewing on desktop and is sticky but nav is not set to use burger on sticky.
    */
    .header--desktop:not(.header--sticky) .menu__mobile-menu, .header--desktop.header--sticky .nav:not(.menu__burger) .menu__mobile-menu {
        display: none;
    }
</style>