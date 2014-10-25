!function(t,e){function i(t,i,a){var r=e.createEvent("CustomEvent");return r.initCustomEvent(t,!1,!0,i),a.dispatchEvent(r)}function a(e){var a=l.parseUrl(t.location.href,e.getAttribute("mode")),n={path:a.path};if(i("state-change",n,e)){for(var s=e.firstElementChild;s;){if("APP-ROUTE"===s.tagName&&l.testRoute(s.getAttribute("path"),a.path,e.getAttribute("trailingSlash"),s.hasAttribute("regex")))return r(e,s,a),void 0;s=s.nextSibling}i("not-found",n,e)}}function r(t,a,r){if(a.hasAttribute("redirect"))return t.go(a.getAttribute("redirect"),{replace:!0}),void 0;var s={path:r.path,route:a,oldRoute:t.activeRoute};i("activate-route-start",s,t)&&i("activate-route-start",s,a)&&(t.previousRoute&&t.previousRoute.transitionAnimationInProgress&&h(t.previousRoute),t.activeRoute&&t.activeRoute.removeAttribute("active"),t.previousRoute=t.activeRoute,t.activeRoute=a,t.activeRoute.setAttribute("active","active"),a.hasAttribute("import")?n(t,a.getAttribute("import"),a,r,s):a.hasAttribute("element")?o(t,a.getAttribute("element"),a,r,s):a.firstElementChild&&"TEMPLATE"===a.firstElementChild.tagName&&u(t,e.importNode(a.firstElementChild.content,!0),s))}function n(t,i,a,r,n){function o(){s(t,u,i,a,r,n)}var u;p.hasOwnProperty(i)?(u=e.querySelector('link[href="'+i+'"]'),u.import?o():u.addEventListener("load",o)):(p[i]=!0,u=e.createElement("link"),u.setAttribute("rel","import"),u.setAttribute("href",i),u.addEventListener("load",o),e.head.appendChild(u))}function s(t,i,a,r,n,s){r.hasAttribute("active")&&(r.hasAttribute("template")?u(t,e.importNode(i.import.querySelector("template").content,!0),s):o(t,r.getAttribute("element")||a.split("/").slice(-1)[0].replace(".html",""),r,n,s))}function o(t,i,a,r,n){var s=e.createElement(i),o=l.routeArguments(a.getAttribute("path"),r.path,r.search,a.hasAttribute("regex"));for(var h in o)o.hasOwnProperty(h)&&(s[h]=o[h]);u(t,s,n)}function u(t,e,a){t.hasAttribute("core-animated-pages")||c(t.previousRoute),t.activeRoute.appendChild(e),t.hasAttribute("core-animated-pages")&&(t.coreAnimatedPages.selected=t.activeRoute.getAttribute("path"),t.previousRoute&&(t.previousRoute.transitionAnimationInProgress=!0)),i("activate-route-end",a,t),i("activate-route-end",a,a.route)}function h(t){t&&(t.transitionAnimationInProgress=!1,c(t))}function c(t){if(t)for(var e=t.firstChild;e;){var i=e;e=e.nextSibling,"TEMPLATE"!==i.tagName&&t.removeChild(i)}}var l={},p={},d="ActiveXObject"in t,g=Object.create(HTMLElement.prototype);g.util=l,e.registerElement("app-route",{prototype:Object.create(HTMLElement.prototype)}),g.attachedCallback=function(){"manual"!==this.getAttribute("init")&&this.init()},g.init=function(){var i=this;i.isInitialized||(i.isInitialized=!0,i.hasAttribute("trailingSlash")||i.setAttribute("trailingSlash","strict"),i.hasAttribute("mode")||i.setAttribute("mode","auto"),i.hasAttribute("core-animated-pages")&&(i.createShadowRoot(),i.coreAnimatedPages=e.createElement("core-animated-pages"),i.coreAnimatedPages.appendChild(e.createElement("content")),i.coreAnimatedPages.style.position="static",i.coreAnimatedPages.setAttribute("valueattr","path"),i.coreAnimatedPages.setAttribute("transitions",i.getAttribute("transitions")),i.shadowRoot.appendChild(i.coreAnimatedPages),i.coreAnimatedPages.addEventListener("core-animated-pages-transition-end",function(){h(i.previousRoute)})),i.stateChangeHandler=a.bind(null,i),t.addEventListener("popstate",i.stateChangeHandler,!1),d&&t.addEventListener("hashchange",i.stateChangeHandler,!1),a(i))},g.detachedCallback=function(){t.removeEventListener("popstate",this.stateChangeHandler,!1),d&&t.removeEventListener("hashchange",this.stateChangeHandler,!1)},g.go=function(e,i){"pushstate"!==this.getAttribute("mode")&&(e="#"+e),i&&i.replace!==!0?t.history.pushState(null,null,e):t.history.replaceState(null,null,e),a(this)},l.parseUrl=function(t,e){var i=new URL(t),a={path:i.pathname,hash:i.hash,search:i.search,isHashPath:"hash"===e};if("pushstate"!==e&&("#/"===a.hash.substring(0,2)?(a.isHashPath=!0,a.path=a.hash.substring(1)):"#!/"===a.hash.substring(0,3)?(a.isHashPath=!0,a.path=a.hash.substring(2)):a.isHashPath&&(a.path=0===a.hash.length?"/":a.hash.substring(1)),a.isHashPath)){var r=a.path.indexOf("?");-1!==r&&(a.search=a.path.substring(r),a.path=a.path.substring(0,r))}return a},l.testRoute=function(t,e,i,a){if("ignore"===i&&("/"===e.slice(-1)&&(e=e.slice(0,-1)),"/"!==t.slice(-1)||a||(t=t.slice(0,-1))),a)return l.testRegExString(t,e);if(t===e||"*"===t)return!0;if(-1===t.indexOf("*")&&-1===t.indexOf(":"))return!1;var r=e.split("/"),n=t.split("/");if(r.length!==n.length)return!1;for(var s=0;s<n.length;s++){var o=n[s];if(o!==r[s]&&"*"!==o&&":"!==o.charAt(0))return!1}return!0},l.routeArguments=function(t,e,i,a){var r={};if(!a)for(var n=e.split("/"),s=t.split("/"),o=0;o<s.length;o++){var u=s[o];":"===u.charAt(0)&&(r[u.substring(1)]=n[o])}var h=i.substring(1).split("&");1===h.length&&""===h[0]&&(h=[]);for(var c=0;c<h.length;c++){var p=h[c],d=p.split("=");r[d[0]]=d.splice(1,d.length-1).join("=")}for(var g in r)r[g]=l.typecast(r[g]);return r},l.typecast=function(t){return"true"===t?!0:"false"===t?!1:isNaN(t)||""===t||"0"===t.charAt(0)?decodeURIComponent(t):+t},l.testRegExString=function(t,e){if("/"!==t.charAt(0))return!1;t=t.slice(1);var i="";if("/"===t.slice(-1))t=t.slice(0,-1);else{if("/i"!==t.slice(-2))return!1;t=t.slice(0,-2),i="i"}return new RegExp(t,i).test(e)},e.registerElement("app-router",{prototype:g})}(window,document);