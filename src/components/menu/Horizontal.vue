<template>
    <div class="menu__bar">
        <div class="menu__megamenu" v-for="(item,key) in data" v-if="canShow(item)" :class="[{'menu__megamenu--parent': item.links || item.custom}, key]">
            <a  v-if="item.url" class="menu__megamenu__item" :class="item.classes" :href="item.url">{{ item.name }}</a>
            <span v-else class="menu__megamenu__item" :class="item.classes">{{ item.name }}</span>
            
            <div class="menu__megamenu__dropdown-wrapper" v-if="item.links || item.custom">
                
                <!-- Multilevel Menu - Displays the children on hover of the parent -->
                <div class="menu__megamenu__dropdown" v-if="display == 'multilevel'">
                    <ul v-if="item.links" v-for="(list,level) in item.links" class="menu__links" :class="levelClass(level)">
                        <li v-for="link in list" :class="levelClass(level)" v-on:mouseover="menuItemHover(key, link.id, level)">
                            <a v-if="link.url" :href="link.url" :class="[{'active': isActive(key, link.id, level)}, link.classes]">
                                <div v-if="link.prefix" class="prefix" v-html="link.prefix"></div>
                                <div v-if="link.img" class="image"><img :src="link.img" :alt="link.name" /></div>
                                <span class="name">{{ link.name }}</span>
                                <div v-if="link.suffix" class="suffix" v-html="link.suffix"></div>
                            </a>
                        </li>
                    </ul>
                    
                    <div v-if="item.custom" class="menu__custom" v-html="item.custom"></div>
                </div>
                
                <!-- Columns Menu - Supports 1 level only and displays underneath the parent link in columns -->
                <div class="menu__megamenu__columns" v-if="display == 'columns'">
                    <div v-if="item.links" v-for="(list,level) in item.links" class="menu__links">
                        <div v-for="link in list" :class="levelClass(level)" class="menu__links__parent">
                            <div v-if="link.prefix" class="prefix" v-html="link.prefix"></div>
                            <a :href="link.url" class="menu__links__heading" :class="item.classes" v-if="link.url">{{ link.name }}</a>
                            <span class="menu__links__heading" :class="item.classes" v-else>{{ link.name }}</span>
                            <ul>
                                <li v-for="child in getChildren(key, link.id)">
                                    <a v-if="child.url" :href="child.url" :class="child.classes">
                                        <div v-if="child.prefix" class="prefix" v-html="child.prefix"></div>
                                        <div v-if="child.img" class="image"><img :src="child.img" :alt="child.name" /></div>
                                        <span class="name">{{ child.name }}</span>
                                        <div v-if="child.suffix" class="suffix" v-html="child.suffix"></div>
                                    </a>
                                </li>
                            </ul>
                            <div v-if="link.suffix" class="suffix" v-html="link.suffix"></div>
                        </div>
                    </div>
                    
                    <div v-if="item.custom" class="menu__custom" v-html="item.custom"></div>
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
        'data': Object,
        'display': String
    },
    methods: {
        /**
         * Generate the ul class
         */
        levelClass: function(level) {
            return 'level'+level;
        },
        /**
         * Check if a menu item is visible
         */
        canShow: function(item) {
            if (typeof item.bar === 'undefined')
                return true;
                
            return item.bar;
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
            if (item.source && item.source[id]) {
                var children = item.source[id];
                return children && active === id;
            }
        },
        getChildren: function(key, id) {
            var item = this.data[key];
            
            if (item.source && item.source[id])
                return item.source[id];
                
            return null;
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
            var children = this.getChildren(key, id);
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
        
        &__columns {
            .menu__links {
                display: flex;
            }
        }
        
        &--parent:hover {
            .menu__megamenu__dropdown-wrapper {
                display: block;
            }
        }
    }
</style>