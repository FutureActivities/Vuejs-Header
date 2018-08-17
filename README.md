# Vue.js Header Components

This component provides typical header layout and functionality for responsive websites.

## Demo

https://jsfiddle.net/du7pzdgs/2/

## Getting Started

CDN:

    https://unpkg.com/fa-header

NPM:

    import FaHeader from 'fa-header'
    Vue.use(FaHeader)
    
To use specific components:

    import FaHeader from 'fa-header/src/components/Header.vue'
    import FaNavigation from 'fa-header/src/components/Navigation.vue'
    import FaSearch from 'fa-header/src/components/Search.vue'
    
    new Vue({
        el: '#header',
        components: {
            FaHeader,
            FaNavigation,
            FaSearch
        }
    });

## Components
### Header

This provides a wrapper for everything in the header that will become sticky at the specified point.

#### Example Usage

    <fa-header :breakpoint="800" :sticky="-50">
        <div class="logo">LOGO</div>
        <fa-search :breakpoint="800">
            <form method="post">
                <input type="text" name="search" />
            </form>
        </fa-search>
       <fa-navigation :breakpoint="800" burgersticky>
           <ul>
               <li><a href="#">Link</a></li>
               <li><a href="#">Link</a></li>
           </ul>
       <fa-navigation>
    </fa-header>

#### Options

| Prop       | Description                                                                                                     | Type   | Default |
|------------|-----------------------------------------------------------------------------------------------------------------|--------|---------|
| breakpoint | When does the class `header--desktop` get applied                                                               | Number | 1024    |
| sticky     | The point of when the header becomes sticky / adds the class `header--sticky`.  To disable set the value to -1. | Number | -1      |

#### Classes
| Class | Description |
|--|--|
| header--desktop | Applied when screen resolution is greater or equal to the breakpoint prop value. |
| header--sticky | Applied if the header element has reached the top of the screen inc offset set by the sticky prop. |

## Navigation
This will display as normal on desktop but on mobile will move everything contained within it to a menu that scrolls in from the side.

#### Example Usage

    <fa-navigation :breakpoint="800" burgersticky>
       <ul>
           <li><a href="#">Link</a></li>
           <li><a href="#">Link</a></li>
       </ul>
    <fa-navigation>

#### Options

| Prop | Description | Type | Default |
|--|--|--|--|
| breakpoint | When does the class `nav--desktop` get applied. | Number | 1024 |
| burgersticky | Optionally show the burger menu when the `header--sticky` class is applied. | Boolean | false |

#### Classes
| Class | Description |
|--|--|
| nav--desktop | Applied when screen resolution is greater or equal to the breakpoint prop value. |
| nav--burgersticky | Applied if the burgersticky prop value is set to true. |
| nav--show | Applied when the burger menu is opened. |

#### Slots

| Name | Description |
|--|--|
| icon | Optionally set the icon content. By default a :before element will be applied with a FontAwesome icon, if using this slot you may want to hide that :before pseudo element with CSS. |

## Search
This will display as normal on desktop but on mobile will be replaced by a search icon which when clicked will open the contents in an absolutely positioned container.

#### Example usage
    <fa-search :breakpoint="800">
        <form method="post">
            <input type="text" name="search" />
        </form>
    </fa-search>
    
#### Options

| Prop | Description | Type | Default |
|--|--|--|--|
| breakpoint | When does the class `search--desktop` get applied. | Number | 1024 |
| iconsticky | Optionally show the search icon when the `header--sticky` class is applied. | Boolean | false |

#### Classes
| Class | Description |
|--|--|
| search--desktop | Applied when screen resolution is greater or equal to the breakpoint prop value. |
| search--iconsticky | Applied if the iconsticky prop value is set to true. |
| search--show | Applied when the search icon is clicked. |

#### Slots

| Name | Description |
|--|--|
| icon | Optionally set the icon content. By default a :before element will be applied with a FontAwesome icon, if using this slot you may want to hide that :before pseudo element with CSS. |

## MegaMenu

Moved to: https://github.com/FutureActivities/Vuejs-Menu