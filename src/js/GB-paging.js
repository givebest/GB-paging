/**
* GB-paging.js
* @class gbPaging
* @see https://github.com/givebest/GB-paging
* @author givenlovs@msn.com
* @(c) 2016
**/

(function() {

	var $,
	defaultConfig,
	paging = null,
	args;

	/**
   * [defaultConfig 默认配置]
   * @type {Object}
   */
  defaultConfig = {
    eventType: 'link',
    curPage: 1,             //当前页           
    size: 10,                        //每页n条
    paramName: 'p',                  //页码参数
    prevText: '上一页',
    nextText: '下一页',
    pageInfo: '当前第<b>{{currentPage}}</b>页/共<b>{{totalPages}}</b>页'
  }

	/**
	 * [$ description]
	 * @param  {String} id 
	 * @return {Object} HTML   [HTML element]
	 */
	$ = function(id) {
		return document.getElementById(id);
	}

	function GbPaging() {	
		if (!(this instanceof GbPaging)) return new GbPaging();
	}

	GbPaging.prototype.init = function(opts) {
		this.getParams(opts);
		this.build();
		this.events();
	}

	GbPaging.prototype.getParams = function(opts) {
		args = this.opts = opts || {};
		// _this = this;

    if ($(args.eleId)) {
      args.container = $(args.eleId);
    } else if ($('gbpaging')) {
      args.container = $('gbpaging');
    } else {
      return;
    }

    args.eventType = args.eventType || defaultConfig.eventType;
    args.total = args.total || 0;
    args.curPage = args.curPage || defaultConfig.curPage;
    args.size = args.size || defaultConfig.size;
    args.paramName = args.paramName || defaultConfig.paramName;
    args.goUrl = args.goUrl || '';
    args.pages = Math.ceil(args.total / args.size || 0);
    args.isPrev = (args.prevText !== false) ? true : false;
    args.prevText = args.prevText || defaultConfig.prevText;
    args.isNext = (args.nextText !== false) ? true : false;
    args.nextText = args.nextText || defaultConfig.nextText;
    args.isPageInfo = (args.pageInfo !== false) ? true : false;
    args.pageInfo = args.pageInfo || defaultConfig.pageInfo;
	}

	/**
	 * [分页html]
	 * @return {[type]} [description]
	 */
	GbPaging.prototype.build = function() {
		var html = [];
		// console.log('build', args)

		// 没有数据
    if (args.pages <= 1) {
      addClass(args.container, 'gb-hide');
      return;
    }

    if (args.curPage >>> 0 <= 0) return;

    var ii = (args.curPage == 1 || args.curPage == args.pages) ? 3 : 2;
    var urlParam = parseUrl(args.goUrl, args.paramName);

    html.push('<a href="'+ urlParam + args.curPage +'" class="gb-paging-current">' + args.curPage + '</a>');

    for (var i = 1; i < ii; i++) {
      if (args.curPage - i > 1) {
        html.unshift('<a href="'+ urlParam + (args.curPage - i) +'">' + (args.curPage - i) + '</a>');
      }

      if (args.curPage + i < args.pages) {
        html.push('<a href="'+ urlParam + (args.curPage + i) +'">' + (args.curPage + i) + '</a>');
      }
    }

    if (args.curPage - 2 > 1) {
      html.unshift('<span class="gb-paging-ellipsis">...</span>');
    }

    if (args.curPage > 1) {
      html.unshift('<a href="'+ urlParam +'1">1</a>');
      args.isPrev && html.unshift('<a href="'+ urlParam + (args.curPage - 1) +'">' + args.prevText + '</a>');
    } else {
      args.isPrev && html.unshift('<a class="disabled">' + args.prevText + '</a>');
    }

    if (args.curPage + 2 < args.pages) {
      html.push('<span class="gb-paging-ellipsis">...</span>');
    }

    if (args.curPage < args.pages) {
      html.push('<a href="'+ urlParam + args.pages +'">' + args.pages + '</a>');
      args.isNext && html.push('<a href="'+ urlParam + (args.curPage + 1) +'">' + args.nextText + '</a>');
    } else {
      args.isNext && html.push('<a class="disabled">' + args.nextText + '</a>');
    }

    // 是否显示右侧分页信息
    if (args.isPageInfo) html.push('<div class="gb-paging-info">' + args.pageInfo.replace('{{currentPage}}', args.curPage).replace('{{totalPages}}', args.pages) + '</div>');

    args.container.innerHTML = html.join('');
	}

	/**
	 * [绑定事件]
	 * @return {[type]} [description]
	 */
	GbPaging.prototype.events = function() {
		var _this = this;

		if (args.eventType !== 'click') return;
    bind(args.container, 'click', function(e) {
      e = e || window.event;
      e.preventDefault ? e.preventDefault() : e.returnValue = false;
      args = _this.opts;

      // console.log('events', _this.opts);

      var target = e.target || e.srcElement;
      if (target.tagName.toLowerCase() === 'a' && !hasClass(target, 'disabled')) {
        args.curPage = target.getAttribute('href').replace(parseUrl(args.goUrl, args.paramName), '');
        if (args.curPage >>> 0 === 0) args.curPage = args.curPage.replace(window.location.href, '');
        args.curPage = parseInt(args.curPage);
        
        _this.build();  
      }
    });
	}

	/**
	 * [解释URL]
	 * @param  {[String]} url   [description]
	 * @param  {[String]} param [description]
	 * @return {[String]}       [description]
	 */
	function parseUrl(url, param) {
    if (url) {
      return url.replace('{{n}}', param + '=');
    } else {
      return '#' + param + '=';
    }
  }

	/**
	* Bind events to elements 
	* @param {Object}    ele    HTML Object
	* @param {Event}     event  Event to detach 
	* @param {Function}  fn     Callback function 
	*/
	function bind(ele, event, fn) {
		if (typeof addEventListener === 'function') {
		ele.addEventListener(event, fn, false);
		}  else if (ele.attachEvent) {
		ele.attachEvent('on' + event, fn);   
		}  
	}

	/**
	* Unbind events to elements
	* @param {Object}    ele    HTML Object
	* @param {Event}     event  Event to detach 
	* @param {Function}  fn     Callback function 
	*/
/*	function unbind(ele, event, fn) {
		if (typeof removeEventListener === 'function') {
		  ele.removeEventListener(event, fn, false);
		} else if (ele.detachEvent) {
		  ele.detach('on' + event, fn);
		}
	}*/


	/**
	* hasClass
	* @param {Object} ele   HTML Object
	* @param {String} cls   className
	* @return {Boolean}
	*/
	function hasClass(ele, cls) {
		if (!ele || !cls) return false;
		if (ele.classList) {
		  return ele.classList.contains(cls);  
		} else {
		  return ele.className.match(new RegExp('(\\s|^)' + cls + '(\\s|$)'));
		}
	}

	/**
	* [addClass description]
	* @param {Object} ele [HTML Object]
	* @param {String} cls [className]
	*/
	function addClass(ele, cls) {
		if (ele.classList) {
		  ele.classList.add(cls);
		} else {
		  if (!hasClass(ele, cls)) ele.className += '' + cls; 
		}
	}

	/**
	* [removeClass description]
	* @param  {Object} ele [HTML Object]
	* @param  {String} cls [className]
	*/
/*	function removeClass(ele, cls) {
		if (ele.classList) {
		  ele.classList.remove(cls);
		} else {
		  ele.className = ele.className.replace(new RegExp('(^|\\b)' + className.split(' ').join('|') + '(\\b|$)', 'gi'), ' ');
		}
	}*/


	if (window.gbPaging === undefined) {
		window.gbPaging = function (opts) {
			paging = GbPaging();
			return paging.init(opts); 
		}
	}


	// AMD (@see https://github.com/jashkenas/underscore/blob/master/underscore.js)
	if (typeof define == 'function' && define.amd) {
	  define('GB-paging', [], function() {
	    return gbPaging;
	  });
	}

}());