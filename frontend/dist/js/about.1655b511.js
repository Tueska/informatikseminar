(self["webpackChunkfrontend"]=self["webpackChunkfrontend"]||[]).push([[443],{1271:function(t,r,e){"use strict";e(7658),r.byteLength=h,r.toByteArray=p,r.fromByteArray=y;for(var n=[],o=[],i="undefined"!==typeof Uint8Array?Uint8Array:Array,s="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/",a=0,u=s.length;a<u;++a)n[a]=s[a],o[s.charCodeAt(a)]=a;function f(t){var r=t.length;if(r%4>0)throw new Error("Invalid string. Length must be a multiple of 4");var e=t.indexOf("=");-1===e&&(e=r);var n=e===r?0:4-e%4;return[e,n]}function h(t){var r=f(t),e=r[0],n=r[1];return 3*(e+n)/4-n}function l(t,r,e){return 3*(r+e)/4-e}function p(t){var r,e,n=f(t),s=n[0],a=n[1],u=new i(l(t,s,a)),h=0,p=a>0?s-4:s;for(e=0;e<p;e+=4)r=o[t.charCodeAt(e)]<<18|o[t.charCodeAt(e+1)]<<12|o[t.charCodeAt(e+2)]<<6|o[t.charCodeAt(e+3)],u[h++]=r>>16&255,u[h++]=r>>8&255,u[h++]=255&r;return 2===a&&(r=o[t.charCodeAt(e)]<<2|o[t.charCodeAt(e+1)]>>4,u[h++]=255&r),1===a&&(r=o[t.charCodeAt(e)]<<10|o[t.charCodeAt(e+1)]<<4|o[t.charCodeAt(e+2)]>>2,u[h++]=r>>8&255,u[h++]=255&r),u}function c(t){return n[t>>18&63]+n[t>>12&63]+n[t>>6&63]+n[63&t]}function d(t,r,e){for(var n,o=[],i=r;i<e;i+=3)n=(t[i]<<16&16711680)+(t[i+1]<<8&65280)+(255&t[i+2]),o.push(c(n));return o.join("")}function y(t){for(var r,e=t.length,o=e%3,i=[],s=16383,a=0,u=e-o;a<u;a+=s)i.push(d(t,a,a+s>u?u:a+s));return 1===o?(r=t[e-1],i.push(n[r>>2]+n[r<<4&63]+"==")):2===o&&(r=(t[e-2]<<8)+t[e-1],i.push(n[r>>10]+n[r>>4&63]+n[r<<2&63]+"=")),i.join("")}o["-".charCodeAt(0)]=62,o["_".charCodeAt(0)]=63},5361:function(t,r,e){"use strict";
/*!
 * The buffer module from node.js, for the browser.
 *
 * @author   Feross Aboukhadijeh <https://feross.org>
 * @license  MIT
 */
e(7658);var n=e(1271),o=e(7055),i="function"===typeof Symbol&&"function"===typeof Symbol["for"]?Symbol["for"]("nodejs.util.inspect.custom"):null;r.lW=f,r.h2=50;var s=2147483647;function a(){try{var t=new Uint8Array(1),r={foo:function(){return 42}};return Object.setPrototypeOf(r,Uint8Array.prototype),Object.setPrototypeOf(t,r),42===t.foo()}catch(e){return!1}}function u(t){if(t>s)throw new RangeError('The value "'+t+'" is invalid for option "size"');var r=new Uint8Array(t);return Object.setPrototypeOf(r,f.prototype),r}function f(t,r,e){if("number"===typeof t){if("string"===typeof r)throw new TypeError('The "string" argument must be of type string. Received type number');return c(t)}return h(t,r,e)}function h(t,r,e){if("string"===typeof t)return d(t,r);if(ArrayBuffer.isView(t))return g(t);if(null==t)throw new TypeError("The first argument must be one of type string, Buffer, ArrayBuffer, Array, or Array-like Object. Received type "+typeof t);if(K(t,ArrayBuffer)||t&&K(t.buffer,ArrayBuffer))return w(t,r,e);if("undefined"!==typeof SharedArrayBuffer&&(K(t,SharedArrayBuffer)||t&&K(t.buffer,SharedArrayBuffer)))return w(t,r,e);if("number"===typeof t)throw new TypeError('The "value" argument must not be of type number. Received type number');var n=t.valueOf&&t.valueOf();if(null!=n&&n!==t)return f.from(n,r,e);var o=m(t);if(o)return o;if("undefined"!==typeof Symbol&&null!=Symbol.toPrimitive&&"function"===typeof t[Symbol.toPrimitive])return f.from(t[Symbol.toPrimitive]("string"),r,e);throw new TypeError("The first argument must be one of type string, Buffer, ArrayBuffer, Array, or Array-like Object. Received type "+typeof t)}function l(t){if("number"!==typeof t)throw new TypeError('"size" argument must be of type number');if(t<0)throw new RangeError('The value "'+t+'" is invalid for option "size"')}function p(t,r,e){return l(t),t<=0?u(t):void 0!==r?"string"===typeof e?u(t).fill(r,e):u(t).fill(r):u(t)}function c(t){return l(t),u(t<0?0:0|b(t))}function d(t,r){if("string"===typeof r&&""!==r||(r="utf8"),!f.isEncoding(r))throw new TypeError("Unknown encoding: "+r);var e=0|E(t,r),n=u(e),o=n.write(t,r);return o!==e&&(n=n.slice(0,o)),n}function y(t){for(var r=t.length<0?0:0|b(t.length),e=u(r),n=0;n<r;n+=1)e[n]=255&t[n];return e}function g(t){if(K(t,Uint8Array)){var r=new Uint8Array(t);return w(r.buffer,r.byteOffset,r.byteLength)}return y(t)}function w(t,r,e){if(r<0||t.byteLength<r)throw new RangeError('"offset" is outside of buffer bounds');if(t.byteLength<r+(e||0))throw new RangeError('"length" is outside of buffer bounds');var n;return n=void 0===r&&void 0===e?new Uint8Array(t):void 0===e?new Uint8Array(t,r):new Uint8Array(t,r,e),Object.setPrototypeOf(n,f.prototype),n}function m(t){if(f.isBuffer(t)){var r=0|b(t.length),e=u(r);return 0===e.length||t.copy(e,0,0,r),e}return void 0!==t.length?"number"!==typeof t.length||Q(t.length)?u(0):y(t):"Buffer"===t.type&&Array.isArray(t.data)?y(t.data):void 0}function b(t){if(t>=s)throw new RangeError("Attempt to allocate Buffer larger than maximum size: 0x"+s.toString(16)+" bytes");return 0|t}function v(t){return+t!=t&&(t=0),f.alloc(+t)}function E(t,r){if(f.isBuffer(t))return t.length;if(ArrayBuffer.isView(t)||K(t,ArrayBuffer))return t.byteLength;if("string"!==typeof t)throw new TypeError('The "string" argument must be one of type string, Buffer, or ArrayBuffer. Received type '+typeof t);var e=t.length,n=arguments.length>2&&!0===arguments[2];if(!n&&0===e)return 0;for(var o=!1;;)switch(r){case"ascii":case"latin1":case"binary":return e;case"utf8":case"utf-8":return W(t).length;case"ucs2":case"ucs-2":case"utf16le":case"utf-16le":return 2*e;case"hex":return e>>>1;case"base64":return H(t).length;default:if(o)return n?-1:W(t).length;r=(""+r).toLowerCase(),o=!0}}function U(t,r,e){var n=!1;if((void 0===r||r<0)&&(r=0),r>this.length)return"";if((void 0===e||e>this.length)&&(e=this.length),e<=0)return"";if(e>>>=0,r>>>=0,e<=r)return"";t||(t="utf8");while(1)switch(t){case"hex":return D(this,r,e);case"utf8":case"utf-8":return O(this,r,e);case"ascii":return M(this,r,e);case"latin1":case"binary":return x(this,r,e);case"base64":return P(this,r,e);case"ucs2":case"ucs-2":case"utf16le":case"utf-16le":return j(this,r,e);default:if(n)throw new TypeError("Unknown encoding: "+t);t=(t+"").toLowerCase(),n=!0}}function A(t,r,e){var n=t[r];t[r]=t[e],t[e]=n}function _(t,r,e,n,o){if(0===t.length)return-1;if("string"===typeof e?(n=e,e=0):e>2147483647?e=2147483647:e<-2147483648&&(e=-2147483648),e=+e,Q(e)&&(e=o?0:t.length-1),e<0&&(e=t.length+e),e>=t.length){if(o)return-1;e=t.length-1}else if(e<0){if(!o)return-1;e=0}if("string"===typeof r&&(r=f.from(r,n)),f.isBuffer(r))return 0===r.length?-1:B(t,r,e,n,o);if("number"===typeof r)return r&=255,"function"===typeof Uint8Array.prototype.indexOf?o?Uint8Array.prototype.indexOf.call(t,r,e):Uint8Array.prototype.lastIndexOf.call(t,r,e):B(t,[r],e,n,o);throw new TypeError("val must be string, number or Buffer")}function B(t,r,e,n,o){var i,s=1,a=t.length,u=r.length;if(void 0!==n&&(n=String(n).toLowerCase(),"ucs2"===n||"ucs-2"===n||"utf16le"===n||"utf-16le"===n)){if(t.length<2||r.length<2)return-1;s=2,a/=2,u/=2,e/=2}function f(t,r){return 1===s?t[r]:t.readUInt16BE(r*s)}if(o){var h=-1;for(i=e;i<a;i++)if(f(t,i)===f(r,-1===h?0:i-h)){if(-1===h&&(h=i),i-h+1===u)return h*s}else-1!==h&&(i-=i-h),h=-1}else for(e+u>a&&(e=a-u),i=e;i>=0;i--){for(var l=!0,p=0;p<u;p++)if(f(t,i+p)!==f(r,p)){l=!1;break}if(l)return i}return-1}function C(t,r,e,n){e=Number(e)||0;var o=t.length-e;n?(n=Number(n),n>o&&(n=o)):n=o;var i=r.length;n>i/2&&(n=i/2);for(var s=0;s<n;++s){var a=parseInt(r.substr(2*s,2),16);if(Q(a))return s;t[e+s]=a}return s}function I(t,r,e,n){return J(W(r,t.length-e),t,e,n)}function L(t,r,e,n){return J(q(r),t,e,n)}function S(t,r,e,n){return J(H(r),t,e,n)}function T(t,r,e,n){return J(G(r,t.length-e),t,e,n)}function P(t,r,e){return 0===r&&e===t.length?n.fromByteArray(t):n.fromByteArray(t.slice(r,e))}function O(t,r,e){e=Math.min(t.length,e);var n=[],o=r;while(o<e){var i,s,a,u,f=t[o],h=null,l=f>239?4:f>223?3:f>191?2:1;if(o+l<=e)switch(l){case 1:f<128&&(h=f);break;case 2:i=t[o+1],128===(192&i)&&(u=(31&f)<<6|63&i,u>127&&(h=u));break;case 3:i=t[o+1],s=t[o+2],128===(192&i)&&128===(192&s)&&(u=(15&f)<<12|(63&i)<<6|63&s,u>2047&&(u<55296||u>57343)&&(h=u));break;case 4:i=t[o+1],s=t[o+2],a=t[o+3],128===(192&i)&&128===(192&s)&&128===(192&a)&&(u=(15&f)<<18|(63&i)<<12|(63&s)<<6|63&a,u>65535&&u<1114112&&(h=u))}null===h?(h=65533,l=1):h>65535&&(h-=65536,n.push(h>>>10&1023|55296),h=56320|1023&h),n.push(h),o+=l}return k(n)}f.TYPED_ARRAY_SUPPORT=a(),f.TYPED_ARRAY_SUPPORT||"undefined"===typeof console||"function"!==typeof console.error||console.error("This browser lacks typed array (Uint8Array) support which is required by `buffer` v5.x. Use `buffer` v4.x if you require old browser support."),Object.defineProperty(f.prototype,"parent",{enumerable:!0,get:function(){if(f.isBuffer(this))return this.buffer}}),Object.defineProperty(f.prototype,"offset",{enumerable:!0,get:function(){if(f.isBuffer(this))return this.byteOffset}}),f.poolSize=8192,f.from=function(t,r,e){return h(t,r,e)},Object.setPrototypeOf(f.prototype,Uint8Array.prototype),Object.setPrototypeOf(f,Uint8Array),f.alloc=function(t,r,e){return p(t,r,e)},f.allocUnsafe=function(t){return c(t)},f.allocUnsafeSlow=function(t){return c(t)},f.isBuffer=function(t){return null!=t&&!0===t._isBuffer&&t!==f.prototype},f.compare=function(t,r){if(K(t,Uint8Array)&&(t=f.from(t,t.offset,t.byteLength)),K(r,Uint8Array)&&(r=f.from(r,r.offset,r.byteLength)),!f.isBuffer(t)||!f.isBuffer(r))throw new TypeError('The "buf1", "buf2" arguments must be one of type Buffer or Uint8Array');if(t===r)return 0;for(var e=t.length,n=r.length,o=0,i=Math.min(e,n);o<i;++o)if(t[o]!==r[o]){e=t[o],n=r[o];break}return e<n?-1:n<e?1:0},f.isEncoding=function(t){switch(String(t).toLowerCase()){case"hex":case"utf8":case"utf-8":case"ascii":case"latin1":case"binary":case"base64":case"ucs2":case"ucs-2":case"utf16le":case"utf-16le":return!0;default:return!1}},f.concat=function(t,r){if(!Array.isArray(t))throw new TypeError('"list" argument must be an Array of Buffers');if(0===t.length)return f.alloc(0);var e;if(void 0===r)for(r=0,e=0;e<t.length;++e)r+=t[e].length;var n=f.allocUnsafe(r),o=0;for(e=0;e<t.length;++e){var i=t[e];if(K(i,Uint8Array))o+i.length>n.length?f.from(i).copy(n,o):Uint8Array.prototype.set.call(n,i,o);else{if(!f.isBuffer(i))throw new TypeError('"list" argument must be an Array of Buffers');i.copy(n,o)}o+=i.length}return n},f.byteLength=E,f.prototype._isBuffer=!0,f.prototype.swap16=function(){var t=this.length;if(t%2!==0)throw new RangeError("Buffer size must be a multiple of 16-bits");for(var r=0;r<t;r+=2)A(this,r,r+1);return this},f.prototype.swap32=function(){var t=this.length;if(t%4!==0)throw new RangeError("Buffer size must be a multiple of 32-bits");for(var r=0;r<t;r+=4)A(this,r,r+3),A(this,r+1,r+2);return this},f.prototype.swap64=function(){var t=this.length;if(t%8!==0)throw new RangeError("Buffer size must be a multiple of 64-bits");for(var r=0;r<t;r+=8)A(this,r,r+7),A(this,r+1,r+6),A(this,r+2,r+5),A(this,r+3,r+4);return this},f.prototype.toString=function(){var t=this.length;return 0===t?"":0===arguments.length?O(this,0,t):U.apply(this,arguments)},f.prototype.toLocaleString=f.prototype.toString,f.prototype.equals=function(t){if(!f.isBuffer(t))throw new TypeError("Argument must be a Buffer");return this===t||0===f.compare(this,t)},f.prototype.inspect=function(){var t="",e=r.h2;return t=this.toString("hex",0,e).replace(/(.{2})/g,"$1 ").trim(),this.length>e&&(t+=" ... "),"<Buffer "+t+">"},i&&(f.prototype[i]=f.prototype.inspect),f.prototype.compare=function(t,r,e,n,o){if(K(t,Uint8Array)&&(t=f.from(t,t.offset,t.byteLength)),!f.isBuffer(t))throw new TypeError('The "target" argument must be one of type Buffer or Uint8Array. Received type '+typeof t);if(void 0===r&&(r=0),void 0===e&&(e=t?t.length:0),void 0===n&&(n=0),void 0===o&&(o=this.length),r<0||e>t.length||n<0||o>this.length)throw new RangeError("out of range index");if(n>=o&&r>=e)return 0;if(n>=o)return-1;if(r>=e)return 1;if(r>>>=0,e>>>=0,n>>>=0,o>>>=0,this===t)return 0;for(var i=o-n,s=e-r,a=Math.min(i,s),u=this.slice(n,o),h=t.slice(r,e),l=0;l<a;++l)if(u[l]!==h[l]){i=u[l],s=h[l];break}return i<s?-1:s<i?1:0},f.prototype.includes=function(t,r,e){return-1!==this.indexOf(t,r,e)},f.prototype.indexOf=function(t,r,e){return _(this,t,r,e,!0)},f.prototype.lastIndexOf=function(t,r,e){return _(this,t,r,e,!1)},f.prototype.write=function(t,r,e,n){if(void 0===r)n="utf8",e=this.length,r=0;else if(void 0===e&&"string"===typeof r)n=r,e=this.length,r=0;else{if(!isFinite(r))throw new Error("Buffer.write(string, encoding, offset[, length]) is no longer supported");r>>>=0,isFinite(e)?(e>>>=0,void 0===n&&(n="utf8")):(n=e,e=void 0)}var o=this.length-r;if((void 0===e||e>o)&&(e=o),t.length>0&&(e<0||r<0)||r>this.length)throw new RangeError("Attempt to write outside buffer bounds");n||(n="utf8");for(var i=!1;;)switch(n){case"hex":return C(this,t,r,e);case"utf8":case"utf-8":return I(this,t,r,e);case"ascii":case"latin1":case"binary":return L(this,t,r,e);case"base64":return S(this,t,r,e);case"ucs2":case"ucs-2":case"utf16le":case"utf-16le":return T(this,t,r,e);default:if(i)throw new TypeError("Unknown encoding: "+n);n=(""+n).toLowerCase(),i=!0}},f.prototype.toJSON=function(){return{type:"Buffer",data:Array.prototype.slice.call(this._arr||this,0)}};var R=4096;function k(t){var r=t.length;if(r<=R)return String.fromCharCode.apply(String,t);var e="",n=0;while(n<r)e+=String.fromCharCode.apply(String,t.slice(n,n+=R));return e}function M(t,r,e){var n="";e=Math.min(t.length,e);for(var o=r;o<e;++o)n+=String.fromCharCode(127&t[o]);return n}function x(t,r,e){var n="";e=Math.min(t.length,e);for(var o=r;o<e;++o)n+=String.fromCharCode(t[o]);return n}function D(t,r,e){var n=t.length;(!r||r<0)&&(r=0),(!e||e<0||e>n)&&(e=n);for(var o="",i=r;i<e;++i)o+=X[t[i]];return o}function j(t,r,e){for(var n=t.slice(r,e),o="",i=0;i<n.length-1;i+=2)o+=String.fromCharCode(n[i]+256*n[i+1]);return o}function z(t,r,e){if(t%1!==0||t<0)throw new RangeError("offset is not uint");if(t+r>e)throw new RangeError("Trying to access beyond buffer length")}function N(t,r,e,n,o,i){if(!f.isBuffer(t))throw new TypeError('"buffer" argument must be a Buffer instance');if(r>o||r<i)throw new RangeError('"value" argument is out of bounds');if(e+n>t.length)throw new RangeError("Index out of range")}function Z(t,r,e,n,o,i){if(e+n>t.length)throw new RangeError("Index out of range");if(e<0)throw new RangeError("Index out of range")}function V(t,r,e,n,i){return r=+r,e>>>=0,i||Z(t,r,e,4,34028234663852886e22,-34028234663852886e22),o.write(t,r,e,n,23,4),e+4}function F(t,r,e,n,i){return r=+r,e>>>=0,i||Z(t,r,e,8,17976931348623157e292,-17976931348623157e292),o.write(t,r,e,n,52,8),e+8}f.prototype.slice=function(t,r){var e=this.length;t=~~t,r=void 0===r?e:~~r,t<0?(t+=e,t<0&&(t=0)):t>e&&(t=e),r<0?(r+=e,r<0&&(r=0)):r>e&&(r=e),r<t&&(r=t);var n=this.subarray(t,r);return Object.setPrototypeOf(n,f.prototype),n},f.prototype.readUintLE=f.prototype.readUIntLE=function(t,r,e){t>>>=0,r>>>=0,e||z(t,r,this.length);var n=this[t],o=1,i=0;while(++i<r&&(o*=256))n+=this[t+i]*o;return n},f.prototype.readUintBE=f.prototype.readUIntBE=function(t,r,e){t>>>=0,r>>>=0,e||z(t,r,this.length);var n=this[t+--r],o=1;while(r>0&&(o*=256))n+=this[t+--r]*o;return n},f.prototype.readUint8=f.prototype.readUInt8=function(t,r){return t>>>=0,r||z(t,1,this.length),this[t]},f.prototype.readUint16LE=f.prototype.readUInt16LE=function(t,r){return t>>>=0,r||z(t,2,this.length),this[t]|this[t+1]<<8},f.prototype.readUint16BE=f.prototype.readUInt16BE=function(t,r){return t>>>=0,r||z(t,2,this.length),this[t]<<8|this[t+1]},f.prototype.readUint32LE=f.prototype.readUInt32LE=function(t,r){return t>>>=0,r||z(t,4,this.length),(this[t]|this[t+1]<<8|this[t+2]<<16)+16777216*this[t+3]},f.prototype.readUint32BE=f.prototype.readUInt32BE=function(t,r){return t>>>=0,r||z(t,4,this.length),16777216*this[t]+(this[t+1]<<16|this[t+2]<<8|this[t+3])},f.prototype.readIntLE=function(t,r,e){t>>>=0,r>>>=0,e||z(t,r,this.length);var n=this[t],o=1,i=0;while(++i<r&&(o*=256))n+=this[t+i]*o;return o*=128,n>=o&&(n-=Math.pow(2,8*r)),n},f.prototype.readIntBE=function(t,r,e){t>>>=0,r>>>=0,e||z(t,r,this.length);var n=r,o=1,i=this[t+--n];while(n>0&&(o*=256))i+=this[t+--n]*o;return o*=128,i>=o&&(i-=Math.pow(2,8*r)),i},f.prototype.readInt8=function(t,r){return t>>>=0,r||z(t,1,this.length),128&this[t]?-1*(255-this[t]+1):this[t]},f.prototype.readInt16LE=function(t,r){t>>>=0,r||z(t,2,this.length);var e=this[t]|this[t+1]<<8;return 32768&e?4294901760|e:e},f.prototype.readInt16BE=function(t,r){t>>>=0,r||z(t,2,this.length);var e=this[t+1]|this[t]<<8;return 32768&e?4294901760|e:e},f.prototype.readInt32LE=function(t,r){return t>>>=0,r||z(t,4,this.length),this[t]|this[t+1]<<8|this[t+2]<<16|this[t+3]<<24},f.prototype.readInt32BE=function(t,r){return t>>>=0,r||z(t,4,this.length),this[t]<<24|this[t+1]<<16|this[t+2]<<8|this[t+3]},f.prototype.readFloatLE=function(t,r){return t>>>=0,r||z(t,4,this.length),o.read(this,t,!0,23,4)},f.prototype.readFloatBE=function(t,r){return t>>>=0,r||z(t,4,this.length),o.read(this,t,!1,23,4)},f.prototype.readDoubleLE=function(t,r){return t>>>=0,r||z(t,8,this.length),o.read(this,t,!0,52,8)},f.prototype.readDoubleBE=function(t,r){return t>>>=0,r||z(t,8,this.length),o.read(this,t,!1,52,8)},f.prototype.writeUintLE=f.prototype.writeUIntLE=function(t,r,e,n){if(t=+t,r>>>=0,e>>>=0,!n){var o=Math.pow(2,8*e)-1;N(this,t,r,e,o,0)}var i=1,s=0;this[r]=255&t;while(++s<e&&(i*=256))this[r+s]=t/i&255;return r+e},f.prototype.writeUintBE=f.prototype.writeUIntBE=function(t,r,e,n){if(t=+t,r>>>=0,e>>>=0,!n){var o=Math.pow(2,8*e)-1;N(this,t,r,e,o,0)}var i=e-1,s=1;this[r+i]=255&t;while(--i>=0&&(s*=256))this[r+i]=t/s&255;return r+e},f.prototype.writeUint8=f.prototype.writeUInt8=function(t,r,e){return t=+t,r>>>=0,e||N(this,t,r,1,255,0),this[r]=255&t,r+1},f.prototype.writeUint16LE=f.prototype.writeUInt16LE=function(t,r,e){return t=+t,r>>>=0,e||N(this,t,r,2,65535,0),this[r]=255&t,this[r+1]=t>>>8,r+2},f.prototype.writeUint16BE=f.prototype.writeUInt16BE=function(t,r,e){return t=+t,r>>>=0,e||N(this,t,r,2,65535,0),this[r]=t>>>8,this[r+1]=255&t,r+2},f.prototype.writeUint32LE=f.prototype.writeUInt32LE=function(t,r,e){return t=+t,r>>>=0,e||N(this,t,r,4,4294967295,0),this[r+3]=t>>>24,this[r+2]=t>>>16,this[r+1]=t>>>8,this[r]=255&t,r+4},f.prototype.writeUint32BE=f.prototype.writeUInt32BE=function(t,r,e){return t=+t,r>>>=0,e||N(this,t,r,4,4294967295,0),this[r]=t>>>24,this[r+1]=t>>>16,this[r+2]=t>>>8,this[r+3]=255&t,r+4},f.prototype.writeIntLE=function(t,r,e,n){if(t=+t,r>>>=0,!n){var o=Math.pow(2,8*e-1);N(this,t,r,e,o-1,-o)}var i=0,s=1,a=0;this[r]=255&t;while(++i<e&&(s*=256))t<0&&0===a&&0!==this[r+i-1]&&(a=1),this[r+i]=(t/s>>0)-a&255;return r+e},f.prototype.writeIntBE=function(t,r,e,n){if(t=+t,r>>>=0,!n){var o=Math.pow(2,8*e-1);N(this,t,r,e,o-1,-o)}var i=e-1,s=1,a=0;this[r+i]=255&t;while(--i>=0&&(s*=256))t<0&&0===a&&0!==this[r+i+1]&&(a=1),this[r+i]=(t/s>>0)-a&255;return r+e},f.prototype.writeInt8=function(t,r,e){return t=+t,r>>>=0,e||N(this,t,r,1,127,-128),t<0&&(t=255+t+1),this[r]=255&t,r+1},f.prototype.writeInt16LE=function(t,r,e){return t=+t,r>>>=0,e||N(this,t,r,2,32767,-32768),this[r]=255&t,this[r+1]=t>>>8,r+2},f.prototype.writeInt16BE=function(t,r,e){return t=+t,r>>>=0,e||N(this,t,r,2,32767,-32768),this[r]=t>>>8,this[r+1]=255&t,r+2},f.prototype.writeInt32LE=function(t,r,e){return t=+t,r>>>=0,e||N(this,t,r,4,2147483647,-2147483648),this[r]=255&t,this[r+1]=t>>>8,this[r+2]=t>>>16,this[r+3]=t>>>24,r+4},f.prototype.writeInt32BE=function(t,r,e){return t=+t,r>>>=0,e||N(this,t,r,4,2147483647,-2147483648),t<0&&(t=4294967295+t+1),this[r]=t>>>24,this[r+1]=t>>>16,this[r+2]=t>>>8,this[r+3]=255&t,r+4},f.prototype.writeFloatLE=function(t,r,e){return V(this,t,r,!0,e)},f.prototype.writeFloatBE=function(t,r,e){return V(this,t,r,!1,e)},f.prototype.writeDoubleLE=function(t,r,e){return F(this,t,r,!0,e)},f.prototype.writeDoubleBE=function(t,r,e){return F(this,t,r,!1,e)},f.prototype.copy=function(t,r,e,n){if(!f.isBuffer(t))throw new TypeError("argument should be a Buffer");if(e||(e=0),n||0===n||(n=this.length),r>=t.length&&(r=t.length),r||(r=0),n>0&&n<e&&(n=e),n===e)return 0;if(0===t.length||0===this.length)return 0;if(r<0)throw new RangeError("targetStart out of bounds");if(e<0||e>=this.length)throw new RangeError("Index out of range");if(n<0)throw new RangeError("sourceEnd out of bounds");n>this.length&&(n=this.length),t.length-r<n-e&&(n=t.length-r+e);var o=n-e;return this===t&&"function"===typeof Uint8Array.prototype.copyWithin?this.copyWithin(r,e,n):Uint8Array.prototype.set.call(t,this.subarray(e,n),r),o},f.prototype.fill=function(t,r,e,n){if("string"===typeof t){if("string"===typeof r?(n=r,r=0,e=this.length):"string"===typeof e&&(n=e,e=this.length),void 0!==n&&"string"!==typeof n)throw new TypeError("encoding must be a string");if("string"===typeof n&&!f.isEncoding(n))throw new TypeError("Unknown encoding: "+n);if(1===t.length){var o=t.charCodeAt(0);("utf8"===n&&o<128||"latin1"===n)&&(t=o)}}else"number"===typeof t?t&=255:"boolean"===typeof t&&(t=Number(t));if(r<0||this.length<r||this.length<e)throw new RangeError("Out of range index");if(e<=r)return this;var i;if(r>>>=0,e=void 0===e?this.length:e>>>0,t||(t=0),"number"===typeof t)for(i=r;i<e;++i)this[i]=t;else{var s=f.isBuffer(t)?t:f.from(t,n),a=s.length;if(0===a)throw new TypeError('The value "'+t+'" is invalid for argument "value"');for(i=0;i<e-r;++i)this[i+r]=s[i%a]}return this};var $=/[^+/0-9A-Za-z-_]/g;function Y(t){if(t=t.split("=")[0],t=t.trim().replace($,""),t.length<2)return"";while(t.length%4!==0)t+="=";return t}function W(t,r){var e;r=r||1/0;for(var n=t.length,o=null,i=[],s=0;s<n;++s){if(e=t.charCodeAt(s),e>55295&&e<57344){if(!o){if(e>56319){(r-=3)>-1&&i.push(239,191,189);continue}if(s+1===n){(r-=3)>-1&&i.push(239,191,189);continue}o=e;continue}if(e<56320){(r-=3)>-1&&i.push(239,191,189),o=e;continue}e=65536+(o-55296<<10|e-56320)}else o&&(r-=3)>-1&&i.push(239,191,189);if(o=null,e<128){if((r-=1)<0)break;i.push(e)}else if(e<2048){if((r-=2)<0)break;i.push(e>>6|192,63&e|128)}else if(e<65536){if((r-=3)<0)break;i.push(e>>12|224,e>>6&63|128,63&e|128)}else{if(!(e<1114112))throw new Error("Invalid code point");if((r-=4)<0)break;i.push(e>>18|240,e>>12&63|128,e>>6&63|128,63&e|128)}}return i}function q(t){for(var r=[],e=0;e<t.length;++e)r.push(255&t.charCodeAt(e));return r}function G(t,r){for(var e,n,o,i=[],s=0;s<t.length;++s){if((r-=2)<0)break;e=t.charCodeAt(s),n=e>>8,o=e%256,i.push(o),i.push(n)}return i}function H(t){return n.toByteArray(Y(t))}function J(t,r,e,n){for(var o=0;o<n;++o){if(o+e>=r.length||o>=t.length)break;r[o+e]=t[o]}return o}function K(t,r){return t instanceof r||null!=t&&null!=t.constructor&&null!=t.constructor.name&&t.constructor.name===r.name}function Q(t){return t!==t}var X=function(){for(var t="0123456789abcdef",r=new Array(256),e=0;e<16;++e)for(var n=16*e,o=0;o<16;++o)r[n+o]=t[e]+t[o];return r}()},7055:function(t,r){
/*! ieee754. BSD-3-Clause License. Feross Aboukhadijeh <https://feross.org/opensource> */
r.read=function(t,r,e,n,o){var i,s,a=8*o-n-1,u=(1<<a)-1,f=u>>1,h=-7,l=e?o-1:0,p=e?-1:1,c=t[r+l];for(l+=p,i=c&(1<<-h)-1,c>>=-h,h+=a;h>0;i=256*i+t[r+l],l+=p,h-=8);for(s=i&(1<<-h)-1,i>>=-h,h+=n;h>0;s=256*s+t[r+l],l+=p,h-=8);if(0===i)i=1-f;else{if(i===u)return s?NaN:1/0*(c?-1:1);s+=Math.pow(2,n),i-=f}return(c?-1:1)*s*Math.pow(2,i-n)},r.write=function(t,r,e,n,o,i){var s,a,u,f=8*i-o-1,h=(1<<f)-1,l=h>>1,p=23===o?Math.pow(2,-24)-Math.pow(2,-77):0,c=n?0:i-1,d=n?1:-1,y=r<0||0===r&&1/r<0?1:0;for(r=Math.abs(r),isNaN(r)||r===1/0?(a=isNaN(r)?1:0,s=h):(s=Math.floor(Math.log(r)/Math.LN2),r*(u=Math.pow(2,-s))<1&&(s--,u*=2),r+=s+l>=1?p/u:p*Math.pow(2,1-l),r*u>=2&&(s++,u/=2),s+l>=h?(a=0,s=h):s+l>=1?(a=(r*u-1)*Math.pow(2,o),s+=l):(a=r*Math.pow(2,l-1)*Math.pow(2,o),s=0));o>=8;t[e+c]=255&a,c+=d,a/=256,o-=8);for(s=s<<o|a,f+=o;f>0;t[e+c]=255&s,c+=d,s/=256,f-=8);t[e+c-d]|=128*y}},1046:function(t,r,e){"use strict";e.r(r),e.d(r,{default:function(){return _}});var n=e(3396),o=e(9242),i=e(7139);const s=t=>((0,n.dD)("data-v-b6a433dc"),t=t(),(0,n.Cn)(),t),a={class:"login"},u={class:"form-group"},f=s((()=>(0,n._)("label",{for:"username"},"Username",-1))),h=s((()=>(0,n._)("br",null,null,-1))),l=s((()=>(0,n._)("br",null,null,-1))),p=s((()=>(0,n._)("br",null,null,-1))),c={class:"form-group"},d=s((()=>(0,n._)("label",{for:"password"},"Password",-1))),y=s((()=>(0,n._)("br",null,null,-1))),g=s((()=>(0,n._)("br",null,null,-1))),w=s((()=>(0,n._)("button",{type:"submit",class:"btn btn-primary"},"Submit",-1)));function m(t,r,e,s,m,b){return(0,n.wg)(),(0,n.iD)("div",a,[(0,n._)("form",{onSubmit:r[2]||(r[2]=(0,o.iM)(((...t)=>b.login&&b.login(...t)),["prevent"]))},[(0,n._)("div",u,[f,(0,n.wy)((0,n._)("input",{type:"text",class:"form-control",id:"username","onUpdate:modelValue":r[0]||(r[0]=r=>t.username=r),placeholder:"Enter username"},null,512),[[o.nr,t.username]])]),h,l,p,(0,n._)("div",c,[d,(0,n.wy)((0,n._)("input",{type:"password",class:"form-control",id:"password","onUpdate:modelValue":r[1]||(r[1]=r=>t.password=r),placeholder:"Password"},null,512),[[o.nr,t.password]])]),y,g,(0,n._)("p",null,(0,i.zw)(t.error),1),w],32)])}e(7658);var b=e(4311),v=e(5361),E={data:()=>({username:"",password:"",error:""}),methods:{login(){var t={method:"post",url:"/api/login",headers:{Authorization:"Basic "+v.lW.from(this.username+":"+this.password).toString("base64"),"Content-Type":"application/json"},withCredentials:!0};(0,b.Z)(t).then((t=>{localStorage.setItem("is_admin",t.data.is_admin),localStorage.setItem("auth",!0),localStorage.setItem("timestamp",new Date),this.$store.state.auth=!0,this.$store.state.isAdmin=t.data.is_admin,this.$router.push("/")})).catch((t=>{console.error(t),this.error="Invalid login"}))}}},U=e(89);const A=(0,U.Z)(E,[["render",m],["__scopeId","data-v-b6a433dc"]]);var _=A},9265:function(t,r,e){"use strict";e.r(r),e.d(r,{default:function(){return B}});var n=e(3396),o=e(7139),i=e(9242);const s=t=>((0,n.dD)("data-v-0b7ecfe6"),t=t(),(0,n.Cn)(),t),a={class:"profile"},u=s((()=>(0,n._)("h3",null,"MANAGEMENT",-1))),f={class:"grid-container"},h={class:"grid-item-left"},l=s((()=>(0,n._)("tr",null,[(0,n._)("th",null,"Username"),(0,n._)("th",null,"Admin")],-1))),p=["onUpdate:modelValue","onChange"],c=["onClick"],d={class:"grid-item-right"},y=s((()=>(0,n._)("th",null,[(0,n._)("label",{for:"username"},"Username")],-1))),g=s((()=>(0,n._)("br",null,null,-1))),w=s((()=>(0,n._)("th",null,[(0,n._)("label",{for:"password"},"Password")],-1))),m=s((()=>(0,n._)("br",null,null,-1))),b={colspan:"2"};function v(t,r,e,s,v,E){return(0,n.wg)(),(0,n.iD)("div",a,[u,(0,n._)("div",f,[(0,n._)("div",h,[(0,n._)("table",null,[l,((0,n.wg)(!0),(0,n.iD)(n.HY,null,(0,n.Ko)(t.users,(t=>((0,n.wg)(),(0,n.iD)("tr",{key:t._id},[(0,n._)("td",null,(0,o.zw)(t.user),1),(0,n._)("td",null,[(0,n.wy)((0,n._)("input",{type:"checkbox","onUpdate:modelValue":r=>t.is_admin=r,onChange:r=>E.updateUser(t._id,t.is_admin)},null,40,p),[[i.e8,t.is_admin]])]),(0,n._)("td",null,[(0,n._)("button",{class:"delete",onClick:r=>E.deleteUser(t._id)},"Delete",8,c)])])))),128))])]),(0,n._)("div",d,[(0,n._)("table",null,[(0,n._)("tr",null,[y,(0,n._)("th",null,[(0,n.wy)((0,n._)("input",{type:"text",id:"username","onUpdate:modelValue":r[0]||(r[0]=r=>t.newUser=r)},null,512),[[i.nr,t.newUser]]),g])]),(0,n._)("tr",null,[w,(0,n._)("th",null,[(0,n.wy)((0,n._)("input",{type:"password",id:"password","onUpdate:modelValue":r[1]||(r[1]=r=>t.newPass=r)},null,512),[[i.nr,t.newPass]]),m])]),(0,n._)("tr",null,[(0,n._)("td",b,[(0,n._)("button",{class:"add",onClick:r[2]||(r[2]=(...t)=>E.addUser&&E.addUser(...t))},"Add User")])])]),(0,n._)("form",{onSubmit:r[3]||(r[3]=(0,i.iM)(((...t)=>E.addUser&&E.addUser(...t)),["prevent"]))},null,32)])])])}e(7658);var E=e(4311),U={data:()=>({users:[],newUser:"",newPass:"",newAdmin:!1}),methods:{deleteUser(t){E.Z["delete"]("/api/user/"+t,{withCredentials:!0}).then((()=>{this.users=this.users.filter((r=>r._id!==t))})).catch((t=>{console.error(t)}))},addUser(){E.Z.post("/api/user",{user:this.newUser,password:this.newPass,is_admin:this.newAdmin},{withCredentials:!0}).then((()=>{this.newUser="",this.newPass="",this.newAdmin=!1,E.Z.get("/api/user",{withCredentials:!0}).then((t=>{this.users=t.data})).catch((t=>{console.error(t),this.error="Error while fetching user"}))})).catch((t=>{console.error(t)}))},updateUser(t,r){E.Z.post(`/api/setAdmin/${t}/${r}`,{},{withCredentials:!0}).then((()=>{})).catch((t=>{console.error(t)}))}},getUsers(){E.Z.get("/api/user",{withCredentials:!0}).then((t=>{this.users=t.data})).catch((t=>{console.error(t),this.error="Error while fetching user"}))},beforeMount(){localStorage.getItem("auth")?E.Z.get("/api/user",{withCredentials:!0}).then((t=>{this.users=t.data})).catch((t=>{console.error(t),this.error="Error while fetching user"})):this.$router.push("/login")}},A=e(89);const _=(0,A.Z)(U,[["render",v],["__scopeId","data-v-0b7ecfe6"]]);var B=_},6593:function(t,r,e){"use strict";e.r(r),e.d(r,{default:function(){return _}});var n=e(3396),o=e(9242),i=e(7139);const s=t=>((0,n.dD)("data-v-2d92af38"),t=t(),(0,n.Cn)(),t),a={class:"profile"},u=s((()=>(0,n._)("h3",null,"Change Password",-1))),f={class:"form-group"},h=s((()=>(0,n._)("label",{for:"username"},"Password",-1))),l=s((()=>(0,n._)("br",null,null,-1))),p=s((()=>(0,n._)("br",null,null,-1))),c={class:"form-group"},d=s((()=>(0,n._)("label",{for:"password"},"Confirm",-1))),y=s((()=>(0,n._)("br",null,null,-1))),g=s((()=>(0,n._)("button",{type:"submit",class:"btn btn-primary"},"Submit",-1))),w=s((()=>(0,n._)("br",null,null,-1))),m=s((()=>(0,n._)("br",null,null,-1)));function b(t,r,e,s,b,v){return(0,n.wg)(),(0,n.iD)("div",a,[u,(0,n._)("div",null,[(0,n._)("form",{onSubmit:r[3]||(r[3]=(0,o.iM)(((...t)=>v.changePassword&&v.changePassword(...t)),["prevent"]))},[(0,n._)("div",f,[h,(0,n.wy)((0,n._)("input",{type:"password",class:"form-control",id:"username","onUpdate:modelValue":r[0]||(r[0]=r=>t.password=r),placeholder:"Enter password"},null,512),[[o.nr,t.password]])]),l,p,(0,n._)("div",c,[d,(0,n.wy)((0,n._)("input",{type:"password",class:"form-control",id:"password","onUpdate:modelValue":r[1]||(r[1]=r=>t.password2=r),placeholder:"Confirm password"},null,512),[[o.nr,t.password2]])]),y,(0,n._)("p",null,(0,i.zw)(t.error),1),g,(0,n.Uk)(),w,m,(0,n._)("a",{onClick:r[2]||(r[2]=(...t)=>v.getLogs&&v.getLogs(...t))},"Logs")],32)])])}var v=e(4311),E={data:()=>({password:"",password2:"",error:""}),methods:{changePassword(){if(this.password===this.password2){var t={method:"post",url:"/api/changePassword",data:{password:this.password},withCredentials:!0};(0,v.Z)(t).then((()=>{this.error="Password changed"})).catch((t=>{console.error(t),this.error="Invalid login"}))}else this.error="Passwords do not match"},getLogs(){v.Z.get("/api/logs",{withCredentials:!0}).then((t=>{let r=t.data;var e=document.createElement("a");e.setAttribute("href","data:text/plain;charset=utf-8,"+encodeURIComponent(r)),e.setAttribute("download","logs.txt"),e.style.display="none",document.body.appendChild(e),e.click(),document.body.removeChild(e)})).catch((t=>{console.error(t)}))}}},U=e(89);const A=(0,U.Z)(E,[["render",b],["__scopeId","data-v-2d92af38"]]);var _=A}}]);
//# sourceMappingURL=about.1655b511.js.map