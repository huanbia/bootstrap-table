var height = 37
var indexList = []
var index = 0

function contains(arr, obj) {  
    var i = arr.length;  
    while (i--) {  
        if (arr[i] === obj) {  
            return true;  
        }  
    }  
    return false;  
}  

function goto(index) {
    var scrollHeight = indexList[index]*height;
    $("#tb_departments").bootstrapTable('scrollTo', scrollHeight);
}

$(function () {
    //1.初始化Table
    var oTable = new TableInit();
    oTable.Init();

    //2.初始化Button的点击事件
    var oButtonInit = new ButtonInit();
    oButtonInit.Init();

});

(function (i, s, o, g, r, a, m) {
    i['GoogleAnalyticsObject'] = r; i[r] = i[r] || function () {
        (i[r].q = i[r].q || []).push(arguments)
    }, i[r].l = 1 * new Date(); a = s.createElement(o),
m = s.getElementsByTagName(o)[0]; a.async = 1; a.src = g; m.parentNode.insertBefore(a, m)
})(window, document, 'script', '//www.google-analytics.com/analytics.js', 'ga');
ga('create', 'UA-36708951-1', 'wenzhixin.net.cn');
ga('send', 'pageview');


var TableInit = function () {
    var oTableInit = new Object();
    //初始化Table
    oTableInit.Init = function () {
        $('#tb_departments').bootstrapTable({
            url: '/ashx/index1.ashx',         //请求后台的URL（*）
            method: 'get',                      //请求方式（*）
            toolbar: '#toolbar',                //工具按钮用哪个容器
            striped: true,                      //是否显示行间隔色
            cache: false,                       //是否使用缓存，默认为true，所以一般情况下需要设置一下这个属性（*）
            pagination: true,                   //是否显示分页（*）
            sortable: false,                     //是否启用排序
            sortOrder: "asc",                   //排序方式
            queryParams: oTableInit.queryParams, //传递参数（*）
            rowStyle:oTableInit.rowStyle,
            sidePagination: "server",           //分页方式：client客户端分页，server服务端分页（*）
            pageNumber: 1,                       //初始化加载第一页，默认第一页
            pageSize: 100,                       //每页的记录行数（*）
            pageList: [10, 25, 50, 100],        //可供选择的每页的行数（*）
            search: true,                       //是否显示表格搜索，此搜索是客户端搜索，不会进服务端，所以，个人感觉意义不大
            strictSearch: true,
            showColumns: true,                  //是否显示所有的列
            showRefresh: true,                  //是否显示刷新按钮
            minimumCountColumns: 2,             //最少允许的列数
            clickToSelect: true,                //是否启用点击选中行
            height: 500,                        //表格高，如果没有设置height属性，表格自动根据记录条数觉得表格高度
            uniqueId: "ID",                     //每一行的唯一标识，一般为主键列
            showToggle: true,                    //是否显示详细视图和列表视图的切换按钮
            cardView: false,                    //是否显示详细视图
            detailView: false,                   //是否显示父子表
            columns: [{
                checkbox: true
            }, {
                field: 'Name',
                title: '指标名称',
            },{
                field: 'Name',
                title: '更改指标',
                editable: {
                    type: 'text',
                    title: '更改指标',
                    validate: function (v) {
                        if (!v) return '更改指标';
                    }
                }
            } ],
            responseHandler:function(res){
               indexList = res.qrow;
               if(indexList.length>0){
                $("#g_question").css('display','block'); 
                labelHtml = ""
                for(var j=0;j<indexList.length;j++){
                    labelHtml+="<a class=\"btn btn-default\" onclick=\"goto('"+j+"')\">"+j+"</a>"
                }
                console.log(labelHtml)
                $("#lb_question").html(labelHtml)
               }
               console.log(indexList);
               return res;
            },
            onEditableSave: function (field, row, oldValddd, sh) {
                console.log(field)
                console.log(row)
                console.log(oldValddd)
                console.log(sh)
            }
        });
    };

    //得到查询的参数
    oTableInit.queryParams = function (params) {
        var temp = {   //这里的键的名字和控制器的变量名必须一直，这边改动，控制器也需要改成一样的
            limit: params.limit,   //页面大小
            offset: params.offset,  //页码
            departmentname: $("#txt_search_departmentname").val(),
            statu: $("#txt_search_statu").val()
        };
        return temp;
    };

    //指定相应的行颜色
    oTableInit.rowStyle = function(row,index){
        var classes = ['active', 'success', 'info', 'warning', 'danger'];
        if(contains(indexList,index)){
            return {
                classes: classes[1]
            };
        }
        return {};
    };

    return oTableInit;
};



var ButtonInit = function () {
    var oInit = new Object();
    var postdata = {};

    oInit.Init = function () {
        
        $("#btn_next").click(function() {
            //$("#tb_departments").bootstrapTable("removeAll")
            if(index<(indexList.length-1)){
                index += 1;
            }else{
                index = 0;
            }

            goto(index);
        });

        $("#btn_pre").click(function () {
            //$("#tb_departments").bootstrapTable("removeAll")
            if(index>0){
                index -= 1;
            }else{
                index = indexList.length-1;
            }
            goto(index);
        });

        $("#btn_showAllNumber").click(function() {
            $("#g_questionNumber").css('display','block'); 
        });

        /*获取选中的部门名称
        $("#btn_getAllSelect").click(function () {
            selectItems = $('#tb_departments').bootstrapTable('getAllSelections')
            selectItems.forEach(function (item) {
                alert(item.Name)
            })
        });*/



        //$("#btn_edit").click(function () {
        //    var arrselections = $("#tb_departments").bootstrapTable('getSelections');
        //    if (arrselections.length > 1) {
        //        toastr.warning('只能选择一行进行编辑');

        //        return;
        //    }
        //    if (arrselections.length <= 0) {
        //        toastr.warning('请选择有效数据');

        //        return;
        //    }
        //    $("#myModalLabel").text("编辑");
        //    $("#txt_departmentname").val(arrselections[0].DEPARTMENT_NAME);
        //    $("#txt_parentdepartment").val(arrselections[0].PARENT_ID);
        //    $("#txt_departmentlevel").val(arrselections[0].DEPARTMENT_LEVEL);
        //    $("#txt_statu").val(arrselections[0].STATUS);

        //    postdata.DEPARTMENT_ID = arrselections[0].DEPARTMENT_ID;
        //    $('#myModal').modal();
        //});

        $("#btn_delete").click(function () {
            var arrselections = $("#tb_departments").bootstrapTable('getSelections');
            console.log(arrselections)
            if (arrselections.length <= 0) {
                toastr.warning('请选择有效数据');
                return;
            }

            var $table = $('#tb_departments')
            var ids = $.map($table.bootstrapTable('getSelections'), function (row) {
				console.log(row)
                return row.Name;
            });
            $table.bootstrapTable('remove', {
                field: 'Name',
                values: ids
            });
        });

        //$("#btn_submit").click(function () {
        //    postdata.DEPARTMENT_NAME = $("#txt_departmentname").val();
        //    postdata.PARENT_ID = $("#txt_parentdepartment").val();
        //    postdata.DEPARTMENT_LEVEL = $("#txt_departmentlevel").val();
        //    postdata.STATUS = $("#txt_statu").val();
        //    $.ajax({
        //        type: "post",
        //        url: "/Home/GetEdit",
        //        data: { "": JSON.stringify(postdata) },
        //        success: function (data, status) {
        //            if (status == "success") {
        //                toastr.success('提交数据成功');
        //                $("#tb_departments").bootstrapTable('refresh');
        //            }
        //        },
        //        error: function () {
        //            toastr.error('Error');
        //        },
        //        complete: function () {

        //        }

        //    });
        //});

        //$("#btn_query").click(function () {
        //    $("#tb_departments").bootstrapTable('refresh');
        //});
    };

    return oInit;
};