var basePath="/dce-manager";
$(function(){
/*#############################################search form begin#################################*/
    //产品类型

	$("#searchForm #searchButton").on("click",function(){
		var dataUrl = basePath+"/etherenum/list.html";
		$("#etherenumTable").datagrid('options').url = dataUrl;
		$("#etherenumTable").datagrid('load',{
			'userName': $("#searchForm #userName").val(),
			'account': $("#searchForm #account").val(),
			'startDate':$("#searchForm #user_reg_startDate").datebox('getValue'),
			'endDate':$("#searchForm #user_reg_endDate").datebox('getValue')
		});
	});

	$("#searchForm #resetButton").on("click",function(){
		$("#searchForm").form('reset');
	});

/*#############################################search form end#################################*/

/*##########################grid init begin###################################################*/
	var toolbar_tt = [
	                /* {
	          			iconCls: 'icon-excel',
	          			text:'导出',
	          			handler:export_excel
	          		},'-',{
	          			iconCls: 'icon-edit',
	          			text:'同步放款数据',
	          			handler:syn_loan_data
	          		}*/
	          	];

	/*######################grid toolbar end##############################*/
	var columns_tt = [
      			[
	 			 	{field:'userId',title:'用户id',width:30,halign:"center", align:"left",hidden:true},
	 				{field:"userName",title:"用户名",width:80,align:"center",
	 			 		formatter:function(value,row,index){
	 						
	 						return value + "[" + row.trueName + "]";
	 					}
	 			 	},
	 				{field:"account",title:"以太坊账号",width:80,align:"center"},
	 				{field:"balance",title:"以太坊余额",width:80,align:"center"},
	 				{field:"createTime",title:"创建时间",width:80,align:"center",
	 					formatter:function(value,row,index){
	 						if(value > 0){
	 							return dateTimeFormatter(value);
	 						}
	 						return value;
	 					}
	 				}
	 			]
	 	];

	/*######################grid columns end##############################*/

	$("#etherenumTable").datagrid({
		url:basePath+"/etherenum/list.html",
		height:$("#body").height()-$('#search_area').height()-10,
		width:$("#body").width(),
		rownumbers:true,
		fitColumns:true,
		singleSelect:false,//配合根据状态限制checkbox
		autoRowHeight:true,
		striped:true,
		checkOnSelect:false,//配合根据状态限制checkbox
		selectOnCheck:false,//配合根据状态限制checkbox
		pagination:true,
		showPageList:true,
		pageSize:20,
		pageList:[10,20,30],
		idField:"loanId",
//		frozenColumns : [[{field:'ck',checkbox:true}]],
		columns:columns_tt,
		toolbar:toolbar_tt
	});

/*##########################grid init end###################################################*/
});


function reloadDataGrid()
{
	$("#etherenumTable").datagrid("reload");
}


/*##########################公用方法##begin############################*/
/**
 * 得到选中的行
 * @returns {String}
 */
function get_ids(){
	var ids = '';
	var rows = $('#etherenumTable').datagrid('getChecked');
	if(rows.length == 0){
		$.messager.alert("提示","请选择需要操作的数据", "info");
		return;
	}else{
		for(var i=0; i<rows.length; i++){
			ids += rows[i].loanId + ',';
		}
		ids = ids.substring(0, ids.length - 1);
		return ids;
	}
}
/**
 * 得到一条数据
 * @returns {String}
 */
function get_id(){
	var rows = $('#etherenumTable').datagrid('getChecked');
	if(rows.length == 0){
		$.messager.alert("提示","请选择需要操作的数据","info");
		return;
	}else if(rows.length > 1){
		$.messager.alert("提示","每次只能操作一条数据","info");
		return;
	}else{
		return rows[0].loanId;
	}
}

//监听窗口大小变化
window.onresize = function(){
	setTimeout(domresize,300);
};
//改变表格和查询表单宽高
function domresize(){
	$('#etherenumTable').datagrid('resize',{
		height:$("#body").height()-$('#search_area').height()-5,
		width:$("#body").width()
	});
	$('#search_area').panel('resize',{
		width:$("#body").width()
	});
	$('#detailLoanDiv').dialog('resize',{
		height:$("#body").height()-25,
		width:$("#body").width()-30
	});
}
