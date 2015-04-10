  /*获取path*/
function getPathUrl()
{
    var curWwwPath=window.document.location.href;
    var pathName=window.document.location.pathname;
    var pos=curWwwPath.indexOf(pathName);
    var localhostPaht=curWwwPath.substring(0,pos);
    var projectName=pathName.substring(0,pathName.substr(1).indexOf('/')+1);
    return (localhostPaht+projectName);
}

var iapp = angular.module('iapp', ['ui.router', 'ngAnimate']);

iapp.run(['$rootScope',function($rootScope){
	$rootScope.hasError = false;
	
	//关闭警告窗口 
	$rootScope.close = function()
	{
		$rootScope.hasError = false;
		$rootScope.errors = "";
	};
}]);

iapp.config(function($stateProvider, $urlRouterProvider) {
	 $stateProvider
	    .state('login', {
	      url: '/login',
	      templateUrl: getPathUrl()+'/views/login.html',
	      controller: 'LoginCtl'
	    })
	   .state('step1', {
	      url: '/step1',
	      templateUrl: getPathUrl()+'/views/register1.html',
	      controller: 'OneCtl'
	    })
	     .state('step2', {
	      url: '/step2',
	      templateUrl: getPathUrl()+'/views/register2.html',
	      controller: 'TwoCtl'
	    }) 
	     .state('step3', {
	      url: '/step3',
	      templateUrl: getPathUrl()+'/views/register3.html',
	      controller: 'ThreeCtl'
	    }) 
	     .state('step4', {
	      url: '/step4',
	      templateUrl: getPathUrl()+'/views/register4.html',
	      controller: 'EndCtl'
	    });
	 
	 	$urlRouterProvider.otherwise("/login");
});


//注册模块
iapp.controller('LoginCtl', ['$scope','$state','$http',function($scope, $state,$http) {
	$scope.register = function(){
		$state.go('step1',{});
	};
	
	$scope.user = {account:'',password:''};
	$scope.login = function(){
		var user = $scope.user;
		if(!user.account)
		{
			$scope.accountError = "请输入用户名";
			return;
		}
		
		if(!user.password)
		{
			$scope.passwordError = "请输入密码";
			return;
		}
		
		$scope.accountError = '';
		$scope.passwordError = '';
		
		var url = getPathUrl() + "/login";
		$http({
			url:url,
			method:'POST',
			params:user
		})
		.success(function(data){
			if(data.status !== '99')
			{
				$scope.errors = data.msg;
			}
			else
			{
				window.location =  getPathUrl() + '/sys/home/main';
			}
		});
	}
}]);

//one 选择类型
iapp.controller('OneCtl', ['$scope','$rootScope','$state',function($scope,$rootScope,$state) {
	
	$scope.chooseType = function(type){
		var user = $rootScope.user;
		if(!user){
			$rootScope.user = {account:'',nickname:'',password:'',repassword:''}
		}
		
		$rootScope.user.type = type;
		localStorage.type = type;
		$state.go('step2',{});
	}
	
}]);

//two
iapp.controller('TwoCtl', ['$scope','$rootScope','$state','$http',function($scope,$rootScope,$state,$http) {
	
	if(!$rootScope.user)
	{
		$state.go('step1');
		return;
	}
	
	$scope.yesbool = true;
	$scope.accountError = "";
	$scope.nicknameError = "";
	$scope.passwordError = "";
	$scope.repasswordError = "";
	
	$scope.checkAccount = function(){
		var user = $rootScope.user;
		var account = user.account;
		if(account.length < 6)
		{
			$scope.accountError = "用户名长度小于6位"
			return;
		}
		
		var url = getPathUrl() + "/reg/checkAccount";
		$http({
			url:url,
			method:'post',
			params:{account:user.account},
			cache:true
		})
		.success(function(data, status){
			if(data == 'true')
			{
				$scope.accountError = "该用户名已存在请重新输入一个";
			}
		})
		.error(function(data, status){
		});
		$scope.accountError = "";
	}
	
	$scope.checkNickName = function()
	{
		var user = $rootScope.user;
		var nickname = user.nickname;
		if(!nickname)
		{
			$scope.nicknameError = "请输入一个昵称"
			return;
		}
		
		$scope.nicknameError = "";
	}
	
	$scope.checkPassword = function()
	{
		var user = $rootScope.user;
		var password = user.password;
		if(password.length < 6)
		{
			$scope.passwordError = "密码长度小于6位"
			return;
		}
		
		$scope.passwordError = "";
	}
	
	$scope.checkRePassword = function(){
		var user = $rootScope.user;
		var repassword = user.repassword;
		var password = user.password;
		if(password !== repassword)
		{
			$scope.repasswordError = "俩次密码不一致请重新输入"
			return;
		}
		$scope.repasswordError = "";
	}
	
	$scope.createAccount = function()
	{
		$scope.checkAccount();
		$scope.checkNickName();
		$scope.checkPassword();
		$scope.checkRePassword();
		
		var accountError = $scope.accountError;
		var nicknameError = $scope.nicknameError;
		var passwordError = $scope.passwordError;
		var repasswordError = $scope.repasswordError;
		
		if(!accountError && !nicknameError && !passwordError && !repasswordError)
		{
			var user = $rootScope.user;
			
			var url = getPathUrl() + "/reg/createAccount";
			var params = {
					userType:user.type,
					account:user.account,
					nickName:user.nickname,
					password:user.password,
					repassword:user.repassword};
			$http({
				url:url,
				method:'POST',
				params:params,
				headers: {'Content-Type': 'application/x-www-form-urlencoded'}
			})
			.success(function(data, status){
				if(data.status !== '99')
				{
					//错误信息打印
				}
				else
				{
					$state.go('step3');
				}
			})
			.error(function(data, status){
			});
		}
	}
}]);

//end
iapp.controller('EndCtl', ['$scope','$rootScope','$state',function($scope,$rootScope,$state) {
	if($rootScope.user)
	{
		$rootScope.user.account = '';
		$rootScope.user.password = '';
		$rootScope.user.nickname = '';
		$rootScope.user.repassword = '';
	}
}]);
