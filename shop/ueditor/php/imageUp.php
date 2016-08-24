<?php
header("Content-Type:text/html;charset=utf-8");
error_reporting(E_ERROR | E_WARNING);
date_default_timezone_set("Asia/chongqing");
include "Uploader.class.php";
//上传配置
$config = array(
    "savePath" => "upload/",             //存储文件夹
    "maxSize" => 1000,                   //允许的文件最大尺寸，单位KB
    "allowFiles" => array(".gif", ".png", ".jpg", ".jpeg", ".bmp")  //允许的文件格式
);
//上传文件目录
$Path = "upload/";

//背景保存在临时目录中
$config["savePath"] = $Path;
$up = new Uploader("upfile", $config);
$type = $_REQUEST['type'];
$callback = $_GET['callback'];

$info = $up->getFileInfo();

// 编辑器上传的文件加入fastdfs
// log init
include '../../Core/Util/Log.php';
include '../../Core/Util/Log/Driver/File.php';
$logConf['log_path'] = __DIR__.'/../../../logs/';
\lib\Core\Util\Log::init($logConf);
// session init
$ver=parse_ini_file('/etc/server_type.300.cn',true);
$configArr=parse_ini_file(__DIR__.'/../../../config/'.$ver['edition'].'.ini',true);
$configArr['session']['SESSION_OPTIONS']['domain']=$_SERVER['HTTP_HOST'];
$configArr['site']['uhost']=$_SERVER['HTTP_HOST'];
require_once __DIR__.'/../../Core/Session/SessionRedis.php';
$sessionOption=new \lib\Core\Session\SessionRedis($configArr['session']);
$sessionOption->_initialize();
// FastDFS init
require_once __DIR__.'/../../fastdfs/vendor/autoload.php';
$dfs = new \Service\Dfs\FolderClient(__DIR__.'/../../../config/'.$ver['edition'].'-dfs.ini');
// 获取tenant_id
$tenantId = $sessionOption->operate('tenant_id');
\lib\Core\Util\Log::write('baidu-ueditor 获取租户id:'.$tenantId,'INFO');

// 组合path
$dfsPath = '/'.$tenantId.'/goods/'.date('Ymd',time()).'/'.$info['name'];

// 获取上传的文件内容
$picCont = file_get_contents($info['url']);
$log = file_exists($info['url'])?'exists!':'not exists!';
\lib\Core\Util\Log::write('baidu-ueditor 获取上传后的文件:'.$full_file.'-'.$log,'INFO');

$dfsRes = $dfs->saveFile($dfsPath,$picCont,3);
\lib\Core\Util\Log::write('baidu-ueditor fastdfs上传结果:'.json_encode($dfsRes,JSON_UNESCAPED_SLASHES|JSON_UNESCAPED_UNICODE),'INFO');
/**
 * 返回数据
 */
if(is_array($dfsRes)){
    @unlink($info['url']);
    $return['originalName'] = $info['originalName'];
    $return['name'] = $info['name'];
    $return['url'] = 'http://'.$configArr['dfs']['FASTDFS_VIEW_DOMAIN'].'/'.$dfsRes[1];
    $return['size'] = $info['size'];
    $return['type'] = $info['type'];
    $return['state'] = $info['state'];
    if ($callback) {
        echo '<script>' . $callback . '(' . json_encode($return,JSON_UNESCAPED_SLASHES|JSON_UNESCAPED_UNICODE) . ')</script>';
    } else {
        echo json_encode($return);
    }
}else{
    echo $dfs->error?$dfs->error:'unknown error';
}