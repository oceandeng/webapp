common.directive('grid', ['$compile',  '$timeout', function($compile, $timeout) {
    var opts = {};

    return {
        restrict: "AECM",
        templateUrl: "public/template/grid.html",
        replace: true,
        scope: {
            options: "=",
            page: '&pagechange',
            size: '&sizechange',
            check: '&checkchange'
        },
        link: function(scope, element, attrs) {
            //html结果
            var result = "";
            initGrid(scope, element);
            scope.$watch("options.data", function(newvalue) {
                //待改进
                //element.find(".pageContent").hide();
                scope.showMe = false;
                if (newvalue == undefined || $.isEmptyObject(newvalue)) {
                    element.find("tr[name='gridrow']").remove();
                    element.find("actv").html("");
                    if (element.find(".none-data").size() < 1) {
                        element.find(".tableCon").append('<div class="none-data">还没有相关数据</div>');
                    }
                    return;
                }
                element.find(".tableCon").find('.none-data').remove();
                initParam(scope, element);
                result = "";

                for (var i = 0; i < scope.options.data.length; i++) {
                    result += confirmTd(opts, opts.data[i], i, scope);
                }
                element.find("tr[name='gridrow']").remove();
                element.find("tbody").append(result);
                //呈现前的渲染
                gridRender(element, opts);
                $compile($(element).find("tr[name='gridrow']"))(scope);

                if (opts.showPage) {
                    element.find("actv").html("");
                    initPageCount(scope, element, opts.pageIndex, opts.pageSize, opts.dataCount);
                    $compile(element.find("actv"))(scope);
                }
                opts.callback && opts.callback(element);
            }, true);

        }
    }

    function initGrid(scope, element) {
        var isChecked;
        element.find("input[name='ckAll']").bind("click", function() {
            isChecked = $(this).prop("checked");
            $(this).prop("checked", isChecked)
            element.find("input[name='ckSingle']").prop("checked", isChecked);
        });
    }

    function initParam(scope, element) {
        //默认参数
        opts = {
            columns: [], //列集合
            pageIndex: 1, //当前页数
            pageSize: 10, //每页大小
            dataCount: 0, //数据总条数
            showBox: false, //是否显示选择checkBox
            showPage: false, //是否显示分页
            showNumber: false,
            dataID: null,
            merges: [],
            callback: null
        }

        opts = $.extend({}, opts, scope.options);
        if (!opts.showBox) {
            element.find("#box").remove();
        }
        if (!opts.showPage) {
            element.find(".pageContent").remove();
        }
        if (!opts.showNumber) {
            element.find("#num").remove();
        }
    }
    //产生行
    function confirmTd(opts, jData, rowIndex, scope) {
        //opts.columns,opts.data[i],opts.showBox,opts.showNumber
        var rData = opts.columns;
        var tmp = "<tr name=gridrow rowIndex=" + (rowIndex + 1) + ">";

        if (opts.showBox) {
            scope.showMe = true;
            tmp += "<td><input type='checkbox' name='ckSingle' value='" + jData[opts.dataID] + "' /></td>";
        }
        if (opts.showNumber) {
            tmp += "<td name='rowIndex'>" + (rowIndex + 1) + "</td>";
        }
        for (var i = 0; i < rData.length; i++) {
            var names = rData[i].name;
            var render = rData[i].render;
            tmp += '<td tdindex="' + (i + 1) + '"';
            if (rData[i].align) {
                tmp += ' style="text-align:' + rData[i].align + '"';
            }
            if (names != undefined) {
                tmp += ' field="' + names + '"';
            }
            tmp += '>';
            if (names == undefined) {
                tmp += render(jData);
            } else {
                tmp += jData[names] == undefined ? "" : jData[names];
            }
            tmp += '</td>';
        }
        tmp += '</tr>';
        return tmp;
    }
    //呈现前的渲染
    function gridRender(element, opts) {
        if (opts.merges.length == 0)
            return;
        var obj;
        var removeobj;
        for (var i = 0; i < opts.merges.length; i++) {
            trobj = element.find("tr[rowIndex=" + opts.merges[i].index + "]");
            tdobj = trobj.find("td[field='" + opts.merges[i].field + "']")
            if (!$.isEmptyObject(tdobj) && tdobj.length != 0) {
                if (!$.isNull(opts.merges[i].rowspan) && opts.merges[i].rowspan != 0) {
                    tdobj.attr("rowspan", opts.merges[i].rowspan);

                    var removeobj = element.find("tr");
                    //跨行后，需要移除多余的TD,移除数量等于跨行数量减1
                    var j = opts.merges[i].rowspan - 1;
                    //已移除数量
                    var n = 0;
                    removeobj.each(function() {
                        //index大于rowspan的index开始算
                        if (parseInt($(this).attr("rowIndex")) > opts.merges[i].index) {
                            if (j == n) {
                                return false;
                            }
                            $(this).find("td[field='" + opts.merges[i].field + "']").remove();
                            n++;
                        }
                    })
                }
                if (!$.isNull(opts.merges[i].colspan) && opts.merges[i].colspan != 0) {
                    tdobj.attr("colspan", opts.merges[i].colspan);
                    //跨列后，需要移除多余的TD,移除数量等于跨列数量减1
                    var j = opts.merges[i].colspan - 1;
                    //已移除数量
                    var n = 0;
                    var removeobj = trobj.find("td");

                    removeobj.each(function() {
                        //index大于colspan的index开始算
                        if (parseInt($(this).attr("tdindex")) > opts.merges[i].index) {
                            if (j == n) {
                                return false;
                            }
                            $(this).remove();
                            n++;
                        }
                    })
                }
            }
        }
    }
    //当前页数,每页条数,记录条数,分页数
    function initPageCount(scope, element, pageIndex, pageSize, dataCount) {
        //分页数
        var countNum = Math.ceil(dataCount / pageSize);
        //当前页数不能大于总页数
        pageIndex = pageIndex > countNum ? countNum : pageIndex
            //当前偏移量
        var pNum = 4;
        //页码集合 
        var pageCount = [];
        //是否修改尾
        var updateEnd = false;
        //是否修改头
        var updateBegin = false

        //左页码数量
        var leftCount = 0;
        if (pageIndex - pNum > 0) {
            leftCount = pNum;
            updateBegin = true;
        } else
            leftCount = pageIndex;

        //右页码数量=当前页码+偏移量
        var rightCount = 0;
        if (pageIndex + pNum <= countNum) {
            rightCount = pNum;
            updateEnd = true;
        } else
            rightCount = countNum - pageIndex;
        //当前数组下标
        var j = 0;
        var p = 1;
        var html = "";
        if (pageIndex <= 1) {
            pageIndex = 1;
            html += "<a ng-click=page({pageIndex:1})><</a>";
            element.find("a[begin]").attr("ng-click", "page({pageIndex:" + 1 + "})");
        } else {

            html += "<a ng-click=page({pageIndex:" + (pageIndex - 1) + "})><</a>";
        }
        var pageNum;
        //当前页左边页码        
        for (var i = 0; i < leftCount; i++) {
            if (pageIndex - leftCount + i <= 0)
                continue;
            pageNum = pageIndex - leftCount + i
            if (pageNum != 1 && updateBegin) {
                pageNum = 1;
            }
            html += createNumHtml(p++, pageNum);
            if (updateBegin) {
                html += "<span name='actv'>...</span>";
                updateBegin = false;
            }
            pageCount[j++] = pageIndex - leftCount + i;

        }
        if (pageCount.length != 0) {
            pageCount[j++] = pageIndex;
            html += createNumHtml(p++, pageIndex, true);
        } else {
            pageCount[j++] = pageIndex;
            html += createNumHtml(p++, 1, true);
        }
        //当前页右边页码

        for (var i = 0; i < rightCount; i++) {
            if (pageIndex - leftCount + i > countNum)
                continue;
            pageNum = pageIndex + i + 1;
            pageCount[j++] = pageNum;
            if (i + 1 == rightCount && updateEnd) {
                html += "<span name='actv'>...</span>";
                pageNum = countNum;
            }
            html += createNumHtml(p++, pageNum);
        }
        if (pageIndex == Math.ceil(dataCount / pageSize)) {
            html += "<a ng-click=page({pageIndex:" + Math.ceil(dataCount / pageSize) + "})>></a>"
        } else {
            html += "<a ng-click=page({pageIndex:" + (pageIndex + 1) + "})>></a>"
        }
        element.find("#txtSize").val(pageSize);
        element.find("actv").html(html);
        element.find("li[total]").html("共" + dataCount + "条");
    }

    function createNumHtml(index, pageNum, isActive) {
        var temp = "";
        if (isActive) {
            temp = "<a name='actv' index='" + index + "' class='active' ng-click='page({pageIndex:" + pageNum + "})'>" + pageNum + "</a>";
        } else {
            temp = "<a name='actv' index='" + index + "' ng-click='page({pageIndex:" + pageNum + "})'>" + pageNum + "</a>";
        }
        return temp;
    }
}]);
