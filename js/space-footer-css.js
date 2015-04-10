//2014“暑假班”JS公用库

function loadJS(filename){
	for (var i = 0; i < filename.length; i++) {
		document.write(filename[i]);
	}
}

function getPathUrl()
{
    var curWwwPath=window.document.location.href;
    var pathName=window.document.location.pathname;
    var pos=curWwwPath.indexOf(pathName);
    var localhostPaht=curWwwPath.substring(0,pos);
    var projectName=pathName.substring(0,pathName.substr(1).indexOf('/')+1);
    return (localhostPaht+projectName);
}

var filegroup = [

	//jQuery文件。务必在bootstrap.min.js 之前引入
	"<script type='text/javascript' src='"+getPathUrl()+"/libs/bootstrap/js/jquery.min.js'><\/script>",

	//最新的 Bootstrap 核心 JavaScript 文件
	"<script type='text/javascript' src='"+getPathUrl()+"/libs/bootstrap/js/bootstrap.min.js'><\/script>",
	"<script type='text/javascript' src='"+getPathUrl()+"/libs/bootstrap/js/docs.min.js'><\/script>",

	//angular JS 文件
	"<script type='text/javascript' src='"+getPathUrl()+"/libs/angularjs/js/angular.min.js'><\/script>",

	//select2 JS 文件
	"<script type='text/javascript' src='"+getPathUrl()+"/libs/select2/select2.js'><\/script>",

    
    "<script type='text/javascript' src='"+getPathUrl()+"/libs/Zebra-Dialog/public/javascript/zebra_dialog.js'></script>",
    "<script type='text/javascript' src='"+getPathUrl()+"/libs/Zebra-Dialog/examples/public/javascript/main.js'></script>"
]

loadJS(filegroup);



