var listenAction;

/**
 * Vue Sticky - Adds a sticky class when the element reaches the top
 * 
 * Adapted from https://github.com/rguanghui/vue-sticky/tree/2.x to use
 * a class name instead of inline css
 */
export default {
  bind: function(el, binding) {
    var params = binding.value || {}
    var stickyTop = params.stickyTop || 0
    var stickyClass = params.class || 'header--sticky';
    
    if (stickyTop == -1) // Disable sticky if set to -1
      return;
    
    var active = false
    var elementHeight = 0
    
    var elementChild = el.firstElementChild;
    
    // Apply sticky class
    var sticky = function() {
      if (active) {
        return
      }
      el.classList.add(stickyClass);
      el.style.height = elementHeight + 'px';
      active = true
    }

    // Remove sticky class
    var reset = function() {
      if (!active) {
        return
      }
      el.classList.remove(stickyClass);
      el.style.height = 'auto';
      active = false
    }

    // Check scroll position
    var check = function() {
      var offsetTop = el.getBoundingClientRect().top
      if (offsetTop <= stickyTop) {
        sticky()
      } else {
        reset()
      }
    }

    var scrollerTimer // for bad user experience scroll in mobile
    var scrollEndTimer // for clear scrollerTimer when scroll end
    listenAction = function() {
      clearTimeout(scrollEndTimer)
      scrollEndTimer = setTimeout(function() {
        clearInterval(scrollerTimer)
        scrollerTimer = null
      }, 1000)

      if (!scrollerTimer) {
        scrollerTimer = setInterval(check, 30)
      }
    }

    window.addEventListener('scroll', listenAction);
    
    window.addEventListener('load', function() {
      elementHeight = elementChild.clientHeight;
    });
  },

  unbind: function() {
    window.removeEventListener('scroll', listenAction)
  },
}