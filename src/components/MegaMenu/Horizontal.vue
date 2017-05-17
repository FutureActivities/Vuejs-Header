<template>
    <div class="nav__bar">
        <div class="nav__megamenu" v-for="(item,key) in data" :class="[{'nav__megamenu--parent': item.links}]">
            <a  v-if="item.url" class="nav__megamenu__item" :href="item.url">{{ item.name }}</a>
            <span v-else class="nav__megamenu__item">{{ item.name }}</span>
            
            <div class="nav__megamenu__dropdown" v-show="item.links">
                <ul v-for="(list,level) in item.links" class="nav__links" :class="levelClass(level)">
                    <li v-for="link in list" :class="levelClass(level)" v-on:mouseover="menuItemHover(key, link.id, level)">
                        <a :href="link.url" :class="[{'active': isActive(key, link.id, level)}]">{{ link.name }}</a>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'fa-megamenu-horizontal',
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
    .header:not(.header--desktop) .nav__megamenu, .header--sticky .nav__megamenu {
        display: none;   
    }
        
    .nav__megamenu {
        
        &__dropdown {
            display: none;
            position: absolute;
        }
        
        &--parent:hover {
                      
            .nav__megamenu__dropdown {
                display: flex;
                align-items: center;
            }
        }
    }
</style>