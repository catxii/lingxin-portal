var app =angular.module('shouyeApp', []);

app.controller('shouyeController', function($scope, $http) {
	
	$scope.user = {account:'',password:''};
	
	$scope.login = function() {
		
		var url = getPathUrl() + "/login";
		
		var user = $scope.user;
		
		$scope.accountError = '';
		$scope.passwordError = '';
		
		if(!user.account)
		{
			$scope.accountError = "请输入用户名";
			return;
		}
		if(!user.password)
		{
			$scope.passwordError = "请输入密码";
			alert("password");
			return;
		}
		$http({
			url : url,
			method : 'POST',
			params:user,
		}).success(function(data){
			if(data.status !== '99')
			{
				$scope.errors = data.msg;
			}
			else
			{
				alert('登陆成功');
				//跳转到xx首页
				window.location = getPathUrl() + '/sys/home/loginsuccess';
				
			}
		});
		
	};
	
});
