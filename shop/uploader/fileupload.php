<?php
ini_set('date.timezone', 'Asia/Shanghai');
header("Expires: Mon, 26 Jul 1997 05:00:00 GMT");
header("Last-Modified: " . gmdate("D, d M Y H:i:s") . " GMT");
header("Cache-Control: no-store, no-cache, must-revalidate");
header("Cache-Control: post-check=0, pre-check=0", false);
header("Pragma: no-cache");

// Support CORS
// header("Access-Control-Allow-Origin: *");
// other CORS headers if any...
if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    exit; // finish preflight CORS requests here
}

// 5 minutes execution time
@set_time_limit(5 * 60);

//get identify
$idf = $_REQUEST['idf'];
$uploadkey = json_decode(base64_decode($idf));
$uploadkey = get_object_vars($uploadkey);
$uid = $uploadkey['uid'];
$ssn = $uploadkey['ssn'];
$idf = isset($uploadkey['idf']) ? $uploadkey['idf'] : '';

//upload org name
$file_name = $_REQUEST["name"];
$ext_name = explode('.', $file_name);
$ext_name = strtolower($ext_name[count($ext_name) - 1]);

// directory
$sep = DIRECTORY_SEPARATOR;
$data_path = dirname(dirname(dirname(__FILE__))) . $sep . 'data' . $sep;
$file_path = $data_path . 'file' . $sep;
$tmp_path = $data_path .'temp'. $sep;
if($idf != ''){
    $file_path .= $idf . $sep;
}

// Settings
$cleanup_tmp_file = true; // Remove old files
$max_file_age = 5 * 3600; // Temp file age in seconds

// Create target dir
if (!file_exists($file_path)) {
    @mkdir($file_path);
}
if (!file_exists($tmp_path)) {
    @mkdir($tmp_path);
}

//temp full file
$temp_file = $tmp_path . md5($file_name) . '.' . $ext_name;
// Chunking might be enabled
$chunk = isset($_REQUEST["chunk"]) ? intval($_REQUEST["chunk"]) : 0;
$chunks = isset($_REQUEST["chunks"]) ? intval($_REQUEST["chunks"]) : 1;

// Remove old temp files
if ($cleanup_tmp_file) {
    if (!is_dir($tmp_path) || !$dir = opendir($tmp_path)) {
        die('{"jsonrpc" : "2.0", "error" : {"code": 100, "message": "Failed to open temp directory."}, "id" : "001"}');
    }

    while (($file = readdir($dir)) !== false) {
        $cur_file = $tmp_path . $file;

        // If temp file is current file proceed to the next
        if ($cur_file == "{$temp_file}_{$chunk}.part" || $cur_file == "{$temp_file}_{$chunk}.parttmp") {
            continue;
        }

        // Remove temp file if it is older than the max age and is not the current file
        if (preg_match('/\.(part|parttmp)$/', $file) && (@filemtime($cur_file) < time() - $max_file_age)) {
            @unlink($cur_file);
        }
    }
    closedir($dir);
}
// Open temp file
if (!$out = @fopen("{$temp_file}_{$chunk}.parttmp", "wb")) {
    die('{"jsonrpc" : "2.0", "error" : {"code": 102, "message": "Failed to open output stream."}, "id" : "002"}');
}

if (!empty($_FILES)) {
    if ($_FILES["file"]["error"] || !is_uploaded_file($_FILES["file"]["tmp_name"])) {
        die('{"jsonrpc" : "2.0", "error" : {"code": 103, "message": "Failed to move uploaded file."}, "id" : "003"}');
    }
    // Read binary input stream and append it to temp file
    if (!$in = @fopen($_FILES["file"]["tmp_name"], "rb")) {
        die('{"jsonrpc" : "2.0", "error" : {"code": 101, "message": "Failed to open input stream."}, "id" : "004"}');
    }
} else {
    if (!$in = @fopen("php://input", "rb")) {
        die('{"jsonrpc" : "2.0", "error" : {"code": 101, "message": "Failed to open input stream."}, "id" : "005"}');
    }
}

while ($buff = fread($in, 4096)) {
    fwrite($out, $buff);
}

@fclose($out);
@fclose($in);

rename("{$temp_file}_{$chunk}.parttmp", "{$temp_file}_{$chunk}.part");

$index = 0;
$done = true;
$file_key = null;
for ($index = 0; $index < $chunks; $index++) {
    if (!file_exists("{$temp_file}_{$index}.part")) {
        $done = false;
        break;
    }
}
if ($done) {
    $letters = array('A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','X','Y','W','Z');
    $year = date('Y') - 2015;
    $month = date('m') - 1;
    $hour = date('H') - 1;
    if($year < 0){ $year = 25;}
    $file_key = $letters[$year] . $letters[$month]. date('d') . $letters[$hour]. date('is') .'-'. rand(100, 999) .'.'. $ext_name;
    $full_file = $file_path . $file_key;
    if (!$out = @fopen($full_file, "wb")) {
        die('{"jsonrpc" : "2.0", "error" : {"code": 102, "message": "Failed to open output stream."}, "id" : "006"}');
    }
    if (flock($out, LOCK_EX)) {
        for ($index = 0; $index < $chunks; $index++) {
            if (!$in = @fopen("{$temp_file}_{$index}.part", "rb")) {
                break;
            }
            while ($buff = fread($in, 4096)) {
                fwrite($out, $buff);
            }
            @fclose($in);
            @unlink("{$temp_file}_{$index}.part");
        }
        flock($out, LOCK_UN);
    }
    @fclose($out);
}
// log init
include '../Core/Util/Log.php';
include '../Core/Util/Log/Driver/File.php';
// 设置log文件位置
$logConf['log_path'] = __DIR__.'/../../logs/';
\lib\Core\Util\Log::init($logConf);
//// session init
$ver=parse_ini_file('/etc/server_type.300.cn',true);
$configArr=parse_ini_file(__DIR__.'/../../config/'.$ver['edition'].'.ini',true);
$configArr['session']['SESSION_OPTIONS']['domain']=$_SERVER['HTTP_HOST'];
$configArr['site']['uhost']=$_SERVER['HTTP_HOST'];
require __DIR__.'/../Core/Session/SessionRedis.php';
$sessionOption=new \lib\Core\Session\SessionRedis($configArr['session']);
$sessionOption->_initialize();
// FastDFS init
require __DIR__.'/../fastdfs/vendor/autoload.php';
$dfs = new \Service\Dfs\FolderClient(__DIR__.'/../../config/'.$ver['edition'].'-dfs.ini');

// 获取租户id
$tenantId = $sessionOption->operate('tenant_id');
\lib\Core\Util\Log::write('baidu-uploader 获取租户id:'.$tenantId,'INFO');

// 组合path
$path = '/'.$tenantId.'/goods/'.date('Ymd',time()).'/'.$file_key;

// 获取文件内容
$log = file_exists($full_file)?'exists!':'not exists!';
\lib\Core\Util\Log::write('baidu-uploader 获取上传后的文件:'.$full_file.'-'.$log,'INFO');
$fileContent = file_get_contents($full_file);

// 上传到fastdfs
$dfsRes = $dfs->saveFile($path,$fileContent,3);
\lib\Core\Util\Log::write('baidu-uploader fastdfs上传结果:'.json_encode($dfsRes,JSON_UNESCAPED_SLASHES|JSON_UNESCAPED_UNICODE),'INFO');

// 获取dfs静态资源获取地址
$sourceAddr = $configArr['dfs']['FASTDFS_VIEW_DOMAIN'];
// 判断上传结果
if(is_array($dfsRes)){
    // 上传成功
    @unlink($full_file);
    //   echo '{"jsonrpc" : "2.0", "result" : "' . md5($full_file) . '", "key":"' . $file_key . '", "id" : "007"}';
    $return['jsonrpc'] = '2.0';
    $return['result'] = md5($dfsRes[1]);
    $return['key'] = $dfsRes[1];
    $return['id'] = '007';
    $return['dfspath'] = array(
     'objId'=>$dfsRes[1], // dfs的对象id
     'vpath'=>$dfsRes[0]  // dfs的文件虚拟路径
    );

    header('Content-type:application/json');
    echo json_encode($return,JSON_UNESCAPED_SLASHES|JSON_UNESCAPED_UNICODE);
}else{
    // 上传失败
    @unlink($full_file);
    echo '{"jsonrpc" : "2.0", "error" : {"code": 102, "message": "'.$dfs->error.'"}, "id" : "006"}';
}