# GB-paging
----

## 简介

兼容IE6+及现代浏览器的简单分页，支持同一页面多个分页。
  

## 使用

### Browser
	
	<link rel="stylesheet" href="css/GB-paging.css">
	<script src="js/GB-paging.js"></script>


### 普通分页

#### HTML
	
	<div id="gbpaging" class="gb-paging">

#### JS

	gbPaging({
	    total: 101,
	    paramName: 'p',
	    curPage: getPage('p', '#'),
	    size: 5,
	    prevText: '<',
	    nextText: '>',
	    pageInfo: '<b>{{currentPage}}</b>/<b>{{totalPages}}</b>',
	    eventType: 'click'
	});


### 同页面另一个分页

#### HTML

	<div id="paging1" class="gb-paging"></div>

#### JS

	gbPaging({
		eleId: 'paging1',
	    total: 54,
	    size: 10,
	    prevText: false,
	    nextText: false,
	    paramName: 'p1',
	    curPage: getPage('p1', '#'),
	    pageInfo: false,
	    eventType: 'click'
	});


### 刷新带参数

#### HTML

	<div id="paging2"  class="gb-paging"></div>

#### JS

	gbPaging({
	    eleId: 'paging2',
	    total: 2500,
	    paramName: 'page',
	    curPage: getPage('page', '?type=1&name=2&'),
	    goUrl: '?type=1&name=2&{{n}}'
	});


### 辅助函数

	function getPage(pname, other){
        var page = window.location.search.replace( other + pname + '=', '') || 1;
        return parseInt(page);
    }


## 选项

- `eleId` 分页容器，仅支持ID，默认为： 'gbpaging'
- `total`: 总记录数      
- `paramName`: 分页参数名 || 'p'
- `curPage`: 当前页码
- `size`:  每页记录数 || 10
- `prevText`:  上一页文案 || '上一页'，值为 false 不显示
- `nextText`: '下一页文案 || '下一页' 值为 false 不显示
- `pageInfo`: 分页信息，{{currentPage}}当前页码，{{totalPages}}总页数 || 当前第<b>{{currentPage}}</b>页/共<b>{{totalPages}}</b>页，值为 false 不显示
- `eventType`: 事件方式，'click' || 'link'
- `goUrl`： 链接URL，'?type=1&name=2&{{n}}' || ''，{{n}}为分页参数名+值，如：'p=1'





## 感谢他们

演示网页排版来自： [https://github.com/sofish/typo.css](https://github.com/sofish/typo.css)       



## License

[MIT](./LICENSE) © 2016 [givebest](https://github.com/givebest)

 
