var homePageActive = '<li><a href="javascript:selectPage(1)" title="首页">首页</a></li>';
var homePageDisable = '<li class="disabled"><span>首页</span></li>';
var prevPageActive = '<li><a href="javascript:selectPage({pageNum})" title="上一页">«</a></li>';
var prevPageDisable = '<li class="disabled"><span>«</span></li>';
var nextPageActive = '<li><a href="javascript:selectPage({pageNum})" title="下一页">»</a></li>';
var nextPageDisable = '<li class="disabled"><span>»</span></li>';
var lastPageActive = '<li><a href="javascript:selectPage({pageNum})" title="末页">末页</a></li>';
var lastPageDisable = '<li class="disabled"><span>末页</span></li>';
var nodePage = '<li class="{class}"><a href="javascript:selectPage({pageNumber})">{pageNum}</a></li>';

var parsePageHtml = function(paginator) {
	var html = '';
	var pageFactor = 5;// 导航栏分页因子
	var pageNumber = paginator.pageNumber;// 当前页码
	var pageTotal = paginator.pageTotal;// 总页数
	var totalRecord = paginator.rows.length;
	var totalNav = pageTotal % pageFactor > 0 ? parseInt(pageTotal
			/ pageFactor) + 1 : parseInt(pageTotal / pageFactor);// 导航栏总页数

	if (pageTotal === 1 || totalRecord === 0) {
		return html;
	}
	
	//导航栏第一页
	if (pageNumber <= pageFactor) {
		html += homePageDisable + prevPageDisable;
		var canNext = totalNav > 1;

		page = pageFactor > pageTotal ? pageTotal : pageFactor;
		for (var i = 1; i <= page; i++) {
			var node = '';
			if (pageNumber === i) {
				node = nodePage.replace('{pageNum}', i).replace(
						'{pageNumber}', i).replace('{class}', 'active');
			} else {
				node = nodePage.replace('{pageNum}', i).replace(
						'{pageNumber}', i).replace('{class}', '');
			}
			html += node;
		}

		if (canNext) {
			html += nextPageActive.replace('{pageNum}', pageFactor + 1)
					+ lastPageActive.replace('{pageNum}', pageTotal);
		} else {
			html += nextPageDisable + lastPageDisable;
		}
	}
	//导航栏最后一页
	else if (pageNumber > (totalNav - 1) * pageFactor) {
		var canPrev = totalNav > 1;
		if (canPrev) {
			html += homePageActive
					+ prevPageActive.replace('{pageNum}',
							(totalNav - 1) * pageFactor);
		} else {
			html += homePageDisable + prevPageDisable;
		}

		for (var i = (totalNav - 1) * pageFactor + 1; i <= pageTotal; i++) {
			var node = '';
			if (pageNumber === i) {
				node = nodePage.replace('{pageNum}', i).replace(
						'{pageNumber}', i).replace('{class}', 'active');
			} else {
				node = nodePage.replace('{pageNum}', i).replace(
						'{pageNumber}', i).replace('{class}', '');
			}
			html += node;
		}

		html += nextPageDisable + lastPageDisable;
	}
	//导航栏中间某一页
	else {
		var start = parseInt((pageNumber - 1) / pageFactor);
		html += homePageActive
				+ prevPageActive.replace('{pageNum}', start
						* pageFactor);

		for (var i = start * pageFactor + 1; i <= (start + 1)
				* pageFactor; i++) {
			var node = '';
			if (pageNumber === i) {
				node = nodePage.replace('{pageNum}', i).replace(
						'{pageNumber}', i).replace('{class}', 'active');
			} else {
				node = nodePage.replace('{pageNum}', i).replace(
						'{pageNumber}', i).replace('{class}', '');
			}
			html += node;
		}

		html += nextPageActive.replace('{pageNum}', (start + 1)
				* pageFactor + 1)
				+ lastPageActive.replace('{pageNum}', pageTotal);
	}

	return html;
};

var selectPage = function (pageNumber) {
	$('#pageNum').val(pageNumber);
	$('#pageNum').click();
};
