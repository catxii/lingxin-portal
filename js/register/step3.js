//three
iapp.controller('ThreeCtl', ['$scope','$rootScope','$state','$http','$timeout',function($scope,$rootScope,$state,$http,$timeout) {
	$scope.sex = '0';
	$scope.idno = '';
	$scope.realName = '';
	$scope.schoolid="0";
	$scope.gradeid="0";
	$scope.classid="0";
	$scope.mobileNo= '';
	$scope.disableDiv = false;
	$scope.addNbs = ["1"];
	$scope.sendMsg = false;
	$scope.showPassword = false;
	$scope.oldpassword = '';
	$scope.schoolid = '';
	$scope.gradeid = '';
	$scope.classid = '';
	$scope.userName = '';
	
	$scope.UserNameError = '';
	$scope.schoolError = '';
	$scope.classError = '';
	$scope.oldpasswordError = '';
	$scope.idnoError = '';
	$scope.mobileNoError = '';
	$scope.codeError = '';
	
	$scope.idnoTips = '';
	
	$scope.idnos = [];
	$scope.realNames = [];
	$scope.idnosError = [];
	$scope.realNamesError = [];
	$scope.pmobiles = [];
	$scope.pmobilesError = [];
	
	querySchoolList = function()
	{
		if(!$rootScope.user)
		{
			$state.go('step1');
			return;
		}
		
		if(!$rootScope.user.account || !$rootScope.user.password)
		{
			$state.go('step2');
			return;
		}
		
		var type = $rootScope.user.type;
		
		var url = getPathUrl() + "/regBind/querySchoolList";
		$http({
			url:url,
			method:'GET',
			params:{userType:type},
			cache:true
		})
		.success(function(data){
			$scope.schoolData = data;
		});
		
	};
	
   //查询年级信息
	queryGradeList = function(schoolId)
	{
		var url = getPathUrl() + "/regBind/queryGradeList";
		$http({
			url:url,
			method:'GET',
			params:{schoolId:schoolId},
			cache:true
		})
		.success(function(data){
			$scope.gradeData = data;
		});
	};
	
	//验证密码是否匹配
	$scope.matchPassInfo = function()
	{
		var password = $scope.oldpassword;
		if(!password)
		{
			$scope.oldpasswordError = '原始密码不能为空!';
			return;
		}
		$scope.oldpasswordError = '';
		
		$scope.getIDCardInfo();
		if($scope.idnoError)
		{
			return ;
		}
		
		var idCardNo = $scope.idno;
		
		var url = getPathUrl() + "/regBind/matchPassInfo";
		$http({
			url:url,
			method:'POST',
			params:{idCardNo:idCardNo,password:password},
			cache:true
		})
		.success(function(data){
		});
	}
	
	//查询班级信息
	queryClassList = function(schoolId, gradeId)
	{
		var url = getPathUrl() + "/regBind/queryClassList";
		$http({
			url:url,
			method:'GET',
			params:{schoolId:schoolId,gradeId:gradeId},
			cache:true
		})
		.success(function(data){
			$scope.classData = data;
		});
	};
	
	querySchoolList();
	
	//添加一个信息
	$scope.add = function()
	{
		$scope.addNbs.push(($scope.addNbs.length+1).toString());
	};
	
	//添加一个信息
	$scope.cut = function(index)
	{
		$scope.addNbs.splice(index, 1);
	};
	
	//获取身份证信息
	$scope.getIDCardInfo = function(){
		var idcardno = $scope.idno;
		
		if(!idcardno)
		{
			$scope.idnoError = "身份证号码不能为空";
			return;
		}
		//1.验证身份证是否符合规则
		var isRight = isCardNo(idcardno);
		
		if(!isRight)
		{
			$scope.idnoError = "身份证号码格式不正确";
			return ;
		}
		
		$scope.idnoError = '';
		$scope.idnoTips = "";
		$scope.disableDiv = false;
		//2.调用后台获取身份证信息
		var url = getPathUrl() + '/regBind/getIDCardNoInfo';
		
		$http({
			url:url,
			method:'POST',
			params:{idCardNo:idcardno}
		})
		.success(function(data){
			//为新用户
			if('99' === data.status)
			{
				$scope.idnoTips = "该身份证已签约，只需输入正确姓名进行匹配即可完成绑定!";
				$scope.disableDiv = true;
			}
			//已绑定其他用户
			else if('9902' === data.status)
			{
				$scope.idnoError = '该身份证已被其他账号绑定,请重新输入一个进行绑定!';
				$scope.disableDiv = true;
			}
			//输入密码再次绑定
			else if('9903' === data.status)
			{
				$scope.idnoTips = '该身份证在别处已登陆,请输入原始密码校验后再进行绑定!';
				$scope.disableDiv = true;
				$scope.showPassword = true;
			}
			
		});
	};
	
	//检车userName是不是合法
	$scope.checkUserName = function()
	{
		var userName = $scope.userName;
		if(!userName)
		{
			$scope.userNameError = '您的姓名不能为空';
			return;
		}
		$scope.userNameError = '';
		
	};
	
	//获取信息
	$scope.getIDCardInfoArray = function(index){
		var idcardno = $scope.idnos[index];
		
		if(!idcardno)
		{
			$scope.idnosError[index] = "身份证号码不能为空";
			return;
		}
		//1.验证身份证是否符合规则
		var isRight = isCardNo(idcardno);
		
		if(!isRight)
		{
			$scope.idnosError[index] = "身份证号码格式不正确";
			return ;
		}
		
		$scope.idnosError[index] = '';
		//2.调用后台获取身份证信息
		var url = getPathUrl() + '/regBind/getIDCardNoInfo';
		
		$http({
			url:url,
			method:'POST',
			params:{idCardNo:idcardno}
		})
		.success(function(data){
			//已绑定其他用户
			if('99' === data.status)
			{
				
			}
			else if('9902' === data.status)
			{
			}
			//输入密码再次绑定
			else if('9903' === data.status)
			{
			}
			else
			{
				$scope.idnosError[index] = '该身份证查找不到相应数据！';
			}
			
		});
	};
	
	
	//匹配身份证信息和姓名是否匹配
	$scope.matchInfoArray = function(index){
		var idno = $scope.idnos[index];
		var name = $scope.realNames[index];
		
		if(!name)
		{
			$scope.realNamesError[index] = '请输入真实姓名完成匹配后再进行绑定';
			return;
		}
		
		$scope.realNamesError[index] = '';
		
		var url = getPathUrl() + '/regBind/checkIDCardInfo';
		
		$http({
			url:url,
			method:'POST',
			params:{idCardNo:idno,name:name}
		})
		.success(function(data){
			//为新用户
			if('99' !== data.status)
			{
				$scope.realNamesError[index] = '对不起，输入的姓名与系统记录的姓名不匹配无法进行绑定！';
			}
		});
	};
	
	//匹配身份证信息和姓名是否匹配
	$scope.matchInfo = function(){
		var idno = $scope.idno;
		var name = $scope.realName;
		
		if(!name)
		{
			if($scope.disableDiv)
				$scope.realNameError = '请输入真实姓名完成匹配后再进行绑定';
			else
				$scope.realNameError = '请输入真实姓名';
			return;
		}
		
		$scope.realNameError = '';
		//如果不是控制中的情况不请求后台
		if(!$scope.disableDiv)
		{
			return;
		}
		
		var url = getPathUrl() + '/regBind/checkIDCardInfo';
		
		$http({
			url:url,
			method:'POST',
			params:{idCardNo:idno,name:name}
		})
		.success(function(data){
			//为新用户
			if('99' !== data.status)
			{
				$scope.realNameError = '对不起，输入的姓名与系统记录的姓名不匹配无法进行绑定！';
			}
		});
	}
	
	//验证身份证号码是否符合规则
	isCardNo = function(card)  
	{  
	   //身份证号码为15位或者18位，15位时全为数字，18位前17位为数字，最后一位是校验位，可能为数字或字符X  
	   var reg = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;  
	   if(reg.test(card) === false)  
	   {  
	       return  false;  
	   }
	   return true;
	};
	$scope.checkMobile = function()
	{
		var mobileNo =  $scope.mobileNo;
		if(!mobileNo)
		{
			$scope.mobileNoError = '手机号码不能为空!';
			return;
		}
		
		if(!checkMobileNo(mobileNo))
		{
			$scope.mobileNoError = '请输入正确的手机格式';
			return;
		}
		
		$scope.mobileNoError = '';
	}
	
	$scope.sendSMS = function()
	{
		$scope.checkMobile();
		$scope.matchInfo();
		
		var mobileNo = $scope.mobileNo;
		
		if(!$scope.mobileNoError)
		{
			var url = getPathUrl() + "/regBind/sendSMS";
			
			$http({
				url : url ,
				method:'post',
				params:{mobileNo:mobileNo}
			})
			.success(function(data){
				if('99' !== data.status)
				{
					$scope.mobileNoError = data.msg;
				}
				else
				{
					$scope.sendMsg = true;

					$timeout(function(){
						$scope.sendMsg = false;
					}, 300000);
				}
			});
		}
	};
	
	$scope.checkCode = function()
	{
		var code =  $scope.code;
		if(!code)
		{
			$scope.codeError = '验证码不能为空!';
			return;
		}
		$scope.codeError = '';
		$scope.checkMobile();
		var mobileNo = $scope.mobileNo;
		if($scope.mobileNoError)
		{
			return ;
		}
		var url = getPathUrl() + "/regBind/vlidateSMS";
		$http({
			url:url,
			method:'POST',
			params:{mobileNo:mobileNo,code:code}
		})
		.success(function(data){
			if('99' !== data.status)
			{
				$scope.codeError = data.msg;
			}
		});
	};
	
	checkMobileNo = function(mobileNo)
	{
		var reg= /1[3|5|7|8|][0-9]{9}/;
		if(reg.test(mobileNo) === false)
		{
			return false;
		}
		
		return true;
	};
	
	//检查学校
	$scope.checkSchool = function()
	{
		var sid = $scope.schoolid;
		if(!sid)
		{
			$scope.schoolError = '请选择一个学校';
			return ;
		}
		$scope.schoolError ='';
		queryGradeList(sid);
	};
	
	//检查年级
	$scope.checkGrade = function()
	{
		var sid = $scope.schoolid;
		var gid = $scope.gradeid;
		if($scope.schoolError)
		{
			return;
		}
		
		if(!gid)
		{
			$scope.gradeError = '请选择一个年级';
			return ;
		}
		
		$scope.gradeError = '';
		
		queryClassList(sid, gid);
	};
	
	//检查班级
	$scope.checkClass = function()
	{
		if($scope.schoolError || $scope.gradeError){
			return ;
		}
		var cid = $scope.classid;
		if(!cid)
		{
			$scope.classError = '请选择一个班级';
			return ;
		}
		
		$scope.classError = '';
	};
	
	$scope.matchPmobile = function()
	{
		var pmobile = $scope.pmobile;
		if(!pmobile)
		{
			$scope.pmobileError = '预留家长手机号不能为空';
			return;
		}
		
		if(!checkMobileNo(pmobile))
		{
			$scope.pmobileError = '请输入正确的手机格式';
			return;
		}
		
		$scope.pmobileError = '';
	}
	
	$scope.matchPmobileArray = function(index)
	{
		var pmobile = $scope.pmobiles[index];
		var idCardNo = $scope.idnos[index];
		if(!idCardNo)
		{
			$scope.idnosError[index] = '身份证号码不能为空';
			return;
		}
		if(!pmobile)
		{
			$scope.pmobilesError[index] = '预留家长手机号不能为空';
			return;
		}
		
		if(!checkMobileNo(pmobile))
		{
			$scope.pmobilesError[index] = '请输入正确的手机格式';
			return;
		}
		$scope.pmobilesError[index] = '';
		
		var url = getPathUrl() + '/regBind/validatePmobile'
		var params = {idCardNo:idCardNo,mobileNo:pmobile};
		$http({
			url:url,
			method:'POST',
			params:params
		})
		.success(function(data){
			if('99' !== data.status)
			{
				$scope.pmobilesError[index] = data.msg;
			}
		});
	}
	
	//学生、老师绑定
	teacherBind = function(){
		//如果身份证信息已存在告诉用户姓名匹配成功既可以绑定
		$scope.checkMobile();
		$scope.checkCode();
		
		if(!$scope.idno)
		{
			$scope.idnoError = '请输入身份证信息';
		}
		
		if(!$scope.realName)
		{
			$scope.realNameError = '请输入姓名';
		}
		
		if($scope.idnoError || $scope.realNameError || $scope.mobileNoError || $scope.codeError)
		{
			return;
		}
		
		//如果不是签约用户
		if(!$scope.disableDiv)
		{
			var user = $rootScope.user;
			
			//老师
			if (user.type === 1)
			{
				//检查学校是否选中
				$scope.checkSchool();
				if($scope.schoolError)
				{
					return;
				}
			}
			//学生
			else if (user.type === 2)
			{
				//检查学校 年级 班级
				$scope.checkClass();
				if($scope.schoolError || $scope.gradeError || $scope.classError)
				{
					return;
				}
				$scope.matchPmobile();
				if($scope.pmobileError)
				{
					return;
				}
			}
		}
		
		//检查是否需要输入密码
		if($scope.showPassword)
		{
			$scope.matchPassInfo();
			if($scope.oldpasswordError)
			{
				return ;
			}
		}
		var user = $rootScope.user;
		var idcardno = $scope.idno;
		var mobileNo = $scope.mobileNo;
		var code = $scope.code;
		var realName = $scope.realName;
		var oldpassword = $scope.oldpassword;
		var schoolid = $scope.schoolid;
		var classid = $scope.classid;
		var schoolData = $scope.schoolData
		var pmobile = $scope.pmobile;
		var educode = '';
		var schoolName = '';
		var className = '';
		var classData = $scope.classData;
		var sex = $scope.sex;
		//读取educode 和 学校名称
		for(key in schoolData)
		{
			try
			{
				if(schoolData[key].schoolId === schoolid)
				{
					educode = schoolData[key].educode;
					schoolName = schoolData[key].name;
				}
			}catch(e)
			{
			}
		}
		
		//读取班级名称
		for(key in classData)
		{
			try
			{
				if(classData[key].classId === classid)
				{
					className = classData[key].className;
				}
			}catch(e)
			{
			}
		}
		
		var params = {userType:user.type,idCardNo:idcardno,mobileNo:mobileNo,code:code,realName:realName
					  ,oldpassword:oldpassword,account:user.account,password:user.password,name:user.nickname
					  ,schoolId:schoolid,classId:classid,educode:educode,schoolName:schoolName,className:className,sex:sex,pmobile:pmobile};
		
		var url = getPathUrl() + '/regBind/bind'
		$http({
			url:url,
			method:'POST',
			params:params,
		})
		.success(function(data){
			if('99' !== data.status)
			{
				$rootScope.hashError = true;
				$rootScope.errors = data.msg;
			}
			else
			{
				//完成注册
				$state.go('step4');
			}
			
		});
	};
	
	//家长绑定
	familyBind = function(){
		//输入姓名身份证绑定多个孩子 //班主任审核
		var idnos = $scope.idnos;
		var idnosError = $scope.idnosError;
	    var realNames = $scope.realNames;
	    var realNamesError = $scope.realNamesError;
	    var pmobiles = $scope.pmobiles;
	    var pmobilesError = $scope.pmobilesError;
	    var flag = false;
	    var userName = $scope.userName;
	    $scope.checkUserName();
	    $scope.checkMobile();
		$scope.checkCode();
		if($scope.mobileNoError || $scope.codeError || $scope.userNameError)
		{
			return;
		}
		
		for(var i = 0; i < idnos.length; i++)
		{
			//身份证信息 idnos[i]
			//真实姓名 realNames[i];
			$scope.getIDCardInfoArray(i);
			$scope.matchInfoArray(i);
			$scope.matchPmobileArray(i);
			if(flag || idnosError[i] || realNamesError[i] || pmobilesError[i])
			{
				flag = true;
			}
		}
	
		if(flag)
		{
			return;
		}
		
		var sex = $scope.sex;
	    var mobileNo = $scope.mobileNo;
	    var code = $scope.code;
		var user = $rootScope.user;
	    var params = {userType:user.type,idCardNos:idnos,mobileNos:pmobiles,realNames:realNames,mobileNo:mobileNo,code:code
	    			  ,account:user.account,password:user.password,name:user.nickname,sex:sex, userName:userName}

		var url = getPathUrl() + '/regBind/bind';
		
		$http({
			url:url,
			method:'POST',
			params:params
		})
		.success(function(data){
			if('99' !== data.status)
			{
				$rootScope.hashError = true;
				$rootScope.errors = data.msg;
			}
			else
			{
				//完成注册
				$state.go('step4');
			}
		});
	};
	
	//绑定
	$scope.bind = function(){
		//判断用户类型
		var user = $rootScope.user;
		
		if(user.type === 3)
		{
			//家长
			familyBind();
		}
		else
		{
			//老师、学生
			teacherBind();
		}
	};
}]);