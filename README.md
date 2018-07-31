# Vue.js Header Component

This component provides typical header layout and functionality for responsive websites.
The following components were designed to work inside the Header component but can work independently.

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
Grabs data about the menu via JSON and builds a multi-level megamenu on desktop and on mobile creates a multi-page navigation view that loads the child links on each click (includes back buttons).

#### Example Usage
    <fa-megamenu feed="example.json"></fa-megamenu>
    
Where the feed is JSON in the following format:

    {
       "category": {
          "name":"Category",
          "source": {
              "1": [
                {
                  "id": 3,
                  "name": "Child Link",
                  "url": "#"
                },
                {
                  "id": 4,
                  "name": "Another Child Link",
                  "url": "#"
                }
              ],
              "4": [
                {
                  "id": 5,
                  "name": "Next level child",
                  "url": "#"
                }
              ]
          },
          "links":[
             [
                {
                  "id":1,
                  "name":"Parent",
                  "url":"#"
                },
                {
                  "id":2,
                  "name":"Other",
                  "url":"#",
                  "img":"url",
                  "prefix":"<strong>custom html</strong>",
                  "suffix":"<strong>custom html</strong>"
                }
             ]
          ],
          "classes": ["custom-class"],
          "pre": "<p>Custom HTML that will be displayed on the full Mega Menu before the links.</p>",
          "custom": "<p>Custom HTML that will be displayed on the full Mega Menu after the links.</p>"
       },
       "standalone":{
          "name":"Standalone Link",
          "url":"#",
          "bar": true,
          "burger" true
       },
       "mylink": {
           "name":"Another Link",
           "override":"<strong>LINK</strong>"
       }
    }
    
`links` is the data that is initially displayed in the megamenu dropdown. This is an array where each item will create a new UL element in the mega menu.

`source` is for the child menu data. This should be organised by the parent ID. When you hover or click on a menu item it will attempt to see if that item has any children by checking for the ID in source.
Each item can also be hidden from the horizontal mega menu or the burger menu, so you can include links that are only visible on the burger menu, for example.

`override` allows you to use your own HTML in the horizontal bar menu item.

`custom` allows you to use your own HTML inside the horizontal bar mega menu.

When displaying the menu you can also set how the menu should display, currently this component provides 2 options: `columns` and `multilevel` with multilevel being the default.
The columns view will display each link as a heading of a column and then render 1 level of children underneath it.
The multilevel view will list all the links in column 1 and then as you hover over a link the children are displayed in the next column.

#### Options

| Prop | Description | Type | Default |
|--|--|--|--|
| feed | The URL to the JSON feed. Use this or data. | String | null |
| data | The menu data object. Use this or feed. | Object | null |
| cache | Store the feed results in the browsers sessionStorage. Only applicable if using feed. | Boolean | false |
| display | Display the menu as `columns` or `multilevel` | String | multilevel |
| vue-router | Use `router-link` instead of `a` tags | Boolean | false |
| hover-delay | Delay the opening of the menu on hover. Time in milliseconds. | Number | 0 |