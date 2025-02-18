"use strict";(self.webpackChunkpackage_manager=self.webpackChunkpackage_manager||[]).push([[728],{475:(n,a,e)=>{e.d(a,{A:()=>l});var r=e(601),o=e.n(r),t=e(314),i=e.n(t)()(o());i.push([n.id,".mljar-packages-manager-sidebar-container {\n  display: flex;\n  flex-direction: column;\n  height: 100%;\n  overflow-y: auto;\n}\n\n.mljar-packages-manager-search-bar-container {\n  margin: 0px 10px 10px 0px;\n}\n.mljar-packages-manager-install-input,\n.mljar-packages-manager-search-bar-input {\n  width: 100%;\n  padding: 8px;\n  box-sizing: border-box;\n  background-color: var(--jp-layout-color1);\n  color: var(--jp-ui-font-color1);\n  border: 1px solid var(--jp-border-color2);\n  border-radius: 5px;\n}\n\n.mljar-packages-manager-install-input {\n  margin-bottom: 8px;\n}\n\n.mljar-packages-manager-install-input:focus,\n.mljar-packages-manager-search-bar-input:focus {\n  outline: none;\n  border: 2px solid var(--jp-ui-font-color1);\n}\n.mljar-packages-manager-install-input::placeholder,\n.mljar-packages-manager-search-bar-input::placeholder {\n  color: var(--jp-ui-font-color2);\n}\n\n.mljar-packages-manager-container {\n  display: flex;\n  flex-direction: column;\n  height: 100%;\n}\n\n.mljar-packages-manager-header-container {\n  display: flex;\n  justify-content: space-between;\n  align-items: flex-end;\n  margin-bottom: 8px;\n  margin-right: 8px;\n  border-bottom: 2px solid #ddd;\n}\n\n.mljar-packages-manager-header {\n  flex: 4;\n  font-size: 0.85rem;\n  font-weight: 700;\n  color: var(--jp-ui-font-color1);\n  text-align: left;\n  padding-bottom: 8px;\n  margin: 0;\n}\n\n.mljar-packages-manager-list-container {\n  flex: 1;\n  overflow-y: hidden;\n  padding-right: 10px;\n}\n\n.mljar-packages-manager-list {\n  list-style: none;\n  padding: 0;\n  margin: 0;\n}\n\n.mljar-packages-manager-list-container::-webkit-scrollbar {\n  width: 8px;\n}\n\n.mljar-packages-manager-list-container::-webkit-scrollbar-thumb {\n  background-color: rgba(0, 0, 0, 0.2);\n  border-radius: 4px;\n}\n\n.mljar-packages-manager-list-container::-webkit-scrollbar-track {\n  background-color: rgba(0, 0, 0, 0.05);\n}\n\n.mljar-packages-manager-sidebar-widget {\n  background-color: #ffffff;\n  padding: 10px;\n  font-family: 'Courier New', Courier, monospace;\n}\n\n.mljar-packages-manager-back-button,\n.mljar-packages-manager-install-button,\n.mljar-packages-manager-refresh-button {\n  width: 30px;\n  display: flex;\n  margin: 1px 0px 2px 0px;\n  align-items: center;\n  justify-content: center;\n  gap: 8px;\n  color: #0099cc;\n  border: none;\n  border-radius: 4px;\n  padding: 8px 0px;\n  cursor: pointer;\n  font-size: 0.75rem;\n  transition: background-color 0.3s ease;\n}\n\n.mljar-packages-manager-back-button {\n  width: 70px !important;\n  text-align: center;\n  padding-right: 4px;\n}\n\n.mljar-packages-manager-back-button:hover:not(:disabled),\n.mljar-packages-manager-refresh-button:hover:not(:disabled),\n.mljar-packages-manager-install-button:hover:not(:disabled) {\n  background-color: #0099cc;\n  color: #ffffff;\n}\n\n.mljar-packages-manager-delete-button {\n  visibility: hidden;\n  background: none;\n  position: relative;\n  border: none;\n  border-radius: 4px;\n  cursor: pointer;\n  padding: 4px;\n  margin: 5px auto;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  color: #dc3545;\n  transition: background-color 0.3s ease;\n}\n\n.mljar-packages-manager-refresh-button:disabled,\n.mljar-packages-manager-install-button:disabled,\n.mljar-packages-manager-back-button:disabled {\n  cursor: not-allowed;\n}\n\n.mljar-packages-manager-install-submit-button {\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  background-color: #28a745;\n  color: white;\n  border: none;\n  border-radius: 4px;\n  padding: 8px 12px;\n  cursor: pointer;\n  font-size: 0.75rem;\n  transition: background-color 0.3s ease;\n}\n\n.mljar-packages-manager-install-submit-button:disabled {\n  background-color: #94d3a2;\n  cursor: not-allowed;\n}\n\n.mljar-packages-manager-install-submit-button:hover:not(:disabled) {\n  background-color: #1e7e34;\n}\n\n.mljar-packages-manager-delete-button:hover {\n  color: #fff;\n  background-color: #dc3545;\n  transition: background-color 0.3s ease;\n}\n\n.mljar-packages-manager-list-item:hover .mljar-packages-manager-delete-button {\n  visibility: visible;\n}\n\n.mljar-packages-manager-refresh-icon,\n.mljar-packages-manager-install-icon,\n.mljar-packages-manager-back-icon {\n  display: flex;\n  align-items: center;\n  width: 15px;\n  height: 15px;\n}\n\n.mljar-packages-manager-delete-icon {\n  display: flex;\n  align-items: center;\n  width: 20px;\n  height: 20px;\n}\n\n.mljar-packages-manager-error-icon {\n  color: #dc3545;\n  width: 15px;\n  height: 15px;\n}\n\n.mljar-packages-manager-info-icon-container {\n  position: relative;\n  display: inline-block;\n  cursor: pointer;\n}\n\n.mljar-packages-manager-info-icon-container span:first-child {\n  display: inline-flex;\n  align-items: center;\n  color: #0099cc;\n  margin: 0px;\n  width: 18px;\n  height: 18px;\n}\n\n.mljar-packages-manager-info-icon-container {\n  visibility: hidden;\n  width: 150px;\n  background-color: #28a745;\n  color: white;\n  text-align: center;\n  border-radius: 4px;\n  padding: 5px;\n  position: absolute;\n  left: -160px;\n  top: 100%;\n  z-index: 1;\n  opacity: 0;\n  transition: opacity 0.3s;\n  white-space: pre-line;\n}\n\n.mljar-packages-manager-info-icon-container:hover {\n  visibility: visible;\n  opacity: 1;\n}\n\n.mljar-packages-manager-install-form {\n  display: flex;\n  flex-direction: column;\n  margin-right: 8px;\n}\n\n.mljar-packages-manager-install-form h4 {\n  margin-top: 0px;\n  margin-bottom: 4px;\n  padding: 0;\n}\n\n.mljar-packages-manager-usage-span {\n  margin-bottom: 8px;\n  text-align: left;\n  font-size: 0.8rem;\n  padding: 5px 2px;\n}\n\n.mljar-packages-manager-install-message {\n  color: #28a745;\n  font-weight: bold;\n  margin-top: 10px;\n  text-align: left;\n  padding: 5px 2px;\n}\n\n.mljar-packages-manager-install-message.error {\n  color: #dc3545;\n}\n\n.mljar-packages-manager-error-message {\n  color: #dc3545;\n  font-weight: bold;\n}\n\n.mljar-packages-manager-spinner-container {\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  height: 100%;\n  padding: 20px;\n}\n\n.mljar-packages-manager-spinner {\n  border: 4px solid rgba(0, 0, 0, 0.1);\n  width: 10px;\n  height: 10px;\n  border-radius: 50%;\n  border-left-color: #ffffff;\n  animation: spin 1s linear infinite;\n}\n\n@keyframes spin {\n  to {\n    transform: rotate(360deg);\n  }\n}\n\n.mljar-packages-manager-list-item {\n  flex: 1;\n  display: grid;\n  grid-template-columns: 1fr 1fr 2rem;\n  align-items: center;\n  min-height: 38px;\n  column-gap: 1rem;\n  padding-left: 8px;\n  padding-right: 8px;\n  border-bottom: 1px solid var(--jp-border-color2);\n  border-left: 1px solid var(--jp-border-color2);\n  border-right: 1px solid var(--jp-border-color2);\n  margin-bottom: 0px;\n  margin-right: 0px;\n  width: 100%;\n  box-sizing: border-box;\n  background-color: var(--jp-layout-color0);\n  font-size: 0.7rem;\n  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);\n}\n\n.mljar-packages-manager-list-item:hover {\n  background-color: var(--jp-layout-color2);\n  cursor: pointer;\n}\n\n.mljar-packages-manager-list-item.active {\n  background-color: var(--jp-brand-color1);\n  color: var(--jp-ui-inverse-font-color1);\n}\n\n.mljar-packages-manager-package-name,\n.mljar-packages-manager-package-version {\n  overflow: hidden;\n  text-overflow: ellipsis;\n  white-space: nowrap;\n}\n\n.mljar-packages-manager-package-name {\n  font-weight: 600;\n}\n\n.mljar-packages-manager-list-header {\n  display: grid;\n  grid-template-columns: 1fr 1fr 2rem;\n  align-items: center;\n  font-size: 0.85rem;\n  padding-left: 8px;\n  padding-right: 8px;\n  padding-top: 10px;\n  padding-bottom: 10px;\n  background-color: var(--jp-layout-color0);\n  color: #0099cc;\n  border: 1px solid #0099cc;\n  border-top-right-radius: 5px;\n  border-top-left-radius: 5px;\n  font-weight: 800;\n}\n\n.mljar-packages-manager-sidebar-container::-webkit-scrollbar {\n  width: 8px;\n  height: 8px;\n}\n\n.mljar-packages-manager-sidebar-container::-webkit-scrollbar-track {\n  background: #d3d3d3;\n  border-radius: 8px;\n}\n\n.mljar-packages-manager-sidebar-container::-webkit-scrollbar-thumb {\n  background-color: rgba(255, 255, 255, 0.6);\n  border-radius: 8px;\n  border: 2px solid transparent;\n  background-clip: padding-box;\n}\n",""]);const l=i},314:n=>{n.exports=function(n){var a=[];return a.toString=function(){return this.map((function(a){var e="",r=void 0!==a[5];return a[4]&&(e+="@supports (".concat(a[4],") {")),a[2]&&(e+="@media ".concat(a[2]," {")),r&&(e+="@layer".concat(a[5].length>0?" ".concat(a[5]):""," {")),e+=n(a),r&&(e+="}"),a[2]&&(e+="}"),a[4]&&(e+="}"),e})).join("")},a.i=function(n,e,r,o,t){"string"==typeof n&&(n=[[null,n,void 0]]);var i={};if(r)for(var l=0;l<this.length;l++){var c=this[l][0];null!=c&&(i[c]=!0)}for(var s=0;s<n.length;s++){var p=[].concat(n[s]);r&&i[p[0]]||(void 0!==t&&(void 0===p[5]||(p[1]="@layer".concat(p[5].length>0?" ".concat(p[5]):""," {").concat(p[1],"}")),p[5]=t),e&&(p[2]?(p[1]="@media ".concat(p[2]," {").concat(p[1],"}"),p[2]=e):p[2]=e),o&&(p[4]?(p[1]="@supports (".concat(p[4],") {").concat(p[1],"}"),p[4]=o):p[4]="".concat(o)),a.push(p))}},a}},601:n=>{n.exports=function(n){return n[1]}},72:n=>{var a=[];function e(n){for(var e=-1,r=0;r<a.length;r++)if(a[r].identifier===n){e=r;break}return e}function r(n,r){for(var t={},i=[],l=0;l<n.length;l++){var c=n[l],s=r.base?c[0]+r.base:c[0],p=t[s]||0,d="".concat(s," ").concat(p);t[s]=p+1;var g=e(d),m={css:c[1],media:c[2],sourceMap:c[3],supports:c[4],layer:c[5]};if(-1!==g)a[g].references++,a[g].updater(m);else{var u=o(m,r);r.byIndex=l,a.splice(l,0,{identifier:d,updater:u,references:1})}i.push(d)}return i}function o(n,a){var e=a.domAPI(a);return e.update(n),function(a){if(a){if(a.css===n.css&&a.media===n.media&&a.sourceMap===n.sourceMap&&a.supports===n.supports&&a.layer===n.layer)return;e.update(n=a)}else e.remove()}}n.exports=function(n,o){var t=r(n=n||[],o=o||{});return function(n){n=n||[];for(var i=0;i<t.length;i++){var l=e(t[i]);a[l].references--}for(var c=r(n,o),s=0;s<t.length;s++){var p=e(t[s]);0===a[p].references&&(a[p].updater(),a.splice(p,1))}t=c}}},659:n=>{var a={};n.exports=function(n,e){var r=function(n){if(void 0===a[n]){var e=document.querySelector(n);if(window.HTMLIFrameElement&&e instanceof window.HTMLIFrameElement)try{e=e.contentDocument.head}catch(n){e=null}a[n]=e}return a[n]}(n);if(!r)throw new Error("Couldn't find a style target. This probably means that the value for the 'insert' parameter is invalid.");r.appendChild(e)}},540:n=>{n.exports=function(n){var a=document.createElement("style");return n.setAttributes(a,n.attributes),n.insert(a,n.options),a}},56:(n,a,e)=>{n.exports=function(n){var a=e.nc;a&&n.setAttribute("nonce",a)}},825:n=>{n.exports=function(n){if("undefined"==typeof document)return{update:function(){},remove:function(){}};var a=n.insertStyleElement(n);return{update:function(e){!function(n,a,e){var r="";e.supports&&(r+="@supports (".concat(e.supports,") {")),e.media&&(r+="@media ".concat(e.media," {"));var o=void 0!==e.layer;o&&(r+="@layer".concat(e.layer.length>0?" ".concat(e.layer):""," {")),r+=e.css,o&&(r+="}"),e.media&&(r+="}"),e.supports&&(r+="}");var t=e.sourceMap;t&&"undefined"!=typeof btoa&&(r+="\n/*# sourceMappingURL=data:application/json;base64,".concat(btoa(unescape(encodeURIComponent(JSON.stringify(t))))," */")),a.styleTagTransform(r,n,a.options)}(a,n,e)},remove:function(){!function(n){if(null===n.parentNode)return!1;n.parentNode.removeChild(n)}(a)}}}},113:n=>{n.exports=function(n,a){if(a.styleSheet)a.styleSheet.cssText=n;else{for(;a.firstChild;)a.removeChild(a.firstChild);a.appendChild(document.createTextNode(n))}}},728:(n,a,e)=>{var r=e(72),o=e.n(r),t=e(825),i=e.n(t),l=e(659),c=e.n(l),s=e(56),p=e.n(s),d=e(540),g=e.n(d),m=e(113),u=e.n(m),f=e(475),b={};b.styleTagTransform=u(),b.setAttributes=p(),b.insert=c().bind(null,"head"),b.domAPI=i(),b.insertStyleElement=g(),o()(f.A,b),f.A&&f.A.locals&&f.A.locals}}]);