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


$(function () {
    //1.初始化Table
//    var oTable = new TableInit();
//    oTable.Init();

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



var formatFunc = function(value,row,index){
    var result = "<select  data-tags=\"true\" data-placeholder=\"Select an option\" class=\"selectpicker show-tick form-control\" data-live-search=\"false\">"
    for(var i=0;i<value.length;i++){
        result += " <option value=\""+value[i]+"\">"+value[i]+"</option>";
    }
    result += "</select>";
    return result
}

var editFunc = function (value, row, index) {
    alert(row);
    return "{type: 'select',source: [{ value: 1, text: 'banana' },{ value: 2, text: 'peach' }],'prepend': { none: \"--------------\" }}"
}



var ButtonInit = function () {
    var oInit = new Object();
    var postdata = {};

    oInit.Init = function () {

        $("#btn_next").click(function () {
            //$("#tb_departments").bootstrapTable("removeAll")
            if (index < (indexList.length - 1)) {
                index += 1;
            } else {
                index = 0;
            }

            goto(index);
        });

        $("#btn_pre").click(function () {
            //$("#tb_departments").bootstrapTable("removeAll")
            if (index > 0) {
                index -= 1;
            } else {
                index = indexList.length - 1;
            }
            goto(index);
        });

        $("#btn_showAllNumber").click(function () {
            $("#g_questionNumber").css('display', 'block');
        });

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

        $("#btn_save").click(function () {
            console.log(JSON.stringify($("#tableRelation").bootstrapTable('getData')));
            $.ajax({
                type: 'get',
                url: '/ashx/index5.ashx',
                data: { "relation": JSON.stringify($("#tableRelation").bootstrapTable('getData')) },
                dataType: "json",
                success: function (result) {

                }
            });
        });

        $("#btn_generate").click(function () {
            var checkList = []
            $('input:checkbox[name="datasource"]:checked').each(function () {
                checkList.push($(this).val())
            });

            if (checkList.length > 0) {

                var resultList = []
                k = 0;
                for (var i = 0; i < (checkList.length - 1); i++) {
                    for (var j = i + 1; j < checkList.length; j++) {
                        console.log('{ "id": k, "table1": '+checkList[i]+', "table1Relation": ["banana", "peach"], "table2": '+checkList[j]+', "table2Relation": ["d", "e", "f"] }')
                        resultList.push({ "id": k, "table1": checkList[i], "table1Relation": ['banana', 'peach'], "table2": checkList[j], "table2Relation": ['d', 'e', 'f'] })
                        k += 1;
                    }
                }
                
                $("#tableRelation").bootstrapTable('destroy');
                $("#tableRelation").bootstrapTable({
                    data: resultList,
                    uniqueId: "id",
                    columns: [[
                        {
                            title: "表1",
                            field: "table1"
                        }, {
                            title: "关联字段",
                            field: "table1Relation",
                            editable: {
                                type:"select"
                            }
                        }, {
                            title: "表2",
                            field: "table2"
                        }, {
                            title: "对应字段",
                            field: "table2Relation",
                            editable: {
                                type: "select"
                            }
                        }, {
                            title: "操作",
                            formatter: function (value, row, index) {
                                return "<a href='javascript:;' class='btn btn-default' onclick=\"$('#tableRelation').bootstrapTable('removeByUniqueId', " + row.id + ")\">不进行关联</a>"
                            }
                        }
                    ]]
                });
                $("#myModal").modal('show')
            }
        });
    };

    return oInit;
};