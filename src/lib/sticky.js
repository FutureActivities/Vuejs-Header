let listenAction

/**
 * Vue Sticky - Adds a sticky class when the element reaches the top
 * 
 * Adapted from https://github.com/rguanghui/vue-sticky/tree/2.x to use
 * a class name instead of inline css
 */
export default {
  bind(el, binding) {
    const params = binding.value || {}
    const stickyTop = params.stickyTop || 0
    const stickyClass = params.class || 'header--sticky';
    
    if (stickyTop == -1) // Disable sticky if set to -1
      return;
    
    let active = false
    let elementHeight = 0
    
    const elementChild = el.firstElementChild;
    
    // Apply sticky class
    const sticky = () => {
      if (active) {
        return
      }
      el.classList.add(stickyClass);
      el.style.height = elementHeight + 'px';
      active = true
    }

    // Remove sticky class
    const reset = () => {
      if (!active) {
        return
      }
      el.classList.remove(stickyClass);
      el.style.height = 'auto';
      active = false
    }

    // Check scroll position
    const check = () => {
      const offsetTop = el.getBoundingClientRect().top
      if (offsetTop <= stickyTop) {
        sticky()
      } else {
        reset()
      }
    }

    let scrollerTimer // for bad user experience scroll in mobile
    let scrollEndTimer // for clear scrollerTimer when scroll end
    listenAction = () => {
      clearTimeout(scrollEndTimer)
      scrollEndTimer = setTimeout(() => {
        clearInterval(scrollerTimer)
        scrollerTimer = null
      }, 1000)

      if (!scrollerTimer) {
        scrollerTimer = setInterval(check, 30)
      }
    }

    window.addEventListener('scroll', listenAction);
    
    window.addEventListener('load', () => {
      elementHeight = elementChild.clientHeight;
    });
  },

  unbind() {
    window.removeEventListener('scroll', listenAction)
  },
}
