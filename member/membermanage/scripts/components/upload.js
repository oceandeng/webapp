/* 
* @Author: ocean
* @Date:   2015-11-19 15:55:56
* @Last Modified by:   ocean
* @Last Modified time: 2016-01-22 17:37:25
*/

'use strict';

;(function($){

	$.fn.uploadimg = function(options){

		var obj = $.extend({}, $.fn.uploadimg.defaults, options || {});

		return $(this).each(function(){
			var _this = this;

			this.filterFile = function(file) {       //选择文件的过滤方法
		        return _this.funFilterEligibleFile(file); 
		    };
			/*********************************
			 * 功能：过滤上传的文件格式等
			 * 返回: 通过的文件
			 **********************************/
			this.funFilterEligibleFile = function(file){
				if (file.size >= 51200000) {
					oTools.alertmess('您这个"'+ file.name +'"文件大小过大');	
				} 
				return file;
			};
			// 获取文件
			this.funGetFiles = function(e){
				var self = this;
				// 从事件中获取选中的所有文件
				var file = e.target.files || e.dataTransfer.files;

				obj.uploadFile = _this.filterFile(file);

				// 调用对文件处理的方法
				_this.fileSelected(obj.uploadFile);
			};
		    this.uploadFile = function () {
		        var xhr = new XMLHttpRequest();
		        // xhr.addEventListener("load", _this.uploadComplete, false);
		        xhr.addEventListener("error", _this.uploadFailed, false);
		        xhr.addEventListener("abort", _this.uploadCanceled, false);
		        xhr.open("POST", obj.url, true);
		        var fd = new FormData();
		        fd.append($(_this).attr('name'), obj.uploadFile[0]);

		        xhr.send(fd);
		        xhr.onreadystatechange=function(){
		        	if(xhr.readyState == 2){
		        		return;
		        	}
		            if(xhr.readyState == 4){
		                if(xhr.status == 200){
				            obj.success && obj.success(xhr.responseText, _this);
				        }else{
				            console.log("获取数据错误！错误代号："+ xhr.status +"错误信息："+ xhr.statusText);
				        }
		            }
		        }
		    };
			this.fileSelected = function(selectFile){
			    var fs = selectFile,
			    	html = '';

 				if(fs){

				        var file = fs;
				        var fileSize = 0;
				        
				        if (file.size > 1024 * 1024) {
				            fileSize = (Math.round(file.size * 100 / (1024 * 1024)) / 100).toString() + 'MB';
				        } else {
				            fileSize = (Math.round(file.size * 100 / 1024) / 100).toString() + 'KB';
				        }
						
				        html += '<div class="file-item well" data-index="'+ obj.uploadList +'">' +
				                // '<div class="img-box"><img src="' + path[i] + '"/></div>' +
				                '<div class="loadingimg"></div>' +
				                '<div class="remove"></div></div>';						

						// obj.flimgBox.append('<div class="flimg" data-index="' + obj.uploadList + '"><img src="' + path[i] + '"/></div>');

						// inputHtml += '<input type="hidden" value="" class="inputL" name="' + obj.uname + '" data-index="' + obj.uploadList + '">';
				    
				}else{


				}


			    // obj.fileList.append(html).find('img').load(function(){
			    // obj.fileList.append(html).find('img');

				if(fs.length == obj.uplimit){
					_this.minlimit();
				};
			};

//删除对应的文件
			this.funDeleteFile = function(delFileIndex, isCb){
				var self = this;  // 在each中this指向没个v  所以先将this保留

				$.each(obj.uploadFile, function(k, v){
					if(delFile != v){
						// 如果不是删除的那个文件 就放到临时数组中
						tmpFile.push(v);
					}else{
						
					};
				});
				obj.uploadFile = tmpFile;

				return true;
			};
			this.uploadProgress = function(evt) {
			    if (evt.lengthComputable) {
			        var percentComplete = Math.round(evt.loaded * 100 / evt.total) +'%';
			        $barList.get(obj.index).innerHTML = percentComplete;
			        $barList.get(obj.index).style.width = percentComplete;
			    }
			};
			this.uploadFailed = function(evt) {
			    oTools.alertmess("网络超时!请重新选择图片！");
			};
			this.uploadCanceled = function(evt) {
			    oTools.alertmess("上传已由用户或浏览器连接被取消掉了!");
			};
			//插件调用执行部分
			$(_this).change(function(e){
				_this.funGetFiles(e);
				
				if(obj.uploadFile){
					_this.uploadFile();
				}
			});

	    	// $(obj.fileList).on(oTools.clickEvent, '.remove', function(){


	    	// });

		});
	};

	$.fn.uploadimg.defaults = {
		uploadFile : null,		// 需要上传的文件数组
	};

})(jQuery);