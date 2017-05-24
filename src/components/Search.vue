<template>
  <div class="search" v-bind:class="{ 'search--show': searchActive, 'search--desktop': desktopView, 'search--iconsticky': iconsticky  }">
    <div class="search__mobile" v-on:click="searchToggle"><slot name="icon"></slot></div>
    <div class="search__content">
      <slot></slot>
    </div>
	</div>
</template>

<script>
export default {
  name: 'fa-search',
  data: function () {
    return {
      desktopView: false,
      searchActive: false
    }
  },
  props: {
    'breakpoint': {
      type: Number,
      default: 1024
    },
    /* Show mobile view when scrolling */
    'iconsticky': {
      type: Boolean,
      default: false
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
      },
      searchToggle: function(event) {
          this.searchActive = !this.searchActive;
      }
  },
  created: function() {
    if (this.$mq.above(this.breakpoint))
        this.desktopView = true;
  }
}
</script>

<style lang="scss">
.search {
  
  &__mobile {
    cursor: pointer;
    
    &:before {
      font-family: FontAwesome;
      content: "\f002";
    }
  }
  
  &__content {
    display: none;
  }
  
  &--show {
    .search__content {
      display: block;
      position: absolute;
      left: 0;
      right: 0;
      z-index: 999;
      
      input {
        width: 100%;
      }
    }
  }
}

header:not(.header--sticky) .search--desktop, .header--sticky .search--desktop:not(.search--iconsticky) {
  .search__mobile {
    display: none;
  }
  
  .search__content {
    display: block;
    position: relative;
    
  }
}
</style>