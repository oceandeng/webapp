var bookStoreCtrls = angular.module('bookStoreCtrls', []);

bookStoreCtrls.controller('HelloCtrl', ['$scope',
    function($scope) {
        $scope.greeting = {
            text: 'Hello'
        };
        $scope.pageClass="hello";
    }
]);

bookStoreCtrls.controller('BookListCtrl', ['$scope',
    function($scope) {
        $scope.books = [{
            title: "《Ext江湖》",
            author: "大漠穷秋"
        }, {
            title: "《ActionScript游戏设计基础（第二版）》",
            author: "大漠穷秋"
        }, {
            title: "《用AngularJS开发下一代WEB应用》",
            author: "大漠穷秋"
        }];
        $scope.pageClass="list";
    }
]);

// SelectCtrl
bookStoreCtrls.controller('SelectCtrl', ['$scope', '$timeout', 'HttpServe', 'AjaxServe', function($scope, $timeout, HttpServe, AjaxServe){

    $scope.options = {};
    $scope.text = "select";
    $scope.pageClass="select";

    // 初始化下拉美化
    var selectBox = new SelectBox($('#mySle'));
    var selectBox1 = new SelectBox($('#mySle1'));

    // 请求数据接口 $q.all([promiseA, promiseB]).then(function(array(dataA, dataB)){console.log('all end')})
    HttpServe.query('http://ocean.cn/interface/success.php').then(function(data){
        $scope.options = data.options;
        $scope.setVal = '5';

        // return HttpServe.query('http://ocean.cn/interface/custom_JSON.php');
    }).then(function(data){
        // $scope.customItems = data.records;
        console.log('All end');
        
    }).then(function(data){

    })

    // HttpServe.query('testdata/sel.json').then(function(data){
    AjaxServe.query({
        url: 'http://m.xqian.cn/API/Node/NodeChannel/getChannelTree',
        dataType: 'jsonp'
    }).then(function(data){

        // 数据处理
        var arr = recursionLoop({
            'data': data.data,
            'defaultVal': {
                "text": "初始值初始值始值初始值初始值初始值初",
                "id":"10"
            }
        });

        // 插件调用
        $("#selectTree").ligerComboBox({
            width: 300,
            selectBoxWidth: 300,
            selectBoxHeight: 300,
            treeLeafOnly: false,
            tree: {
                data: arr,
                checkbox: false,
                parentIcon: '',
                childIcon: '',
                nodeWidth: 200
                // ajaxType: 'get'
            },
            value: '10',
            // initIsTriggerEvent: false,
            onSelected: function (value){
                // alert('选中事件:' + value);
            }
        });

    });

    // 数据处理函数
    function recursionLoop(obj){ // 获取渠道节点数据处理递归函数函数
        var json = obj.data;
        var arr = [];
        
        if(obj.defaultVal) arr.push(obj.defaultVal);

        for(var i = 0, l = json.length; i < l; i ++){
            var obj = {};
            obj.text = json[i].name;
            obj.id = json[i].im;
            recursionSub(obj, json[i]);
            arr.push(obj);
        }
        return arr;
    }
    function recursionSub(obj, json){ // 获取渠道节点数据处理递归函数函数
        if(json.child != undefined){
            obj.children = [];
            for(var j = 0, len = json.child.length; j < len; j++){
                var objc = {};
                objc.text = json.child[j].name;
                objc.id = json.child[j].im;
                obj.children.push(objc);
                recursionSub(objc, json.child[j]);
            }
        }
    }

    // Ajax 服务 请求数据
    AjaxServe.query({
        url: 'http://ocean.cn/interface/custom_JSON.php'
    }).then(function(data){
        $scope.ajaxItems = data.records;
    });


    // 监测 ng-repeat完成事件，刷新下拉列表
    $scope.$on('rFinish', function(event, element){
        switch(element.attr('id')){
            case 'mySle':
                selectBox.refresh();
                selectBox.setValue($scope.setVal);
                console.log('a');
                break;
            case 'mySle1':
                selectBox1.refresh();
                selectBox1.setValue('2');
                console.log('b');
                break;
        }
    });
}]);

// TableCtrl
bookStoreCtrls.controller('TableCtrl', ['$scope', 'HttpServe', function($scope, HttpServe){
    $scope.data = {};
    $scope.pageClass="list";

    HttpServe.post('http://ocean.cn/interface/response.php', {params: {page: '9'}}).then(function(data){
        $scope.data = data;
    });

    // 分页
    $scope.onPageChange = function() {
        // ajax request to load data
        console.log($scope.currentPage);
        HttpServe.post('http://ocean.cn/interface/response.php', {params: {page: $scope.currentPage}}).then(function(data){
            $scope.data = data;

        });
    };

    // set pagecount in $scope
    $scope.pageCount = 9;

}]);
/**
 * 这里接着往下写，如果控制器的数量非常多，需要分给多个开发者，可以借助于grunt来合并代码
 */
bookStoreCtrls.controller('UI', ['$rootScope', '$scope', function($rootScope, $scope){
    $rootScope.toptitle = 'ui';

    $scope.obj = {};

    $scope.obj.title = 'Click me to expand';
    $scope.obj.text = 'Hi there folks, I am the content '
                    + 'that was hidden but is now shown.';

    $scope.name = 'angular';
    $scope.html = 'hello';

    $scope.ui = 'hello world!';
    $scope.pageClass = "hello";

    $scope.foo = 0;
    $scope.bar = 0;
    $scope.update = -1;

    $scope.liger = function(){
        $.ligerDialog.open({
                title: 'aaa',
                target: $("#capacityFenRun"),
                width: 600,
                id:"fenrunDailog",
                isHidden: false,
                onClosed:function(){
                    console.log('a');
                }
        });
    }

    $scope.closePay = function(){
        $.ligerDialog.closeId("fenrunDailog");
    }

    $scope.$watch('name', function(newValue, oldValue){
        if(newValue == oldValue) return;
        $scope.update ++
    })
}]);

bookStoreCtrls.controller('EditorCtrl', ['$scope', "$timeout", function($scope, $timeout){
    $scope.title = '百度编辑器';
    $scope.user = {};
    $scope.user.name = "name";

    var editor = new baidu.editor.ui.Editor({
        toolbars:[
        ['fullscreen', 'fontsize', 'blockquote', 'horizontal', 'removeformat', 'simpleupload', 'link','bold', 'italic', 'underline', 'forecolor', 'backcolor', 'justifyleft', 'justifycenter', 'justifyright', 'justifyjustify', 'rowspacingtop', 'lineheight', 'rowspacingbottom', 'insertorderedlist', 'insertunorderedlist', 'imagenone', 'imageleft', 'imageright', 'imagecenter']
        ], //这些代码可以不要 initialContent: '',imagePath:"/qiusuo/admin/", //图片调用路径，和上传路径一样，uditor/editor_config.js里面的图片调用屏蔽，直接在这里实现了，后面会详细讲
        textarea:'content' //content这里是内容
    });
    editor.render("myEditor");

    // $('#btn').click(function(){
    // $('#ueditor_0').contents().find('body').click(function(){
    //     console.log('a');
    // });

    $('#ueditor_0').contents().find('body').on('keyup mouseenter', function(){
        $('#preview').empty();
        var html = UE.getEditor('myEditor').getContent();
        console.log(html);

        $('#preview').append(html);
    });
    

    // demo
    // function loop(){
    //     $timeout(function(){
    //         console.log('a');
    //         $scope.html = UE.getEditor('myEditor').getContent();
    //         loop();
    //     }, 1000);
    // }
    // loop();
    // $scop
    // e.$watch($scope.html, function(){
    //     $('#preview').append($scope.html);
    // });
    $scope.change = function(){
        $scope.$watch($scope.user.name, function(){
            console.log($scope.user.name);
        })
    }

}]);