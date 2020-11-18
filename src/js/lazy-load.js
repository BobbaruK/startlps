const images = document.querySelectorAll("[data-src]");

function preloadImage(img) {
  const src = img.getAttribute("data-src");
  if(!src) {
    return;
  }
  img.src = src;
}

const imgOptions = {
  threshold:  0,
  rootMargin: "0px 0px 50px 0px",
};

const imgObserver = new IntersectionObserver((entries, imgObserver) => {
  entries.forEach(entry => {
    if(!entry.isIntersecting) {
      return;
    } else {
      preloadImage(entry.target);
      imgObserver.unobserve(entry.target);
    }
  })
}, imgOptions);

images.forEach(image => {
  imgObserver.observe(image);
});

/*! lazysizes - v5.2.0 */
// !function(a,b){var c=b(a,a.document,Date);a.lazySizes=c,"object"==typeof module&&module.exports&&(module.exports=c)}("undefined"!=typeof window?window:{},function(a,b,c){"use strict";var d,e;if(function(){var b,c={lazyClass:"lazyload",loadedClass:"lazyloaded",loadingClass:"lazyloading",preloadClass:"lazypreload",errorClass:"lazyerror",autosizesClass:"lazyautosizes",srcAttr:"data-src",srcsetAttr:"data-srcset",sizesAttr:"data-sizes",minSize:40,customMedia:{},init:!0,expFactor:1.5,hFac:.8,loadMode:2,loadHidden:!0,ricTimeout:0,throttleDelay:125};e=a.lazySizesConfig||a.lazysizesConfig||{};for(b in c)b in e||(e[b]=c[b])}(),!b||!b.getElementsByClassName)return{init:function(){},cfg:e,noSupport:!0};var f=b.documentElement,g=a.HTMLPictureElement,h="addEventListener",i="getAttribute",j=a[h].bind(a),k=a.setTimeout,l=a.requestAnimationFrame||k,m=a.requestIdleCallback,n=/^picture$/i,o=["load","error","lazyincluded","_lazyloaded"],p={},q=Array.prototype.forEach,r=function(a,b){return p[b]||(p[b]=new RegExp("(\\s|^)"+b+"(\\s|$)")),p[b].test(a[i]("class")||"")&&p[b]},s=function(a,b){r(a,b)||a.setAttribute("class",(a[i]("class")||"").trim()+" "+b)},t=function(a,b){var c;(c=r(a,b))&&a.setAttribute("class",(a[i]("class")||"").replace(c," "))},u=function(a,b,c){var d=c?h:"removeEventListener";c&&u(a,b),o.forEach(function(c){a[d](c,b)})},v=function(a,c,e,f,g){var h=b.createEvent("Event");return e||(e={}),e.instance=d,h.initEvent(c,!f,!g),h.detail=e,a.dispatchEvent(h),h},w=function(b,c){var d;!g&&(d=a.picturefill||e.pf)?(c&&c.src&&!b[i]("srcset")&&b.setAttribute("srcset",c.src),d({reevaluate:!0,elements:[b]})):c&&c.src&&(b.src=c.src)},x=function(a,b){return(getComputedStyle(a,null)||{})[b]},y=function(a,b,c){for(c=c||a.offsetWidth;c<e.minSize&&b&&!a._lazysizesWidth;)c=b.offsetWidth,b=b.parentNode;return c},z=function(){var a,c,d=[],e=[],f=d,g=function(){var b=f;for(f=d.length?e:d,a=!0,c=!1;b.length;)b.shift()();a=!1},h=function(d,e){a&&!e?d.apply(this,arguments):(f.push(d),c||(c=!0,(b.hidden?k:l)(g)))};return h._lsFlush=g,h}(),A=function(a,b){return b?function(){z(a)}:function(){var b=this,c=arguments;z(function(){a.apply(b,c)})}},B=function(a){var b,d=0,f=e.throttleDelay,g=e.ricTimeout,h=function(){b=!1,d=c.now(),a()},i=m&&g>49?function(){m(h,{timeout:g}),g!==e.ricTimeout&&(g=e.ricTimeout)}:A(function(){k(h)},!0);return function(a){var e;(a=!0===a)&&(g=33),b||(b=!0,e=f-(c.now()-d),e<0&&(e=0),a||e<9?i():k(i,e))}},C=function(a){var b,d,e=99,f=function(){b=null,a()},g=function(){var a=c.now()-d;a<e?k(g,e-a):(m||f)(f)};return function(){d=c.now(),b||(b=k(g,e))}},D=function(){var g,m,o,p,y,D,F,G,H,I,J,K,L=/^img$/i,M=/^iframe$/i,N="onscroll"in a&&!/(gle|ing)bot/.test(navigator.userAgent),O=0,P=0,Q=0,R=-1,S=function(a){Q--,(!a||Q<0||!a.target)&&(Q=0)},T=function(a){return null==K&&(K="hidden"==x(b.body,"visibility")),K||!("hidden"==x(a.parentNode,"visibility")&&"hidden"==x(a,"visibility"))},U=function(a,c){var d,e=a,g=T(a);for(G-=c,J+=c,H-=c,I+=c;g&&(e=e.offsetParent)&&e!=b.body&&e!=f;)(g=(x(e,"opacity")||1)>0)&&"visible"!=x(e,"overflow")&&(d=e.getBoundingClientRect(),g=I>d.left&&H<d.right&&J>d.top-1&&G<d.bottom+1);return g},V=function(){var a,c,h,j,k,l,n,o,q,r,s,t,u=d.elements;if((p=e.loadMode)&&Q<8&&(a=u.length)){for(c=0,R++;c<a;c++)if(u[c]&&!u[c]._lazyRace)if(!N||d.prematureUnveil&&d.prematureUnveil(u[c]))ba(u[c]);else if((o=u[c][i]("data-expand"))&&(l=1*o)||(l=P),r||(r=!e.expand||e.expand<1?f.clientHeight>500&&f.clientWidth>500?500:370:e.expand,d._defEx=r,s=r*e.expFactor,t=e.hFac,K=null,P<s&&Q<1&&R>2&&p>2&&!b.hidden?(P=s,R=0):P=p>1&&R>1&&Q<6?r:O),q!==l&&(D=innerWidth+l*t,F=innerHeight+l,n=-1*l,q=l),h=u[c].getBoundingClientRect(),(J=h.bottom)>=n&&(G=h.top)<=F&&(I=h.right)>=n*t&&(H=h.left)<=D&&(J||I||H||G)&&(e.loadHidden||T(u[c]))&&(m&&Q<3&&!o&&(p<3||R<4)||U(u[c],l))){if(ba(u[c]),k=!0,Q>9)break}else!k&&m&&!j&&Q<4&&R<4&&p>2&&(g[0]||e.preloadAfterLoad)&&(g[0]||!o&&(J||I||H||G||"auto"!=u[c][i](e.sizesAttr)))&&(j=g[0]||u[c]);j&&!k&&ba(j)}},W=B(V),X=function(a){var b=a.target;if(b._lazyCache)return void delete b._lazyCache;S(a),s(b,e.loadedClass),t(b,e.loadingClass),u(b,Z),v(b,"lazyloaded")},Y=A(X),Z=function(a){Y({target:a.target})},$=function(a,b){try{a.contentWindow.location.replace(b)}catch(c){a.src=b}},_=function(a){var b,c=a[i](e.srcsetAttr);(b=e.customMedia[a[i]("data-media")||a[i]("media")])&&a.setAttribute("media",b),c&&a.setAttribute("srcset",c)},aa=A(function(a,b,c,d,f){var g,h,j,l,m,p;(m=v(a,"lazybeforeunveil",b)).defaultPrevented||(d&&(c?s(a,e.autosizesClass):a.setAttribute("sizes",d)),h=a[i](e.srcsetAttr),g=a[i](e.srcAttr),f&&(j=a.parentNode,l=j&&n.test(j.nodeName||"")),p=b.firesLoad||"src"in a&&(h||g||l),m={target:a},s(a,e.loadingClass),p&&(clearTimeout(o),o=k(S,2500),u(a,Z,!0)),l&&q.call(j.getElementsByTagName("source"),_),h?a.setAttribute("srcset",h):g&&!l&&(M.test(a.nodeName)?$(a,g):a.src=g),f&&(h||l)&&w(a,{src:g})),a._lazyRace&&delete a._lazyRace,t(a,e.lazyClass),z(function(){var b=a.complete&&a.naturalWidth>1;p&&!b||(b&&s(a,"ls-is-cached"),X(m),a._lazyCache=!0,k(function(){"_lazyCache"in a&&delete a._lazyCache},9)),"lazy"==a.loading&&Q--},!0)}),ba=function(a){if(!a._lazyRace){var b,c=L.test(a.nodeName),d=c&&(a[i](e.sizesAttr)||a[i]("sizes")),f="auto"==d;(!f&&m||!c||!a[i]("src")&&!a.srcset||a.complete||r(a,e.errorClass)||!r(a,e.lazyClass))&&(b=v(a,"lazyunveilread").detail,f&&E.updateElem(a,!0,a.offsetWidth),a._lazyRace=!0,Q++,aa(a,b,f,d,c))}},ca=C(function(){e.loadMode=3,W()}),da=function(){3==e.loadMode&&(e.loadMode=2),ca()},ea=function(){if(!m){if(c.now()-y<999)return void k(ea,999);m=!0,e.loadMode=3,W(),j("scroll",da,!0)}};return{_:function(){y=c.now(),d.elements=b.getElementsByClassName(e.lazyClass),g=b.getElementsByClassName(e.lazyClass+" "+e.preloadClass),j("scroll",W,!0),j("resize",W,!0),j("pageshow",function(a){if(a.persisted){var c=b.querySelectorAll("."+e.loadingClass);c.length&&c.forEach&&l(function(){c.forEach(function(a){a.complete&&ba(a)})})}}),a.MutationObserver?new MutationObserver(W).observe(f,{childList:!0,subtree:!0,attributes:!0}):(f[h]("DOMNodeInserted",W,!0),f[h]("DOMAttrModified",W,!0),setInterval(W,999)),j("hashchange",W,!0),["focus","mouseover","click","load","transitionend","animationend"].forEach(function(a){b[h](a,W,!0)}),/d$|^c/.test(b.readyState)?ea():(j("load",ea),b[h]("DOMContentLoaded",W),k(ea,2e4)),d.elements.length?(V(),z._lsFlush()):W()},checkElems:W,unveil:ba,_aLSL:da}}(),E=function(){var a,c=A(function(a,b,c,d){var e,f,g;if(a._lazysizesWidth=d,d+="px",a.setAttribute("sizes",d),n.test(b.nodeName||""))for(e=b.getElementsByTagName("source"),f=0,g=e.length;f<g;f++)e[f].setAttribute("sizes",d);c.detail.dataAttr||w(a,c.detail)}),d=function(a,b,d){var e,f=a.parentNode;f&&(d=y(a,f,d),e=v(a,"lazybeforesizes",{width:d,dataAttr:!!b}),e.defaultPrevented||(d=e.detail.width)&&d!==a._lazysizesWidth&&c(a,f,e,d))},f=function(){var b,c=a.length;if(c)for(b=0;b<c;b++)d(a[b])},g=C(f);return{_:function(){a=b.getElementsByClassName(e.autosizesClass),j("resize",g)},checkElems:g,updateElem:d}}(),F=function(){!F.i&&b.getElementsByClassName&&(F.i=!0,E._(),D._())};return k(function(){e.init&&F()}),d={cfg:e,autoSizer:E,loader:D,init:F,uP:w,aC:s,rC:t,hC:r,fire:v,gW:y,rAF:z}});

// *
// * https://github.com/aFarkas/lazysizes/blob/gh-pages/lazysizes.js
// *

// (function(window, factory) {
// 	var lazySizes = factory(window, window.document, Date);
// 	window.lazySizes = lazySizes;
// 	if(typeof module == 'object' && module.exports){
// 		module.exports = lazySizes;
// 	}
// }(typeof window != 'undefined' ?
//       window : {}, function l(window, document, Date) { // Pass in the windoe Date function also for SSR because the Date class can be lost
// 	'use strict';
// 	/*jshint eqnull:true */

// 	var lazysizes, lazySizesCfg;

// 	(function(){
// 		var prop;

// 		var lazySizesDefaults = {
// 			lazyClass: 'lazyload',
// 			loadedClass: 'lazyloaded',
// 			loadingClass: 'lazyloading',
// 			preloadClass: 'lazypreload',
// 			errorClass: 'lazyerror',
// 			//strictClass: 'lazystrict',
// 			autosizesClass: 'lazyautosizes',
// 			srcAttr: 'data-src',
// 			srcsetAttr: 'data-srcset',
// 			sizesAttr: 'data-sizes',
// 			//preloadAfterLoad: false,
// 			minSize: 40,
// 			customMedia: {},
// 			init: true,
// 			expFactor: 1.5,
// 			hFac: 0.8,
// 			loadMode: 2,
// 			loadHidden: true,
// 			ricTimeout: 0,
// 			throttleDelay: 125,
// 		};

// 		lazySizesCfg = window.lazySizesConfig || window.lazysizesConfig || {};

// 		for(prop in lazySizesDefaults){
// 			if(!(prop in lazySizesCfg)){
// 				lazySizesCfg[prop] = lazySizesDefaults[prop];
// 			}
// 		}
// 	})();

// 	if (!document || !document.getElementsByClassName) {
// 		return {
// 			init: function () {},
// 			cfg: lazySizesCfg,
// 			noSupport: true,
// 		};
// 	}

// 	var docElem = document.documentElement;

// 	var supportPicture = window.HTMLPictureElement;

// 	var _addEventListener = 'addEventListener';

// 	var _getAttribute = 'getAttribute';

// 	/**
// 	 * Update to bind to window because 'this' becomes null during SSR
// 	 * builds.
// 	 */
// 	var addEventListener = window[_addEventListener].bind(window);

// 	var setTimeout = window.setTimeout;

// 	var requestAnimationFrame = window.requestAnimationFrame || setTimeout;

// 	var requestIdleCallback = window.requestIdleCallback;

// 	var regPicture = /^picture$/i;

// 	var loadEvents = ['load', 'error', 'lazyincluded', '_lazyloaded'];

// 	var regClassCache = {};

// 	var forEach = Array.prototype.forEach;

// 	var hasClass = function(ele, cls) {
// 		if(!regClassCache[cls]){
// 			regClassCache[cls] = new RegExp('(\\s|^)'+cls+'(\\s|$)');
// 		}
// 		return regClassCache[cls].test(ele[_getAttribute]('class') || '') && regClassCache[cls];
// 	};

// 	var addClass = function(ele, cls) {
// 		if (!hasClass(ele, cls)){
// 			ele.setAttribute('class', (ele[_getAttribute]('class') || '').trim() + ' ' + cls);
// 		}
// 	};

// 	var removeClass = function(ele, cls) {
// 		var reg;
// 		if ((reg = hasClass(ele,cls))) {
// 			ele.setAttribute('class', (ele[_getAttribute]('class') || '').replace(reg, ' '));
// 		}
// 	};

// 	var addRemoveLoadEvents = function(dom, fn, add){
// 		var action = add ? _addEventListener : 'removeEventListener';
// 		if(add){
// 			addRemoveLoadEvents(dom, fn);
// 		}
// 		loadEvents.forEach(function(evt){
// 			dom[action](evt, fn);
// 		});
// 	};

// 	var triggerEvent = function(elem, name, detail, noBubbles, noCancelable){
// 		var event = document.createEvent('Event');

// 		if(!detail){
// 			detail = {};
// 		}

// 		detail.instance = lazysizes;

// 		event.initEvent(name, !noBubbles, !noCancelable);

// 		event.detail = detail;

// 		elem.dispatchEvent(event);
// 		return event;
// 	};

// 	var updatePolyfill = function (el, full){
// 		var polyfill;
// 		if( !supportPicture && ( polyfill = (window.picturefill || lazySizesCfg.pf) ) ){
// 			if(full && full.src && !el[_getAttribute]('srcset')){
// 				el.setAttribute('srcset', full.src);
// 			}
// 			polyfill({reevaluate: true, elements: [el]});
// 		} else if(full && full.src){
// 			el.src = full.src;
// 		}
// 	};

// 	var getCSS = function (elem, style){
// 		return (getComputedStyle(elem, null) || {})[style];
// 	};

// 	var getWidth = function(elem, parent, width){
// 		width = width || elem.offsetWidth;

// 		while(width < lazySizesCfg.minSize && parent && !elem._lazysizesWidth){
// 			width =  parent.offsetWidth;
// 			parent = parent.parentNode;
// 		}

// 		return width;
// 	};

// 	var rAF = (function(){
// 		var running, waiting;
// 		var firstFns = [];
// 		var secondFns = [];
// 		var fns = firstFns;

// 		var run = function(){
// 			var runFns = fns;

// 			fns = firstFns.length ? secondFns : firstFns;

// 			running = true;
// 			waiting = false;

// 			while(runFns.length){
// 				runFns.shift()();
// 			}

// 			running = false;
// 		};

// 		var rafBatch = function(fn, queue){
// 			if(running && !queue){
// 				fn.apply(this, arguments);
// 			} else {
// 				fns.push(fn);

// 				if(!waiting){
// 					waiting = true;
// 					(document.hidden ? setTimeout : requestAnimationFrame)(run);
// 				}
// 			}
// 		};

// 		rafBatch._lsFlush = run;

// 		return rafBatch;
// 	})();

// 	var rAFIt = function(fn, simple){
// 		return simple ?
// 			function() {
// 				rAF(fn);
// 			} :
// 			function(){
// 				var that = this;
// 				var args = arguments;
// 				rAF(function(){
// 					fn.apply(that, args);
// 				});
// 			}
// 		;
// 	};

// 	var throttle = function(fn){
// 		var running;
// 		var lastTime = 0;
// 		var gDelay = lazySizesCfg.throttleDelay;
// 		var rICTimeout = lazySizesCfg.ricTimeout;
// 		var run = function(){
// 			running = false;
// 			lastTime = Date.now();
// 			fn();
// 		};
// 		var idleCallback = requestIdleCallback && rICTimeout > 49 ?
// 			function(){
// 				requestIdleCallback(run, {timeout: rICTimeout});

// 				if(rICTimeout !== lazySizesCfg.ricTimeout){
// 					rICTimeout = lazySizesCfg.ricTimeout;
// 				}
// 			} :
// 			rAFIt(function(){
// 				setTimeout(run);
// 			}, true)
// 		;

// 		return function(isPriority){
// 			var delay;

// 			if((isPriority = isPriority === true)){
// 				rICTimeout = 33;
// 			}

// 			if(running){
// 				return;
// 			}

// 			running =  true;

// 			delay = gDelay - (Date.now() - lastTime);

// 			if(delay < 0){
// 				delay = 0;
// 			}

// 			if(isPriority || delay < 9){
// 				idleCallback();
// 			} else {
// 				setTimeout(idleCallback, delay);
// 			}
// 		};
// 	};

// 	//based on http://modernjavascript.blogspot.de/2013/08/building-better-debounce.html
// 	var debounce = function(func) {
// 		var timeout, timestamp;
// 		var wait = 99;
// 		var run = function(){
// 			timeout = null;
// 			func();
// 		};
// 		var later = function() {
// 			var last = Date.now() - timestamp;

// 			if (last < wait) {
// 				setTimeout(later, wait - last);
// 			} else {
// 				(requestIdleCallback || run)(run);
// 			}
// 		};

// 		return function() {
// 			timestamp = Date.now();

// 			if (!timeout) {
// 				timeout = setTimeout(later, wait);
// 			}
// 		};
// 	};

// 	var loader = (function(){
// 		var preloadElems, isCompleted, resetPreloadingTimer, loadMode, started;

// 		var eLvW, elvH, eLtop, eLleft, eLright, eLbottom, isBodyHidden;

// 		var regImg = /^img$/i;
// 		var regIframe = /^iframe$/i;

// 		var supportScroll = ('onscroll' in window) && !(/(gle|ing)bot/.test(navigator.userAgent));

// 		var shrinkExpand = 0;
// 		var currentExpand = 0;

// 		var isLoading = 0;
// 		var lowRuns = -1;

// 		var resetPreloading = function(e){
// 			isLoading--;
// 			if(!e || isLoading < 0 || !e.target){
// 				isLoading = 0;
// 			}
// 		};

// 		var isVisible = function (elem) {
// 			if (isBodyHidden == null) {
// 				isBodyHidden = getCSS(document.body, 'visibility') == 'hidden';
// 			}

// 			return isBodyHidden || !(getCSS(elem.parentNode, 'visibility') == 'hidden' && getCSS(elem, 'visibility') == 'hidden');
// 		};

// 		var isNestedVisible = function(elem, elemExpand){
// 			var outerRect;
// 			var parent = elem;
// 			var visible = isVisible(elem);

// 			eLtop -= elemExpand;
// 			eLbottom += elemExpand;
// 			eLleft -= elemExpand;
// 			eLright += elemExpand;

// 			while(visible && (parent = parent.offsetParent) && parent != document.body && parent != docElem){
// 				visible = ((getCSS(parent, 'opacity') || 1) > 0);

// 				if(visible && getCSS(parent, 'overflow') != 'visible'){
// 					outerRect = parent.getBoundingClientRect();
// 					visible = eLright > outerRect.left &&
// 						eLleft < outerRect.right &&
// 						eLbottom > outerRect.top - 1 &&
// 						eLtop < outerRect.bottom + 1
// 					;
// 				}
// 			}

// 			return visible;
// 		};

// 		var checkElements = function() {
// 			var eLlen, i, rect, autoLoadElem, loadedSomething, elemExpand, elemNegativeExpand, elemExpandVal,
// 				beforeExpandVal, defaultExpand, preloadExpand, hFac;
// 			var lazyloadElems = lazysizes.elements;

// 			if((loadMode = lazySizesCfg.loadMode) && isLoading < 8 && (eLlen = lazyloadElems.length)){

// 				i = 0;

// 				lowRuns++;

// 				for(; i < eLlen; i++){

// 					if(!lazyloadElems[i] || lazyloadElems[i]._lazyRace){continue;}

// 					if(!supportScroll || (lazysizes.prematureUnveil && lazysizes.prematureUnveil(lazyloadElems[i]))){unveilElement(lazyloadElems[i]);continue;}

// 					if(!(elemExpandVal = lazyloadElems[i][_getAttribute]('data-expand')) || !(elemExpand = elemExpandVal * 1)){
// 						elemExpand = currentExpand;
// 					}

// 					if (!defaultExpand) {
// 						defaultExpand = (!lazySizesCfg.expand || lazySizesCfg.expand < 1) ?
// 							docElem.clientHeight > 500 && docElem.clientWidth > 500 ? 500 : 370 :
// 							lazySizesCfg.expand;

// 						lazysizes._defEx = defaultExpand;

// 						preloadExpand = defaultExpand * lazySizesCfg.expFactor;
// 						hFac = lazySizesCfg.hFac;
// 						isBodyHidden = null;

// 						if(currentExpand < preloadExpand && isLoading < 1 && lowRuns > 2 && loadMode > 2 && !document.hidden){
// 							currentExpand = preloadExpand;
// 							lowRuns = 0;
// 						} else if(loadMode > 1 && lowRuns > 1 && isLoading < 6){
// 							currentExpand = defaultExpand;
// 						} else {
// 							currentExpand = shrinkExpand;
// 						}
// 					}

// 					if(beforeExpandVal !== elemExpand){
// 						eLvW = innerWidth + (elemExpand * hFac);
// 						elvH = innerHeight + elemExpand;
// 						elemNegativeExpand = elemExpand * -1;
// 						beforeExpandVal = elemExpand;
// 					}

// 					rect = lazyloadElems[i].getBoundingClientRect();

// 					if ((eLbottom = rect.bottom) >= elemNegativeExpand &&
// 						(eLtop = rect.top) <= elvH &&
// 						(eLright = rect.right) >= elemNegativeExpand * hFac &&
// 						(eLleft = rect.left) <= eLvW &&
// 						(eLbottom || eLright || eLleft || eLtop) &&
// 						(lazySizesCfg.loadHidden || isVisible(lazyloadElems[i])) &&
// 						((isCompleted && isLoading < 3 && !elemExpandVal && (loadMode < 3 || lowRuns < 4)) || isNestedVisible(lazyloadElems[i], elemExpand))){
// 						unveilElement(lazyloadElems[i]);
// 						loadedSomething = true;
// 						if(isLoading > 9){break;}
// 					} else if(!loadedSomething && isCompleted && !autoLoadElem &&
// 						isLoading < 4 && lowRuns < 4 && loadMode > 2 &&
// 						(preloadElems[0] || lazySizesCfg.preloadAfterLoad) &&
// 						(preloadElems[0] || (!elemExpandVal && ((eLbottom || eLright || eLleft || eLtop) || lazyloadElems[i][_getAttribute](lazySizesCfg.sizesAttr) != 'auto')))){
// 						autoLoadElem = preloadElems[0] || lazyloadElems[i];
// 					}
// 				}

// 				if(autoLoadElem && !loadedSomething){
// 					unveilElement(autoLoadElem);
// 				}
// 			}
// 		};

// 		var throttledCheckElements = throttle(checkElements);

// 		var switchLoadingClass = function(e){
// 			var elem = e.target;

// 			if (elem._lazyCache) {
// 				delete elem._lazyCache;
// 				return;
// 			}

// 			resetPreloading(e);
// 			addClass(elem, lazySizesCfg.loadedClass);
// 			removeClass(elem, lazySizesCfg.loadingClass);
// 			addRemoveLoadEvents(elem, rafSwitchLoadingClass);
// 			triggerEvent(elem, 'lazyloaded');
// 		};
// 		var rafedSwitchLoadingClass = rAFIt(switchLoadingClass);
// 		var rafSwitchLoadingClass = function(e){
// 			rafedSwitchLoadingClass({target: e.target});
// 		};

// 		var changeIframeSrc = function(elem, src){
// 			try {
// 				elem.contentWindow.location.replace(src);
// 			} catch(e){
// 				elem.src = src;
// 			}
// 		};

// 		var handleSources = function(source){
// 			var customMedia;

// 			var sourceSrcset = source[_getAttribute](lazySizesCfg.srcsetAttr);

// 			if( (customMedia = lazySizesCfg.customMedia[source[_getAttribute]('data-media') || source[_getAttribute]('media')]) ){
// 				source.setAttribute('media', customMedia);
// 			}

// 			if(sourceSrcset){
// 				source.setAttribute('srcset', sourceSrcset);
// 			}
// 		};

// 		var lazyUnveil = rAFIt(function (elem, detail, isAuto, sizes, isImg){
// 			var src, srcset, parent, isPicture, event, firesLoad;

// 			if(!(event = triggerEvent(elem, 'lazybeforeunveil', detail)).defaultPrevented){

// 				if(sizes){
// 					if(isAuto){
// 						addClass(elem, lazySizesCfg.autosizesClass);
// 					} else {
// 						elem.setAttribute('sizes', sizes);
// 					}
// 				}

// 				srcset = elem[_getAttribute](lazySizesCfg.srcsetAttr);
// 				src = elem[_getAttribute](lazySizesCfg.srcAttr);

// 				if(isImg) {
// 					parent = elem.parentNode;
// 					isPicture = parent && regPicture.test(parent.nodeName || '');
// 				}

// 				firesLoad = detail.firesLoad || (('src' in elem) && (srcset || src || isPicture));

// 				event = {target: elem};

// 				addClass(elem, lazySizesCfg.loadingClass);

// 				if(firesLoad){
// 					clearTimeout(resetPreloadingTimer);
// 					resetPreloadingTimer = setTimeout(resetPreloading, 2500);
// 					addRemoveLoadEvents(elem, rafSwitchLoadingClass, true);
// 				}

// 				if(isPicture){
// 					forEach.call(parent.getElementsByTagName('source'), handleSources);
// 				}

// 				if(srcset){
// 					elem.setAttribute('srcset', srcset);
// 				} else if(src && !isPicture){
// 					if(regIframe.test(elem.nodeName)){
// 						changeIframeSrc(elem, src);
// 					} else {
// 						elem.src = src;
// 					}
// 				}

// 				if(isImg && (srcset || isPicture)){
// 					updatePolyfill(elem, {src: src});
// 				}
// 			}

// 			if(elem._lazyRace){
// 				delete elem._lazyRace;
// 			}
// 			removeClass(elem, lazySizesCfg.lazyClass);

// 			rAF(function(){
// 				// Part of this can be removed as soon as this fix is older: https://bugs.chromium.org/p/chromium/issues/detail?id=7731 (2015)
// 				var isLoaded = elem.complete && elem.naturalWidth > 1;

// 				if( !firesLoad || isLoaded){
// 					if (isLoaded) {
// 						addClass(elem, 'ls-is-cached');
// 					}
// 					switchLoadingClass(event);
// 					elem._lazyCache = true;
// 					setTimeout(function(){
// 						if ('_lazyCache' in elem) {
// 							delete elem._lazyCache;
// 						}
// 					}, 9);
// 				}
// 				if (elem.loading == 'lazy') {
// 					isLoading--;
// 				}
// 			}, true);
// 		});

// 		var unveilElement = function (elem){
// 			if (elem._lazyRace) {return;}
// 			var detail;

// 			var isImg = regImg.test(elem.nodeName);

// 			//allow using sizes="auto", but don't use. it's invalid. Use data-sizes="auto" or a valid value for sizes instead (i.e.: sizes="80vw")
// 			var sizes = isImg && (elem[_getAttribute](lazySizesCfg.sizesAttr) || elem[_getAttribute]('sizes'));
// 			var isAuto = sizes == 'auto';

// 			if( (isAuto || !isCompleted) && isImg && (elem[_getAttribute]('src') || elem.srcset) && !elem.complete && !hasClass(elem, lazySizesCfg.errorClass) && hasClass(elem, lazySizesCfg.lazyClass)){return;}

// 			detail = triggerEvent(elem, 'lazyunveilread').detail;

// 			if(isAuto){
// 				 autoSizer.updateElem(elem, true, elem.offsetWidth);
// 			}

// 			elem._lazyRace = true;
// 			isLoading++;

// 			lazyUnveil(elem, detail, isAuto, sizes, isImg);
// 		};

// 		var afterScroll = debounce(function(){
// 			lazySizesCfg.loadMode = 3;
// 			throttledCheckElements();
// 		});

// 		var altLoadmodeScrollListner = function(){
// 			if(lazySizesCfg.loadMode == 3){
// 				lazySizesCfg.loadMode = 2;
// 			}
// 			afterScroll();
// 		};

// 		var onload = function(){
// 			if(isCompleted){return;}
// 			if(Date.now() - started < 999){
// 				setTimeout(onload, 999);
// 				return;
// 			}


// 			isCompleted = true;

// 			lazySizesCfg.loadMode = 3;

// 			throttledCheckElements();

// 			addEventListener('scroll', altLoadmodeScrollListner, true);
// 		};

// 		return {
// 			_: function(){
// 				started = Date.now();

// 				lazysizes.elements = document.getElementsByClassName(lazySizesCfg.lazyClass);
// 				preloadElems = document.getElementsByClassName(lazySizesCfg.lazyClass + ' ' + lazySizesCfg.preloadClass);

// 				addEventListener('scroll', throttledCheckElements, true);

// 				addEventListener('resize', throttledCheckElements, true);

// 				addEventListener('pageshow', function (e) {
// 					if (e.persisted) {
// 						var loadingElements = document.querySelectorAll('.' + lazySizesCfg.loadingClass);

// 						if (loadingElements.length && loadingElements.forEach) {
// 							requestAnimationFrame(function () {
// 								loadingElements.forEach( function (img) {
// 									if (img.complete) {
// 										unveilElement(img);
// 									}
// 								});
// 							});
// 						}
// 					}
// 				});

// 				if(window.MutationObserver){
// 					new MutationObserver( throttledCheckElements ).observe( docElem, {childList: true, subtree: true, attributes: true} );
// 				} else {
// 					docElem[_addEventListener]('DOMNodeInserted', throttledCheckElements, true);
// 					docElem[_addEventListener]('DOMAttrModified', throttledCheckElements, true);
// 					setInterval(throttledCheckElements, 999);
// 				}

// 				addEventListener('hashchange', throttledCheckElements, true);

// 				//, 'fullscreenchange'
// 				['focus', 'mouseover', 'click', 'load', 'transitionend', 'animationend'].forEach(function(name){
// 					document[_addEventListener](name, throttledCheckElements, true);
// 				});

// 				if((/d$|^c/.test(document.readyState))){
// 					onload();
// 				} else {
// 					addEventListener('load', onload);
// 					document[_addEventListener]('DOMContentLoaded', throttledCheckElements);
// 					setTimeout(onload, 20000);
// 				}

// 				if(lazysizes.elements.length){
// 					checkElements();
// 					rAF._lsFlush();
// 				} else {
// 					throttledCheckElements();
// 				}
// 			},
// 			checkElems: throttledCheckElements,
// 			unveil: unveilElement,
// 			_aLSL: altLoadmodeScrollListner,
// 		};
// 	})();


// 	var autoSizer = (function(){
// 		var autosizesElems;

// 		var sizeElement = rAFIt(function(elem, parent, event, width){
// 			var sources, i, len;
// 			elem._lazysizesWidth = width;
// 			width += 'px';

// 			elem.setAttribute('sizes', width);

// 			if(regPicture.test(parent.nodeName || '')){
// 				sources = parent.getElementsByTagName('source');
// 				for(i = 0, len = sources.length; i < len; i++){
// 					sources[i].setAttribute('sizes', width);
// 				}
// 			}

// 			if(!event.detail.dataAttr){
// 				updatePolyfill(elem, event.detail);
// 			}
// 		});
// 		var getSizeElement = function (elem, dataAttr, width){
// 			var event;
// 			var parent = elem.parentNode;

// 			if(parent){
// 				width = getWidth(elem, parent, width);
// 				event = triggerEvent(elem, 'lazybeforesizes', {width: width, dataAttr: !!dataAttr});

// 				if(!event.defaultPrevented){
// 					width = event.detail.width;

// 					if(width && width !== elem._lazysizesWidth){
// 						sizeElement(elem, parent, event, width);
// 					}
// 				}
// 			}
// 		};

// 		var updateElementsSizes = function(){
// 			var i;
// 			var len = autosizesElems.length;
// 			if(len){
// 				i = 0;

// 				for(; i < len; i++){
// 					getSizeElement(autosizesElems[i]);
// 				}
// 			}
// 		};

// 		var debouncedUpdateElementsSizes = debounce(updateElementsSizes);

// 		return {
// 			_: function(){
// 				autosizesElems = document.getElementsByClassName(lazySizesCfg.autosizesClass);
// 				addEventListener('resize', debouncedUpdateElementsSizes);
// 			},
// 			checkElems: debouncedUpdateElementsSizes,
// 			updateElem: getSizeElement
// 		};
// 	})();

// 	var init = function(){
// 		if(!init.i && document.getElementsByClassName){
// 			init.i = true;
// 			autoSizer._();
// 			loader._();
// 		}
// 	};

// 	setTimeout(function(){
// 		if(lazySizesCfg.init){
// 			init();
// 		}
// 	});

// 	lazysizes = {
// 		cfg: lazySizesCfg,
// 		autoSizer: autoSizer,
// 		loader: loader,
// 		init: init,
// 		uP: updatePolyfill,
// 		aC: addClass,
// 		rC: removeClass,
// 		hC: hasClass,
// 		fire: triggerEvent,
// 		gW: getWidth,
// 		rAF: rAF,
// 	};

// 	return lazysizes;
// }
// ));