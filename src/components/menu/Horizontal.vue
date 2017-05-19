<template>
    <div class="menu__bar">
        <div class="menu__megamenu" v-for="(item,key) in data" :class="[{'menu__megamenu--parent': item.links}]">
            <a  v-if="item.url" class="menu__megamenu__item" :href="item.url">{{ item.name }}</a>
            <span v-else class="menu__megamenu__item">{{ item.name }}</span>
            
            <div class="menu__megamenu__dropdown-wrapper" v-show="item.links">
                <div class="menu__megamenu__dropdown">
                    <ul v-for="(list,level) in item.links" class="menu__links" :class="levelClass(level)">
                        <li v-for="link in list" :class="levelClass(level)" v-on:mouseover="menuItemHover(key, link.id, level)">
                            <a :href="link.url" :class="[{'active': isActive(key, link.id, level)}]">{{ link.name }}</a>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'fa-menu-horizontal',
    data: function() {
        return {
        };
    },
    props: {
        'data': Object
    },
    methods: {
        /**
         * Generate the ul class
         */
        levelClass: function(level) {
            return 'level'+level;
        },
        /**
         * Check if a category is active to apply
         * the active class
         */
        isActive: function(key, id, level) {
            var item = this.data[key];
            
            if (typeof item.active == 'undefined')
                item.active = [];
                
            var active = item.active[level];
            var children = item.source[id];
            return children && active === id;
        },
        /**
         * Desktop Megamenu
         * On hover show the child menu if available.
         */
        menuItemHover: function(key, id, level) {
            var item = this.data[key];
            
            // Set this category as the active one for the level
            item['active'][level] = id;
            
            // Determine the next level from this point
            var currLevel = parseInt(level);
            var nextLevel = currLevel + 1;
            
            // Remove everything in the array after the next level
            // Ensures deeper categories are removed when hovering over a higher level
            item.links.length = nextLevel;
            
            // Set the children
            var children = item.source[id];
            if (children)
                item.links.push(children);
            
            this.$forceUpdate();
        }
    }
}
</script>

<style lang="scss">
    /**
        Hide this menu when:
        - Viewing on mobile.
        - Sticky header and nav is set to burger on sticky.
    */
    .header:not(.header--desktop) .menu__megamenu, .header--sticky .nav__burger .menu__megamenu {
        display: none;   
    }
        
    .menu__megamenu {
        
        &__dropdown-wrapper {
            display: none;
            position: absolute;
        }
        
        &__dropdown {
            display: flex;
        }
        
        &--parent:hover {
            .menu__megamenu__dropdown-wrapper {
                display: block;
            }
        }
    }
</style>