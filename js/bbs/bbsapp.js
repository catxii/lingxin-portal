function getPathUrl()
{
    var curWwwPath=window.document.location.href;
    var pathName=window.document.location.pathname;
    var pos=curWwwPath.indexOf(pathName);
    var localhostPaht=curWwwPath.substring(0,pos);
    var projectName=pathName.substring(0,pathName.substr(1).indexOf('/')+1);
    return (localhostPaht+projectName);
}


var app =angular.module('bbsApp', []);

app.controller('bbsController', function($scope, $http, $sce) {
	
	$scope.queryModule = function() {
		$http({
			url : getPathUrl()+"/bbs/module/moduleTree",
			method : 'POST'
		}).success(function(data){
			$scope.ModuleList = data;
		}).error(function(data){
			alert("查询失败");
		});
	};
	
	/* 查询所有帖子 */
	$scope.queryAllTopic = function() {
		$http({
			url : getPathUrl() +'/bbs/module/findAllTopic',
			method : 'POST'
		}).success(function(paginator) {
			$scope.TopicList = paginator.rows;
			$scope.total = paginator.total;//总记录数
			var html = parsePageHtml(paginator);//分页栏
			$scope.paginator = $sce.trustAsHtml(html);
		}).error(function(data){
			alert("查询失败");
		})
	};
	
	
	$scope.queryTopTopic = function() {
		$http({
			url : getPathUrl() + '/bbs/module/findTopTopic',
			method: 'POST'
		}).success(function(data) {
			$scope.TopTopicList = data;
		}).error(function(data) {
			alert("查询失败");
		})
	}
	
	$scope.queryEliteTopic = function() {
		$http({
			url : getPathUrl() + '/bbs/module/findEliteTopic',
			method : 'POST'
		}).success(function(data) {
			$scope.EliteTopic = data;
		}).error(function(data) {
			alert("查询失败");
		})
	}
	
	$scope.queryModule();
	
	$scope.queryAllTopic();
	
	$scope.queryTopTopic();
	
	$scope.queryEliteTopic();
	
	/* 查询帖子 */
	$scope.queryTopic = function(moduleId, moduleTwoId) {
		
		$scope.moduleOneValue = moduleId;
		
		$scope.moduleTwoValue = moduleTwoId;
		
		var pageNum = 1;
		
		var data = {"moduleId":moduleId, "moduleTwoId":moduleTwoId, "pageNum" : pageNum};
		
		$http({
			url : getPathUrl()+ "/bbs/module/findTopic",
			method : 'POST',
			params : data
		}).success(function(paginator){
			$scope.TopicList = paginator.rows;
			$scope.total = paginator.total;//总记录数
			var html = parsePageHtml(paginator);//分页栏
			$scope.paginator = $sce.trustAsHtml(html);
		}).error(function(data){
			alert("查询失败");
		});
	};
	
	$scope.myTopic = function() {
		var pageNum = $("#pageNum").val();
		
		var data = {"pageNum" : pageNum};
		
		$http({
			url : getPathUrl()+ "/bbs/module/myTopic",
			method : 'POST',
			params : data
		}).success(function(paginator){
			$scope.TopicList = paginator.rows;
			$scope.visPaginator = 1;
			$scope.total = paginator.total;//总记录数
			var html = parsePageHtml(paginator);//分页栏
			$scope.myPaginator = $sce.trustAsHtml(html);
		}).error(function(data){
			alert("查询失败");
		});
		
	};
	
	
	/* 分页查询 */
	$scope.querybypage = function() {
		
		var moduleOneId = $("#moduleOneId").val();
		
		var moduleTwoId = $("#moduleTwoId").val();
		
		var pageNum = $("#pageNum").val();
		
		var data = {"moduleId":moduleOneId, "moduleTwoId":moduleTwoId, "pageNum" : pageNum};
		
		$http({
			url : getPathUrl() + "/bbs/module/findTopic",
			method : 'POST',
			params : data
		}).success(function(paginator){
			$scope.TopicList = paginator.rows;
			$scope.total = paginator.total;//总记录数
			var html = parsePageHtml(paginator);//分页栏
			$scope.paginator = $sce.trustAsHtml(html);
		}).error(function(data){
			alert("查询失败");
		});
	};
	
	
});



/* 页面JS */
function goTopEx() {
	var obj = document.getElementById("goTopBtn");

	function getScrollTop() {
		return document.documentElement.scrollTop;
	}

	function setScrollTop(value) {
		document.documentElement.scrollTop = value;
	}
	window.onscroll = function() {
		getScrollTop() > 0 ? obj.style.display = "" : obj.style.display = "none";
	}
	obj.onclick = function() {
		var goTop = setInterval(scrollMove, 10);

		function scrollMove() {
			setScrollTop(getScrollTop() / 1.1);
			if (getScrollTop() < 1) clearInterval(goTop);
		}
	}
}
goTopEx();

$(document).ready(function() {

	$(".sidel ul li").hover(function() {
		$(this).find(".sidebox").stop().animate({
			"width": "124px"
		}, 200).css({
			"opacity": "1",
			"filter": "Alpha(opacity=100)",
			"background": "#24D665"
		})
	}, function() {
		$(this).find(".sidebox").stop().animate({
			"width": "54px"
		}, 200).css({
			"opacity": "0.8",
			"filter": "Alpha(opacity=80)",
			"background": "#ccc"
		})
	});

});

 //回到顶部
function goTop() {
	$('html,body').animate({
		'scrollTop': 0
	}, 500);
}

marqueeStart(1, "left");

marqueeStart(2, "up");


