var basePath = "/dce-manager";
$(function() {
	/*
	 * #############################################search form
	 * begin#################################
	 */

	$("#searchdistrictForm #searchButton").on("click", function() {
		var dataUrl = basePath + "/district/listDistrict.html";
		$("#tt_District").datagrid('load', {
			'distrct_name' : $("#searchdistrictForm #distrct_name").val(),
			'trueName' : $("#searchdistrictForm #true_name").val()
		});
	});

	$("#searchdistrictForm #resetButton").on("click", function() {
		$("#searchdistrictForm").form('reset');
	});

	/*
	 * #############################################search form
	 * end#################################
	 */

	/*
	 * ##########################grid init
	 * begin####################################################
	 */
	/*
	 * ##########################grid toolbar
	 * begin#################################################
	 */
	var toolbar_tt = [];

	/* ######################grid toolbar end############################## */
	/* ######################grid columns begin############################## */
	var columns_tt = [ [
			{
				field : "id",
				title : "用户id",
				width : 180,
				hidden : true
			},
			{
				field : "userName",
				title : "手机号码",
				width : 180,
				align : "center"
			},
			{
				field : "trueName",
				title : "真实姓名",
				width : 180,
				align : "center"
			},
			{
				field : "district",
				title : "区域",
				width : 180,
				align : "center"
			},
			{
				field : "操作",
				title : "操作",
				width : 80,
				align : "left",
				formatter : function(value, row, index) {
					var str = '<a href="javascript:void(0);" onclick="to_edituser(\''
							+ row.id + '\');">编辑</a>';
					return str;
				}
			} ] ];
	/* ######################grid columns end############################## */

	$("#tt_District").datagrid({
		url : httpUrl + "/district/listDistrict.html?&rand=" + Math.random(),
		height : $("#body").height() - $('#search_areaDistrict').height() - 10,
		width : $("#body").width(),
		rownumbers : true,
		fitColumns : true,
		singleSelect : false,// 配合根据状态限制checkbox
		autoRowHeight : true,
		striped : true,
		checkOnSelect : false,// 配合根据状态限制checkbox
		selectOnCheck : false,// 配合根据状态限制checkbox
		loadFilter : function(data) {
			return {
				'rows' : data.datas,
				'total' : data.total,
				'pageSize' : data.pageSize,
				'pageNumber' : data.page
			};
		},
		pagination : true,
		showPageList : true,
		pageSize : 20,
		pageList : [ 10, 20, 30 ],
		idField : "id",
		columns : columns_tt,
		toolbar : toolbar_tt,
		queryParams : {
			'distrct_name' : $("#searchdistrictForm #distrct_name").val(),
			'trueName' : $("#searchdistrictForm #true_name").val()
		},
		onLoadSuccess : function(data) {// 根据状态限制checkbox

		}
	});

	/*
	 * $(window).resize(function (){ domresize(); });
	 */
	/*
	 * ##########################grid init
	 * end###################################################
	 */
});

/**
 * 新增
 * 
 * @param id
 */
function to_adduser() {
	to_edituser('');
}
/**
 * 编辑
 * 
 * @param id
 */
function to_edituser(id) {

	var url = httpUrl + "/district/addDistrict.html?&rand=" + Math.random()
			+ "&id=" + id;
	$('#editDistrictDiv').dialog({
		title : "新增",
		width : 760,
		height : 500,
		closed : false,
		closable : false,
		cache : false,
		href : url,
		modal : true,
		toolbar : [ {
			iconCls : "icon-save",
			text : "保存",
			handler : save_User
		}, {
			iconCls : "icon-no",
			text : "关闭",
			handler : function() {
				$("#editDistrictDiv").dialog("close");
			}
		} ]
	});
}

function save_User() {

	var formdata = $("#editDistrictForm").serialize();
	console.info("formdata");
	var province = $("#editDistrictForm #country").find("option:selected")
			.text();
	var city = $("#editDistrictForm #city").find("option:selected").text();
	var district = $("#editDistrictForm #children").find("option:selected")
			.text();
	var userId = $("#id").val();
	if (province == "--请选择省份--" || city == "--请选择市---"
			|| district == "--请选择区---"||province == "" || city ==""
				|| district =="") {
		$.messager.alert("提示", "请选择地区", "error");
		return;
	}
	var object = new FormData();
	object.append("id", userId);
	object.append("district", province + "-" + city + "-" + district);
	console.info(province + city + district + "id==" + "userId=" + userId);
	var url = httpUrl + "/district/saveUser.html?&rand=" + Math.random();

	$.ajax({
		type : 'POST',
		dataType : 'json',
		url : url,
		data : object,
		processData : false,
		contentType : false,
		success : function(data) {
			if (data.code === "0") {
				$('#tt_District').datagrid('reload');
				$("#editDistrictDiv").dialog("close");
				$.messager.alert("提示", "操作成功", "info");
			} else {
				$.messager.alert("提示", data.msg, "error");
			}
		}
	});
}

function reloadDataGrid() {
	$("#tt_District").datagrid("reload");
}

var list = [ {
	"id" : "2",
	"sub" : [ {
		"id" : "52",
		"sub" : [ {
			"id" : "500",
			"name" : "东城区",
			"pid" : "52"
		}, {
			"id" : "501",
			"name" : "西城区",
			"pid" : "52"
		}, {
			"id" : "502",
			"name" : "海淀区",
			"pid" : "52"
		}, {
			"id" : "503",
			"name" : "朝阳区",
			"pid" : "52"
		}, {
			"id" : "504",
			"name" : "崇文区",
			"pid" : "52"
		}, {
			"id" : "505",
			"name" : "宣武区",
			"pid" : "52"
		}, {
			"id" : "506",
			"name" : "丰台区",
			"pid" : "52"
		}, {
			"id" : "507",
			"name" : "石景山区",
			"pid" : "52"
		}, {
			"id" : "508",
			"name" : "房山区",
			"pid" : "52"
		}, {
			"id" : "509",
			"name" : "门头沟区",
			"pid" : "52"
		}, {
			"id" : "510",
			"name" : "通州区",
			"pid" : "52"
		}, {
			"id" : "511",
			"name" : "顺义区",
			"pid" : "52"
		}, {
			"id" : "512",
			"name" : "昌平区",
			"pid" : "52"
		}, {
			"id" : "513",
			"name" : "怀柔区",
			"pid" : "52"
		}, {
			"id" : "514",
			"name" : "平谷区",
			"pid" : "52"
		}, {
			"id" : "515",
			"name" : "大兴区",
			"pid" : "52"
		}, {
			"id" : "516",
			"name" : "密云县",
			"pid" : "52"
		}, {
			"id" : "517",
			"name" : "延庆县",
			"pid" : "52"
		} ],
		"name" : "北京",
		"pid" : "2"
	} ],
	"name" : "北京",
	"pid" : "1"
}, {
	"id" : "3",
	"sub" : [ {
		"id" : "36",
		"sub" : [ {
			"id" : "398",
			"name" : "迎江区",
			"pid" : "36"
		}, {
			"id" : "399",
			"name" : "大观区",
			"pid" : "36"
		}, {
			"id" : "400",
			"name" : "宜秀区",
			"pid" : "36"
		}, {
			"id" : "401",
			"name" : "桐城市",
			"pid" : "36"
		}, {
			"id" : "402",
			"name" : "怀宁县",
			"pid" : "36"
		}, {
			"id" : "403",
			"name" : "枞阳县",
			"pid" : "36"
		}, {
			"id" : "404",
			"name" : "潜山县",
			"pid" : "36"
		}, {
			"id" : "405",
			"name" : "太湖县",
			"pid" : "36"
		}, {
			"id" : "406",
			"name" : "宿松县",
			"pid" : "36"
		}, {
			"id" : "407",
			"name" : "望江县",
			"pid" : "36"
		}, {
			"id" : "408",
			"name" : "岳西县",
			"pid" : "36"
		} ],
		"name" : "安庆",
		"pid" : "3"
	}, {
		"id" : "37",
		"sub" : [ {
			"id" : "409",
			"name" : "中市区",
			"pid" : "37"
		}, {
			"id" : "410",
			"name" : "东市区",
			"pid" : "37"
		}, {
			"id" : "411",
			"name" : "西市区",
			"pid" : "37"
		}, {
			"id" : "412",
			"name" : "郊区",
			"pid" : "37"
		}, {
			"id" : "413",
			"name" : "怀远县",
			"pid" : "37"
		}, {
			"id" : "414",
			"name" : "五河县",
			"pid" : "37"
		}, {
			"id" : "415",
			"name" : "固镇县",
			"pid" : "37"
		} ],
		"name" : "蚌埠",
		"pid" : "3"
	}, {
		"id" : "38",
		"sub" : [ {
			"id" : "416",
			"name" : "居巢区",
			"pid" : "38"
		}, {
			"id" : "417",
			"name" : "庐江县",
			"pid" : "38"
		}, {
			"id" : "418",
			"name" : "无为县",
			"pid" : "38"
		}, {
			"id" : "419",
			"name" : "含山县",
			"pid" : "38"
		}, {
			"id" : "420",
			"name" : "和县",
			"pid" : "38"
		} ],
		"name" : "巢湖",
		"pid" : "3"
	}, {
		"id" : "39",
		"sub" : [ {
			"id" : "421",
			"name" : "贵池区",
			"pid" : "39"
		}, {
			"id" : "422",
			"name" : "东至县",
			"pid" : "39"
		}, {
			"id" : "423",
			"name" : "石台县",
			"pid" : "39"
		}, {
			"id" : "424",
			"name" : "青阳县",
			"pid" : "39"
		} ],
		"name" : "池州",
		"pid" : "3"
	}, {
		"id" : "40",
		"sub" : [ {
			"id" : "425",
			"name" : "琅琊区",
			"pid" : "40"
		}, {
			"id" : "426",
			"name" : "南谯区",
			"pid" : "40"
		}, {
			"id" : "427",
			"name" : "天长市",
			"pid" : "40"
		}, {
			"id" : "428",
			"name" : "明光市",
			"pid" : "40"
		}, {
			"id" : "429",
			"name" : "来安县",
			"pid" : "40"
		}, {
			"id" : "430",
			"name" : "全椒县",
			"pid" : "40"
		}, {
			"id" : "431",
			"name" : "定远县",
			"pid" : "40"
		}, {
			"id" : "432",
			"name" : "凤阳县",
			"pid" : "40"
		} ],
		"name" : "滁州",
		"pid" : "3"
	}, {
		"id" : "41",
		"sub" : [ {
			"id" : "433",
			"name" : "蚌山区",
			"pid" : "41"
		}, {
			"id" : "434",
			"name" : "龙子湖区",
			"pid" : "41"
		}, {
			"id" : "435",
			"name" : "禹会区",
			"pid" : "41"
		}, {
			"id" : "436",
			"name" : "淮上区",
			"pid" : "41"
		}, {
			"id" : "437",
			"name" : "颍州区",
			"pid" : "41"
		}, {
			"id" : "438",
			"name" : "颍东区",
			"pid" : "41"
		}, {
			"id" : "439",
			"name" : "颍泉区",
			"pid" : "41"
		}, {
			"id" : "440",
			"name" : "界首市",
			"pid" : "41"
		}, {
			"id" : "441",
			"name" : "临泉县",
			"pid" : "41"
		}, {
			"id" : "442",
			"name" : "太和县",
			"pid" : "41"
		}, {
			"id" : "443",
			"name" : "阜南县",
			"pid" : "41"
		}, {
			"id" : "444",
			"name" : "颖上县",
			"pid" : "41"
		} ],
		"name" : "阜阳",
		"pid" : "3"
	}, {
		"id" : "42",
		"sub" : [ {
			"id" : "445",
			"name" : "相山区",
			"pid" : "42"
		}, {
			"id" : "446",
			"name" : "杜集区",
			"pid" : "42"
		}, {
			"id" : "447",
			"name" : "烈山区",
			"pid" : "42"
		}, {
			"id" : "448",
			"name" : "濉溪县",
			"pid" : "42"
		} ],
		"name" : "淮北",
		"pid" : "3"
	}, {
		"id" : "43",
		"sub" : [ {
			"id" : "449",
			"name" : "田家庵区",
			"pid" : "43"
		}, {
			"id" : "450",
			"name" : "大通区",
			"pid" : "43"
		}, {
			"id" : "451",
			"name" : "谢家集区",
			"pid" : "43"
		}, {
			"id" : "452",
			"name" : "八公山区",
			"pid" : "43"
		}, {
			"id" : "453",
			"name" : "潘集区",
			"pid" : "43"
		}, {
			"id" : "454",
			"name" : "凤台县",
			"pid" : "43"
		} ],
		"name" : "淮南",
		"pid" : "3"
	}, {
		"id" : "44",
		"sub" : [ {
			"id" : "455",
			"name" : "屯溪区",
			"pid" : "44"
		}, {
			"id" : "456",
			"name" : "黄山区",
			"pid" : "44"
		}, {
			"id" : "457",
			"name" : "徽州区",
			"pid" : "44"
		}, {
			"id" : "458",
			"name" : "歙县",
			"pid" : "44"
		}, {
			"id" : "459",
			"name" : "休宁县",
			"pid" : "44"
		}, {
			"id" : "460",
			"name" : "黟县",
			"pid" : "44"
		}, {
			"id" : "461",
			"name" : "祁门县",
			"pid" : "44"
		} ],
		"name" : "黄山",
		"pid" : "3"
	}, {
		"id" : "45",
		"sub" : [ {
			"id" : "462",
			"name" : "金安区",
			"pid" : "45"
		}, {
			"id" : "463",
			"name" : "裕安区",
			"pid" : "45"
		}, {
			"id" : "464",
			"name" : "寿县",
			"pid" : "45"
		}, {
			"id" : "465",
			"name" : "霍邱县",
			"pid" : "45"
		}, {
			"id" : "466",
			"name" : "舒城县",
			"pid" : "45"
		}, {
			"id" : "467",
			"name" : "金寨县",
			"pid" : "45"
		}, {
			"id" : "468",
			"name" : "霍山县",
			"pid" : "45"
		} ],
		"name" : "六安",
		"pid" : "3"
	}, {
		"id" : "46",
		"sub" : [ {
			"id" : "469",
			"name" : "雨山区",
			"pid" : "46"
		}, {
			"id" : "470",
			"name" : "花山区",
			"pid" : "46"
		}, {
			"id" : "471",
			"name" : "金家庄区",
			"pid" : "46"
		}, {
			"id" : "472",
			"name" : "当涂县",
			"pid" : "46"
		} ],
		"name" : "马鞍山",
		"pid" : "3"
	}, {
		"id" : "47",
		"sub" : [ {
			"id" : "473",
			"name" : "埇桥区",
			"pid" : "47"
		}, {
			"id" : "474",
			"name" : "砀山县",
			"pid" : "47"
		}, {
			"id" : "475",
			"name" : "萧县",
			"pid" : "47"
		}, {
			"id" : "476",
			"name" : "灵璧县",
			"pid" : "47"
		}, {
			"id" : "477",
			"name" : "泗县",
			"pid" : "47"
		} ],
		"name" : "宿州",
		"pid" : "3"
	}, {
		"id" : "48",
		"sub" : [ {
			"id" : "478",
			"name" : "铜官山区",
			"pid" : "48"
		}, {
			"id" : "479",
			"name" : "狮子山区",
			"pid" : "48"
		}, {
			"id" : "480",
			"name" : "郊区",
			"pid" : "48"
		}, {
			"id" : "481",
			"name" : "铜陵县",
			"pid" : "48"
		} ],
		"name" : "铜陵",
		"pid" : "3"
	}, {
		"id" : "49",
		"sub" : [ {
			"id" : "482",
			"name" : "镜湖区",
			"pid" : "49"
		}, {
			"id" : "483",
			"name" : "弋江区",
			"pid" : "49"
		}, {
			"id" : "484",
			"name" : "鸠江区",
			"pid" : "49"
		}, {
			"id" : "485",
			"name" : "三山区",
			"pid" : "49"
		}, {
			"id" : "486",
			"name" : "芜湖县",
			"pid" : "49"
		}, {
			"id" : "487",
			"name" : "繁昌县",
			"pid" : "49"
		}, {
			"id" : "488",
			"name" : "南陵县",
			"pid" : "49"
		} ],
		"name" : "芜湖",
		"pid" : "3"
	}, {
		"id" : "50",
		"sub" : [ {
			"id" : "489",
			"name" : "宣州区",
			"pid" : "50"
		}, {
			"id" : "490",
			"name" : "宁国市",
			"pid" : "50"
		}, {
			"id" : "491",
			"name" : "郎溪县",
			"pid" : "50"
		}, {
			"id" : "492",
			"name" : "广德县",
			"pid" : "50"
		}, {
			"id" : "493",
			"name" : "泾县",
			"pid" : "50"
		}, {
			"id" : "494",
			"name" : "绩溪县",
			"pid" : "50"
		}, {
			"id" : "495",
			"name" : "旌德县",
			"pid" : "50"
		} ],
		"name" : "宣城",
		"pid" : "3"
	}, {
		"id" : "51",
		"sub" : [ {
			"id" : "496",
			"name" : "涡阳县",
			"pid" : "51"
		}, {
			"id" : "497",
			"name" : "蒙城县",
			"pid" : "51"
		}, {
			"id" : "498",
			"name" : "利辛县",
			"pid" : "51"
		}, {
			"id" : "499",
			"name" : "谯城区",
			"pid" : "51"
		} ],
		"name" : "亳州",
		"pid" : "3"
	}, {
		"id" : "3401",
		"sub" : [ {
			"id" : "3402",
			"name" : "庐阳区",
			"pid" : "3401"
		}, {
			"id" : "3403",
			"name" : "瑶海区",
			"pid" : "3401"
		}, {
			"id" : "3404",
			"name" : "蜀山区",
			"pid" : "3401"
		}, {
			"id" : "3405",
			"name" : "包河区",
			"pid" : "3401"
		}, {
			"id" : "3406",
			"name" : "长丰县",
			"pid" : "3401"
		}, {
			"id" : "3407",
			"name" : "肥东县",
			"pid" : "3401"
		}, {
			"id" : "3408",
			"name" : "肥西县",
			"pid" : "3401"
		} ],
		"name" : "合肥",
		"pid" : "3"
	} ],
	"name" : "安徽",
	"pid" : "1"
}, {
	"id" : "4",
	"sub" : [ {
		"id" : "53",
		"sub" : [ {
			"id" : "518",
			"name" : "鼓楼区",
			"pid" : "53"
		}, {
			"id" : "519",
			"name" : "台江区",
			"pid" : "53"
		}, {
			"id" : "520",
			"name" : "仓山区",
			"pid" : "53"
		}, {
			"id" : "521",
			"name" : "马尾区",
			"pid" : "53"
		}, {
			"id" : "522",
			"name" : "晋安区",
			"pid" : "53"
		}, {
			"id" : "523",
			"name" : "福清市",
			"pid" : "53"
		}, {
			"id" : "524",
			"name" : "长乐市",
			"pid" : "53"
		}, {
			"id" : "525",
			"name" : "闽侯县",
			"pid" : "53"
		}, {
			"id" : "526",
			"name" : "连江县",
			"pid" : "53"
		}, {
			"id" : "527",
			"name" : "罗源县",
			"pid" : "53"
		}, {
			"id" : "528",
			"name" : "闽清县",
			"pid" : "53"
		}, {
			"id" : "529",
			"name" : "永泰县",
			"pid" : "53"
		}, {
			"id" : "530",
			"name" : "平潭县",
			"pid" : "53"
		} ],
		"name" : "福州",
		"pid" : "4"
	}, {
		"id" : "54",
		"sub" : [ {
			"id" : "531",
			"name" : "新罗区",
			"pid" : "54"
		}, {
			"id" : "532",
			"name" : "漳平市",
			"pid" : "54"
		}, {
			"id" : "533",
			"name" : "长汀县",
			"pid" : "54"
		}, {
			"id" : "534",
			"name" : "永定县",
			"pid" : "54"
		}, {
			"id" : "535",
			"name" : "上杭县",
			"pid" : "54"
		}, {
			"id" : "536",
			"name" : "武平县",
			"pid" : "54"
		}, {
			"id" : "537",
			"name" : "连城县",
			"pid" : "54"
		} ],
		"name" : "龙岩",
		"pid" : "4"
	}, {
		"id" : "55",
		"sub" : [ {
			"id" : "538",
			"name" : "延平区",
			"pid" : "55"
		}, {
			"id" : "539",
			"name" : "邵武市",
			"pid" : "55"
		}, {
			"id" : "540",
			"name" : "武夷山市",
			"pid" : "55"
		}, {
			"id" : "541",
			"name" : "建瓯市",
			"pid" : "55"
		}, {
			"id" : "542",
			"name" : "建阳市",
			"pid" : "55"
		}, {
			"id" : "543",
			"name" : "顺昌县",
			"pid" : "55"
		}, {
			"id" : "544",
			"name" : "浦城县",
			"pid" : "55"
		}, {
			"id" : "545",
			"name" : "光泽县",
			"pid" : "55"
		}, {
			"id" : "546",
			"name" : "松溪县",
			"pid" : "55"
		}, {
			"id" : "547",
			"name" : "政和县",
			"pid" : "55"
		} ],
		"name" : "南平",
		"pid" : "4"
	}, {
		"id" : "56",
		"sub" : [ {
			"id" : "548",
			"name" : "蕉城区",
			"pid" : "56"
		}, {
			"id" : "549",
			"name" : "福安市",
			"pid" : "56"
		}, {
			"id" : "550",
			"name" : "福鼎市",
			"pid" : "56"
		}, {
			"id" : "551",
			"name" : "霞浦县",
			"pid" : "56"
		}, {
			"id" : "552",
			"name" : "古田县",
			"pid" : "56"
		}, {
			"id" : "553",
			"name" : "屏南县",
			"pid" : "56"
		}, {
			"id" : "554",
			"name" : "寿宁县",
			"pid" : "56"
		}, {
			"id" : "555",
			"name" : "周宁县",
			"pid" : "56"
		}, {
			"id" : "556",
			"name" : "柘荣县",
			"pid" : "56"
		} ],
		"name" : "宁德",
		"pid" : "4"
	}, {
		"id" : "57",
		"sub" : [ {
			"id" : "557",
			"name" : "城厢区",
			"pid" : "57"
		}, {
			"id" : "558",
			"name" : "涵江区",
			"pid" : "57"
		}, {
			"id" : "559",
			"name" : "荔城区",
			"pid" : "57"
		}, {
			"id" : "560",
			"name" : "秀屿区",
			"pid" : "57"
		}, {
			"id" : "561",
			"name" : "仙游县",
			"pid" : "57"
		} ],
		"name" : "莆田",
		"pid" : "4"
	}, {
		"id" : "58",
		"sub" : [ {
			"id" : "562",
			"name" : "鲤城区",
			"pid" : "58"
		}, {
			"id" : "563",
			"name" : "丰泽区",
			"pid" : "58"
		}, {
			"id" : "564",
			"name" : "洛江区",
			"pid" : "58"
		}, {
			"id" : "565",
			"name" : "清濛开发区",
			"pid" : "58"
		}, {
			"id" : "566",
			"name" : "泉港区",
			"pid" : "58"
		}, {
			"id" : "567",
			"name" : "石狮市",
			"pid" : "58"
		}, {
			"id" : "568",
			"name" : "晋江市",
			"pid" : "58"
		}, {
			"id" : "569",
			"name" : "南安市",
			"pid" : "58"
		}, {
			"id" : "570",
			"name" : "惠安县",
			"pid" : "58"
		}, {
			"id" : "571",
			"name" : "安溪县",
			"pid" : "58"
		}, {
			"id" : "572",
			"name" : "永春县",
			"pid" : "58"
		}, {
			"id" : "573",
			"name" : "德化县",
			"pid" : "58"
		}, {
			"id" : "574",
			"name" : "金门县",
			"pid" : "58"
		} ],
		"name" : "泉州",
		"pid" : "4"
	}, {
		"id" : "59",
		"sub" : [ {
			"id" : "575",
			"name" : "梅列区",
			"pid" : "59"
		}, {
			"id" : "576",
			"name" : "三元区",
			"pid" : "59"
		}, {
			"id" : "577",
			"name" : "永安市",
			"pid" : "59"
		}, {
			"id" : "578",
			"name" : "明溪县",
			"pid" : "59"
		}, {
			"id" : "579",
			"name" : "清流县",
			"pid" : "59"
		}, {
			"id" : "580",
			"name" : "宁化县",
			"pid" : "59"
		}, {
			"id" : "581",
			"name" : "大田县",
			"pid" : "59"
		}, {
			"id" : "582",
			"name" : "尤溪县",
			"pid" : "59"
		}, {
			"id" : "583",
			"name" : "沙县",
			"pid" : "59"
		}, {
			"id" : "584",
			"name" : "将乐县",
			"pid" : "59"
		}, {
			"id" : "585",
			"name" : "泰宁县",
			"pid" : "59"
		}, {
			"id" : "586",
			"name" : "建宁县",
			"pid" : "59"
		} ],
		"name" : "三明",
		"pid" : "4"
	}, {
		"id" : "60",
		"sub" : [ {
			"id" : "587",
			"name" : "思明区",
			"pid" : "60"
		}, {
			"id" : "588",
			"name" : "海沧区",
			"pid" : "60"
		}, {
			"id" : "589",
			"name" : "湖里区",
			"pid" : "60"
		}, {
			"id" : "590",
			"name" : "集美区",
			"pid" : "60"
		}, {
			"id" : "591",
			"name" : "同安区",
			"pid" : "60"
		}, {
			"id" : "592",
			"name" : "翔安区",
			"pid" : "60"
		} ],
		"name" : "厦门",
		"pid" : "4"
	}, {
		"id" : "61",
		"sub" : [ {
			"id" : "593",
			"name" : "芗城区",
			"pid" : "61"
		}, {
			"id" : "594",
			"name" : "龙文区",
			"pid" : "61"
		}, {
			"id" : "595",
			"name" : "龙海市",
			"pid" : "61"
		}, {
			"id" : "596",
			"name" : "云霄县",
			"pid" : "61"
		}, {
			"id" : "597",
			"name" : "漳浦县",
			"pid" : "61"
		}, {
			"id" : "598",
			"name" : "诏安县",
			"pid" : "61"
		}, {
			"id" : "599",
			"name" : "长泰县",
			"pid" : "61"
		}, {
			"id" : "600",
			"name" : "东山县",
			"pid" : "61"
		}, {
			"id" : "601",
			"name" : "南靖县",
			"pid" : "61"
		}, {
			"id" : "602",
			"name" : "平和县",
			"pid" : "61"
		}, {
			"id" : "603",
			"name" : "华安县",
			"pid" : "61"
		} ],
		"name" : "漳州",
		"pid" : "4"
	} ],
	"name" : "福建",
	"pid" : "1"
}, {
	"id" : "5",
	"sub" : [ {
		"id" : "62",
		"sub" : [ {
			"id" : "604",
			"name" : "皋兰县",
			"pid" : "62"
		}, {
			"id" : "605",
			"name" : "城关区",
			"pid" : "62"
		}, {
			"id" : "606",
			"name" : "七里河区",
			"pid" : "62"
		}, {
			"id" : "607",
			"name" : "西固区",
			"pid" : "62"
		}, {
			"id" : "608",
			"name" : "安宁区",
			"pid" : "62"
		}, {
			"id" : "609",
			"name" : "红古区",
			"pid" : "62"
		}, {
			"id" : "610",
			"name" : "永登县",
			"pid" : "62"
		}, {
			"id" : "611",
			"name" : "榆中县",
			"pid" : "62"
		} ],
		"name" : "兰州",
		"pid" : "5"
	}, {
		"id" : "63",
		"sub" : [ {
			"id" : "612",
			"name" : "白银区",
			"pid" : "63"
		}, {
			"id" : "613",
			"name" : "平川区",
			"pid" : "63"
		}, {
			"id" : "614",
			"name" : "会宁县",
			"pid" : "63"
		}, {
			"id" : "615",
			"name" : "景泰县",
			"pid" : "63"
		}, {
			"id" : "616",
			"name" : "靖远县",
			"pid" : "63"
		} ],
		"name" : "白银",
		"pid" : "5"
	}, {
		"id" : "64",
		"sub" : [ {
			"id" : "617",
			"name" : "临洮县",
			"pid" : "64"
		}, {
			"id" : "618",
			"name" : "陇西县",
			"pid" : "64"
		}, {
			"id" : "619",
			"name" : "通渭县",
			"pid" : "64"
		}, {
			"id" : "620",
			"name" : "渭源县",
			"pid" : "64"
		}, {
			"id" : "621",
			"name" : "漳县",
			"pid" : "64"
		}, {
			"id" : "622",
			"name" : "岷县",
			"pid" : "64"
		}, {
			"id" : "623",
			"name" : "安定区",
			"pid" : "64"
		}, {
			"id" : "624",
			"name" : "安定区",
			"pid" : "64"
		} ],
		"name" : "定西",
		"pid" : "5"
	}, {
		"id" : "65",
		"sub" : [ {
			"id" : "625",
			"name" : "合作市",
			"pid" : "65"
		}, {
			"id" : "626",
			"name" : "临潭县",
			"pid" : "65"
		}, {
			"id" : "627",
			"name" : "卓尼县",
			"pid" : "65"
		}, {
			"id" : "628",
			"name" : "舟曲县",
			"pid" : "65"
		}, {
			"id" : "629",
			"name" : "迭部县",
			"pid" : "65"
		}, {
			"id" : "630",
			"name" : "玛曲县",
			"pid" : "65"
		}, {
			"id" : "631",
			"name" : "碌曲县",
			"pid" : "65"
		}, {
			"id" : "632",
			"name" : "夏河县",
			"pid" : "65"
		} ],
		"name" : "甘南",
		"pid" : "5"
	}, {
		"id" : "66",
		"sub" : [ {
			"id" : "633",
			"name" : "嘉峪关市",
			"pid" : "66"
		} ],
		"name" : "嘉峪关",
		"pid" : "5"
	}, {
		"id" : "67",
		"sub" : [ {
			"id" : "634",
			"name" : "金川区",
			"pid" : "67"
		}, {
			"id" : "635",
			"name" : "永昌县",
			"pid" : "67"
		} ],
		"name" : "金昌",
		"pid" : "5"
	}, {
		"id" : "68",
		"sub" : [ {
			"id" : "636",
			"name" : "肃州区",
			"pid" : "68"
		}, {
			"id" : "637",
			"name" : "玉门市",
			"pid" : "68"
		}, {
			"id" : "638",
			"name" : "敦煌市",
			"pid" : "68"
		}, {
			"id" : "639",
			"name" : "金塔县",
			"pid" : "68"
		}, {
			"id" : "640",
			"name" : "瓜州县",
			"pid" : "68"
		}, {
			"id" : "641",
			"name" : "肃北",
			"pid" : "68"
		}, {
			"id" : "642",
			"name" : "阿克塞",
			"pid" : "68"
		} ],
		"name" : "酒泉",
		"pid" : "5"
	}, {
		"id" : "69",
		"sub" : [ {
			"id" : "643",
			"name" : "临夏市",
			"pid" : "69"
		}, {
			"id" : "644",
			"name" : "临夏县",
			"pid" : "69"
		}, {
			"id" : "645",
			"name" : "康乐县",
			"pid" : "69"
		}, {
			"id" : "646",
			"name" : "永靖县",
			"pid" : "69"
		}, {
			"id" : "647",
			"name" : "广河县",
			"pid" : "69"
		}, {
			"id" : "648",
			"name" : "和政县",
			"pid" : "69"
		}, {
			"id" : "649",
			"name" : "东乡族自治县",
			"pid" : "69"
		}, {
			"id" : "650",
			"name" : "积石山",
			"pid" : "69"
		} ],
		"name" : "临夏",
		"pid" : "5"
	}, {
		"id" : "70",
		"sub" : [ {
			"id" : "651",
			"name" : "成县",
			"pid" : "70"
		}, {
			"id" : "652",
			"name" : "徽县",
			"pid" : "70"
		}, {
			"id" : "653",
			"name" : "康县",
			"pid" : "70"
		}, {
			"id" : "654",
			"name" : "礼县",
			"pid" : "70"
		}, {
			"id" : "655",
			"name" : "两当县",
			"pid" : "70"
		}, {
			"id" : "656",
			"name" : "文县",
			"pid" : "70"
		}, {
			"id" : "657",
			"name" : "西和县",
			"pid" : "70"
		}, {
			"id" : "658",
			"name" : "宕昌县",
			"pid" : "70"
		}, {
			"id" : "659",
			"name" : "武都区",
			"pid" : "70"
		} ],
		"name" : "陇南",
		"pid" : "5"
	}, {
		"id" : "71",
		"sub" : [ {
			"id" : "660",
			"name" : "崇信县",
			"pid" : "71"
		}, {
			"id" : "661",
			"name" : "华亭县",
			"pid" : "71"
		}, {
			"id" : "662",
			"name" : "静宁县",
			"pid" : "71"
		}, {
			"id" : "663",
			"name" : "灵台县",
			"pid" : "71"
		}, {
			"id" : "664",
			"name" : "崆峒区",
			"pid" : "71"
		}, {
			"id" : "665",
			"name" : "庄浪县",
			"pid" : "71"
		}, {
			"id" : "666",
			"name" : "泾川县",
			"pid" : "71"
		} ],
		"name" : "平凉",
		"pid" : "5"
	}, {
		"id" : "72",
		"sub" : [ {
			"id" : "667",
			"name" : "合水县",
			"pid" : "72"
		}, {
			"id" : "668",
			"name" : "华池县",
			"pid" : "72"
		}, {
			"id" : "669",
			"name" : "环县",
			"pid" : "72"
		}, {
			"id" : "670",
			"name" : "宁县",
			"pid" : "72"
		}, {
			"id" : "671",
			"name" : "庆城县",
			"pid" : "72"
		}, {
			"id" : "672",
			"name" : "西峰区",
			"pid" : "72"
		}, {
			"id" : "673",
			"name" : "镇原县",
			"pid" : "72"
		}, {
			"id" : "674",
			"name" : "正宁县",
			"pid" : "72"
		} ],
		"name" : "庆阳",
		"pid" : "5"
	}, {
		"id" : "73",
		"sub" : [ {
			"id" : "675",
			"name" : "甘谷县",
			"pid" : "73"
		}, {
			"id" : "676",
			"name" : "秦安县",
			"pid" : "73"
		}, {
			"id" : "677",
			"name" : "清水县",
			"pid" : "73"
		}, {
			"id" : "678",
			"name" : "秦州区",
			"pid" : "73"
		}, {
			"id" : "679",
			"name" : "麦积区",
			"pid" : "73"
		}, {
			"id" : "680",
			"name" : "武山县",
			"pid" : "73"
		}, {
			"id" : "681",
			"name" : "张家川",
			"pid" : "73"
		} ],
		"name" : "天水",
		"pid" : "5"
	}, {
		"id" : "74",
		"sub" : [ {
			"id" : "682",
			"name" : "古浪县",
			"pid" : "74"
		}, {
			"id" : "683",
			"name" : "民勤县",
			"pid" : "74"
		}, {
			"id" : "684",
			"name" : "天祝",
			"pid" : "74"
		}, {
			"id" : "685",
			"name" : "凉州区",
			"pid" : "74"
		} ],
		"name" : "武威",
		"pid" : "5"
	}, {
		"id" : "75",
		"sub" : [ {
			"id" : "686",
			"name" : "高台县",
			"pid" : "75"
		}, {
			"id" : "687",
			"name" : "临泽县",
			"pid" : "75"
		}, {
			"id" : "688",
			"name" : "民乐县",
			"pid" : "75"
		}, {
			"id" : "689",
			"name" : "山丹县",
			"pid" : "75"
		}, {
			"id" : "690",
			"name" : "肃南",
			"pid" : "75"
		}, {
			"id" : "691",
			"name" : "甘州区",
			"pid" : "75"
		} ],
		"name" : "张掖",
		"pid" : "5"
	} ],
	"name" : "甘肃",
	"pid" : "1"
}, {
	"id" : "6",
	"sub" : [ {
		"id" : "76",
		"sub" : [ {
			"id" : "692",
			"name" : "从化市",
			"pid" : "76"
		}, {
			"id" : "693",
			"name" : "天河区",
			"pid" : "76"
		}, {
			"id" : "694",
			"name" : "东山区",
			"pid" : "76"
		}, {
			"id" : "695",
			"name" : "白云区",
			"pid" : "76"
		}, {
			"id" : "696",
			"name" : "海珠区",
			"pid" : "76"
		}, {
			"id" : "697",
			"name" : "荔湾区",
			"pid" : "76"
		}, {
			"id" : "698",
			"name" : "越秀区",
			"pid" : "76"
		}, {
			"id" : "699",
			"name" : "黄埔区",
			"pid" : "76"
		}, {
			"id" : "700",
			"name" : "番禺区",
			"pid" : "76"
		}, {
			"id" : "701",
			"name" : "花都区",
			"pid" : "76"
		}, {
			"id" : "702",
			"name" : "增城区",
			"pid" : "76"
		}, {
			"id" : "703",
			"name" : "从化区",
			"pid" : "76"
		}, {
			"id" : "704",
			"name" : "市郊",
			"pid" : "76"
		} ],
		"name" : "广州",
		"pid" : "6"
	}, {
		"id" : "77",
		"sub" : [ {
			"id" : "705",
			"name" : "福田区",
			"pid" : "77"
		}, {
			"id" : "706",
			"name" : "罗湖区",
			"pid" : "77"
		}, {
			"id" : "707",
			"name" : "南山区",
			"pid" : "77"
		}, {
			"id" : "708",
			"name" : "宝安区",
			"pid" : "77"
		}, {
			"id" : "709",
			"name" : "龙岗区",
			"pid" : "77"
		}, {
			"id" : "710",
			"name" : "盐田区",
			"pid" : "77"
		} ],
		"name" : "深圳",
		"pid" : "6"
	}, {
		"id" : "78",
		"sub" : [ {
			"id" : "711",
			"name" : "湘桥区",
			"pid" : "78"
		}, {
			"id" : "712",
			"name" : "潮安县",
			"pid" : "78"
		}, {
			"id" : "713",
			"name" : "饶平县",
			"pid" : "78"
		} ],
		"name" : "潮州",
		"pid" : "6"
	}, {
		"id" : "79",
		"sub" : [ {
			"id" : "714",
			"name" : "南城区",
			"pid" : "79"
		}, {
			"id" : "715",
			"name" : "东城区",
			"pid" : "79"
		}, {
			"id" : "716",
			"name" : "万江区",
			"pid" : "79"
		}, {
			"id" : "717",
			"name" : "莞城区",
			"pid" : "79"
		}, {
			"id" : "718",
			"name" : "石龙镇",
			"pid" : "79"
		}, {
			"id" : "719",
			"name" : "虎门镇",
			"pid" : "79"
		}, {
			"id" : "720",
			"name" : "麻涌镇",
			"pid" : "79"
		}, {
			"id" : "721",
			"name" : "道滘镇",
			"pid" : "79"
		}, {
			"id" : "722",
			"name" : "石碣镇",
			"pid" : "79"
		}, {
			"id" : "723",
			"name" : "沙田镇",
			"pid" : "79"
		}, {
			"id" : "724",
			"name" : "望牛墩镇",
			"pid" : "79"
		}, {
			"id" : "725",
			"name" : "洪梅镇",
			"pid" : "79"
		}, {
			"id" : "726",
			"name" : "茶山镇",
			"pid" : "79"
		}, {
			"id" : "727",
			"name" : "寮步镇",
			"pid" : "79"
		}, {
			"id" : "728",
			"name" : "大岭山镇",
			"pid" : "79"
		}, {
			"id" : "729",
			"name" : "大朗镇",
			"pid" : "79"
		}, {
			"id" : "730",
			"name" : "黄江镇",
			"pid" : "79"
		}, {
			"id" : "731",
			"name" : "樟木头",
			"pid" : "79"
		}, {
			"id" : "732",
			"name" : "凤岗镇",
			"pid" : "79"
		}, {
			"id" : "733",
			"name" : "塘厦镇",
			"pid" : "79"
		}, {
			"id" : "734",
			"name" : "谢岗镇",
			"pid" : "79"
		}, {
			"id" : "735",
			"name" : "厚街镇",
			"pid" : "79"
		}, {
			"id" : "736",
			"name" : "清溪镇",
			"pid" : "79"
		}, {
			"id" : "737",
			"name" : "常平镇",
			"pid" : "79"
		}, {
			"id" : "738",
			"name" : "桥头镇",
			"pid" : "79"
		}, {
			"id" : "739",
			"name" : "横沥镇",
			"pid" : "79"
		}, {
			"id" : "740",
			"name" : "东坑镇",
			"pid" : "79"
		}, {
			"id" : "741",
			"name" : "企石镇",
			"pid" : "79"
		}, {
			"id" : "742",
			"name" : "石排镇",
			"pid" : "79"
		}, {
			"id" : "743",
			"name" : "长安镇",
			"pid" : "79"
		}, {
			"id" : "744",
			"name" : "中堂镇",
			"pid" : "79"
		}, {
			"id" : "745",
			"name" : "高埗镇",
			"pid" : "79"
		} ],
		"name" : "东莞",
		"pid" : "6"
	}, {
		"id" : "80",
		"sub" : [ {
			"id" : "746",
			"name" : "禅城区",
			"pid" : "80"
		}, {
			"id" : "747",
			"name" : "南海区",
			"pid" : "80"
		}, {
			"id" : "748",
			"name" : "顺德区",
			"pid" : "80"
		}, {
			"id" : "749",
			"name" : "三水区",
			"pid" : "80"
		}, {
			"id" : "750",
			"name" : "高明区",
			"pid" : "80"
		} ],
		"name" : "佛山",
		"pid" : "6"
	}, {
		"id" : "81",
		"sub" : [ {
			"id" : "751",
			"name" : "东源县",
			"pid" : "81"
		}, {
			"id" : "752",
			"name" : "和平县",
			"pid" : "81"
		}, {
			"id" : "753",
			"name" : "源城区",
			"pid" : "81"
		}, {
			"id" : "754",
			"name" : "连平县",
			"pid" : "81"
		}, {
			"id" : "755",
			"name" : "龙川县",
			"pid" : "81"
		}, {
			"id" : "756",
			"name" : "紫金县",
			"pid" : "81"
		} ],
		"name" : "河源",
		"pid" : "6"
	}, {
		"id" : "82",
		"sub" : [ {
			"id" : "757",
			"name" : "惠阳区",
			"pid" : "82"
		}, {
			"id" : "758",
			"name" : "惠城区",
			"pid" : "82"
		}, {
			"id" : "759",
			"name" : "大亚湾",
			"pid" : "82"
		}, {
			"id" : "760",
			"name" : "博罗县",
			"pid" : "82"
		}, {
			"id" : "761",
			"name" : "惠东县",
			"pid" : "82"
		}, {
			"id" : "762",
			"name" : "龙门县",
			"pid" : "82"
		} ],
		"name" : "惠州",
		"pid" : "6"
	}, {
		"id" : "83",
		"sub" : [ {
			"id" : "763",
			"name" : "江海区",
			"pid" : "83"
		}, {
			"id" : "764",
			"name" : "蓬江区",
			"pid" : "83"
		}, {
			"id" : "765",
			"name" : "新会区",
			"pid" : "83"
		}, {
			"id" : "766",
			"name" : "台山市",
			"pid" : "83"
		}, {
			"id" : "767",
			"name" : "开平市",
			"pid" : "83"
		}, {
			"id" : "768",
			"name" : "鹤山市",
			"pid" : "83"
		}, {
			"id" : "769",
			"name" : "恩平市",
			"pid" : "83"
		} ],
		"name" : "江门",
		"pid" : "6"
	}, {
		"id" : "84",
		"sub" : [ {
			"id" : "770",
			"name" : "榕城区",
			"pid" : "84"
		}, {
			"id" : "771",
			"name" : "普宁市",
			"pid" : "84"
		}, {
			"id" : "772",
			"name" : "揭东县",
			"pid" : "84"
		}, {
			"id" : "773",
			"name" : "揭西县",
			"pid" : "84"
		}, {
			"id" : "774",
			"name" : "惠来县",
			"pid" : "84"
		} ],
		"name" : "揭阳",
		"pid" : "6"
	}, {
		"id" : "85",
		"sub" : [ {
			"id" : "775",
			"name" : "茂南区",
			"pid" : "85"
		}, {
			"id" : "776",
			"name" : "茂港区",
			"pid" : "85"
		}, {
			"id" : "777",
			"name" : "高州市",
			"pid" : "85"
		}, {
			"id" : "778",
			"name" : "化州市",
			"pid" : "85"
		}, {
			"id" : "779",
			"name" : "信宜市",
			"pid" : "85"
		}, {
			"id" : "780",
			"name" : "电白县",
			"pid" : "85"
		} ],
		"name" : "茂名",
		"pid" : "6"
	}, {
		"id" : "86",
		"sub" : [ {
			"id" : "781",
			"name" : "梅县",
			"pid" : "86"
		}, {
			"id" : "782",
			"name" : "梅江区",
			"pid" : "86"
		}, {
			"id" : "783",
			"name" : "兴宁市",
			"pid" : "86"
		}, {
			"id" : "784",
			"name" : "大埔县",
			"pid" : "86"
		}, {
			"id" : "785",
			"name" : "丰顺县",
			"pid" : "86"
		}, {
			"id" : "786",
			"name" : "五华县",
			"pid" : "86"
		}, {
			"id" : "787",
			"name" : "平远县",
			"pid" : "86"
		}, {
			"id" : "788",
			"name" : "蕉岭县",
			"pid" : "86"
		} ],
		"name" : "梅州",
		"pid" : "6"
	}, {
		"id" : "87",
		"sub" : [ {
			"id" : "789",
			"name" : "清城区",
			"pid" : "87"
		}, {
			"id" : "790",
			"name" : "英德市",
			"pid" : "87"
		}, {
			"id" : "791",
			"name" : "连州市",
			"pid" : "87"
		}, {
			"id" : "792",
			"name" : "佛冈县",
			"pid" : "87"
		}, {
			"id" : "793",
			"name" : "阳山县",
			"pid" : "87"
		}, {
			"id" : "794",
			"name" : "清新县",
			"pid" : "87"
		}, {
			"id" : "795",
			"name" : "连山",
			"pid" : "87"
		}, {
			"id" : "796",
			"name" : "连南",
			"pid" : "87"
		} ],
		"name" : "清远",
		"pid" : "6"
	}, {
		"id" : "88",
		"sub" : [ {
			"id" : "797",
			"name" : "南澳县",
			"pid" : "88"
		}, {
			"id" : "798",
			"name" : "潮阳区",
			"pid" : "88"
		}, {
			"id" : "799",
			"name" : "澄海区",
			"pid" : "88"
		}, {
			"id" : "800",
			"name" : "龙湖区",
			"pid" : "88"
		}, {
			"id" : "801",
			"name" : "金平区",
			"pid" : "88"
		}, {
			"id" : "802",
			"name" : "濠江区",
			"pid" : "88"
		}, {
			"id" : "803",
			"name" : "潮南区",
			"pid" : "88"
		} ],
		"name" : "汕头",
		"pid" : "6"
	}, {
		"id" : "89",
		"sub" : [ {
			"id" : "804",
			"name" : "城区",
			"pid" : "89"
		}, {
			"id" : "805",
			"name" : "陆丰市",
			"pid" : "89"
		}, {
			"id" : "806",
			"name" : "海丰县",
			"pid" : "89"
		}, {
			"id" : "807",
			"name" : "陆河县",
			"pid" : "89"
		} ],
		"name" : "汕尾",
		"pid" : "6"
	}, {
		"id" : "90",
		"sub" : [ {
			"id" : "808",
			"name" : "曲江县",
			"pid" : "90"
		}, {
			"id" : "809",
			"name" : "浈江区",
			"pid" : "90"
		}, {
			"id" : "810",
			"name" : "武江区",
			"pid" : "90"
		}, {
			"id" : "811",
			"name" : "曲江区",
			"pid" : "90"
		}, {
			"id" : "812",
			"name" : "乐昌市",
			"pid" : "90"
		}, {
			"id" : "813",
			"name" : "南雄市",
			"pid" : "90"
		}, {
			"id" : "814",
			"name" : "始兴县",
			"pid" : "90"
		}, {
			"id" : "815",
			"name" : "仁化县",
			"pid" : "90"
		}, {
			"id" : "816",
			"name" : "翁源县",
			"pid" : "90"
		}, {
			"id" : "817",
			"name" : "新丰县",
			"pid" : "90"
		}, {
			"id" : "818",
			"name" : "乳源",
			"pid" : "90"
		} ],
		"name" : "韶关",
		"pid" : "6"
	}, {
		"id" : "91",
		"sub" : [ {
			"id" : "819",
			"name" : "江城区",
			"pid" : "91"
		}, {
			"id" : "820",
			"name" : "阳春市",
			"pid" : "91"
		}, {
			"id" : "821",
			"name" : "阳西县",
			"pid" : "91"
		}, {
			"id" : "822",
			"name" : "阳东县",
			"pid" : "91"
		} ],
		"name" : "阳江",
		"pid" : "6"
	}, {
		"id" : "92",
		"sub" : [ {
			"id" : "823",
			"name" : "云城区",
			"pid" : "92"
		}, {
			"id" : "824",
			"name" : "罗定市",
			"pid" : "92"
		}, {
			"id" : "825",
			"name" : "新兴县",
			"pid" : "92"
		}, {
			"id" : "826",
			"name" : "郁南县",
			"pid" : "92"
		}, {
			"id" : "827",
			"name" : "云安县",
			"pid" : "92"
		} ],
		"name" : "云浮",
		"pid" : "6"
	}, {
		"id" : "93",
		"sub" : [ {
			"id" : "828",
			"name" : "赤坎区",
			"pid" : "93"
		}, {
			"id" : "829",
			"name" : "霞山区",
			"pid" : "93"
		}, {
			"id" : "830",
			"name" : "坡头区",
			"pid" : "93"
		}, {
			"id" : "831",
			"name" : "麻章区",
			"pid" : "93"
		}, {
			"id" : "832",
			"name" : "廉江市",
			"pid" : "93"
		}, {
			"id" : "833",
			"name" : "雷州市",
			"pid" : "93"
		}, {
			"id" : "834",
			"name" : "吴川市",
			"pid" : "93"
		}, {
			"id" : "835",
			"name" : "遂溪县",
			"pid" : "93"
		}, {
			"id" : "836",
			"name" : "徐闻县",
			"pid" : "93"
		} ],
		"name" : "湛江",
		"pid" : "6"
	}, {
		"id" : "94",
		"sub" : [ {
			"id" : "837",
			"name" : "肇庆市",
			"pid" : "94"
		}, {
			"id" : "838",
			"name" : "高要市",
			"pid" : "94"
		}, {
			"id" : "839",
			"name" : "四会市",
			"pid" : "94"
		}, {
			"id" : "840",
			"name" : "广宁县",
			"pid" : "94"
		}, {
			"id" : "841",
			"name" : "怀集县",
			"pid" : "94"
		}, {
			"id" : "842",
			"name" : "封开县",
			"pid" : "94"
		}, {
			"id" : "843",
			"name" : "德庆县",
			"pid" : "94"
		} ],
		"name" : "肇庆",
		"pid" : "6"
	}, {
		"id" : "95",
		"sub" : [ {
			"id" : "844",
			"name" : "石岐街道",
			"pid" : "95"
		}, {
			"id" : "845",
			"name" : "东区街道",
			"pid" : "95"
		}, {
			"id" : "846",
			"name" : "西区街道",
			"pid" : "95"
		}, {
			"id" : "847",
			"name" : "环城街道",
			"pid" : "95"
		}, {
			"id" : "848",
			"name" : "中山港街道",
			"pid" : "95"
		}, {
			"id" : "849",
			"name" : "五桂山街道",
			"pid" : "95"
		} ],
		"name" : "中山",
		"pid" : "6"
	}, {
		"id" : "96",
		"sub" : [ {
			"id" : "850",
			"name" : "香洲区",
			"pid" : "96"
		}, {
			"id" : "851",
			"name" : "斗门区",
			"pid" : "96"
		}, {
			"id" : "852",
			"name" : "金湾区",
			"pid" : "96"
		} ],
		"name" : "珠海",
		"pid" : "6"
	} ],
	"name" : "广东",
	"pid" : "1"
}, {
	"id" : "7",
	"sub" : [ {
		"id" : "97",
		"sub" : [ {
			"id" : "853",
			"name" : "邕宁区",
			"pid" : "97"
		}, {
			"id" : "854",
			"name" : "青秀区",
			"pid" : "97"
		}, {
			"id" : "855",
			"name" : "兴宁区",
			"pid" : "97"
		}, {
			"id" : "856",
			"name" : "良庆区",
			"pid" : "97"
		}, {
			"id" : "857",
			"name" : "西乡塘区",
			"pid" : "97"
		}, {
			"id" : "858",
			"name" : "江南区",
			"pid" : "97"
		}, {
			"id" : "859",
			"name" : "武鸣县",
			"pid" : "97"
		}, {
			"id" : "860",
			"name" : "隆安县",
			"pid" : "97"
		}, {
			"id" : "861",
			"name" : "马山县",
			"pid" : "97"
		}, {
			"id" : "862",
			"name" : "上林县",
			"pid" : "97"
		}, {
			"id" : "863",
			"name" : "宾阳县",
			"pid" : "97"
		}, {
			"id" : "864",
			"name" : "横县",
			"pid" : "97"
		} ],
		"name" : "南宁",
		"pid" : "7"
	}, {
		"id" : "98",
		"sub" : [ {
			"id" : "865",
			"name" : "秀峰区",
			"pid" : "98"
		}, {
			"id" : "866",
			"name" : "叠彩区",
			"pid" : "98"
		}, {
			"id" : "867",
			"name" : "象山区",
			"pid" : "98"
		}, {
			"id" : "868",
			"name" : "七星区",
			"pid" : "98"
		}, {
			"id" : "869",
			"name" : "雁山区",
			"pid" : "98"
		}, {
			"id" : "870",
			"name" : "阳朔县",
			"pid" : "98"
		}, {
			"id" : "871",
			"name" : "临桂县",
			"pid" : "98"
		}, {
			"id" : "872",
			"name" : "灵川县",
			"pid" : "98"
		}, {
			"id" : "873",
			"name" : "全州县",
			"pid" : "98"
		}, {
			"id" : "874",
			"name" : "平乐县",
			"pid" : "98"
		}, {
			"id" : "875",
			"name" : "兴安县",
			"pid" : "98"
		}, {
			"id" : "876",
			"name" : "灌阳县",
			"pid" : "98"
		}, {
			"id" : "877",
			"name" : "荔浦县",
			"pid" : "98"
		}, {
			"id" : "878",
			"name" : "资源县",
			"pid" : "98"
		}, {
			"id" : "879",
			"name" : "永福县",
			"pid" : "98"
		}, {
			"id" : "880",
			"name" : "龙胜",
			"pid" : "98"
		}, {
			"id" : "881",
			"name" : "恭城",
			"pid" : "98"
		} ],
		"name" : "桂林",
		"pid" : "7"
	}, {
		"id" : "99",
		"sub" : [ {
			"id" : "882",
			"name" : "右江区",
			"pid" : "99"
		}, {
			"id" : "883",
			"name" : "凌云县",
			"pid" : "99"
		}, {
			"id" : "884",
			"name" : "平果县",
			"pid" : "99"
		}, {
			"id" : "885",
			"name" : "西林县",
			"pid" : "99"
		}, {
			"id" : "886",
			"name" : "乐业县",
			"pid" : "99"
		}, {
			"id" : "887",
			"name" : "德保县",
			"pid" : "99"
		}, {
			"id" : "888",
			"name" : "田林县",
			"pid" : "99"
		}, {
			"id" : "889",
			"name" : "田阳县",
			"pid" : "99"
		}, {
			"id" : "890",
			"name" : "靖西县",
			"pid" : "99"
		}, {
			"id" : "891",
			"name" : "田东县",
			"pid" : "99"
		}, {
			"id" : "892",
			"name" : "那坡县",
			"pid" : "99"
		}, {
			"id" : "893",
			"name" : "隆林",
			"pid" : "99"
		} ],
		"name" : "百色",
		"pid" : "7"
	}, {
		"id" : "100",
		"sub" : [ {
			"id" : "894",
			"name" : "海城区",
			"pid" : "100"
		}, {
			"id" : "895",
			"name" : "银海区",
			"pid" : "100"
		}, {
			"id" : "896",
			"name" : "铁山港区",
			"pid" : "100"
		}, {
			"id" : "897",
			"name" : "合浦县",
			"pid" : "100"
		} ],
		"name" : "北海",
		"pid" : "7"
	}, {
		"id" : "101",
		"sub" : [ {
			"id" : "898",
			"name" : "江州区",
			"pid" : "101"
		}, {
			"id" : "899",
			"name" : "凭祥市",
			"pid" : "101"
		}, {
			"id" : "900",
			"name" : "宁明县",
			"pid" : "101"
		}, {
			"id" : "901",
			"name" : "扶绥县",
			"pid" : "101"
		}, {
			"id" : "902",
			"name" : "龙州县",
			"pid" : "101"
		}, {
			"id" : "903",
			"name" : "大新县",
			"pid" : "101"
		}, {
			"id" : "904",
			"name" : "天等县",
			"pid" : "101"
		} ],
		"name" : "崇左",
		"pid" : "7"
	}, {
		"id" : "102",
		"sub" : [ {
			"id" : "905",
			"name" : "港口区",
			"pid" : "102"
		}, {
			"id" : "906",
			"name" : "防城区",
			"pid" : "102"
		}, {
			"id" : "907",
			"name" : "东兴市",
			"pid" : "102"
		}, {
			"id" : "908",
			"name" : "上思县",
			"pid" : "102"
		} ],
		"name" : "防城港",
		"pid" : "7"
	}, {
		"id" : "103",
		"sub" : [ {
			"id" : "909",
			"name" : "港北区",
			"pid" : "103"
		}, {
			"id" : "910",
			"name" : "港南区",
			"pid" : "103"
		}, {
			"id" : "911",
			"name" : "覃塘区",
			"pid" : "103"
		}, {
			"id" : "912",
			"name" : "桂平市",
			"pid" : "103"
		}, {
			"id" : "913",
			"name" : "平南县",
			"pid" : "103"
		} ],
		"name" : "贵港",
		"pid" : "7"
	}, {
		"id" : "104",
		"sub" : [ {
			"id" : "914",
			"name" : "金城江区",
			"pid" : "104"
		}, {
			"id" : "915",
			"name" : "宜州市",
			"pid" : "104"
		}, {
			"id" : "916",
			"name" : "天峨县",
			"pid" : "104"
		}, {
			"id" : "917",
			"name" : "凤山县",
			"pid" : "104"
		}, {
			"id" : "918",
			"name" : "南丹县",
			"pid" : "104"
		}, {
			"id" : "919",
			"name" : "东兰县",
			"pid" : "104"
		}, {
			"id" : "920",
			"name" : "都安",
			"pid" : "104"
		}, {
			"id" : "921",
			"name" : "罗城",
			"pid" : "104"
		}, {
			"id" : "922",
			"name" : "巴马",
			"pid" : "104"
		}, {
			"id" : "923",
			"name" : "环江",
			"pid" : "104"
		}, {
			"id" : "924",
			"name" : "大化",
			"pid" : "104"
		} ],
		"name" : "河池",
		"pid" : "7"
	}, {
		"id" : "105",
		"sub" : [ {
			"id" : "925",
			"name" : "八步区",
			"pid" : "105"
		}, {
			"id" : "926",
			"name" : "钟山县",
			"pid" : "105"
		}, {
			"id" : "927",
			"name" : "昭平县",
			"pid" : "105"
		}, {
			"id" : "928",
			"name" : "富川",
			"pid" : "105"
		} ],
		"name" : "贺州",
		"pid" : "7"
	}, {
		"id" : "106",
		"sub" : [ {
			"id" : "929",
			"name" : "兴宾区",
			"pid" : "106"
		}, {
			"id" : "930",
			"name" : "合山市",
			"pid" : "106"
		}, {
			"id" : "931",
			"name" : "象州县",
			"pid" : "106"
		}, {
			"id" : "932",
			"name" : "武宣县",
			"pid" : "106"
		}, {
			"id" : "933",
			"name" : "忻城县",
			"pid" : "106"
		}, {
			"id" : "934",
			"name" : "金秀",
			"pid" : "106"
		} ],
		"name" : "来宾",
		"pid" : "7"
	}, {
		"id" : "107",
		"sub" : [ {
			"id" : "935",
			"name" : "城中区",
			"pid" : "107"
		}, {
			"id" : "936",
			"name" : "鱼峰区",
			"pid" : "107"
		}, {
			"id" : "937",
			"name" : "柳北区",
			"pid" : "107"
		}, {
			"id" : "938",
			"name" : "柳南区",
			"pid" : "107"
		}, {
			"id" : "939",
			"name" : "柳江县",
			"pid" : "107"
		}, {
			"id" : "940",
			"name" : "柳城县",
			"pid" : "107"
		}, {
			"id" : "941",
			"name" : "鹿寨县",
			"pid" : "107"
		}, {
			"id" : "942",
			"name" : "融安县",
			"pid" : "107"
		}, {
			"id" : "943",
			"name" : "融水",
			"pid" : "107"
		}, {
			"id" : "944",
			"name" : "三江",
			"pid" : "107"
		} ],
		"name" : "柳州",
		"pid" : "7"
	}, {
		"id" : "108",
		"sub" : [ {
			"id" : "945",
			"name" : "钦南区",
			"pid" : "108"
		}, {
			"id" : "946",
			"name" : "钦北区",
			"pid" : "108"
		}, {
			"id" : "947",
			"name" : "灵山县",
			"pid" : "108"
		}, {
			"id" : "948",
			"name" : "浦北县",
			"pid" : "108"
		} ],
		"name" : "钦州",
		"pid" : "7"
	}, {
		"id" : "109",
		"sub" : [ {
			"id" : "949",
			"name" : "万秀区",
			"pid" : "109"
		}, {
			"id" : "950",
			"name" : "蝶山区",
			"pid" : "109"
		}, {
			"id" : "951",
			"name" : "长洲区",
			"pid" : "109"
		}, {
			"id" : "952",
			"name" : "岑溪市",
			"pid" : "109"
		}, {
			"id" : "953",
			"name" : "苍梧县",
			"pid" : "109"
		}, {
			"id" : "954",
			"name" : "藤县",
			"pid" : "109"
		}, {
			"id" : "955",
			"name" : "蒙山县",
			"pid" : "109"
		} ],
		"name" : "梧州",
		"pid" : "7"
	}, {
		"id" : "110",
		"sub" : [ {
			"id" : "956",
			"name" : "玉州区",
			"pid" : "110"
		}, {
			"id" : "957",
			"name" : "北流市",
			"pid" : "110"
		}, {
			"id" : "958",
			"name" : "容县",
			"pid" : "110"
		}, {
			"id" : "959",
			"name" : "陆川县",
			"pid" : "110"
		}, {
			"id" : "960",
			"name" : "博白县",
			"pid" : "110"
		}, {
			"id" : "961",
			"name" : "兴业县",
			"pid" : "110"
		} ],
		"name" : "玉林",
		"pid" : "7"
	} ],
	"name" : "广西",
	"pid" : "1"
}, {
	"id" : "8",
	"sub" : [ {
		"id" : "111",
		"sub" : [ {
			"id" : "962",
			"name" : "南明区",
			"pid" : "111"
		}, {
			"id" : "963",
			"name" : "云岩区",
			"pid" : "111"
		}, {
			"id" : "964",
			"name" : "花溪区",
			"pid" : "111"
		}, {
			"id" : "965",
			"name" : "乌当区",
			"pid" : "111"
		}, {
			"id" : "966",
			"name" : "白云区",
			"pid" : "111"
		}, {
			"id" : "967",
			"name" : "小河区",
			"pid" : "111"
		}, {
			"id" : "968",
			"name" : "金阳新区",
			"pid" : "111"
		}, {
			"id" : "969",
			"name" : "新天园区",
			"pid" : "111"
		}, {
			"id" : "970",
			"name" : "清镇市",
			"pid" : "111"
		}, {
			"id" : "971",
			"name" : "开阳县",
			"pid" : "111"
		}, {
			"id" : "972",
			"name" : "修文县",
			"pid" : "111"
		}, {
			"id" : "973",
			"name" : "息烽县",
			"pid" : "111"
		} ],
		"name" : "贵阳",
		"pid" : "8"
	}, {
		"id" : "112",
		"sub" : [ {
			"id" : "974",
			"name" : "西秀区",
			"pid" : "112"
		}, {
			"id" : "975",
			"name" : "关岭",
			"pid" : "112"
		}, {
			"id" : "976",
			"name" : "镇宁",
			"pid" : "112"
		}, {
			"id" : "977",
			"name" : "紫云",
			"pid" : "112"
		}, {
			"id" : "978",
			"name" : "平坝县",
			"pid" : "112"
		}, {
			"id" : "979",
			"name" : "普定县",
			"pid" : "112"
		} ],
		"name" : "安顺",
		"pid" : "8"
	}, {
		"id" : "113",
		"sub" : [ {
			"id" : "980",
			"name" : "毕节市",
			"pid" : "113"
		}, {
			"id" : "981",
			"name" : "大方县",
			"pid" : "113"
		}, {
			"id" : "982",
			"name" : "黔西县",
			"pid" : "113"
		}, {
			"id" : "983",
			"name" : "金沙县",
			"pid" : "113"
		}, {
			"id" : "984",
			"name" : "织金县",
			"pid" : "113"
		}, {
			"id" : "985",
			"name" : "纳雍县",
			"pid" : "113"
		}, {
			"id" : "986",
			"name" : "赫章县",
			"pid" : "113"
		}, {
			"id" : "987",
			"name" : "威宁",
			"pid" : "113"
		} ],
		"name" : "毕节",
		"pid" : "8"
	}, {
		"id" : "114",
		"sub" : [ {
			"id" : "988",
			"name" : "钟山区",
			"pid" : "114"
		}, {
			"id" : "989",
			"name" : "六枝特区",
			"pid" : "114"
		}, {
			"id" : "990",
			"name" : "水城县",
			"pid" : "114"
		}, {
			"id" : "991",
			"name" : "盘县",
			"pid" : "114"
		} ],
		"name" : "六盘水",
		"pid" : "8"
	}, {
		"id" : "115",
		"sub" : [ {
			"id" : "992",
			"name" : "凯里市",
			"pid" : "115"
		}, {
			"id" : "993",
			"name" : "黄平县",
			"pid" : "115"
		}, {
			"id" : "994",
			"name" : "施秉县",
			"pid" : "115"
		}, {
			"id" : "995",
			"name" : "三穗县",
			"pid" : "115"
		}, {
			"id" : "996",
			"name" : "镇远县",
			"pid" : "115"
		}, {
			"id" : "997",
			"name" : "岑巩县",
			"pid" : "115"
		}, {
			"id" : "998",
			"name" : "天柱县",
			"pid" : "115"
		}, {
			"id" : "999",
			"name" : "锦屏县",
			"pid" : "115"
		}, {
			"id" : "1000",
			"name" : "剑河县",
			"pid" : "115"
		}, {
			"id" : "1001",
			"name" : "台江县",
			"pid" : "115"
		}, {
			"id" : "1002",
			"name" : "黎平县",
			"pid" : "115"
		}, {
			"id" : "1003",
			"name" : "榕江县",
			"pid" : "115"
		}, {
			"id" : "1004",
			"name" : "从江县",
			"pid" : "115"
		}, {
			"id" : "1005",
			"name" : "雷山县",
			"pid" : "115"
		}, {
			"id" : "1006",
			"name" : "麻江县",
			"pid" : "115"
		}, {
			"id" : "1007",
			"name" : "丹寨县",
			"pid" : "115"
		} ],
		"name" : "黔东南",
		"pid" : "8"
	}, {
		"id" : "116",
		"sub" : [ {
			"id" : "1008",
			"name" : "都匀市",
			"pid" : "116"
		}, {
			"id" : "1009",
			"name" : "福泉市",
			"pid" : "116"
		}, {
			"id" : "1010",
			"name" : "荔波县",
			"pid" : "116"
		}, {
			"id" : "1011",
			"name" : "贵定县",
			"pid" : "116"
		}, {
			"id" : "1012",
			"name" : "瓮安县",
			"pid" : "116"
		}, {
			"id" : "1013",
			"name" : "独山县",
			"pid" : "116"
		}, {
			"id" : "1014",
			"name" : "平塘县",
			"pid" : "116"
		}, {
			"id" : "1015",
			"name" : "罗甸县",
			"pid" : "116"
		}, {
			"id" : "1016",
			"name" : "长顺县",
			"pid" : "116"
		}, {
			"id" : "1017",
			"name" : "龙里县",
			"pid" : "116"
		}, {
			"id" : "1018",
			"name" : "惠水县",
			"pid" : "116"
		}, {
			"id" : "1019",
			"name" : "三都",
			"pid" : "116"
		} ],
		"name" : "黔南",
		"pid" : "8"
	}, {
		"id" : "117",
		"sub" : [ {
			"id" : "1020",
			"name" : "兴义市",
			"pid" : "117"
		}, {
			"id" : "1021",
			"name" : "兴仁县",
			"pid" : "117"
		}, {
			"id" : "1022",
			"name" : "普安县",
			"pid" : "117"
		}, {
			"id" : "1023",
			"name" : "晴隆县",
			"pid" : "117"
		}, {
			"id" : "1024",
			"name" : "贞丰县",
			"pid" : "117"
		}, {
			"id" : "1025",
			"name" : "望谟县",
			"pid" : "117"
		}, {
			"id" : "1026",
			"name" : "册亨县",
			"pid" : "117"
		}, {
			"id" : "1027",
			"name" : "安龙县",
			"pid" : "117"
		} ],
		"name" : "黔西南",
		"pid" : "8"
	}, {
		"id" : "118",
		"sub" : [ {
			"id" : "1028",
			"name" : "铜仁市",
			"pid" : "118"
		}, {
			"id" : "1029",
			"name" : "江口县",
			"pid" : "118"
		}, {
			"id" : "1030",
			"name" : "石阡县",
			"pid" : "118"
		}, {
			"id" : "1031",
			"name" : "思南县",
			"pid" : "118"
		}, {
			"id" : "1032",
			"name" : "德江县",
			"pid" : "118"
		}, {
			"id" : "1033",
			"name" : "玉屏",
			"pid" : "118"
		}, {
			"id" : "1034",
			"name" : "印江",
			"pid" : "118"
		}, {
			"id" : "1035",
			"name" : "沿河",
			"pid" : "118"
		}, {
			"id" : "1036",
			"name" : "松桃",
			"pid" : "118"
		}, {
			"id" : "1037",
			"name" : "万山特区",
			"pid" : "118"
		} ],
		"name" : "铜仁",
		"pid" : "8"
	}, {
		"id" : "119",
		"sub" : [ {
			"id" : "1038",
			"name" : "红花岗区",
			"pid" : "119"
		}, {
			"id" : "1039",
			"name" : "务川县",
			"pid" : "119"
		}, {
			"id" : "1040",
			"name" : "道真县",
			"pid" : "119"
		}, {
			"id" : "1041",
			"name" : "汇川区",
			"pid" : "119"
		}, {
			"id" : "1042",
			"name" : "赤水市",
			"pid" : "119"
		}, {
			"id" : "1043",
			"name" : "仁怀市",
			"pid" : "119"
		}, {
			"id" : "1044",
			"name" : "遵义县",
			"pid" : "119"
		}, {
			"id" : "1045",
			"name" : "桐梓县",
			"pid" : "119"
		}, {
			"id" : "1046",
			"name" : "绥阳县",
			"pid" : "119"
		}, {
			"id" : "1047",
			"name" : "正安县",
			"pid" : "119"
		}, {
			"id" : "1048",
			"name" : "凤冈县",
			"pid" : "119"
		}, {
			"id" : "1049",
			"name" : "湄潭县",
			"pid" : "119"
		}, {
			"id" : "1050",
			"name" : "余庆县",
			"pid" : "119"
		}, {
			"id" : "1051",
			"name" : "习水县",
			"pid" : "119"
		}, {
			"id" : "1052",
			"name" : "道真",
			"pid" : "119"
		}, {
			"id" : "1053",
			"name" : "务川",
			"pid" : "119"
		} ],
		"name" : "遵义",
		"pid" : "8"
	} ],
	"name" : "贵州",
	"pid" : "1"
}, {
	"id" : "9",
	"sub" : [ {
		"id" : "120",
		"sub" : [ {
			"id" : "1054",
			"name" : "秀英区",
			"pid" : "120"
		}, {
			"id" : "1055",
			"name" : "龙华区",
			"pid" : "120"
		}, {
			"id" : "1056",
			"name" : "琼山区",
			"pid" : "120"
		}, {
			"id" : "1057",
			"name" : "美兰区",
			"pid" : "120"
		} ],
		"name" : "海口",
		"pid" : "9"
	}, {
		"id" : "121",
		"name" : "三亚",
		"pid" : "9"
	}, {
		"id" : "122",
		"name" : "白沙",
		"pid" : "9"
	}, {
		"id" : "123",
		"name" : "保亭",
		"pid" : "9"
	}, {
		"id" : "124",
		"name" : "昌江",
		"pid" : "9"
	}, {
		"id" : "125",
		"name" : "澄迈县",
		"pid" : "9"
	}, {
		"id" : "126",
		"name" : "定安县",
		"pid" : "9"
	}, {
		"id" : "127",
		"name" : "东方",
		"pid" : "9"
	}, {
		"id" : "128",
		"name" : "乐东",
		"pid" : "9"
	}, {
		"id" : "129",
		"name" : "临高县",
		"pid" : "9"
	}, {
		"id" : "130",
		"name" : "陵水",
		"pid" : "9"
	}, {
		"id" : "131",
		"name" : "琼海",
		"pid" : "9"
	}, {
		"id" : "132",
		"name" : "琼中",
		"pid" : "9"
	}, {
		"id" : "133",
		"name" : "屯昌县",
		"pid" : "9"
	}, {
		"id" : "134",
		"name" : "万宁",
		"pid" : "9"
	}, {
		"id" : "135",
		"name" : "文昌",
		"pid" : "9"
	}, {
		"id" : "136",
		"name" : "五指山",
		"pid" : "9"
	}, {
		"id" : "137",
		"sub" : [ {
			"id" : "1058",
			"name" : "市区",
			"pid" : "137"
		}, {
			"id" : "1059",
			"name" : "洋浦开发区",
			"pid" : "137"
		}, {
			"id" : "1060",
			"name" : "那大镇",
			"pid" : "137"
		}, {
			"id" : "1061",
			"name" : "王五镇",
			"pid" : "137"
		}, {
			"id" : "1062",
			"name" : "雅星镇",
			"pid" : "137"
		}, {
			"id" : "1063",
			"name" : "大成镇",
			"pid" : "137"
		}, {
			"id" : "1064",
			"name" : "中和镇",
			"pid" : "137"
		}, {
			"id" : "1065",
			"name" : "峨蔓镇",
			"pid" : "137"
		}, {
			"id" : "1066",
			"name" : "南丰镇",
			"pid" : "137"
		}, {
			"id" : "1067",
			"name" : "白马井镇",
			"pid" : "137"
		}, {
			"id" : "1068",
			"name" : "兰洋镇",
			"pid" : "137"
		}, {
			"id" : "1069",
			"name" : "和庆镇",
			"pid" : "137"
		}, {
			"id" : "1070",
			"name" : "海头镇",
			"pid" : "137"
		}, {
			"id" : "1071",
			"name" : "排浦镇",
			"pid" : "137"
		}, {
			"id" : "1072",
			"name" : "东成镇",
			"pid" : "137"
		}, {
			"id" : "1073",
			"name" : "光村镇",
			"pid" : "137"
		}, {
			"id" : "1074",
			"name" : "木棠镇",
			"pid" : "137"
		}, {
			"id" : "1075",
			"name" : "新州镇",
			"pid" : "137"
		}, {
			"id" : "1076",
			"name" : "三都镇",
			"pid" : "137"
		}, {
			"id" : "1077",
			"name" : "其他",
			"pid" : "137"
		} ],
		"name" : "儋州",
		"pid" : "9"
	} ],
	"name" : "海南",
	"pid" : "1"
}, {
	"id" : "10",
	"sub" : [ {
		"id" : "138",
		"sub" : [ {
			"id" : "1078",
			"name" : "长安区",
			"pid" : "138"
		}, {
			"id" : "1079",
			"name" : "桥东区",
			"pid" : "138"
		}, {
			"id" : "1080",
			"name" : "桥西区",
			"pid" : "138"
		}, {
			"id" : "1081",
			"name" : "新华区",
			"pid" : "138"
		}, {
			"id" : "1082",
			"name" : "裕华区",
			"pid" : "138"
		}, {
			"id" : "1083",
			"name" : "井陉矿区",
			"pid" : "138"
		}, {
			"id" : "1084",
			"name" : "高新区",
			"pid" : "138"
		}, {
			"id" : "1085",
			"name" : "辛集市",
			"pid" : "138"
		}, {
			"id" : "1086",
			"name" : "藁城市",
			"pid" : "138"
		}, {
			"id" : "1087",
			"name" : "晋州市",
			"pid" : "138"
		}, {
			"id" : "1088",
			"name" : "新乐市",
			"pid" : "138"
		}, {
			"id" : "1089",
			"name" : "鹿泉市",
			"pid" : "138"
		}, {
			"id" : "1090",
			"name" : "井陉县",
			"pid" : "138"
		}, {
			"id" : "1091",
			"name" : "正定县",
			"pid" : "138"
		}, {
			"id" : "1092",
			"name" : "栾城县",
			"pid" : "138"
		}, {
			"id" : "1093",
			"name" : "行唐县",
			"pid" : "138"
		}, {
			"id" : "1094",
			"name" : "灵寿县",
			"pid" : "138"
		}, {
			"id" : "1095",
			"name" : "高邑县",
			"pid" : "138"
		}, {
			"id" : "1096",
			"name" : "深泽县",
			"pid" : "138"
		}, {
			"id" : "1097",
			"name" : "赞皇县",
			"pid" : "138"
		}, {
			"id" : "1098",
			"name" : "无极县",
			"pid" : "138"
		}, {
			"id" : "1099",
			"name" : "平山县",
			"pid" : "138"
		}, {
			"id" : "1100",
			"name" : "元氏县",
			"pid" : "138"
		}, {
			"id" : "1101",
			"name" : "赵县",
			"pid" : "138"
		} ],
		"name" : "石家庄",
		"pid" : "10"
	}, {
		"id" : "139",
		"sub" : [ {
			"id" : "1102",
			"name" : "新市区",
			"pid" : "139"
		}, {
			"id" : "1103",
			"name" : "南市区",
			"pid" : "139"
		}, {
			"id" : "1104",
			"name" : "北市区",
			"pid" : "139"
		}, {
			"id" : "1105",
			"name" : "涿州市",
			"pid" : "139"
		}, {
			"id" : "1106",
			"name" : "定州市",
			"pid" : "139"
		}, {
			"id" : "1107",
			"name" : "安国市",
			"pid" : "139"
		}, {
			"id" : "1108",
			"name" : "高碑店市",
			"pid" : "139"
		}, {
			"id" : "1109",
			"name" : "满城县",
			"pid" : "139"
		}, {
			"id" : "1110",
			"name" : "清苑县",
			"pid" : "139"
		}, {
			"id" : "1111",
			"name" : "涞水县",
			"pid" : "139"
		}, {
			"id" : "1112",
			"name" : "阜平县",
			"pid" : "139"
		}, {
			"id" : "1113",
			"name" : "徐水县",
			"pid" : "139"
		}, {
			"id" : "1114",
			"name" : "定兴县",
			"pid" : "139"
		}, {
			"id" : "1115",
			"name" : "唐县",
			"pid" : "139"
		}, {
			"id" : "1116",
			"name" : "高阳县",
			"pid" : "139"
		}, {
			"id" : "1117",
			"name" : "容城县",
			"pid" : "139"
		}, {
			"id" : "1118",
			"name" : "涞源县",
			"pid" : "139"
		}, {
			"id" : "1119",
			"name" : "望都县",
			"pid" : "139"
		}, {
			"id" : "1120",
			"name" : "安新县",
			"pid" : "139"
		}, {
			"id" : "1121",
			"name" : "易县",
			"pid" : "139"
		}, {
			"id" : "1122",
			"name" : "曲阳县",
			"pid" : "139"
		}, {
			"id" : "1123",
			"name" : "蠡县",
			"pid" : "139"
		}, {
			"id" : "1124",
			"name" : "顺平县",
			"pid" : "139"
		}, {
			"id" : "1125",
			"name" : "博野县",
			"pid" : "139"
		}, {
			"id" : "1126",
			"name" : "雄县",
			"pid" : "139"
		} ],
		"name" : "保定",
		"pid" : "10"
	}, {
		"id" : "140",
		"sub" : [ {
			"id" : "1127",
			"name" : "运河区",
			"pid" : "140"
		}, {
			"id" : "1128",
			"name" : "新华区",
			"pid" : "140"
		}, {
			"id" : "1129",
			"name" : "泊头市",
			"pid" : "140"
		}, {
			"id" : "1130",
			"name" : "任丘市",
			"pid" : "140"
		}, {
			"id" : "1131",
			"name" : "黄骅市",
			"pid" : "140"
		}, {
			"id" : "1132",
			"name" : "河间市",
			"pid" : "140"
		}, {
			"id" : "1133",
			"name" : "沧县",
			"pid" : "140"
		}, {
			"id" : "1134",
			"name" : "青县",
			"pid" : "140"
		}, {
			"id" : "1135",
			"name" : "东光县",
			"pid" : "140"
		}, {
			"id" : "1136",
			"name" : "海兴县",
			"pid" : "140"
		}, {
			"id" : "1137",
			"name" : "盐山县",
			"pid" : "140"
		}, {
			"id" : "1138",
			"name" : "肃宁县",
			"pid" : "140"
		}, {
			"id" : "1139",
			"name" : "南皮县",
			"pid" : "140"
		}, {
			"id" : "1140",
			"name" : "吴桥县",
			"pid" : "140"
		}, {
			"id" : "1141",
			"name" : "献县",
			"pid" : "140"
		}, {
			"id" : "1142",
			"name" : "孟村",
			"pid" : "140"
		} ],
		"name" : "沧州",
		"pid" : "10"
	}, {
		"id" : "141",
		"sub" : [ {
			"id" : "1143",
			"name" : "双桥区",
			"pid" : "141"
		}, {
			"id" : "1144",
			"name" : "双滦区",
			"pid" : "141"
		}, {
			"id" : "1145",
			"name" : "鹰手营子矿区",
			"pid" : "141"
		}, {
			"id" : "1146",
			"name" : "承德县",
			"pid" : "141"
		}, {
			"id" : "1147",
			"name" : "兴隆县",
			"pid" : "141"
		}, {
			"id" : "1148",
			"name" : "平泉县",
			"pid" : "141"
		}, {
			"id" : "1149",
			"name" : "滦平县",
			"pid" : "141"
		}, {
			"id" : "1150",
			"name" : "隆化县",
			"pid" : "141"
		}, {
			"id" : "1151",
			"name" : "丰宁",
			"pid" : "141"
		}, {
			"id" : "1152",
			"name" : "宽城",
			"pid" : "141"
		}, {
			"id" : "1153",
			"name" : "围场",
			"pid" : "141"
		} ],
		"name" : "承德",
		"pid" : "10"
	}, {
		"id" : "142",
		"sub" : [ {
			"id" : "1154",
			"name" : "从台区",
			"pid" : "142"
		}, {
			"id" : "1155",
			"name" : "复兴区",
			"pid" : "142"
		}, {
			"id" : "1156",
			"name" : "邯山区",
			"pid" : "142"
		}, {
			"id" : "1157",
			"name" : "峰峰矿区",
			"pid" : "142"
		}, {
			"id" : "1158",
			"name" : "武安市",
			"pid" : "142"
		}, {
			"id" : "1159",
			"name" : "邯郸县",
			"pid" : "142"
		}, {
			"id" : "1160",
			"name" : "临漳县",
			"pid" : "142"
		}, {
			"id" : "1161",
			"name" : "成安县",
			"pid" : "142"
		}, {
			"id" : "1162",
			"name" : "大名县",
			"pid" : "142"
		}, {
			"id" : "1163",
			"name" : "涉县",
			"pid" : "142"
		}, {
			"id" : "1164",
			"name" : "磁县",
			"pid" : "142"
		}, {
			"id" : "1165",
			"name" : "肥乡县",
			"pid" : "142"
		}, {
			"id" : "1166",
			"name" : "永年县",
			"pid" : "142"
		}, {
			"id" : "1167",
			"name" : "邱县",
			"pid" : "142"
		}, {
			"id" : "1168",
			"name" : "鸡泽县",
			"pid" : "142"
		}, {
			"id" : "1169",
			"name" : "广平县",
			"pid" : "142"
		}, {
			"id" : "1170",
			"name" : "馆陶县",
			"pid" : "142"
		}, {
			"id" : "1171",
			"name" : "魏县",
			"pid" : "142"
		}, {
			"id" : "1172",
			"name" : "曲周县",
			"pid" : "142"
		} ],
		"name" : "邯郸",
		"pid" : "10"
	}, {
		"id" : "143",
		"sub" : [ {
			"id" : "1173",
			"name" : "桃城区",
			"pid" : "143"
		}, {
			"id" : "1174",
			"name" : "冀州市",
			"pid" : "143"
		}, {
			"id" : "1175",
			"name" : "深州市",
			"pid" : "143"
		}, {
			"id" : "1176",
			"name" : "枣强县",
			"pid" : "143"
		}, {
			"id" : "1177",
			"name" : "武邑县",
			"pid" : "143"
		}, {
			"id" : "1178",
			"name" : "武强县",
			"pid" : "143"
		}, {
			"id" : "1179",
			"name" : "饶阳县",
			"pid" : "143"
		}, {
			"id" : "1180",
			"name" : "安平县",
			"pid" : "143"
		}, {
			"id" : "1181",
			"name" : "故城县",
			"pid" : "143"
		}, {
			"id" : "1182",
			"name" : "景县",
			"pid" : "143"
		}, {
			"id" : "1183",
			"name" : "阜城县",
			"pid" : "143"
		} ],
		"name" : "衡水",
		"pid" : "10"
	}, {
		"id" : "144",
		"sub" : [ {
			"id" : "1184",
			"name" : "安次区",
			"pid" : "144"
		}, {
			"id" : "1185",
			"name" : "广阳区",
			"pid" : "144"
		}, {
			"id" : "1186",
			"name" : "霸州市",
			"pid" : "144"
		}, {
			"id" : "1187",
			"name" : "三河市",
			"pid" : "144"
		}, {
			"id" : "1188",
			"name" : "固安县",
			"pid" : "144"
		}, {
			"id" : "1189",
			"name" : "永清县",
			"pid" : "144"
		}, {
			"id" : "1190",
			"name" : "香河县",
			"pid" : "144"
		}, {
			"id" : "1191",
			"name" : "大城县",
			"pid" : "144"
		}, {
			"id" : "1192",
			"name" : "文安县",
			"pid" : "144"
		}, {
			"id" : "1193",
			"name" : "大厂",
			"pid" : "144"
		} ],
		"name" : "廊坊",
		"pid" : "10"
	}, {
		"id" : "145",
		"sub" : [ {
			"id" : "1194",
			"name" : "海港区",
			"pid" : "145"
		}, {
			"id" : "1195",
			"name" : "山海关区",
			"pid" : "145"
		}, {
			"id" : "1196",
			"name" : "北戴河区",
			"pid" : "145"
		}, {
			"id" : "1197",
			"name" : "昌黎县",
			"pid" : "145"
		}, {
			"id" : "1198",
			"name" : "抚宁县",
			"pid" : "145"
		}, {
			"id" : "1199",
			"name" : "卢龙县",
			"pid" : "145"
		}, {
			"id" : "1200",
			"name" : "青龙县",
			"pid" : "145"
		}, {
			"id" : "3409",
			"name" : "南戴河",
			"pid" : "145"
		}, {
			"id" : "3410",
			"name" : "开发区",
			"pid" : "145"
		} ],
		"name" : "秦皇岛",
		"pid" : "10"
	}, {
		"id" : "146",
		"sub" : [ {
			"id" : "1201",
			"name" : "路北区",
			"pid" : "146"
		}, {
			"id" : "1202",
			"name" : "路南区",
			"pid" : "146"
		}, {
			"id" : "1203",
			"name" : "古冶区",
			"pid" : "146"
		}, {
			"id" : "1204",
			"name" : "开平区",
			"pid" : "146"
		}, {
			"id" : "1205",
			"name" : "丰南区",
			"pid" : "146"
		}, {
			"id" : "1206",
			"name" : "丰润区",
			"pid" : "146"
		}, {
			"id" : "1207",
			"name" : "遵化市",
			"pid" : "146"
		}, {
			"id" : "1208",
			"name" : "迁安市",
			"pid" : "146"
		}, {
			"id" : "1209",
			"name" : "滦县",
			"pid" : "146"
		}, {
			"id" : "1210",
			"name" : "滦南县",
			"pid" : "146"
		}, {
			"id" : "1211",
			"name" : "乐亭县",
			"pid" : "146"
		}, {
			"id" : "1212",
			"name" : "迁西县",
			"pid" : "146"
		}, {
			"id" : "1213",
			"name" : "玉田县",
			"pid" : "146"
		}, {
			"id" : "1214",
			"name" : "唐海县",
			"pid" : "146"
		} ],
		"name" : "唐山",
		"pid" : "10"
	}, {
		"id" : "147",
		"sub" : [ {
			"id" : "1215",
			"name" : "桥东区",
			"pid" : "147"
		}, {
			"id" : "1216",
			"name" : "桥西区",
			"pid" : "147"
		}, {
			"id" : "1217",
			"name" : "南宫市",
			"pid" : "147"
		}, {
			"id" : "1218",
			"name" : "沙河市",
			"pid" : "147"
		}, {
			"id" : "1219",
			"name" : "邢台县",
			"pid" : "147"
		}, {
			"id" : "1220",
			"name" : "临城县",
			"pid" : "147"
		}, {
			"id" : "1221",
			"name" : "内丘县",
			"pid" : "147"
		}, {
			"id" : "1222",
			"name" : "柏乡县",
			"pid" : "147"
		}, {
			"id" : "1223",
			"name" : "隆尧县",
			"pid" : "147"
		}, {
			"id" : "1224",
			"name" : "任县",
			"pid" : "147"
		}, {
			"id" : "1225",
			"name" : "南和县",
			"pid" : "147"
		}, {
			"id" : "1226",
			"name" : "宁晋县",
			"pid" : "147"
		}, {
			"id" : "1227",
			"name" : "巨鹿县",
			"pid" : "147"
		}, {
			"id" : "1228",
			"name" : "新河县",
			"pid" : "147"
		}, {
			"id" : "1229",
			"name" : "广宗县",
			"pid" : "147"
		}, {
			"id" : "1230",
			"name" : "平乡县",
			"pid" : "147"
		}, {
			"id" : "1231",
			"name" : "威县",
			"pid" : "147"
		}, {
			"id" : "1232",
			"name" : "清河县",
			"pid" : "147"
		}, {
			"id" : "1233",
			"name" : "临西县",
			"pid" : "147"
		} ],
		"name" : "邢台",
		"pid" : "10"
	}, {
		"id" : "148",
		"sub" : [ {
			"id" : "1234",
			"name" : "桥西区",
			"pid" : "148"
		}, {
			"id" : "1235",
			"name" : "桥东区",
			"pid" : "148"
		}, {
			"id" : "1236",
			"name" : "宣化区",
			"pid" : "148"
		}, {
			"id" : "1237",
			"name" : "下花园区",
			"pid" : "148"
		}, {
			"id" : "1238",
			"name" : "宣化县",
			"pid" : "148"
		}, {
			"id" : "1239",
			"name" : "张北县",
			"pid" : "148"
		}, {
			"id" : "1240",
			"name" : "康保县",
			"pid" : "148"
		}, {
			"id" : "1241",
			"name" : "沽源县",
			"pid" : "148"
		}, {
			"id" : "1242",
			"name" : "尚义县",
			"pid" : "148"
		}, {
			"id" : "1243",
			"name" : "蔚县",
			"pid" : "148"
		}, {
			"id" : "1244",
			"name" : "阳原县",
			"pid" : "148"
		}, {
			"id" : "1245",
			"name" : "怀安县",
			"pid" : "148"
		}, {
			"id" : "1246",
			"name" : "万全县",
			"pid" : "148"
		}, {
			"id" : "1247",
			"name" : "怀来县",
			"pid" : "148"
		}, {
			"id" : "1248",
			"name" : "涿鹿县",
			"pid" : "148"
		}, {
			"id" : "1249",
			"name" : "赤城县",
			"pid" : "148"
		}, {
			"id" : "1250",
			"name" : "崇礼县",
			"pid" : "148"
		} ],
		"name" : "张家口",
		"pid" : "10"
	} ],
	"name" : "河北",
	"pid" : "1"
}, {
	"id" : "11",
	"sub" : [ {
		"id" : "149",
		"sub" : [ {
			"id" : "1251",
			"name" : "金水区",
			"pid" : "149"
		}, {
			"id" : "1252",
			"name" : "邙山区",
			"pid" : "149"
		}, {
			"id" : "1253",
			"name" : "二七区",
			"pid" : "149"
		}, {
			"id" : "1254",
			"name" : "管城区",
			"pid" : "149"
		}, {
			"id" : "1255",
			"name" : "中原区",
			"pid" : "149"
		}, {
			"id" : "1256",
			"name" : "上街区",
			"pid" : "149"
		}, {
			"id" : "1257",
			"name" : "惠济区",
			"pid" : "149"
		}, {
			"id" : "1258",
			"name" : "郑东新区",
			"pid" : "149"
		}, {
			"id" : "1259",
			"name" : "经济技术开发区",
			"pid" : "149"
		}, {
			"id" : "1260",
			"name" : "高新开发区",
			"pid" : "149"
		}, {
			"id" : "1261",
			"name" : "出口加工区",
			"pid" : "149"
		}, {
			"id" : "1262",
			"name" : "巩义市",
			"pid" : "149"
		}, {
			"id" : "1263",
			"name" : "荥阳市",
			"pid" : "149"
		}, {
			"id" : "1264",
			"name" : "新密市",
			"pid" : "149"
		}, {
			"id" : "1265",
			"name" : "新郑市",
			"pid" : "149"
		}, {
			"id" : "1266",
			"name" : "登封市",
			"pid" : "149"
		}, {
			"id" : "1267",
			"name" : "中牟县",
			"pid" : "149"
		} ],
		"name" : "郑州",
		"pid" : "11"
	}, {
		"id" : "150",
		"sub" : [ {
			"id" : "1268",
			"name" : "西工区",
			"pid" : "150"
		}, {
			"id" : "1269",
			"name" : "老城区",
			"pid" : "150"
		}, {
			"id" : "1270",
			"name" : "涧西区",
			"pid" : "150"
		}, {
			"id" : "1271",
			"name" : "瀍河回族区",
			"pid" : "150"
		}, {
			"id" : "1272",
			"name" : "洛龙区",
			"pid" : "150"
		}, {
			"id" : "1273",
			"name" : "吉利区",
			"pid" : "150"
		}, {
			"id" : "1274",
			"name" : "偃师市",
			"pid" : "150"
		}, {
			"id" : "1275",
			"name" : "孟津县",
			"pid" : "150"
		}, {
			"id" : "1276",
			"name" : "新安县",
			"pid" : "150"
		}, {
			"id" : "1277",
			"name" : "栾川县",
			"pid" : "150"
		}, {
			"id" : "1278",
			"name" : "嵩县",
			"pid" : "150"
		}, {
			"id" : "1279",
			"name" : "汝阳县",
			"pid" : "150"
		}, {
			"id" : "1280",
			"name" : "宜阳县",
			"pid" : "150"
		}, {
			"id" : "1281",
			"name" : "洛宁县",
			"pid" : "150"
		}, {
			"id" : "1282",
			"name" : "伊川县",
			"pid" : "150"
		} ],
		"name" : "洛阳",
		"pid" : "11"
	}, {
		"id" : "151",
		"sub" : [ {
			"id" : "1283",
			"name" : "鼓楼区",
			"pid" : "151"
		}, {
			"id" : "1284",
			"name" : "龙亭区",
			"pid" : "151"
		}, {
			"id" : "1285",
			"name" : "顺河回族区",
			"pid" : "151"
		}, {
			"id" : "1286",
			"name" : "金明区",
			"pid" : "151"
		}, {
			"id" : "1287",
			"name" : "禹王台区",
			"pid" : "151"
		}, {
			"id" : "1288",
			"name" : "杞县",
			"pid" : "151"
		}, {
			"id" : "1289",
			"name" : "通许县",
			"pid" : "151"
		}, {
			"id" : "1290",
			"name" : "尉氏县",
			"pid" : "151"
		}, {
			"id" : "1291",
			"name" : "开封县",
			"pid" : "151"
		}, {
			"id" : "1292",
			"name" : "兰考县",
			"pid" : "151"
		} ],
		"name" : "开封",
		"pid" : "11"
	}, {
		"id" : "152",
		"sub" : [ {
			"id" : "1293",
			"name" : "北关区",
			"pid" : "152"
		}, {
			"id" : "1294",
			"name" : "文峰区",
			"pid" : "152"
		}, {
			"id" : "1295",
			"name" : "殷都区",
			"pid" : "152"
		}, {
			"id" : "1296",
			"name" : "龙安区",
			"pid" : "152"
		}, {
			"id" : "1297",
			"name" : "林州市",
			"pid" : "152"
		}, {
			"id" : "1298",
			"name" : "安阳县",
			"pid" : "152"
		}, {
			"id" : "1299",
			"name" : "汤阴县",
			"pid" : "152"
		}, {
			"id" : "1300",
			"name" : "滑县",
			"pid" : "152"
		}, {
			"id" : "1301",
			"name" : "内黄县",
			"pid" : "152"
		} ],
		"name" : "安阳",
		"pid" : "11"
	}, {
		"id" : "153",
		"sub" : [ {
			"id" : "1302",
			"name" : "淇滨区",
			"pid" : "153"
		}, {
			"id" : "1303",
			"name" : "山城区",
			"pid" : "153"
		}, {
			"id" : "1304",
			"name" : "鹤山区",
			"pid" : "153"
		}, {
			"id" : "1305",
			"name" : "浚县",
			"pid" : "153"
		}, {
			"id" : "1306",
			"name" : "淇县",
			"pid" : "153"
		} ],
		"name" : "鹤壁",
		"pid" : "11"
	}, {
		"id" : "154",
		"sub" : [ {
			"id" : "1307",
			"name" : "济源市",
			"pid" : "154"
		} ],
		"name" : "济源",
		"pid" : "11"
	}, {
		"id" : "155",
		"sub" : [ {
			"id" : "1308",
			"name" : "解放区",
			"pid" : "155"
		}, {
			"id" : "1309",
			"name" : "中站区",
			"pid" : "155"
		}, {
			"id" : "1310",
			"name" : "马村区",
			"pid" : "155"
		}, {
			"id" : "1311",
			"name" : "山阳区",
			"pid" : "155"
		}, {
			"id" : "1312",
			"name" : "沁阳市",
			"pid" : "155"
		}, {
			"id" : "1313",
			"name" : "孟州市",
			"pid" : "155"
		}, {
			"id" : "1314",
			"name" : "修武县",
			"pid" : "155"
		}, {
			"id" : "1315",
			"name" : "博爱县",
			"pid" : "155"
		}, {
			"id" : "1316",
			"name" : "武陟县",
			"pid" : "155"
		}, {
			"id" : "1317",
			"name" : "温县",
			"pid" : "155"
		} ],
		"name" : "焦作",
		"pid" : "11"
	}, {
		"id" : "156",
		"sub" : [ {
			"id" : "1318",
			"name" : "卧龙区",
			"pid" : "156"
		}, {
			"id" : "1319",
			"name" : "宛城区",
			"pid" : "156"
		}, {
			"id" : "1320",
			"name" : "邓州市",
			"pid" : "156"
		}, {
			"id" : "1321",
			"name" : "南召县",
			"pid" : "156"
		}, {
			"id" : "1322",
			"name" : "方城县",
			"pid" : "156"
		}, {
			"id" : "1323",
			"name" : "西峡县",
			"pid" : "156"
		}, {
			"id" : "1324",
			"name" : "镇平县",
			"pid" : "156"
		}, {
			"id" : "1325",
			"name" : "内乡县",
			"pid" : "156"
		}, {
			"id" : "1326",
			"name" : "淅川县",
			"pid" : "156"
		}, {
			"id" : "1327",
			"name" : "社旗县",
			"pid" : "156"
		}, {
			"id" : "1328",
			"name" : "唐河县",
			"pid" : "156"
		}, {
			"id" : "1329",
			"name" : "新野县",
			"pid" : "156"
		}, {
			"id" : "1330",
			"name" : "桐柏县",
			"pid" : "156"
		} ],
		"name" : "南阳",
		"pid" : "11"
	}, {
		"id" : "157",
		"sub" : [ {
			"id" : "1331",
			"name" : "新华区",
			"pid" : "157"
		}, {
			"id" : "1332",
			"name" : "卫东区",
			"pid" : "157"
		}, {
			"id" : "1333",
			"name" : "湛河区",
			"pid" : "157"
		}, {
			"id" : "1334",
			"name" : "石龙区",
			"pid" : "157"
		}, {
			"id" : "1335",
			"name" : "舞钢市",
			"pid" : "157"
		}, {
			"id" : "1336",
			"name" : "汝州市",
			"pid" : "157"
		}, {
			"id" : "1337",
			"name" : "宝丰县",
			"pid" : "157"
		}, {
			"id" : "1338",
			"name" : "叶县",
			"pid" : "157"
		}, {
			"id" : "1339",
			"name" : "鲁山县",
			"pid" : "157"
		}, {
			"id" : "1340",
			"name" : "郏县",
			"pid" : "157"
		} ],
		"name" : "平顶山",
		"pid" : "11"
	}, {
		"id" : "158",
		"sub" : [ {
			"id" : "1341",
			"name" : "湖滨区",
			"pid" : "158"
		}, {
			"id" : "1342",
			"name" : "义马市",
			"pid" : "158"
		}, {
			"id" : "1343",
			"name" : "灵宝市",
			"pid" : "158"
		}, {
			"id" : "1344",
			"name" : "渑池县",
			"pid" : "158"
		}, {
			"id" : "1345",
			"name" : "陕县",
			"pid" : "158"
		}, {
			"id" : "1346",
			"name" : "卢氏县",
			"pid" : "158"
		} ],
		"name" : "三门峡",
		"pid" : "11"
	}, {
		"id" : "159",
		"sub" : [ {
			"id" : "1347",
			"name" : "梁园区",
			"pid" : "159"
		}, {
			"id" : "1348",
			"name" : "睢阳区",
			"pid" : "159"
		}, {
			"id" : "1349",
			"name" : "永城市",
			"pid" : "159"
		}, {
			"id" : "1350",
			"name" : "民权县",
			"pid" : "159"
		}, {
			"id" : "1351",
			"name" : "睢县",
			"pid" : "159"
		}, {
			"id" : "1352",
			"name" : "宁陵县",
			"pid" : "159"
		}, {
			"id" : "1353",
			"name" : "虞城县",
			"pid" : "159"
		}, {
			"id" : "1354",
			"name" : "柘城县",
			"pid" : "159"
		}, {
			"id" : "1355",
			"name" : "夏邑县",
			"pid" : "159"
		} ],
		"name" : "商丘",
		"pid" : "11"
	}, {
		"id" : "160",
		"sub" : [ {
			"id" : "1356",
			"name" : "卫滨区",
			"pid" : "160"
		}, {
			"id" : "1357",
			"name" : "红旗区",
			"pid" : "160"
		}, {
			"id" : "1358",
			"name" : "凤泉区",
			"pid" : "160"
		}, {
			"id" : "1359",
			"name" : "牧野区",
			"pid" : "160"
		}, {
			"id" : "1360",
			"name" : "卫辉市",
			"pid" : "160"
		}, {
			"id" : "1361",
			"name" : "辉县市",
			"pid" : "160"
		}, {
			"id" : "1362",
			"name" : "新乡县",
			"pid" : "160"
		}, {
			"id" : "1363",
			"name" : "获嘉县",
			"pid" : "160"
		}, {
			"id" : "1364",
			"name" : "原阳县",
			"pid" : "160"
		}, {
			"id" : "1365",
			"name" : "延津县",
			"pid" : "160"
		}, {
			"id" : "1366",
			"name" : "封丘县",
			"pid" : "160"
		}, {
			"id" : "1367",
			"name" : "长垣县",
			"pid" : "160"
		} ],
		"name" : "新乡",
		"pid" : "11"
	}, {
		"id" : "161",
		"sub" : [ {
			"id" : "1368",
			"name" : "浉河区",
			"pid" : "161"
		}, {
			"id" : "1369",
			"name" : "平桥区",
			"pid" : "161"
		}, {
			"id" : "1370",
			"name" : "罗山县",
			"pid" : "161"
		}, {
			"id" : "1371",
			"name" : "光山县",
			"pid" : "161"
		}, {
			"id" : "1372",
			"name" : "新县",
			"pid" : "161"
		}, {
			"id" : "1373",
			"name" : "商城县",
			"pid" : "161"
		}, {
			"id" : "1374",
			"name" : "固始县",
			"pid" : "161"
		}, {
			"id" : "1375",
			"name" : "潢川县",
			"pid" : "161"
		}, {
			"id" : "1376",
			"name" : "淮滨县",
			"pid" : "161"
		}, {
			"id" : "1377",
			"name" : "息县",
			"pid" : "161"
		} ],
		"name" : "信阳",
		"pid" : "11"
	}, {
		"id" : "162",
		"sub" : [ {
			"id" : "1378",
			"name" : "魏都区",
			"pid" : "162"
		}, {
			"id" : "1379",
			"name" : "禹州市",
			"pid" : "162"
		}, {
			"id" : "1380",
			"name" : "长葛市",
			"pid" : "162"
		}, {
			"id" : "1381",
			"name" : "许昌县",
			"pid" : "162"
		}, {
			"id" : "1382",
			"name" : "鄢陵县",
			"pid" : "162"
		}, {
			"id" : "1383",
			"name" : "襄城县",
			"pid" : "162"
		} ],
		"name" : "许昌",
		"pid" : "11"
	}, {
		"id" : "163",
		"sub" : [ {
			"id" : "1384",
			"name" : "川汇区",
			"pid" : "163"
		}, {
			"id" : "1385",
			"name" : "项城市",
			"pid" : "163"
		}, {
			"id" : "1386",
			"name" : "扶沟县",
			"pid" : "163"
		}, {
			"id" : "1387",
			"name" : "西华县",
			"pid" : "163"
		}, {
			"id" : "1388",
			"name" : "商水县",
			"pid" : "163"
		}, {
			"id" : "1389",
			"name" : "沈丘县",
			"pid" : "163"
		}, {
			"id" : "1390",
			"name" : "郸城县",
			"pid" : "163"
		}, {
			"id" : "1391",
			"name" : "淮阳县",
			"pid" : "163"
		}, {
			"id" : "1392",
			"name" : "太康县",
			"pid" : "163"
		}, {
			"id" : "1393",
			"name" : "鹿邑县",
			"pid" : "163"
		} ],
		"name" : "周口",
		"pid" : "11"
	}, {
		"id" : "164",
		"sub" : [ {
			"id" : "1394",
			"name" : "驿城区",
			"pid" : "164"
		}, {
			"id" : "1395",
			"name" : "西平县",
			"pid" : "164"
		}, {
			"id" : "1396",
			"name" : "上蔡县",
			"pid" : "164"
		}, {
			"id" : "1397",
			"name" : "平舆县",
			"pid" : "164"
		}, {
			"id" : "1398",
			"name" : "正阳县",
			"pid" : "164"
		}, {
			"id" : "1399",
			"name" : "确山县",
			"pid" : "164"
		}, {
			"id" : "1400",
			"name" : "泌阳县",
			"pid" : "164"
		}, {
			"id" : "1401",
			"name" : "汝南县",
			"pid" : "164"
		}, {
			"id" : "1402",
			"name" : "遂平县",
			"pid" : "164"
		}, {
			"id" : "1403",
			"name" : "新蔡县",
			"pid" : "164"
		} ],
		"name" : "驻马店",
		"pid" : "11"
	}, {
		"id" : "165",
		"sub" : [ {
			"id" : "1404",
			"name" : "郾城区",
			"pid" : "165"
		}, {
			"id" : "1405",
			"name" : "源汇区",
			"pid" : "165"
		}, {
			"id" : "1406",
			"name" : "召陵区",
			"pid" : "165"
		}, {
			"id" : "1407",
			"name" : "舞阳县",
			"pid" : "165"
		}, {
			"id" : "1408",
			"name" : "临颍县",
			"pid" : "165"
		} ],
		"name" : "漯河",
		"pid" : "11"
	}, {
		"id" : "166",
		"sub" : [ {
			"id" : "1409",
			"name" : "华龙区",
			"pid" : "166"
		}, {
			"id" : "1410",
			"name" : "清丰县",
			"pid" : "166"
		}, {
			"id" : "1411",
			"name" : "南乐县",
			"pid" : "166"
		}, {
			"id" : "1412",
			"name" : "范县",
			"pid" : "166"
		}, {
			"id" : "1413",
			"name" : "台前县",
			"pid" : "166"
		}, {
			"id" : "1414",
			"name" : "濮阳县",
			"pid" : "166"
		} ],
		"name" : "濮阳",
		"pid" : "11"
	} ],
	"name" : "河南",
	"pid" : "1"
}, {
	"id" : "12",
	"sub" : [ {
		"id" : "167",
		"sub" : [ {
			"id" : "1415",
			"name" : "道里区",
			"pid" : "167"
		}, {
			"id" : "1416",
			"name" : "南岗区",
			"pid" : "167"
		}, {
			"id" : "1417",
			"name" : "动力区",
			"pid" : "167"
		}, {
			"id" : "1418",
			"name" : "平房区",
			"pid" : "167"
		}, {
			"id" : "1419",
			"name" : "香坊区",
			"pid" : "167"
		}, {
			"id" : "1420",
			"name" : "太平区",
			"pid" : "167"
		}, {
			"id" : "1421",
			"name" : "道外区",
			"pid" : "167"
		}, {
			"id" : "1422",
			"name" : "阿城区",
			"pid" : "167"
		}, {
			"id" : "1423",
			"name" : "呼兰区",
			"pid" : "167"
		}, {
			"id" : "1424",
			"name" : "松北区",
			"pid" : "167"
		}, {
			"id" : "1425",
			"name" : "尚志市",
			"pid" : "167"
		}, {
			"id" : "1426",
			"name" : "双城市",
			"pid" : "167"
		}, {
			"id" : "1427",
			"name" : "五常市",
			"pid" : "167"
		}, {
			"id" : "1428",
			"name" : "方正县",
			"pid" : "167"
		}, {
			"id" : "1429",
			"name" : "宾县",
			"pid" : "167"
		}, {
			"id" : "1430",
			"name" : "依兰县",
			"pid" : "167"
		}, {
			"id" : "1431",
			"name" : "巴彦县",
			"pid" : "167"
		}, {
			"id" : "1432",
			"name" : "通河县",
			"pid" : "167"
		}, {
			"id" : "1433",
			"name" : "木兰县",
			"pid" : "167"
		}, {
			"id" : "1434",
			"name" : "延寿县",
			"pid" : "167"
		} ],
		"name" : "哈尔滨",
		"pid" : "12"
	}, {
		"id" : "168",
		"sub" : [ {
			"id" : "1435",
			"name" : "萨尔图区",
			"pid" : "168"
		}, {
			"id" : "1436",
			"name" : "红岗区",
			"pid" : "168"
		}, {
			"id" : "1437",
			"name" : "龙凤区",
			"pid" : "168"
		}, {
			"id" : "1438",
			"name" : "让胡路区",
			"pid" : "168"
		}, {
			"id" : "1439",
			"name" : "大同区",
			"pid" : "168"
		}, {
			"id" : "1440",
			"name" : "肇州县",
			"pid" : "168"
		}, {
			"id" : "1441",
			"name" : "肇源县",
			"pid" : "168"
		}, {
			"id" : "1442",
			"name" : "林甸县",
			"pid" : "168"
		}, {
			"id" : "1443",
			"name" : "杜尔伯特",
			"pid" : "168"
		} ],
		"name" : "大庆",
		"pid" : "12"
	}, {
		"id" : "169",
		"sub" : [ {
			"id" : "1444",
			"name" : "呼玛县",
			"pid" : "169"
		}, {
			"id" : "1445",
			"name" : "漠河县",
			"pid" : "169"
		}, {
			"id" : "1446",
			"name" : "塔河县",
			"pid" : "169"
		} ],
		"name" : "大兴安岭",
		"pid" : "12"
	}, {
		"id" : "170",
		"sub" : [ {
			"id" : "1447",
			"name" : "兴山区",
			"pid" : "170"
		}, {
			"id" : "1448",
			"name" : "工农区",
			"pid" : "170"
		}, {
			"id" : "1449",
			"name" : "南山区",
			"pid" : "170"
		}, {
			"id" : "1450",
			"name" : "兴安区",
			"pid" : "170"
		}, {
			"id" : "1451",
			"name" : "向阳区",
			"pid" : "170"
		}, {
			"id" : "1452",
			"name" : "东山区",
			"pid" : "170"
		}, {
			"id" : "1453",
			"name" : "萝北县",
			"pid" : "170"
		}, {
			"id" : "1454",
			"name" : "绥滨县",
			"pid" : "170"
		} ],
		"name" : "鹤岗",
		"pid" : "12"
	}, {
		"id" : "171",
		"sub" : [ {
			"id" : "1455",
			"name" : "爱辉区",
			"pid" : "171"
		}, {
			"id" : "1456",
			"name" : "五大连池市",
			"pid" : "171"
		}, {
			"id" : "1457",
			"name" : "北安市",
			"pid" : "171"
		}, {
			"id" : "1458",
			"name" : "嫩江县",
			"pid" : "171"
		}, {
			"id" : "1459",
			"name" : "逊克县",
			"pid" : "171"
		}, {
			"id" : "1460",
			"name" : "孙吴县",
			"pid" : "171"
		} ],
		"name" : "黑河",
		"pid" : "12"
	}, {
		"id" : "172",
		"sub" : [ {
			"id" : "1461",
			"name" : "鸡冠区",
			"pid" : "172"
		}, {
			"id" : "1462",
			"name" : "恒山区",
			"pid" : "172"
		}, {
			"id" : "1463",
			"name" : "城子河区",
			"pid" : "172"
		}, {
			"id" : "1464",
			"name" : "滴道区",
			"pid" : "172"
		}, {
			"id" : "1465",
			"name" : "梨树区",
			"pid" : "172"
		}, {
			"id" : "1466",
			"name" : "虎林市",
			"pid" : "172"
		}, {
			"id" : "1467",
			"name" : "密山市",
			"pid" : "172"
		}, {
			"id" : "1468",
			"name" : "鸡东县",
			"pid" : "172"
		} ],
		"name" : "鸡西",
		"pid" : "12"
	}, {
		"id" : "173",
		"sub" : [ {
			"id" : "1469",
			"name" : "前进区",
			"pid" : "173"
		}, {
			"id" : "1470",
			"name" : "郊区",
			"pid" : "173"
		}, {
			"id" : "1471",
			"name" : "向阳区",
			"pid" : "173"
		}, {
			"id" : "1472",
			"name" : "东风区",
			"pid" : "173"
		}, {
			"id" : "1473",
			"name" : "同江市",
			"pid" : "173"
		}, {
			"id" : "1474",
			"name" : "富锦市",
			"pid" : "173"
		}, {
			"id" : "1475",
			"name" : "桦南县",
			"pid" : "173"
		}, {
			"id" : "1476",
			"name" : "桦川县",
			"pid" : "173"
		}, {
			"id" : "1477",
			"name" : "汤原县",
			"pid" : "173"
		}, {
			"id" : "1478",
			"name" : "抚远县",
			"pid" : "173"
		} ],
		"name" : "佳木斯",
		"pid" : "12"
	}, {
		"id" : "174",
		"sub" : [ {
			"id" : "1479",
			"name" : "爱民区",
			"pid" : "174"
		}, {
			"id" : "1480",
			"name" : "东安区",
			"pid" : "174"
		}, {
			"id" : "1481",
			"name" : "阳明区",
			"pid" : "174"
		}, {
			"id" : "1482",
			"name" : "西安区",
			"pid" : "174"
		}, {
			"id" : "1483",
			"name" : "绥芬河市",
			"pid" : "174"
		}, {
			"id" : "1484",
			"name" : "海林市",
			"pid" : "174"
		}, {
			"id" : "1485",
			"name" : "宁安市",
			"pid" : "174"
		}, {
			"id" : "1486",
			"name" : "穆棱市",
			"pid" : "174"
		}, {
			"id" : "1487",
			"name" : "东宁县",
			"pid" : "174"
		}, {
			"id" : "1488",
			"name" : "林口县",
			"pid" : "174"
		} ],
		"name" : "牡丹江",
		"pid" : "12"
	}, {
		"id" : "175",
		"sub" : [ {
			"id" : "1489",
			"name" : "桃山区",
			"pid" : "175"
		}, {
			"id" : "1490",
			"name" : "新兴区",
			"pid" : "175"
		}, {
			"id" : "1491",
			"name" : "茄子河区",
			"pid" : "175"
		}, {
			"id" : "1492",
			"name" : "勃利县",
			"pid" : "175"
		} ],
		"name" : "七台河",
		"pid" : "12"
	}, {
		"id" : "176",
		"sub" : [ {
			"id" : "1493",
			"name" : "龙沙区",
			"pid" : "176"
		}, {
			"id" : "1494",
			"name" : "昂昂溪区",
			"pid" : "176"
		}, {
			"id" : "1495",
			"name" : "铁峰区",
			"pid" : "176"
		}, {
			"id" : "1496",
			"name" : "建华区",
			"pid" : "176"
		}, {
			"id" : "1497",
			"name" : "富拉尔基区",
			"pid" : "176"
		}, {
			"id" : "1498",
			"name" : "碾子山区",
			"pid" : "176"
		}, {
			"id" : "1499",
			"name" : "梅里斯达斡尔区",
			"pid" : "176"
		}, {
			"id" : "1500",
			"name" : "讷河市",
			"pid" : "176"
		}, {
			"id" : "1501",
			"name" : "龙江县",
			"pid" : "176"
		}, {
			"id" : "1502",
			"name" : "依安县",
			"pid" : "176"
		}, {
			"id" : "1503",
			"name" : "泰来县",
			"pid" : "176"
		}, {
			"id" : "1504",
			"name" : "甘南县",
			"pid" : "176"
		}, {
			"id" : "1505",
			"name" : "富裕县",
			"pid" : "176"
		}, {
			"id" : "1506",
			"name" : "克山县",
			"pid" : "176"
		}, {
			"id" : "1507",
			"name" : "克东县",
			"pid" : "176"
		}, {
			"id" : "1508",
			"name" : "拜泉县",
			"pid" : "176"
		} ],
		"name" : "齐齐哈尔",
		"pid" : "12"
	}, {
		"id" : "177",
		"sub" : [ {
			"id" : "1509",
			"name" : "尖山区",
			"pid" : "177"
		}, {
			"id" : "1510",
			"name" : "岭东区",
			"pid" : "177"
		}, {
			"id" : "1511",
			"name" : "四方台区",
			"pid" : "177"
		}, {
			"id" : "1512",
			"name" : "宝山区",
			"pid" : "177"
		}, {
			"id" : "1513",
			"name" : "集贤县",
			"pid" : "177"
		}, {
			"id" : "1514",
			"name" : "友谊县",
			"pid" : "177"
		}, {
			"id" : "1515",
			"name" : "宝清县",
			"pid" : "177"
		}, {
			"id" : "1516",
			"name" : "饶河县",
			"pid" : "177"
		} ],
		"name" : "双鸭山",
		"pid" : "12"
	}, {
		"id" : "178",
		"sub" : [ {
			"id" : "1517",
			"name" : "北林区",
			"pid" : "178"
		}, {
			"id" : "1518",
			"name" : "安达市",
			"pid" : "178"
		}, {
			"id" : "1519",
			"name" : "肇东市",
			"pid" : "178"
		}, {
			"id" : "1520",
			"name" : "海伦市",
			"pid" : "178"
		}, {
			"id" : "1521",
			"name" : "望奎县",
			"pid" : "178"
		}, {
			"id" : "1522",
			"name" : "兰西县",
			"pid" : "178"
		}, {
			"id" : "1523",
			"name" : "青冈县",
			"pid" : "178"
		}, {
			"id" : "1524",
			"name" : "庆安县",
			"pid" : "178"
		}, {
			"id" : "1525",
			"name" : "明水县",
			"pid" : "178"
		}, {
			"id" : "1526",
			"name" : "绥棱县",
			"pid" : "178"
		} ],
		"name" : "绥化",
		"pid" : "12"
	}, {
		"id" : "179",
		"sub" : [ {
			"id" : "1527",
			"name" : "伊春区",
			"pid" : "179"
		}, {
			"id" : "1528",
			"name" : "带岭区",
			"pid" : "179"
		}, {
			"id" : "1529",
			"name" : "南岔区",
			"pid" : "179"
		}, {
			"id" : "1530",
			"name" : "金山屯区",
			"pid" : "179"
		}, {
			"id" : "1531",
			"name" : "西林区",
			"pid" : "179"
		}, {
			"id" : "1532",
			"name" : "美溪区",
			"pid" : "179"
		}, {
			"id" : "1533",
			"name" : "乌马河区",
			"pid" : "179"
		}, {
			"id" : "1534",
			"name" : "翠峦区",
			"pid" : "179"
		}, {
			"id" : "1535",
			"name" : "友好区",
			"pid" : "179"
		}, {
			"id" : "1536",
			"name" : "上甘岭区",
			"pid" : "179"
		}, {
			"id" : "1537",
			"name" : "五营区",
			"pid" : "179"
		}, {
			"id" : "1538",
			"name" : "红星区",
			"pid" : "179"
		}, {
			"id" : "1539",
			"name" : "新青区",
			"pid" : "179"
		}, {
			"id" : "1540",
			"name" : "汤旺河区",
			"pid" : "179"
		}, {
			"id" : "1541",
			"name" : "乌伊岭区",
			"pid" : "179"
		}, {
			"id" : "1542",
			"name" : "铁力市",
			"pid" : "179"
		}, {
			"id" : "1543",
			"name" : "嘉荫县",
			"pid" : "179"
		} ],
		"name" : "伊春",
		"pid" : "12"
	} ],
	"name" : "黑龙江",
	"pid" : "1"
}, {
	"id" : "13",
	"sub" : [ {
		"id" : "180",
		"sub" : [ {
			"id" : "1544",
			"name" : "江岸区",
			"pid" : "180"
		}, {
			"id" : "1545",
			"name" : "武昌区",
			"pid" : "180"
		}, {
			"id" : "1546",
			"name" : "江汉区",
			"pid" : "180"
		}, {
			"id" : "1547",
			"name" : "硚口区",
			"pid" : "180"
		}, {
			"id" : "1548",
			"name" : "汉阳区",
			"pid" : "180"
		}, {
			"id" : "1549",
			"name" : "青山区",
			"pid" : "180"
		}, {
			"id" : "1550",
			"name" : "洪山区",
			"pid" : "180"
		}, {
			"id" : "1551",
			"name" : "东西湖区",
			"pid" : "180"
		}, {
			"id" : "1552",
			"name" : "汉南区",
			"pid" : "180"
		}, {
			"id" : "1553",
			"name" : "蔡甸区",
			"pid" : "180"
		}, {
			"id" : "1554",
			"name" : "江夏区",
			"pid" : "180"
		}, {
			"id" : "1555",
			"name" : "黄陂区",
			"pid" : "180"
		}, {
			"id" : "1556",
			"name" : "新洲区",
			"pid" : "180"
		}, {
			"id" : "1557",
			"name" : "经济开发区",
			"pid" : "180"
		} ],
		"name" : "武汉",
		"pid" : "13"
	}, {
		"id" : "181",
		"sub" : [ {
			"id" : "1558",
			"name" : "仙桃市",
			"pid" : "181"
		} ],
		"name" : "仙桃",
		"pid" : "13"
	}, {
		"id" : "182",
		"sub" : [ {
			"id" : "1559",
			"name" : "鄂城区",
			"pid" : "182"
		}, {
			"id" : "1560",
			"name" : "华容区",
			"pid" : "182"
		}, {
			"id" : "1561",
			"name" : "梁子湖区",
			"pid" : "182"
		} ],
		"name" : "鄂州",
		"pid" : "13"
	}, {
		"id" : "183",
		"sub" : [ {
			"id" : "1562",
			"name" : "黄州区",
			"pid" : "183"
		}, {
			"id" : "1563",
			"name" : "麻城市",
			"pid" : "183"
		}, {
			"id" : "1564",
			"name" : "武穴市",
			"pid" : "183"
		}, {
			"id" : "1565",
			"name" : "团风县",
			"pid" : "183"
		}, {
			"id" : "1566",
			"name" : "红安县",
			"pid" : "183"
		}, {
			"id" : "1567",
			"name" : "罗田县",
			"pid" : "183"
		}, {
			"id" : "1568",
			"name" : "英山县",
			"pid" : "183"
		}, {
			"id" : "1569",
			"name" : "浠水县",
			"pid" : "183"
		}, {
			"id" : "1570",
			"name" : "蕲春县",
			"pid" : "183"
		}, {
			"id" : "1571",
			"name" : "黄梅县",
			"pid" : "183"
		} ],
		"name" : "黄冈",
		"pid" : "13"
	}, {
		"id" : "184",
		"sub" : [ {
			"id" : "1572",
			"name" : "黄石港区",
			"pid" : "184"
		}, {
			"id" : "1573",
			"name" : "西塞山区",
			"pid" : "184"
		}, {
			"id" : "1574",
			"name" : "下陆区",
			"pid" : "184"
		}, {
			"id" : "1575",
			"name" : "铁山区",
			"pid" : "184"
		}, {
			"id" : "1576",
			"name" : "大冶市",
			"pid" : "184"
		}, {
			"id" : "1577",
			"name" : "阳新县",
			"pid" : "184"
		} ],
		"name" : "黄石",
		"pid" : "13"
	}, {
		"id" : "185",
		"sub" : [ {
			"id" : "1578",
			"name" : "东宝区",
			"pid" : "185"
		}, {
			"id" : "1579",
			"name" : "掇刀区",
			"pid" : "185"
		}, {
			"id" : "1580",
			"name" : "钟祥市",
			"pid" : "185"
		}, {
			"id" : "1581",
			"name" : "京山县",
			"pid" : "185"
		}, {
			"id" : "1582",
			"name" : "沙洋县",
			"pid" : "185"
		} ],
		"name" : "荆门",
		"pid" : "13"
	}, {
		"id" : "186",
		"sub" : [ {
			"id" : "1583",
			"name" : "沙市区",
			"pid" : "186"
		}, {
			"id" : "1584",
			"name" : "荆州区",
			"pid" : "186"
		}, {
			"id" : "1585",
			"name" : "石首市",
			"pid" : "186"
		}, {
			"id" : "1586",
			"name" : "洪湖市",
			"pid" : "186"
		}, {
			"id" : "1587",
			"name" : "松滋市",
			"pid" : "186"
		}, {
			"id" : "1588",
			"name" : "公安县",
			"pid" : "186"
		}, {
			"id" : "1589",
			"name" : "监利县",
			"pid" : "186"
		}, {
			"id" : "1590",
			"name" : "江陵县",
			"pid" : "186"
		} ],
		"name" : "荆州",
		"pid" : "13"
	}, {
		"id" : "187",
		"sub" : [ {
			"id" : "1591",
			"name" : "潜江市",
			"pid" : "187"
		} ],
		"name" : "潜江",
		"pid" : "13"
	}, {
		"id" : "188",
		"sub" : [ {
			"id" : "1592",
			"name" : "神农架林区",
			"pid" : "188"
		} ],
		"name" : "神农架林区",
		"pid" : "13"
	}, {
		"id" : "189",
		"sub" : [ {
			"id" : "1593",
			"name" : "张湾区",
			"pid" : "189"
		}, {
			"id" : "1594",
			"name" : "茅箭区",
			"pid" : "189"
		}, {
			"id" : "1595",
			"name" : "丹江口市",
			"pid" : "189"
		}, {
			"id" : "1596",
			"name" : "郧县",
			"pid" : "189"
		}, {
			"id" : "1597",
			"name" : "郧西县",
			"pid" : "189"
		}, {
			"id" : "1598",
			"name" : "竹山县",
			"pid" : "189"
		}, {
			"id" : "1599",
			"name" : "竹溪县",
			"pid" : "189"
		}, {
			"id" : "1600",
			"name" : "房县",
			"pid" : "189"
		} ],
		"name" : "十堰",
		"pid" : "13"
	}, {
		"id" : "190",
		"sub" : [ {
			"id" : "1601",
			"name" : "曾都区",
			"pid" : "190"
		}, {
			"id" : "1602",
			"name" : "广水市",
			"pid" : "190"
		} ],
		"name" : "随州",
		"pid" : "13"
	}, {
		"id" : "191",
		"sub" : [ {
			"id" : "1603",
			"name" : "天门市",
			"pid" : "191"
		} ],
		"name" : "天门",
		"pid" : "13"
	}, {
		"id" : "192",
		"sub" : [ {
			"id" : "1604",
			"name" : "咸安区",
			"pid" : "192"
		}, {
			"id" : "1605",
			"name" : "赤壁市",
			"pid" : "192"
		}, {
			"id" : "1606",
			"name" : "嘉鱼县",
			"pid" : "192"
		}, {
			"id" : "1607",
			"name" : "通城县",
			"pid" : "192"
		}, {
			"id" : "1608",
			"name" : "崇阳县",
			"pid" : "192"
		}, {
			"id" : "1609",
			"name" : "通山县",
			"pid" : "192"
		} ],
		"name" : "咸宁",
		"pid" : "13"
	}, {
		"id" : "193",
		"sub" : [ {
			"id" : "1610",
			"name" : "襄城区",
			"pid" : "193"
		}, {
			"id" : "1611",
			"name" : "樊城区",
			"pid" : "193"
		}, {
			"id" : "1612",
			"name" : "襄阳区",
			"pid" : "193"
		}, {
			"id" : "1613",
			"name" : "老河口市",
			"pid" : "193"
		}, {
			"id" : "1614",
			"name" : "枣阳市",
			"pid" : "193"
		}, {
			"id" : "1615",
			"name" : "宜城市",
			"pid" : "193"
		}, {
			"id" : "1616",
			"name" : "南漳县",
			"pid" : "193"
		}, {
			"id" : "1617",
			"name" : "谷城县",
			"pid" : "193"
		}, {
			"id" : "1618",
			"name" : "保康县",
			"pid" : "193"
		} ],
		"name" : "襄樊",
		"pid" : "13"
	}, {
		"id" : "194",
		"sub" : [ {
			"id" : "1619",
			"name" : "孝南区",
			"pid" : "194"
		}, {
			"id" : "1620",
			"name" : "应城市",
			"pid" : "194"
		}, {
			"id" : "1621",
			"name" : "安陆市",
			"pid" : "194"
		}, {
			"id" : "1622",
			"name" : "汉川市",
			"pid" : "194"
		}, {
			"id" : "1623",
			"name" : "孝昌县",
			"pid" : "194"
		}, {
			"id" : "1624",
			"name" : "大悟县",
			"pid" : "194"
		}, {
			"id" : "1625",
			"name" : "云梦县",
			"pid" : "194"
		} ],
		"name" : "孝感",
		"pid" : "13"
	}, {
		"id" : "195",
		"sub" : [ {
			"id" : "1626",
			"name" : "长阳",
			"pid" : "195"
		}, {
			"id" : "1627",
			"name" : "五峰",
			"pid" : "195"
		}, {
			"id" : "1628",
			"name" : "西陵区",
			"pid" : "195"
		}, {
			"id" : "1629",
			"name" : "伍家岗区",
			"pid" : "195"
		}, {
			"id" : "1630",
			"name" : "点军区",
			"pid" : "195"
		}, {
			"id" : "1631",
			"name" : "猇亭区",
			"pid" : "195"
		}, {
			"id" : "1632",
			"name" : "夷陵区",
			"pid" : "195"
		}, {
			"id" : "1633",
			"name" : "宜都市",
			"pid" : "195"
		}, {
			"id" : "1634",
			"name" : "当阳市",
			"pid" : "195"
		}, {
			"id" : "1635",
			"name" : "枝江市",
			"pid" : "195"
		}, {
			"id" : "1636",
			"name" : "远安县",
			"pid" : "195"
		}, {
			"id" : "1637",
			"name" : "兴山县",
			"pid" : "195"
		}, {
			"id" : "1638",
			"name" : "秭归县",
			"pid" : "195"
		} ],
		"name" : "宜昌",
		"pid" : "13"
	}, {
		"id" : "196",
		"sub" : [ {
			"id" : "1639",
			"name" : "恩施市",
			"pid" : "196"
		}, {
			"id" : "1640",
			"name" : "利川市",
			"pid" : "196"
		}, {
			"id" : "1641",
			"name" : "建始县",
			"pid" : "196"
		}, {
			"id" : "1642",
			"name" : "巴东县",
			"pid" : "196"
		}, {
			"id" : "1643",
			"name" : "宣恩县",
			"pid" : "196"
		}, {
			"id" : "1644",
			"name" : "咸丰县",
			"pid" : "196"
		}, {
			"id" : "1645",
			"name" : "来凤县",
			"pid" : "196"
		}, {
			"id" : "1646",
			"name" : "鹤峰县",
			"pid" : "196"
		} ],
		"name" : "恩施",
		"pid" : "13"
	} ],
	"name" : "湖北",
	"pid" : "1"
}, {
	"id" : "14",
	"sub" : [ {
		"id" : "197",
		"sub" : [ {
			"id" : "1647",
			"name" : "岳麓区",
			"pid" : "197"
		}, {
			"id" : "1648",
			"name" : "芙蓉区",
			"pid" : "197"
		}, {
			"id" : "1649",
			"name" : "天心区",
			"pid" : "197"
		}, {
			"id" : "1650",
			"name" : "开福区",
			"pid" : "197"
		}, {
			"id" : "1651",
			"name" : "雨花区",
			"pid" : "197"
		}, {
			"id" : "1652",
			"name" : "开发区",
			"pid" : "197"
		}, {
			"id" : "1653",
			"name" : "浏阳市",
			"pid" : "197"
		}, {
			"id" : "1654",
			"name" : "长沙县",
			"pid" : "197"
		}, {
			"id" : "1655",
			"name" : "望城县",
			"pid" : "197"
		}, {
			"id" : "1656",
			"name" : "宁乡县",
			"pid" : "197"
		} ],
		"name" : "长沙",
		"pid" : "14"
	}, {
		"id" : "198",
		"sub" : [ {
			"id" : "1657",
			"name" : "永定区",
			"pid" : "198"
		}, {
			"id" : "1658",
			"name" : "武陵源区",
			"pid" : "198"
		}, {
			"id" : "1659",
			"name" : "慈利县",
			"pid" : "198"
		}, {
			"id" : "1660",
			"name" : "桑植县",
			"pid" : "198"
		} ],
		"name" : "张家界",
		"pid" : "14"
	}, {
		"id" : "199",
		"sub" : [ {
			"id" : "1661",
			"name" : "武陵区",
			"pid" : "199"
		}, {
			"id" : "1662",
			"name" : "鼎城区",
			"pid" : "199"
		}, {
			"id" : "1663",
			"name" : "津市市",
			"pid" : "199"
		}, {
			"id" : "1664",
			"name" : "安乡县",
			"pid" : "199"
		}, {
			"id" : "1665",
			"name" : "汉寿县",
			"pid" : "199"
		}, {
			"id" : "1666",
			"name" : "澧县",
			"pid" : "199"
		}, {
			"id" : "1667",
			"name" : "临澧县",
			"pid" : "199"
		}, {
			"id" : "1668",
			"name" : "桃源县",
			"pid" : "199"
		}, {
			"id" : "1669",
			"name" : "石门县",
			"pid" : "199"
		} ],
		"name" : "常德",
		"pid" : "14"
	}, {
		"id" : "200",
		"sub" : [ {
			"id" : "1670",
			"name" : "北湖区",
			"pid" : "200"
		}, {
			"id" : "1671",
			"name" : "苏仙区",
			"pid" : "200"
		}, {
			"id" : "1672",
			"name" : "资兴市",
			"pid" : "200"
		}, {
			"id" : "1673",
			"name" : "桂阳县",
			"pid" : "200"
		}, {
			"id" : "1674",
			"name" : "宜章县",
			"pid" : "200"
		}, {
			"id" : "1675",
			"name" : "永兴县",
			"pid" : "200"
		}, {
			"id" : "1676",
			"name" : "嘉禾县",
			"pid" : "200"
		}, {
			"id" : "1677",
			"name" : "临武县",
			"pid" : "200"
		}, {
			"id" : "1678",
			"name" : "汝城县",
			"pid" : "200"
		}, {
			"id" : "1679",
			"name" : "桂东县",
			"pid" : "200"
		}, {
			"id" : "1680",
			"name" : "安仁县",
			"pid" : "200"
		} ],
		"name" : "郴州",
		"pid" : "14"
	}, {
		"id" : "201",
		"sub" : [ {
			"id" : "1681",
			"name" : "雁峰区",
			"pid" : "201"
		}, {
			"id" : "1682",
			"name" : "珠晖区",
			"pid" : "201"
		}, {
			"id" : "1683",
			"name" : "石鼓区",
			"pid" : "201"
		}, {
			"id" : "1684",
			"name" : "蒸湘区",
			"pid" : "201"
		}, {
			"id" : "1685",
			"name" : "南岳区",
			"pid" : "201"
		}, {
			"id" : "1686",
			"name" : "耒阳市",
			"pid" : "201"
		}, {
			"id" : "1687",
			"name" : "常宁市",
			"pid" : "201"
		}, {
			"id" : "1688",
			"name" : "衡阳县",
			"pid" : "201"
		}, {
			"id" : "1689",
			"name" : "衡南县",
			"pid" : "201"
		}, {
			"id" : "1690",
			"name" : "衡山县",
			"pid" : "201"
		}, {
			"id" : "1691",
			"name" : "衡东县",
			"pid" : "201"
		}, {
			"id" : "1692",
			"name" : "祁东县",
			"pid" : "201"
		} ],
		"name" : "衡阳",
		"pid" : "14"
	}, {
		"id" : "202",
		"sub" : [ {
			"id" : "1693",
			"name" : "鹤城区",
			"pid" : "202"
		}, {
			"id" : "1694",
			"name" : "靖州",
			"pid" : "202"
		}, {
			"id" : "1695",
			"name" : "麻阳",
			"pid" : "202"
		}, {
			"id" : "1696",
			"name" : "通道",
			"pid" : "202"
		}, {
			"id" : "1697",
			"name" : "新晃",
			"pid" : "202"
		}, {
			"id" : "1698",
			"name" : "芷江",
			"pid" : "202"
		}, {
			"id" : "1699",
			"name" : "沅陵县",
			"pid" : "202"
		}, {
			"id" : "1700",
			"name" : "辰溪县",
			"pid" : "202"
		}, {
			"id" : "1701",
			"name" : "溆浦县",
			"pid" : "202"
		}, {
			"id" : "1702",
			"name" : "中方县",
			"pid" : "202"
		}, {
			"id" : "1703",
			"name" : "会同县",
			"pid" : "202"
		}, {
			"id" : "1704",
			"name" : "洪江市",
			"pid" : "202"
		} ],
		"name" : "怀化",
		"pid" : "14"
	}, {
		"id" : "203",
		"sub" : [ {
			"id" : "1705",
			"name" : "娄星区",
			"pid" : "203"
		}, {
			"id" : "1706",
			"name" : "冷水江市",
			"pid" : "203"
		}, {
			"id" : "1707",
			"name" : "涟源市",
			"pid" : "203"
		}, {
			"id" : "1708",
			"name" : "双峰县",
			"pid" : "203"
		}, {
			"id" : "1709",
			"name" : "新化县",
			"pid" : "203"
		} ],
		"name" : "娄底",
		"pid" : "14"
	}, {
		"id" : "204",
		"sub" : [ {
			"id" : "1710",
			"name" : "城步",
			"pid" : "204"
		}, {
			"id" : "1711",
			"name" : "双清区",
			"pid" : "204"
		}, {
			"id" : "1712",
			"name" : "大祥区",
			"pid" : "204"
		}, {
			"id" : "1713",
			"name" : "北塔区",
			"pid" : "204"
		}, {
			"id" : "1714",
			"name" : "武冈市",
			"pid" : "204"
		}, {
			"id" : "1715",
			"name" : "邵东县",
			"pid" : "204"
		}, {
			"id" : "1716",
			"name" : "新邵县",
			"pid" : "204"
		}, {
			"id" : "1717",
			"name" : "邵阳县",
			"pid" : "204"
		}, {
			"id" : "1718",
			"name" : "隆回县",
			"pid" : "204"
		}, {
			"id" : "1719",
			"name" : "洞口县",
			"pid" : "204"
		}, {
			"id" : "1720",
			"name" : "绥宁县",
			"pid" : "204"
		}, {
			"id" : "1721",
			"name" : "新宁县",
			"pid" : "204"
		} ],
		"name" : "邵阳",
		"pid" : "14"
	}, {
		"id" : "205",
		"sub" : [ {
			"id" : "1722",
			"name" : "岳塘区",
			"pid" : "205"
		}, {
			"id" : "1723",
			"name" : "雨湖区",
			"pid" : "205"
		}, {
			"id" : "1724",
			"name" : "湘乡市",
			"pid" : "205"
		}, {
			"id" : "1725",
			"name" : "韶山市",
			"pid" : "205"
		}, {
			"id" : "1726",
			"name" : "湘潭县",
			"pid" : "205"
		} ],
		"name" : "湘潭",
		"pid" : "14"
	}, {
		"id" : "206",
		"sub" : [ {
			"id" : "1727",
			"name" : "吉首市",
			"pid" : "206"
		}, {
			"id" : "1728",
			"name" : "泸溪县",
			"pid" : "206"
		}, {
			"id" : "1729",
			"name" : "凤凰县",
			"pid" : "206"
		}, {
			"id" : "1730",
			"name" : "花垣县",
			"pid" : "206"
		}, {
			"id" : "1731",
			"name" : "保靖县",
			"pid" : "206"
		}, {
			"id" : "1732",
			"name" : "古丈县",
			"pid" : "206"
		}, {
			"id" : "1733",
			"name" : "永顺县",
			"pid" : "206"
		}, {
			"id" : "1734",
			"name" : "龙山县",
			"pid" : "206"
		} ],
		"name" : "湘西",
		"pid" : "14"
	}, {
		"id" : "207",
		"sub" : [ {
			"id" : "1735",
			"name" : "赫山区",
			"pid" : "207"
		}, {
			"id" : "1736",
			"name" : "资阳区",
			"pid" : "207"
		}, {
			"id" : "1737",
			"name" : "沅江市",
			"pid" : "207"
		}, {
			"id" : "1738",
			"name" : "南县",
			"pid" : "207"
		}, {
			"id" : "1739",
			"name" : "桃江县",
			"pid" : "207"
		}, {
			"id" : "1740",
			"name" : "安化县",
			"pid" : "207"
		} ],
		"name" : "益阳",
		"pid" : "14"
	}, {
		"id" : "208",
		"sub" : [ {
			"id" : "1741",
			"name" : "江华",
			"pid" : "208"
		}, {
			"id" : "1742",
			"name" : "冷水滩区",
			"pid" : "208"
		}, {
			"id" : "1743",
			"name" : "零陵区",
			"pid" : "208"
		}, {
			"id" : "1744",
			"name" : "祁阳县",
			"pid" : "208"
		}, {
			"id" : "1745",
			"name" : "东安县",
			"pid" : "208"
		}, {
			"id" : "1746",
			"name" : "双牌县",
			"pid" : "208"
		}, {
			"id" : "1747",
			"name" : "道县",
			"pid" : "208"
		}, {
			"id" : "1748",
			"name" : "江永县",
			"pid" : "208"
		}, {
			"id" : "1749",
			"name" : "宁远县",
			"pid" : "208"
		}, {
			"id" : "1750",
			"name" : "蓝山县",
			"pid" : "208"
		}, {
			"id" : "1751",
			"name" : "新田县",
			"pid" : "208"
		} ],
		"name" : "永州",
		"pid" : "14"
	}, {
		"id" : "209",
		"sub" : [ {
			"id" : "1752",
			"name" : "岳阳楼区",
			"pid" : "209"
		}, {
			"id" : "1753",
			"name" : "君山区",
			"pid" : "209"
		}, {
			"id" : "1754",
			"name" : "云溪区",
			"pid" : "209"
		}, {
			"id" : "1755",
			"name" : "汨罗市",
			"pid" : "209"
		}, {
			"id" : "1756",
			"name" : "临湘市",
			"pid" : "209"
		}, {
			"id" : "1757",
			"name" : "岳阳县",
			"pid" : "209"
		}, {
			"id" : "1758",
			"name" : "华容县",
			"pid" : "209"
		}, {
			"id" : "1759",
			"name" : "湘阴县",
			"pid" : "209"
		}, {
			"id" : "1760",
			"name" : "平江县",
			"pid" : "209"
		} ],
		"name" : "岳阳",
		"pid" : "14"
	}, {
		"id" : "210",
		"sub" : [ {
			"id" : "1761",
			"name" : "天元区",
			"pid" : "210"
		}, {
			"id" : "1762",
			"name" : "荷塘区",
			"pid" : "210"
		}, {
			"id" : "1763",
			"name" : "芦淞区",
			"pid" : "210"
		}, {
			"id" : "1764",
			"name" : "石峰区",
			"pid" : "210"
		}, {
			"id" : "1765",
			"name" : "醴陵市",
			"pid" : "210"
		}, {
			"id" : "1766",
			"name" : "株洲县",
			"pid" : "210"
		}, {
			"id" : "1767",
			"name" : "攸县",
			"pid" : "210"
		}, {
			"id" : "1768",
			"name" : "茶陵县",
			"pid" : "210"
		}, {
			"id" : "1769",
			"name" : "炎陵县",
			"pid" : "210"
		} ],
		"name" : "株洲",
		"pid" : "14"
	} ],
	"name" : "湖南",
	"pid" : "1"
}, {
	"id" : "15",
	"sub" : [ {
		"id" : "211",
		"sub" : [ {
			"id" : "1770",
			"name" : "朝阳区",
			"pid" : "211"
		}, {
			"id" : "1771",
			"name" : "宽城区",
			"pid" : "211"
		}, {
			"id" : "1772",
			"name" : "二道区",
			"pid" : "211"
		}, {
			"id" : "1773",
			"name" : "南关区",
			"pid" : "211"
		}, {
			"id" : "1774",
			"name" : "绿园区",
			"pid" : "211"
		}, {
			"id" : "1775",
			"name" : "双阳区",
			"pid" : "211"
		}, {
			"id" : "1776",
			"name" : "净月潭开发区",
			"pid" : "211"
		}, {
			"id" : "1777",
			"name" : "高新技术开发区",
			"pid" : "211"
		}, {
			"id" : "1778",
			"name" : "经济技术开发区",
			"pid" : "211"
		}, {
			"id" : "1779",
			"name" : "汽车产业开发区",
			"pid" : "211"
		}, {
			"id" : "1780",
			"name" : "德惠市",
			"pid" : "211"
		}, {
			"id" : "1781",
			"name" : "九台市",
			"pid" : "211"
		}, {
			"id" : "1782",
			"name" : "榆树市",
			"pid" : "211"
		}, {
			"id" : "1783",
			"name" : "农安县",
			"pid" : "211"
		} ],
		"name" : "长春",
		"pid" : "15"
	}, {
		"id" : "212",
		"sub" : [ {
			"id" : "1784",
			"name" : "船营区",
			"pid" : "212"
		}, {
			"id" : "1785",
			"name" : "昌邑区",
			"pid" : "212"
		}, {
			"id" : "1786",
			"name" : "龙潭区",
			"pid" : "212"
		}, {
			"id" : "1787",
			"name" : "丰满区",
			"pid" : "212"
		}, {
			"id" : "1788",
			"name" : "蛟河市",
			"pid" : "212"
		}, {
			"id" : "1789",
			"name" : "桦甸市",
			"pid" : "212"
		}, {
			"id" : "1790",
			"name" : "舒兰市",
			"pid" : "212"
		}, {
			"id" : "1791",
			"name" : "磐石市",
			"pid" : "212"
		}, {
			"id" : "1792",
			"name" : "永吉县",
			"pid" : "212"
		} ],
		"name" : "吉林",
		"pid" : "15"
	}, {
		"id" : "213",
		"sub" : [ {
			"id" : "1793",
			"name" : "洮北区",
			"pid" : "213"
		}, {
			"id" : "1794",
			"name" : "洮南市",
			"pid" : "213"
		}, {
			"id" : "1795",
			"name" : "大安市",
			"pid" : "213"
		}, {
			"id" : "1796",
			"name" : "镇赉县",
			"pid" : "213"
		}, {
			"id" : "1797",
			"name" : "通榆县",
			"pid" : "213"
		} ],
		"name" : "白城",
		"pid" : "15"
	}, {
		"id" : "214",
		"sub" : [ {
			"id" : "1798",
			"name" : "江源区",
			"pid" : "214"
		}, {
			"id" : "1799",
			"name" : "八道江区",
			"pid" : "214"
		}, {
			"id" : "1800",
			"name" : "长白",
			"pid" : "214"
		}, {
			"id" : "1801",
			"name" : "临江市",
			"pid" : "214"
		}, {
			"id" : "1802",
			"name" : "抚松县",
			"pid" : "214"
		}, {
			"id" : "1803",
			"name" : "靖宇县",
			"pid" : "214"
		} ],
		"name" : "白山",
		"pid" : "15"
	}, {
		"id" : "215",
		"sub" : [ {
			"id" : "1804",
			"name" : "龙山区",
			"pid" : "215"
		}, {
			"id" : "1805",
			"name" : "西安区",
			"pid" : "215"
		}, {
			"id" : "1806",
			"name" : "东丰县",
			"pid" : "215"
		}, {
			"id" : "1807",
			"name" : "东辽县",
			"pid" : "215"
		} ],
		"name" : "辽源",
		"pid" : "15"
	}, {
		"id" : "216",
		"sub" : [ {
			"id" : "1808",
			"name" : "铁西区",
			"pid" : "216"
		}, {
			"id" : "1809",
			"name" : "铁东区",
			"pid" : "216"
		}, {
			"id" : "1810",
			"name" : "伊通",
			"pid" : "216"
		}, {
			"id" : "1811",
			"name" : "公主岭市",
			"pid" : "216"
		}, {
			"id" : "1812",
			"name" : "双辽市",
			"pid" : "216"
		}, {
			"id" : "1813",
			"name" : "梨树县",
			"pid" : "216"
		} ],
		"name" : "四平",
		"pid" : "15"
	}, {
		"id" : "217",
		"sub" : [ {
			"id" : "1814",
			"name" : "前郭尔罗斯",
			"pid" : "217"
		}, {
			"id" : "1815",
			"name" : "宁江区",
			"pid" : "217"
		}, {
			"id" : "1816",
			"name" : "长岭县",
			"pid" : "217"
		}, {
			"id" : "1817",
			"name" : "乾安县",
			"pid" : "217"
		}, {
			"id" : "1818",
			"name" : "扶余县",
			"pid" : "217"
		} ],
		"name" : "松原",
		"pid" : "15"
	}, {
		"id" : "218",
		"sub" : [ {
			"id" : "1819",
			"name" : "东昌区",
			"pid" : "218"
		}, {
			"id" : "1820",
			"name" : "二道江区",
			"pid" : "218"
		}, {
			"id" : "1821",
			"name" : "梅河口市",
			"pid" : "218"
		}, {
			"id" : "1822",
			"name" : "集安市",
			"pid" : "218"
		}, {
			"id" : "1823",
			"name" : "通化县",
			"pid" : "218"
		}, {
			"id" : "1824",
			"name" : "辉南县",
			"pid" : "218"
		}, {
			"id" : "1825",
			"name" : "柳河县",
			"pid" : "218"
		} ],
		"name" : "通化",
		"pid" : "15"
	}, {
		"id" : "219",
		"sub" : [ {
			"id" : "1826",
			"name" : "延吉市",
			"pid" : "219"
		}, {
			"id" : "1827",
			"name" : "图们市",
			"pid" : "219"
		}, {
			"id" : "1828",
			"name" : "敦化市",
			"pid" : "219"
		}, {
			"id" : "1829",
			"name" : "珲春市",
			"pid" : "219"
		}, {
			"id" : "1830",
			"name" : "龙井市",
			"pid" : "219"
		}, {
			"id" : "1831",
			"name" : "和龙市",
			"pid" : "219"
		}, {
			"id" : "1832",
			"name" : "安图县",
			"pid" : "219"
		}, {
			"id" : "1833",
			"name" : "汪清县",
			"pid" : "219"
		} ],
		"name" : "延边",
		"pid" : "15"
	} ],
	"name" : "吉林",
	"pid" : "1"
}, {
	"id" : "16",
	"sub" : [ {
		"id" : "220",
		"sub" : [ {
			"id" : "1834",
			"name" : "玄武区",
			"pid" : "220"
		}, {
			"id" : "1835",
			"name" : "鼓楼区",
			"pid" : "220"
		}, {
			"id" : "1836",
			"name" : "白下区",
			"pid" : "220"
		}, {
			"id" : "1837",
			"name" : "建邺区",
			"pid" : "220"
		}, {
			"id" : "1838",
			"name" : "秦淮区",
			"pid" : "220"
		}, {
			"id" : "1839",
			"name" : "雨花台区",
			"pid" : "220"
		}, {
			"id" : "1840",
			"name" : "下关区",
			"pid" : "220"
		}, {
			"id" : "1841",
			"name" : "栖霞区",
			"pid" : "220"
		}, {
			"id" : "1842",
			"name" : "浦口区",
			"pid" : "220"
		}, {
			"id" : "1843",
			"name" : "江宁区",
			"pid" : "220"
		}, {
			"id" : "1844",
			"name" : "六合区",
			"pid" : "220"
		}, {
			"id" : "1845",
			"name" : "溧水县",
			"pid" : "220"
		}, {
			"id" : "1846",
			"name" : "高淳县",
			"pid" : "220"
		} ],
		"name" : "南京",
		"pid" : "16"
	}, {
		"id" : "221",
		"sub" : [ {
			"id" : "1847",
			"name" : "沧浪区",
			"pid" : "221"
		}, {
			"id" : "1848",
			"name" : "金阊区",
			"pid" : "221"
		}, {
			"id" : "1849",
			"name" : "平江区",
			"pid" : "221"
		}, {
			"id" : "1850",
			"name" : "虎丘区",
			"pid" : "221"
		}, {
			"id" : "1851",
			"name" : "吴中区",
			"pid" : "221"
		}, {
			"id" : "1852",
			"name" : "相城区",
			"pid" : "221"
		}, {
			"id" : "1853",
			"name" : "园区",
			"pid" : "221"
		}, {
			"id" : "1854",
			"name" : "新区",
			"pid" : "221"
		}, {
			"id" : "1855",
			"name" : "常熟市",
			"pid" : "221"
		}, {
			"id" : "1856",
			"name" : "张家港市",
			"pid" : "221"
		}, {
			"id" : "1857",
			"name" : "玉山镇",
			"pid" : "221"
		}, {
			"id" : "1858",
			"name" : "巴城镇",
			"pid" : "221"
		}, {
			"id" : "1859",
			"name" : "周市镇",
			"pid" : "221"
		}, {
			"id" : "1860",
			"name" : "陆家镇",
			"pid" : "221"
		}, {
			"id" : "1861",
			"name" : "花桥镇",
			"pid" : "221"
		}, {
			"id" : "1862",
			"name" : "淀山湖镇",
			"pid" : "221"
		}, {
			"id" : "1863",
			"name" : "张浦镇",
			"pid" : "221"
		}, {
			"id" : "1864",
			"name" : "周庄镇",
			"pid" : "221"
		}, {
			"id" : "1865",
			"name" : "千灯镇",
			"pid" : "221"
		}, {
			"id" : "1866",
			"name" : "锦溪镇",
			"pid" : "221"
		}, {
			"id" : "1867",
			"name" : "开发区",
			"pid" : "221"
		}, {
			"id" : "1868",
			"name" : "吴江市",
			"pid" : "221"
		}, {
			"id" : "1869",
			"name" : "太仓市",
			"pid" : "221"
		} ],
		"name" : "苏州",
		"pid" : "16"
	}, {
		"id" : "222",
		"sub" : [ {
			"id" : "1870",
			"name" : "崇安区",
			"pid" : "222"
		}, {
			"id" : "1871",
			"name" : "北塘区",
			"pid" : "222"
		}, {
			"id" : "1872",
			"name" : "南长区",
			"pid" : "222"
		}, {
			"id" : "1873",
			"name" : "锡山区",
			"pid" : "222"
		}, {
			"id" : "1874",
			"name" : "惠山区",
			"pid" : "222"
		}, {
			"id" : "1875",
			"name" : "滨湖区",
			"pid" : "222"
		}, {
			"id" : "1876",
			"name" : "新区",
			"pid" : "222"
		}, {
			"id" : "1877",
			"name" : "江阴市",
			"pid" : "222"
		}, {
			"id" : "1878",
			"name" : "宜兴市",
			"pid" : "222"
		} ],
		"name" : "无锡",
		"pid" : "16"
	}, {
		"id" : "223",
		"sub" : [ {
			"id" : "1879",
			"name" : "天宁区",
			"pid" : "223"
		}, {
			"id" : "1880",
			"name" : "钟楼区",
			"pid" : "223"
		}, {
			"id" : "1881",
			"name" : "戚墅堰区",
			"pid" : "223"
		}, {
			"id" : "1882",
			"name" : "郊区",
			"pid" : "223"
		}, {
			"id" : "1883",
			"name" : "新北区",
			"pid" : "223"
		}, {
			"id" : "1884",
			"name" : "武进区",
			"pid" : "223"
		}, {
			"id" : "1885",
			"name" : "溧阳市",
			"pid" : "223"
		}, {
			"id" : "1886",
			"name" : "金坛市",
			"pid" : "223"
		} ],
		"name" : "常州",
		"pid" : "16"
	}, {
		"id" : "224",
		"sub" : [ {
			"id" : "1887",
			"name" : "清河区",
			"pid" : "224"
		}, {
			"id" : "1888",
			"name" : "清浦区",
			"pid" : "224"
		}, {
			"id" : "1889",
			"name" : "楚州区",
			"pid" : "224"
		}, {
			"id" : "1890",
			"name" : "淮阴区",
			"pid" : "224"
		}, {
			"id" : "1891",
			"name" : "涟水县",
			"pid" : "224"
		}, {
			"id" : "1892",
			"name" : "洪泽县",
			"pid" : "224"
		}, {
			"id" : "1893",
			"name" : "盱眙县",
			"pid" : "224"
		}, {
			"id" : "1894",
			"name" : "金湖县",
			"pid" : "224"
		} ],
		"name" : "淮安",
		"pid" : "16"
	}, {
		"id" : "225",
		"sub" : [ {
			"id" : "1895",
			"name" : "新浦区",
			"pid" : "225"
		}, {
			"id" : "1896",
			"name" : "连云区",
			"pid" : "225"
		}, {
			"id" : "1897",
			"name" : "海州区",
			"pid" : "225"
		}, {
			"id" : "1898",
			"name" : "赣榆县",
			"pid" : "225"
		}, {
			"id" : "1899",
			"name" : "东海县",
			"pid" : "225"
		}, {
			"id" : "1900",
			"name" : "灌云县",
			"pid" : "225"
		}, {
			"id" : "1901",
			"name" : "灌南县",
			"pid" : "225"
		} ],
		"name" : "连云港",
		"pid" : "16"
	}, {
		"id" : "226",
		"sub" : [ {
			"id" : "1902",
			"name" : "崇川区",
			"pid" : "226"
		}, {
			"id" : "1903",
			"name" : "港闸区",
			"pid" : "226"
		}, {
			"id" : "1904",
			"name" : "经济开发区",
			"pid" : "226"
		}, {
			"id" : "1905",
			"name" : "启东市",
			"pid" : "226"
		}, {
			"id" : "1906",
			"name" : "如皋市",
			"pid" : "226"
		}, {
			"id" : "1907",
			"name" : "通州市",
			"pid" : "226"
		}, {
			"id" : "1908",
			"name" : "海门市",
			"pid" : "226"
		}, {
			"id" : "1909",
			"name" : "海安县",
			"pid" : "226"
		}, {
			"id" : "1910",
			"name" : "如东县",
			"pid" : "226"
		} ],
		"name" : "南通",
		"pid" : "16"
	}, {
		"id" : "227",
		"sub" : [ {
			"id" : "1911",
			"name" : "宿城区",
			"pid" : "227"
		}, {
			"id" : "1912",
			"name" : "宿豫区",
			"pid" : "227"
		}, {
			"id" : "1913",
			"name" : "宿豫县",
			"pid" : "227"
		}, {
			"id" : "1914",
			"name" : "沭阳县",
			"pid" : "227"
		}, {
			"id" : "1915",
			"name" : "泗阳县",
			"pid" : "227"
		}, {
			"id" : "1916",
			"name" : "泗洪县",
			"pid" : "227"
		} ],
		"name" : "宿迁",
		"pid" : "16"
	}, {
		"id" : "228",
		"sub" : [ {
			"id" : "1917",
			"name" : "海陵区",
			"pid" : "228"
		}, {
			"id" : "1918",
			"name" : "高港区",
			"pid" : "228"
		}, {
			"id" : "1919",
			"name" : "兴化市",
			"pid" : "228"
		}, {
			"id" : "1920",
			"name" : "靖江市",
			"pid" : "228"
		}, {
			"id" : "1921",
			"name" : "泰兴市",
			"pid" : "228"
		}, {
			"id" : "1922",
			"name" : "姜堰市",
			"pid" : "228"
		} ],
		"name" : "泰州",
		"pid" : "16"
	}, {
		"id" : "229",
		"sub" : [ {
			"id" : "1923",
			"name" : "云龙区",
			"pid" : "229"
		}, {
			"id" : "1924",
			"name" : "鼓楼区",
			"pid" : "229"
		}, {
			"id" : "1925",
			"name" : "九里区",
			"pid" : "229"
		}, {
			"id" : "1926",
			"name" : "贾汪区",
			"pid" : "229"
		}, {
			"id" : "1927",
			"name" : "泉山区",
			"pid" : "229"
		}, {
			"id" : "1928",
			"name" : "新沂市",
			"pid" : "229"
		}, {
			"id" : "1929",
			"name" : "邳州市",
			"pid" : "229"
		}, {
			"id" : "1930",
			"name" : "丰县",
			"pid" : "229"
		}, {
			"id" : "1931",
			"name" : "沛县",
			"pid" : "229"
		}, {
			"id" : "1932",
			"name" : "铜山县",
			"pid" : "229"
		}, {
			"id" : "1933",
			"name" : "睢宁县",
			"pid" : "229"
		} ],
		"name" : "徐州",
		"pid" : "16"
	}, {
		"id" : "230",
		"sub" : [ {
			"id" : "1934",
			"name" : "城区",
			"pid" : "230"
		}, {
			"id" : "1935",
			"name" : "亭湖区",
			"pid" : "230"
		}, {
			"id" : "1936",
			"name" : "盐都区",
			"pid" : "230"
		}, {
			"id" : "1937",
			"name" : "盐都县",
			"pid" : "230"
		}, {
			"id" : "1938",
			"name" : "东台市",
			"pid" : "230"
		}, {
			"id" : "1939",
			"name" : "大丰市",
			"pid" : "230"
		}, {
			"id" : "1940",
			"name" : "响水县",
			"pid" : "230"
		}, {
			"id" : "1941",
			"name" : "滨海县",
			"pid" : "230"
		}, {
			"id" : "1942",
			"name" : "阜宁县",
			"pid" : "230"
		}, {
			"id" : "1943",
			"name" : "射阳县",
			"pid" : "230"
		}, {
			"id" : "1944",
			"name" : "建湖县",
			"pid" : "230"
		} ],
		"name" : "盐城",
		"pid" : "16"
	}, {
		"id" : "231",
		"sub" : [ {
			"id" : "1945",
			"name" : "广陵区",
			"pid" : "231"
		}, {
			"id" : "1946",
			"name" : "维扬区",
			"pid" : "231"
		}, {
			"id" : "1947",
			"name" : "邗江区",
			"pid" : "231"
		}, {
			"id" : "1948",
			"name" : "仪征市",
			"pid" : "231"
		}, {
			"id" : "1949",
			"name" : "高邮市",
			"pid" : "231"
		}, {
			"id" : "1950",
			"name" : "江都市",
			"pid" : "231"
		}, {
			"id" : "1951",
			"name" : "宝应县",
			"pid" : "231"
		} ],
		"name" : "扬州",
		"pid" : "16"
	}, {
		"id" : "232",
		"sub" : [ {
			"id" : "1952",
			"name" : "京口区",
			"pid" : "232"
		}, {
			"id" : "1953",
			"name" : "润州区",
			"pid" : "232"
		}, {
			"id" : "1954",
			"name" : "丹徒区",
			"pid" : "232"
		}, {
			"id" : "1955",
			"name" : "丹阳市",
			"pid" : "232"
		}, {
			"id" : "1956",
			"name" : "扬中市",
			"pid" : "232"
		}, {
			"id" : "1957",
			"name" : "句容市",
			"pid" : "232"
		} ],
		"name" : "镇江",
		"pid" : "16"
	} ],
	"name" : "江苏",
	"pid" : "1"
}, {
	"id" : "17",
	"sub" : [ {
		"id" : "233",
		"sub" : [ {
			"id" : "1958",
			"name" : "东湖区",
			"pid" : "233"
		}, {
			"id" : "1959",
			"name" : "西湖区",
			"pid" : "233"
		}, {
			"id" : "1960",
			"name" : "青云谱区",
			"pid" : "233"
		}, {
			"id" : "1961",
			"name" : "湾里区",
			"pid" : "233"
		}, {
			"id" : "1962",
			"name" : "青山湖区",
			"pid" : "233"
		}, {
			"id" : "1963",
			"name" : "红谷滩新区",
			"pid" : "233"
		}, {
			"id" : "1964",
			"name" : "昌北区",
			"pid" : "233"
		}, {
			"id" : "1965",
			"name" : "高新区",
			"pid" : "233"
		}, {
			"id" : "1966",
			"name" : "南昌县",
			"pid" : "233"
		}, {
			"id" : "1967",
			"name" : "新建县",
			"pid" : "233"
		}, {
			"id" : "1968",
			"name" : "安义县",
			"pid" : "233"
		}, {
			"id" : "1969",
			"name" : "进贤县",
			"pid" : "233"
		} ],
		"name" : "南昌",
		"pid" : "17"
	}, {
		"id" : "234",
		"sub" : [ {
			"id" : "1970",
			"name" : "临川区",
			"pid" : "234"
		}, {
			"id" : "1971",
			"name" : "南城县",
			"pid" : "234"
		}, {
			"id" : "1972",
			"name" : "黎川县",
			"pid" : "234"
		}, {
			"id" : "1973",
			"name" : "南丰县",
			"pid" : "234"
		}, {
			"id" : "1974",
			"name" : "崇仁县",
			"pid" : "234"
		}, {
			"id" : "1975",
			"name" : "乐安县",
			"pid" : "234"
		}, {
			"id" : "1976",
			"name" : "宜黄县",
			"pid" : "234"
		}, {
			"id" : "1977",
			"name" : "金溪县",
			"pid" : "234"
		}, {
			"id" : "1978",
			"name" : "资溪县",
			"pid" : "234"
		}, {
			"id" : "1979",
			"name" : "东乡县",
			"pid" : "234"
		}, {
			"id" : "1980",
			"name" : "广昌县",
			"pid" : "234"
		} ],
		"name" : "抚州",
		"pid" : "17"
	}, {
		"id" : "235",
		"sub" : [ {
			"id" : "1981",
			"name" : "章贡区",
			"pid" : "235"
		}, {
			"id" : "1982",
			"name" : "于都县",
			"pid" : "235"
		}, {
			"id" : "1983",
			"name" : "瑞金市",
			"pid" : "235"
		}, {
			"id" : "1984",
			"name" : "南康市",
			"pid" : "235"
		}, {
			"id" : "1985",
			"name" : "赣县",
			"pid" : "235"
		}, {
			"id" : "1986",
			"name" : "信丰县",
			"pid" : "235"
		}, {
			"id" : "1987",
			"name" : "大余县",
			"pid" : "235"
		}, {
			"id" : "1988",
			"name" : "上犹县",
			"pid" : "235"
		}, {
			"id" : "1989",
			"name" : "崇义县",
			"pid" : "235"
		}, {
			"id" : "1990",
			"name" : "安远县",
			"pid" : "235"
		}, {
			"id" : "1991",
			"name" : "龙南县",
			"pid" : "235"
		}, {
			"id" : "1992",
			"name" : "定南县",
			"pid" : "235"
		}, {
			"id" : "1993",
			"name" : "全南县",
			"pid" : "235"
		}, {
			"id" : "1994",
			"name" : "宁都县",
			"pid" : "235"
		}, {
			"id" : "1995",
			"name" : "兴国县",
			"pid" : "235"
		}, {
			"id" : "1996",
			"name" : "会昌县",
			"pid" : "235"
		}, {
			"id" : "1997",
			"name" : "寻乌县",
			"pid" : "235"
		}, {
			"id" : "1998",
			"name" : "石城县",
			"pid" : "235"
		} ],
		"name" : "赣州",
		"pid" : "17"
	}, {
		"id" : "236",
		"sub" : [ {
			"id" : "1999",
			"name" : "安福县",
			"pid" : "236"
		}, {
			"id" : "2000",
			"name" : "吉州区",
			"pid" : "236"
		}, {
			"id" : "2001",
			"name" : "青原区",
			"pid" : "236"
		}, {
			"id" : "2002",
			"name" : "井冈山市",
			"pid" : "236"
		}, {
			"id" : "2003",
			"name" : "吉安县",
			"pid" : "236"
		}, {
			"id" : "2004",
			"name" : "吉水县",
			"pid" : "236"
		}, {
			"id" : "2005",
			"name" : "峡江县",
			"pid" : "236"
		}, {
			"id" : "2006",
			"name" : "新干县",
			"pid" : "236"
		}, {
			"id" : "2007",
			"name" : "永丰县",
			"pid" : "236"
		}, {
			"id" : "2008",
			"name" : "泰和县",
			"pid" : "236"
		}, {
			"id" : "2009",
			"name" : "遂川县",
			"pid" : "236"
		}, {
			"id" : "2010",
			"name" : "万安县",
			"pid" : "236"
		}, {
			"id" : "2011",
			"name" : "永新县",
			"pid" : "236"
		} ],
		"name" : "吉安",
		"pid" : "17"
	}, {
		"id" : "237",
		"sub" : [ {
			"id" : "2012",
			"name" : "珠山区",
			"pid" : "237"
		}, {
			"id" : "2013",
			"name" : "昌江区",
			"pid" : "237"
		}, {
			"id" : "2014",
			"name" : "乐平市",
			"pid" : "237"
		}, {
			"id" : "2015",
			"name" : "浮梁县",
			"pid" : "237"
		} ],
		"name" : "景德镇",
		"pid" : "17"
	}, {
		"id" : "238",
		"sub" : [ {
			"id" : "2016",
			"name" : "浔阳区",
			"pid" : "238"
		}, {
			"id" : "2017",
			"name" : "庐山区",
			"pid" : "238"
		}, {
			"id" : "2018",
			"name" : "瑞昌市",
			"pid" : "238"
		}, {
			"id" : "2019",
			"name" : "九江县",
			"pid" : "238"
		}, {
			"id" : "2020",
			"name" : "武宁县",
			"pid" : "238"
		}, {
			"id" : "2021",
			"name" : "修水县",
			"pid" : "238"
		}, {
			"id" : "2022",
			"name" : "永修县",
			"pid" : "238"
		}, {
			"id" : "2023",
			"name" : "德安县",
			"pid" : "238"
		}, {
			"id" : "2024",
			"name" : "星子县",
			"pid" : "238"
		}, {
			"id" : "2025",
			"name" : "都昌县",
			"pid" : "238"
		}, {
			"id" : "2026",
			"name" : "湖口县",
			"pid" : "238"
		}, {
			"id" : "2027",
			"name" : "彭泽县",
			"pid" : "238"
		} ],
		"name" : "九江",
		"pid" : "17"
	}, {
		"id" : "239",
		"sub" : [ {
			"id" : "2028",
			"name" : "安源区",
			"pid" : "239"
		}, {
			"id" : "2029",
			"name" : "湘东区",
			"pid" : "239"
		}, {
			"id" : "2030",
			"name" : "莲花县",
			"pid" : "239"
		}, {
			"id" : "2031",
			"name" : "芦溪县",
			"pid" : "239"
		}, {
			"id" : "2032",
			"name" : "上栗县",
			"pid" : "239"
		} ],
		"name" : "萍乡",
		"pid" : "17"
	}, {
		"id" : "240",
		"sub" : [ {
			"id" : "2033",
			"name" : "信州区",
			"pid" : "240"
		}, {
			"id" : "2034",
			"name" : "德兴市",
			"pid" : "240"
		}, {
			"id" : "2035",
			"name" : "上饶县",
			"pid" : "240"
		}, {
			"id" : "2036",
			"name" : "广丰县",
			"pid" : "240"
		}, {
			"id" : "2037",
			"name" : "玉山县",
			"pid" : "240"
		}, {
			"id" : "2038",
			"name" : "铅山县",
			"pid" : "240"
		}, {
			"id" : "2039",
			"name" : "横峰县",
			"pid" : "240"
		}, {
			"id" : "2040",
			"name" : "弋阳县",
			"pid" : "240"
		}, {
			"id" : "2041",
			"name" : "余干县",
			"pid" : "240"
		}, {
			"id" : "2042",
			"name" : "波阳县",
			"pid" : "240"
		}, {
			"id" : "2043",
			"name" : "万年县",
			"pid" : "240"
		}, {
			"id" : "2044",
			"name" : "婺源县",
			"pid" : "240"
		} ],
		"name" : "上饶",
		"pid" : "17"
	}, {
		"id" : "241",
		"sub" : [ {
			"id" : "2045",
			"name" : "渝水区",
			"pid" : "241"
		}, {
			"id" : "2046",
			"name" : "分宜县",
			"pid" : "241"
		} ],
		"name" : "新余",
		"pid" : "17"
	}, {
		"id" : "242",
		"sub" : [ {
			"id" : "2047",
			"name" : "袁州区",
			"pid" : "242"
		}, {
			"id" : "2048",
			"name" : "丰城市",
			"pid" : "242"
		}, {
			"id" : "2049",
			"name" : "樟树市",
			"pid" : "242"
		}, {
			"id" : "2050",
			"name" : "高安市",
			"pid" : "242"
		}, {
			"id" : "2051",
			"name" : "奉新县",
			"pid" : "242"
		}, {
			"id" : "2052",
			"name" : "万载县",
			"pid" : "242"
		}, {
			"id" : "2053",
			"name" : "上高县",
			"pid" : "242"
		}, {
			"id" : "2054",
			"name" : "宜丰县",
			"pid" : "242"
		}, {
			"id" : "2055",
			"name" : "靖安县",
			"pid" : "242"
		}, {
			"id" : "2056",
			"name" : "铜鼓县",
			"pid" : "242"
		} ],
		"name" : "宜春",
		"pid" : "17"
	}, {
		"id" : "243",
		"sub" : [ {
			"id" : "2057",
			"name" : "月湖区",
			"pid" : "243"
		}, {
			"id" : "2058",
			"name" : "贵溪市",
			"pid" : "243"
		}, {
			"id" : "2059",
			"name" : "余江县",
			"pid" : "243"
		} ],
		"name" : "鹰潭",
		"pid" : "17"
	} ],
	"name" : "江西",
	"pid" : "1"
}, {
	"id" : "18",
	"sub" : [ {
		"id" : "244",
		"sub" : [ {
			"id" : "2060",
			"name" : "沈河区",
			"pid" : "244"
		}, {
			"id" : "2061",
			"name" : "皇姑区",
			"pid" : "244"
		}, {
			"id" : "2062",
			"name" : "和平区",
			"pid" : "244"
		}, {
			"id" : "2063",
			"name" : "大东区",
			"pid" : "244"
		}, {
			"id" : "2064",
			"name" : "铁西区",
			"pid" : "244"
		}, {
			"id" : "2065",
			"name" : "苏家屯区",
			"pid" : "244"
		}, {
			"id" : "2066",
			"name" : "东陵区",
			"pid" : "244"
		}, {
			"id" : "2067",
			"name" : "沈北新区",
			"pid" : "244"
		}, {
			"id" : "2068",
			"name" : "于洪区",
			"pid" : "244"
		}, {
			"id" : "2069",
			"name" : "浑南新区",
			"pid" : "244"
		}, {
			"id" : "2070",
			"name" : "新民市",
			"pid" : "244"
		}, {
			"id" : "2071",
			"name" : "辽中县",
			"pid" : "244"
		}, {
			"id" : "2072",
			"name" : "康平县",
			"pid" : "244"
		}, {
			"id" : "2073",
			"name" : "法库县",
			"pid" : "244"
		} ],
		"name" : "沈阳",
		"pid" : "18"
	}, {
		"id" : "245",
		"sub" : [ {
			"id" : "2074",
			"name" : "西岗区",
			"pid" : "245"
		}, {
			"id" : "2075",
			"name" : "中山区",
			"pid" : "245"
		}, {
			"id" : "2076",
			"name" : "沙河口区",
			"pid" : "245"
		}, {
			"id" : "2077",
			"name" : "甘井子区",
			"pid" : "245"
		}, {
			"id" : "2078",
			"name" : "旅顺口区",
			"pid" : "245"
		}, {
			"id" : "2079",
			"name" : "金州区",
			"pid" : "245"
		}, {
			"id" : "2080",
			"name" : "开发区",
			"pid" : "245"
		}, {
			"id" : "2081",
			"name" : "瓦房店市",
			"pid" : "245"
		}, {
			"id" : "2082",
			"name" : "普兰店市",
			"pid" : "245"
		}, {
			"id" : "2083",
			"name" : "庄河市",
			"pid" : "245"
		}, {
			"id" : "2084",
			"name" : "长海县",
			"pid" : "245"
		} ],
		"name" : "大连",
		"pid" : "18"
	}, {
		"id" : "246",
		"sub" : [ {
			"id" : "2085",
			"name" : "铁东区",
			"pid" : "246"
		}, {
			"id" : "2086",
			"name" : "铁西区",
			"pid" : "246"
		}, {
			"id" : "2087",
			"name" : "立山区",
			"pid" : "246"
		}, {
			"id" : "2088",
			"name" : "千山区",
			"pid" : "246"
		}, {
			"id" : "2089",
			"name" : "岫岩",
			"pid" : "246"
		}, {
			"id" : "2090",
			"name" : "海城市",
			"pid" : "246"
		}, {
			"id" : "2091",
			"name" : "台安县",
			"pid" : "246"
		} ],
		"name" : "鞍山",
		"pid" : "18"
	}, {
		"id" : "247",
		"sub" : [ {
			"id" : "2092",
			"name" : "本溪",
			"pid" : "247"
		}, {
			"id" : "2093",
			"name" : "平山区",
			"pid" : "247"
		}, {
			"id" : "2094",
			"name" : "明山区",
			"pid" : "247"
		}, {
			"id" : "2095",
			"name" : "溪湖区",
			"pid" : "247"
		}, {
			"id" : "2096",
			"name" : "南芬区",
			"pid" : "247"
		}, {
			"id" : "2097",
			"name" : "桓仁",
			"pid" : "247"
		} ],
		"name" : "本溪",
		"pid" : "18"
	}, {
		"id" : "248",
		"sub" : [ {
			"id" : "2098",
			"name" : "双塔区",
			"pid" : "248"
		}, {
			"id" : "2099",
			"name" : "龙城区",
			"pid" : "248"
		}, {
			"id" : "2100",
			"name" : "喀喇沁左翼蒙古族自治县",
			"pid" : "248"
		}, {
			"id" : "2101",
			"name" : "北票市",
			"pid" : "248"
		}, {
			"id" : "2102",
			"name" : "凌源市",
			"pid" : "248"
		}, {
			"id" : "2103",
			"name" : "朝阳县",
			"pid" : "248"
		}, {
			"id" : "2104",
			"name" : "建平县",
			"pid" : "248"
		} ],
		"name" : "朝阳",
		"pid" : "18"
	}, {
		"id" : "249",
		"sub" : [ {
			"id" : "2105",
			"name" : "振兴区",
			"pid" : "249"
		}, {
			"id" : "2106",
			"name" : "元宝区",
			"pid" : "249"
		}, {
			"id" : "2107",
			"name" : "振安区",
			"pid" : "249"
		}, {
			"id" : "2108",
			"name" : "宽甸",
			"pid" : "249"
		}, {
			"id" : "2109",
			"name" : "东港市",
			"pid" : "249"
		}, {
			"id" : "2110",
			"name" : "凤城市",
			"pid" : "249"
		} ],
		"name" : "丹东",
		"pid" : "18"
	}, {
		"id" : "250",
		"sub" : [ {
			"id" : "2111",
			"name" : "顺城区",
			"pid" : "250"
		}, {
			"id" : "2112",
			"name" : "新抚区",
			"pid" : "250"
		}, {
			"id" : "2113",
			"name" : "东洲区",
			"pid" : "250"
		}, {
			"id" : "2114",
			"name" : "望花区",
			"pid" : "250"
		}, {
			"id" : "2115",
			"name" : "清原",
			"pid" : "250"
		}, {
			"id" : "2116",
			"name" : "新宾",
			"pid" : "250"
		}, {
			"id" : "2117",
			"name" : "抚顺县",
			"pid" : "250"
		} ],
		"name" : "抚顺",
		"pid" : "18"
	}, {
		"id" : "251",
		"sub" : [ {
			"id" : "2118",
			"name" : "阜新",
			"pid" : "251"
		}, {
			"id" : "2119",
			"name" : "海州区",
			"pid" : "251"
		}, {
			"id" : "2120",
			"name" : "新邱区",
			"pid" : "251"
		}, {
			"id" : "2121",
			"name" : "太平区",
			"pid" : "251"
		}, {
			"id" : "2122",
			"name" : "清河门区",
			"pid" : "251"
		}, {
			"id" : "2123",
			"name" : "细河区",
			"pid" : "251"
		}, {
			"id" : "2124",
			"name" : "彰武县",
			"pid" : "251"
		} ],
		"name" : "阜新",
		"pid" : "18"
	}, {
		"id" : "252",
		"sub" : [ {
			"id" : "2125",
			"name" : "龙港区",
			"pid" : "252"
		}, {
			"id" : "2126",
			"name" : "南票区",
			"pid" : "252"
		}, {
			"id" : "2127",
			"name" : "连山区",
			"pid" : "252"
		}, {
			"id" : "2128",
			"name" : "兴城市",
			"pid" : "252"
		}, {
			"id" : "2129",
			"name" : "绥中县",
			"pid" : "252"
		}, {
			"id" : "2130",
			"name" : "建昌县",
			"pid" : "252"
		} ],
		"name" : "葫芦岛",
		"pid" : "18"
	}, {
		"id" : "253",
		"sub" : [ {
			"id" : "2131",
			"name" : "太和区",
			"pid" : "253"
		}, {
			"id" : "2132",
			"name" : "古塔区",
			"pid" : "253"
		}, {
			"id" : "2133",
			"name" : "凌河区",
			"pid" : "253"
		}, {
			"id" : "2134",
			"name" : "凌海市",
			"pid" : "253"
		}, {
			"id" : "2135",
			"name" : "北镇市",
			"pid" : "253"
		}, {
			"id" : "2136",
			"name" : "黑山县",
			"pid" : "253"
		}, {
			"id" : "2137",
			"name" : "义县",
			"pid" : "253"
		} ],
		"name" : "锦州",
		"pid" : "18"
	}, {
		"id" : "254",
		"sub" : [ {
			"id" : "2138",
			"name" : "白塔区",
			"pid" : "254"
		}, {
			"id" : "2139",
			"name" : "文圣区",
			"pid" : "254"
		}, {
			"id" : "2140",
			"name" : "宏伟区",
			"pid" : "254"
		}, {
			"id" : "2141",
			"name" : "太子河区",
			"pid" : "254"
		}, {
			"id" : "2142",
			"name" : "弓长岭区",
			"pid" : "254"
		}, {
			"id" : "2143",
			"name" : "灯塔市",
			"pid" : "254"
		}, {
			"id" : "2144",
			"name" : "辽阳县",
			"pid" : "254"
		} ],
		"name" : "辽阳",
		"pid" : "18"
	}, {
		"id" : "255",
		"sub" : [ {
			"id" : "2145",
			"name" : "双台子区",
			"pid" : "255"
		}, {
			"id" : "2146",
			"name" : "兴隆台区",
			"pid" : "255"
		}, {
			"id" : "2147",
			"name" : "大洼县",
			"pid" : "255"
		}, {
			"id" : "2148",
			"name" : "盘山县",
			"pid" : "255"
		} ],
		"name" : "盘锦",
		"pid" : "18"
	}, {
		"id" : "256",
		"sub" : [ {
			"id" : "2149",
			"name" : "银州区",
			"pid" : "256"
		}, {
			"id" : "2150",
			"name" : "清河区",
			"pid" : "256"
		}, {
			"id" : "2151",
			"name" : "调兵山市",
			"pid" : "256"
		}, {
			"id" : "2152",
			"name" : "开原市",
			"pid" : "256"
		}, {
			"id" : "2153",
			"name" : "铁岭县",
			"pid" : "256"
		}, {
			"id" : "2154",
			"name" : "西丰县",
			"pid" : "256"
		}, {
			"id" : "2155",
			"name" : "昌图县",
			"pid" : "256"
		} ],
		"name" : "铁岭",
		"pid" : "18"
	}, {
		"id" : "257",
		"sub" : [ {
			"id" : "2156",
			"name" : "站前区",
			"pid" : "257"
		}, {
			"id" : "2157",
			"name" : "西市区",
			"pid" : "257"
		}, {
			"id" : "2158",
			"name" : "鲅鱼圈区",
			"pid" : "257"
		}, {
			"id" : "2159",
			"name" : "老边区",
			"pid" : "257"
		}, {
			"id" : "2160",
			"name" : "盖州市",
			"pid" : "257"
		}, {
			"id" : "2161",
			"name" : "大石桥市",
			"pid" : "257"
		} ],
		"name" : "营口",
		"pid" : "18"
	} ],
	"name" : "辽宁",
	"pid" : "1"
}, {
	"id" : "19",
	"sub" : [ {
		"id" : "258",
		"sub" : [ {
			"id" : "2162",
			"name" : "回民区",
			"pid" : "258"
		}, {
			"id" : "2163",
			"name" : "玉泉区",
			"pid" : "258"
		}, {
			"id" : "2164",
			"name" : "新城区",
			"pid" : "258"
		}, {
			"id" : "2165",
			"name" : "赛罕区",
			"pid" : "258"
		}, {
			"id" : "2166",
			"name" : "清水河县",
			"pid" : "258"
		}, {
			"id" : "2167",
			"name" : "土默特左旗",
			"pid" : "258"
		}, {
			"id" : "2168",
			"name" : "托克托县",
			"pid" : "258"
		}, {
			"id" : "2169",
			"name" : "和林格尔县",
			"pid" : "258"
		}, {
			"id" : "2170",
			"name" : "武川县",
			"pid" : "258"
		} ],
		"name" : "呼和浩特",
		"pid" : "19"
	}, {
		"id" : "259",
		"sub" : [ {
			"id" : "2171",
			"name" : "阿拉善左旗",
			"pid" : "259"
		}, {
			"id" : "2172",
			"name" : "阿拉善右旗",
			"pid" : "259"
		}, {
			"id" : "2173",
			"name" : "额济纳旗",
			"pid" : "259"
		} ],
		"name" : "阿拉善盟",
		"pid" : "19"
	}, {
		"id" : "260",
		"sub" : [ {
			"id" : "2174",
			"name" : "临河区",
			"pid" : "260"
		}, {
			"id" : "2175",
			"name" : "五原县",
			"pid" : "260"
		}, {
			"id" : "2176",
			"name" : "磴口县",
			"pid" : "260"
		}, {
			"id" : "2177",
			"name" : "乌拉特前旗",
			"pid" : "260"
		}, {
			"id" : "2178",
			"name" : "乌拉特中旗",
			"pid" : "260"
		}, {
			"id" : "2179",
			"name" : "乌拉特后旗",
			"pid" : "260"
		}, {
			"id" : "2180",
			"name" : "杭锦后旗",
			"pid" : "260"
		} ],
		"name" : "巴彦淖尔盟",
		"pid" : "19"
	}, {
		"id" : "261",
		"sub" : [ {
			"id" : "2181",
			"name" : "昆都仑区",
			"pid" : "261"
		}, {
			"id" : "2182",
			"name" : "青山区",
			"pid" : "261"
		}, {
			"id" : "2183",
			"name" : "东河区",
			"pid" : "261"
		}, {
			"id" : "2184",
			"name" : "九原区",
			"pid" : "261"
		}, {
			"id" : "2185",
			"name" : "石拐区",
			"pid" : "261"
		}, {
			"id" : "2186",
			"name" : "白云矿区",
			"pid" : "261"
		}, {
			"id" : "2187",
			"name" : "土默特右旗",
			"pid" : "261"
		}, {
			"id" : "2188",
			"name" : "固阳县",
			"pid" : "261"
		}, {
			"id" : "2189",
			"name" : "达尔罕茂明安联合旗",
			"pid" : "261"
		} ],
		"name" : "包头",
		"pid" : "19"
	}, {
		"id" : "262",
		"sub" : [ {
			"id" : "2190",
			"name" : "红山区",
			"pid" : "262"
		}, {
			"id" : "2191",
			"name" : "元宝山区",
			"pid" : "262"
		}, {
			"id" : "2192",
			"name" : "松山区",
			"pid" : "262"
		}, {
			"id" : "2193",
			"name" : "阿鲁科尔沁旗",
			"pid" : "262"
		}, {
			"id" : "2194",
			"name" : "巴林左旗",
			"pid" : "262"
		}, {
			"id" : "2195",
			"name" : "巴林右旗",
			"pid" : "262"
		}, {
			"id" : "2196",
			"name" : "林西县",
			"pid" : "262"
		}, {
			"id" : "2197",
			"name" : "克什克腾旗",
			"pid" : "262"
		}, {
			"id" : "2198",
			"name" : "翁牛特旗",
			"pid" : "262"
		}, {
			"id" : "2199",
			"name" : "喀喇沁旗",
			"pid" : "262"
		}, {
			"id" : "2200",
			"name" : "宁城县",
			"pid" : "262"
		}, {
			"id" : "2201",
			"name" : "敖汉旗",
			"pid" : "262"
		} ],
		"name" : "赤峰",
		"pid" : "19"
	}, {
		"id" : "263",
		"sub" : [ {
			"id" : "2202",
			"name" : "东胜区",
			"pid" : "263"
		}, {
			"id" : "2203",
			"name" : "达拉特旗",
			"pid" : "263"
		}, {
			"id" : "2204",
			"name" : "准格尔旗",
			"pid" : "263"
		}, {
			"id" : "2205",
			"name" : "鄂托克前旗",
			"pid" : "263"
		}, {
			"id" : "2206",
			"name" : "鄂托克旗",
			"pid" : "263"
		}, {
			"id" : "2207",
			"name" : "杭锦旗",
			"pid" : "263"
		}, {
			"id" : "2208",
			"name" : "乌审旗",
			"pid" : "263"
		}, {
			"id" : "2209",
			"name" : "伊金霍洛旗",
			"pid" : "263"
		} ],
		"name" : "鄂尔多斯",
		"pid" : "19"
	}, {
		"id" : "264",
		"sub" : [ {
			"id" : "2210",
			"name" : "海拉尔区",
			"pid" : "264"
		}, {
			"id" : "2211",
			"name" : "莫力达瓦",
			"pid" : "264"
		}, {
			"id" : "2212",
			"name" : "满洲里市",
			"pid" : "264"
		}, {
			"id" : "2213",
			"name" : "牙克石市",
			"pid" : "264"
		}, {
			"id" : "2214",
			"name" : "扎兰屯市",
			"pid" : "264"
		}, {
			"id" : "2215",
			"name" : "额尔古纳市",
			"pid" : "264"
		}, {
			"id" : "2216",
			"name" : "根河市",
			"pid" : "264"
		}, {
			"id" : "2217",
			"name" : "阿荣旗",
			"pid" : "264"
		}, {
			"id" : "2218",
			"name" : "鄂伦春自治旗",
			"pid" : "264"
		}, {
			"id" : "2219",
			"name" : "鄂温克族自治旗",
			"pid" : "264"
		}, {
			"id" : "2220",
			"name" : "陈巴尔虎旗",
			"pid" : "264"
		}, {
			"id" : "2221",
			"name" : "新巴尔虎左旗",
			"pid" : "264"
		}, {
			"id" : "2222",
			"name" : "新巴尔虎右旗",
			"pid" : "264"
		} ],
		"name" : "呼伦贝尔",
		"pid" : "19"
	}, {
		"id" : "265",
		"sub" : [ {
			"id" : "2223",
			"name" : "科尔沁区",
			"pid" : "265"
		}, {
			"id" : "2224",
			"name" : "霍林郭勒市",
			"pid" : "265"
		}, {
			"id" : "2225",
			"name" : "科尔沁左翼中旗",
			"pid" : "265"
		}, {
			"id" : "2226",
			"name" : "科尔沁左翼后旗",
			"pid" : "265"
		}, {
			"id" : "2227",
			"name" : "开鲁县",
			"pid" : "265"
		}, {
			"id" : "2228",
			"name" : "库伦旗",
			"pid" : "265"
		}, {
			"id" : "2229",
			"name" : "奈曼旗",
			"pid" : "265"
		}, {
			"id" : "2230",
			"name" : "扎鲁特旗",
			"pid" : "265"
		} ],
		"name" : "通辽",
		"pid" : "19"
	}, {
		"id" : "266",
		"sub" : [ {
			"id" : "2231",
			"name" : "海勃湾区",
			"pid" : "266"
		}, {
			"id" : "2232",
			"name" : "乌达区",
			"pid" : "266"
		}, {
			"id" : "2233",
			"name" : "海南区",
			"pid" : "266"
		} ],
		"name" : "乌海",
		"pid" : "19"
	}, {
		"id" : "267",
		"sub" : [ {
			"id" : "2234",
			"name" : "化德县",
			"pid" : "267"
		}, {
			"id" : "2235",
			"name" : "集宁区",
			"pid" : "267"
		}, {
			"id" : "2236",
			"name" : "丰镇市",
			"pid" : "267"
		}, {
			"id" : "2237",
			"name" : "卓资县",
			"pid" : "267"
		}, {
			"id" : "2238",
			"name" : "商都县",
			"pid" : "267"
		}, {
			"id" : "2239",
			"name" : "兴和县",
			"pid" : "267"
		}, {
			"id" : "2240",
			"name" : "凉城县",
			"pid" : "267"
		}, {
			"id" : "2241",
			"name" : "察哈尔右翼前旗",
			"pid" : "267"
		}, {
			"id" : "2242",
			"name" : "察哈尔右翼中旗",
			"pid" : "267"
		}, {
			"id" : "2243",
			"name" : "察哈尔右翼后旗",
			"pid" : "267"
		}, {
			"id" : "2244",
			"name" : "四子王旗",
			"pid" : "267"
		} ],
		"name" : "乌兰察布市",
		"pid" : "19"
	}, {
		"id" : "268",
		"sub" : [ {
			"id" : "2245",
			"name" : "二连浩特市",
			"pid" : "268"
		}, {
			"id" : "2246",
			"name" : "锡林浩特市",
			"pid" : "268"
		}, {
			"id" : "2247",
			"name" : "阿巴嘎旗",
			"pid" : "268"
		}, {
			"id" : "2248",
			"name" : "苏尼特左旗",
			"pid" : "268"
		}, {
			"id" : "2249",
			"name" : "苏尼特右旗",
			"pid" : "268"
		}, {
			"id" : "2250",
			"name" : "东乌珠穆沁旗",
			"pid" : "268"
		}, {
			"id" : "2251",
			"name" : "西乌珠穆沁旗",
			"pid" : "268"
		}, {
			"id" : "2252",
			"name" : "太仆寺旗",
			"pid" : "268"
		}, {
			"id" : "2253",
			"name" : "镶黄旗",
			"pid" : "268"
		}, {
			"id" : "2254",
			"name" : "正镶白旗",
			"pid" : "268"
		}, {
			"id" : "2255",
			"name" : "正蓝旗",
			"pid" : "268"
		}, {
			"id" : "2256",
			"name" : "多伦县",
			"pid" : "268"
		} ],
		"name" : "锡林郭勒盟",
		"pid" : "19"
	}, {
		"id" : "269",
		"sub" : [ {
			"id" : "2257",
			"name" : "乌兰浩特市",
			"pid" : "269"
		}, {
			"id" : "2258",
			"name" : "阿尔山市",
			"pid" : "269"
		}, {
			"id" : "2259",
			"name" : "科尔沁右翼前旗",
			"pid" : "269"
		}, {
			"id" : "2260",
			"name" : "科尔沁右翼中旗",
			"pid" : "269"
		}, {
			"id" : "2261",
			"name" : "扎赉特旗",
			"pid" : "269"
		}, {
			"id" : "2262",
			"name" : "突泉县",
			"pid" : "269"
		} ],
		"name" : "兴安盟",
		"pid" : "19"
	} ],
	"name" : "内蒙古",
	"pid" : "1"
}, {
	"id" : "20",
	"sub" : [ {
		"id" : "270",
		"sub" : [ {
			"id" : "2263",
			"name" : "西夏区",
			"pid" : "270"
		}, {
			"id" : "2264",
			"name" : "金凤区",
			"pid" : "270"
		}, {
			"id" : "2265",
			"name" : "兴庆区",
			"pid" : "270"
		}, {
			"id" : "2266",
			"name" : "灵武市",
			"pid" : "270"
		}, {
			"id" : "2267",
			"name" : "永宁县",
			"pid" : "270"
		}, {
			"id" : "2268",
			"name" : "贺兰县",
			"pid" : "270"
		} ],
		"name" : "银川",
		"pid" : "20"
	}, {
		"id" : "271",
		"sub" : [ {
			"id" : "2269",
			"name" : "原州区",
			"pid" : "271"
		}, {
			"id" : "2270",
			"name" : "海原县",
			"pid" : "271"
		}, {
			"id" : "2271",
			"name" : "西吉县",
			"pid" : "271"
		}, {
			"id" : "2272",
			"name" : "隆德县",
			"pid" : "271"
		}, {
			"id" : "2273",
			"name" : "泾源县",
			"pid" : "271"
		}, {
			"id" : "2274",
			"name" : "彭阳县",
			"pid" : "271"
		} ],
		"name" : "固原",
		"pid" : "20"
	}, {
		"id" : "272",
		"sub" : [ {
			"id" : "2275",
			"name" : "惠农县",
			"pid" : "272"
		}, {
			"id" : "2276",
			"name" : "大武口区",
			"pid" : "272"
		}, {
			"id" : "2277",
			"name" : "惠农区",
			"pid" : "272"
		}, {
			"id" : "2278",
			"name" : "陶乐县",
			"pid" : "272"
		}, {
			"id" : "2279",
			"name" : "平罗县",
			"pid" : "272"
		} ],
		"name" : "石嘴山",
		"pid" : "20"
	}, {
		"id" : "273",
		"sub" : [ {
			"id" : "2280",
			"name" : "利通区",
			"pid" : "273"
		}, {
			"id" : "2281",
			"name" : "中卫县",
			"pid" : "273"
		}, {
			"id" : "2282",
			"name" : "青铜峡市",
			"pid" : "273"
		}, {
			"id" : "2283",
			"name" : "中宁县",
			"pid" : "273"
		}, {
			"id" : "2284",
			"name" : "盐池县",
			"pid" : "273"
		}, {
			"id" : "2285",
			"name" : "同心县",
			"pid" : "273"
		} ],
		"name" : "吴忠",
		"pid" : "20"
	}, {
		"id" : "274",
		"sub" : [ {
			"id" : "2286",
			"name" : "沙坡头区",
			"pid" : "274"
		}, {
			"id" : "2287",
			"name" : "海原县",
			"pid" : "274"
		}, {
			"id" : "2288",
			"name" : "中宁县",
			"pid" : "274"
		} ],
		"name" : "中卫",
		"pid" : "20"
	} ],
	"name" : "宁夏",
	"pid" : "1"
}, {
	"id" : "21",
	"sub" : [ {
		"id" : "275",
		"sub" : [ {
			"id" : "2289",
			"name" : "城中区",
			"pid" : "275"
		}, {
			"id" : "2290",
			"name" : "城东区",
			"pid" : "275"
		}, {
			"id" : "2291",
			"name" : "城西区",
			"pid" : "275"
		}, {
			"id" : "2292",
			"name" : "城北区",
			"pid" : "275"
		}, {
			"id" : "2293",
			"name" : "湟中县",
			"pid" : "275"
		}, {
			"id" : "2294",
			"name" : "湟源县",
			"pid" : "275"
		}, {
			"id" : "2295",
			"name" : "大通",
			"pid" : "275"
		} ],
		"name" : "西宁",
		"pid" : "21"
	}, {
		"id" : "276",
		"sub" : [ {
			"id" : "2296",
			"name" : "玛沁县",
			"pid" : "276"
		}, {
			"id" : "2297",
			"name" : "班玛县",
			"pid" : "276"
		}, {
			"id" : "2298",
			"name" : "甘德县",
			"pid" : "276"
		}, {
			"id" : "2299",
			"name" : "达日县",
			"pid" : "276"
		}, {
			"id" : "2300",
			"name" : "久治县",
			"pid" : "276"
		}, {
			"id" : "2301",
			"name" : "玛多县",
			"pid" : "276"
		} ],
		"name" : "果洛",
		"pid" : "21"
	}, {
		"id" : "277",
		"sub" : [ {
			"id" : "2302",
			"name" : "海晏县",
			"pid" : "277"
		}, {
			"id" : "2303",
			"name" : "祁连县",
			"pid" : "277"
		}, {
			"id" : "2304",
			"name" : "刚察县",
			"pid" : "277"
		}, {
			"id" : "2305",
			"name" : "门源",
			"pid" : "277"
		} ],
		"name" : "海北",
		"pid" : "21"
	}, {
		"id" : "278",
		"sub" : [ {
			"id" : "2306",
			"name" : "平安县",
			"pid" : "278"
		}, {
			"id" : "2307",
			"name" : "乐都县",
			"pid" : "278"
		}, {
			"id" : "2308",
			"name" : "民和",
			"pid" : "278"
		}, {
			"id" : "2309",
			"name" : "互助",
			"pid" : "278"
		}, {
			"id" : "2310",
			"name" : "化隆",
			"pid" : "278"
		}, {
			"id" : "2311",
			"name" : "循化",
			"pid" : "278"
		} ],
		"name" : "海东",
		"pid" : "21"
	}, {
		"id" : "279",
		"sub" : [ {
			"id" : "2312",
			"name" : "共和县",
			"pid" : "279"
		}, {
			"id" : "2313",
			"name" : "同德县",
			"pid" : "279"
		}, {
			"id" : "2314",
			"name" : "贵德县",
			"pid" : "279"
		}, {
			"id" : "2315",
			"name" : "兴海县",
			"pid" : "279"
		}, {
			"id" : "2316",
			"name" : "贵南县",
			"pid" : "279"
		} ],
		"name" : "海南",
		"pid" : "21"
	}, {
		"id" : "280",
		"sub" : [ {
			"id" : "2317",
			"name" : "德令哈市",
			"pid" : "280"
		}, {
			"id" : "2318",
			"name" : "格尔木市",
			"pid" : "280"
		}, {
			"id" : "2319",
			"name" : "乌兰县",
			"pid" : "280"
		}, {
			"id" : "2320",
			"name" : "都兰县",
			"pid" : "280"
		}, {
			"id" : "2321",
			"name" : "天峻县",
			"pid" : "280"
		} ],
		"name" : "海西",
		"pid" : "21"
	}, {
		"id" : "281",
		"sub" : [ {
			"id" : "2322",
			"name" : "同仁县",
			"pid" : "281"
		}, {
			"id" : "2323",
			"name" : "尖扎县",
			"pid" : "281"
		}, {
			"id" : "2324",
			"name" : "泽库县",
			"pid" : "281"
		}, {
			"id" : "2325",
			"name" : "河南蒙古族自治县",
			"pid" : "281"
		} ],
		"name" : "黄南",
		"pid" : "21"
	}, {
		"id" : "282",
		"sub" : [ {
			"id" : "2326",
			"name" : "玉树县",
			"pid" : "282"
		}, {
			"id" : "2327",
			"name" : "杂多县",
			"pid" : "282"
		}, {
			"id" : "2328",
			"name" : "称多县",
			"pid" : "282"
		}, {
			"id" : "2329",
			"name" : "治多县",
			"pid" : "282"
		}, {
			"id" : "2330",
			"name" : "囊谦县",
			"pid" : "282"
		}, {
			"id" : "2331",
			"name" : "曲麻莱县",
			"pid" : "282"
		} ],
		"name" : "玉树",
		"pid" : "21"
	} ],
	"name" : "青海",
	"pid" : "1"
}, {
	"id" : "22",
	"sub" : [ {
		"id" : "283",
		"sub" : [ {
			"id" : "2332",
			"name" : "市中区",
			"pid" : "283"
		}, {
			"id" : "2333",
			"name" : "历下区",
			"pid" : "283"
		}, {
			"id" : "2334",
			"name" : "天桥区",
			"pid" : "283"
		}, {
			"id" : "2335",
			"name" : "槐荫区",
			"pid" : "283"
		}, {
			"id" : "2336",
			"name" : "历城区",
			"pid" : "283"
		}, {
			"id" : "2337",
			"name" : "长清区",
			"pid" : "283"
		}, {
			"id" : "2338",
			"name" : "章丘市",
			"pid" : "283"
		}, {
			"id" : "2339",
			"name" : "平阴县",
			"pid" : "283"
		}, {
			"id" : "2340",
			"name" : "济阳县",
			"pid" : "283"
		}, {
			"id" : "2341",
			"name" : "商河县",
			"pid" : "283"
		} ],
		"name" : "济南",
		"pid" : "22"
	}, {
		"id" : "284",
		"sub" : [ {
			"id" : "2342",
			"name" : "市南区",
			"pid" : "284"
		}, {
			"id" : "2343",
			"name" : "市北区",
			"pid" : "284"
		}, {
			"id" : "2344",
			"name" : "城阳区",
			"pid" : "284"
		}, {
			"id" : "2345",
			"name" : "四方区",
			"pid" : "284"
		}, {
			"id" : "2346",
			"name" : "李沧区",
			"pid" : "284"
		}, {
			"id" : "2347",
			"name" : "黄岛区",
			"pid" : "284"
		}, {
			"id" : "2348",
			"name" : "崂山区",
			"pid" : "284"
		}, {
			"id" : "2349",
			"name" : "胶州市",
			"pid" : "284"
		}, {
			"id" : "2350",
			"name" : "即墨市",
			"pid" : "284"
		}, {
			"id" : "2351",
			"name" : "平度市",
			"pid" : "284"
		}, {
			"id" : "2352",
			"name" : "胶南市",
			"pid" : "284"
		}, {
			"id" : "2353",
			"name" : "莱西市",
			"pid" : "284"
		} ],
		"name" : "青岛",
		"pid" : "22"
	}, {
		"id" : "285",
		"sub" : [ {
			"id" : "2354",
			"name" : "滨城区",
			"pid" : "285"
		}, {
			"id" : "2355",
			"name" : "惠民县",
			"pid" : "285"
		}, {
			"id" : "2356",
			"name" : "阳信县",
			"pid" : "285"
		}, {
			"id" : "2357",
			"name" : "无棣县",
			"pid" : "285"
		}, {
			"id" : "2358",
			"name" : "沾化县",
			"pid" : "285"
		}, {
			"id" : "2359",
			"name" : "博兴县",
			"pid" : "285"
		}, {
			"id" : "2360",
			"name" : "邹平县",
			"pid" : "285"
		} ],
		"name" : "滨州",
		"pid" : "22"
	}, {
		"id" : "286",
		"sub" : [ {
			"id" : "2361",
			"name" : "德城区",
			"pid" : "286"
		}, {
			"id" : "2362",
			"name" : "陵县",
			"pid" : "286"
		}, {
			"id" : "2363",
			"name" : "乐陵市",
			"pid" : "286"
		}, {
			"id" : "2364",
			"name" : "禹城市",
			"pid" : "286"
		}, {
			"id" : "2365",
			"name" : "宁津县",
			"pid" : "286"
		}, {
			"id" : "2366",
			"name" : "庆云县",
			"pid" : "286"
		}, {
			"id" : "2367",
			"name" : "临邑县",
			"pid" : "286"
		}, {
			"id" : "2368",
			"name" : "齐河县",
			"pid" : "286"
		}, {
			"id" : "2369",
			"name" : "平原县",
			"pid" : "286"
		}, {
			"id" : "2370",
			"name" : "夏津县",
			"pid" : "286"
		}, {
			"id" : "2371",
			"name" : "武城县",
			"pid" : "286"
		} ],
		"name" : "德州",
		"pid" : "22"
	}, {
		"id" : "287",
		"sub" : [ {
			"id" : "2372",
			"name" : "东营区",
			"pid" : "287"
		}, {
			"id" : "2373",
			"name" : "河口区",
			"pid" : "287"
		}, {
			"id" : "2374",
			"name" : "垦利县",
			"pid" : "287"
		}, {
			"id" : "2375",
			"name" : "利津县",
			"pid" : "287"
		}, {
			"id" : "2376",
			"name" : "广饶县",
			"pid" : "287"
		} ],
		"name" : "东营",
		"pid" : "22"
	}, {
		"id" : "288",
		"sub" : [ {
			"id" : "2377",
			"name" : "牡丹区",
			"pid" : "288"
		}, {
			"id" : "2378",
			"name" : "曹县",
			"pid" : "288"
		}, {
			"id" : "2379",
			"name" : "单县",
			"pid" : "288"
		}, {
			"id" : "2380",
			"name" : "成武县",
			"pid" : "288"
		}, {
			"id" : "2381",
			"name" : "巨野县",
			"pid" : "288"
		}, {
			"id" : "2382",
			"name" : "郓城县",
			"pid" : "288"
		}, {
			"id" : "2383",
			"name" : "鄄城县",
			"pid" : "288"
		}, {
			"id" : "2384",
			"name" : "定陶县",
			"pid" : "288"
		}, {
			"id" : "2385",
			"name" : "东明县",
			"pid" : "288"
		} ],
		"name" : "菏泽",
		"pid" : "22"
	}, {
		"id" : "289",
		"sub" : [ {
			"id" : "2386",
			"name" : "市中区",
			"pid" : "289"
		}, {
			"id" : "2387",
			"name" : "任城区",
			"pid" : "289"
		}, {
			"id" : "2388",
			"name" : "曲阜市",
			"pid" : "289"
		}, {
			"id" : "2389",
			"name" : "兖州市",
			"pid" : "289"
		}, {
			"id" : "2390",
			"name" : "邹城市",
			"pid" : "289"
		}, {
			"id" : "2391",
			"name" : "微山县",
			"pid" : "289"
		}, {
			"id" : "2392",
			"name" : "鱼台县",
			"pid" : "289"
		}, {
			"id" : "2393",
			"name" : "金乡县",
			"pid" : "289"
		}, {
			"id" : "2394",
			"name" : "嘉祥县",
			"pid" : "289"
		}, {
			"id" : "2395",
			"name" : "汶上县",
			"pid" : "289"
		}, {
			"id" : "2396",
			"name" : "泗水县",
			"pid" : "289"
		}, {
			"id" : "2397",
			"name" : "梁山县",
			"pid" : "289"
		} ],
		"name" : "济宁",
		"pid" : "22"
	}, {
		"id" : "290",
		"sub" : [ {
			"id" : "2398",
			"name" : "莱城区",
			"pid" : "290"
		}, {
			"id" : "2399",
			"name" : "钢城区",
			"pid" : "290"
		} ],
		"name" : "莱芜",
		"pid" : "22"
	}, {
		"id" : "291",
		"sub" : [ {
			"id" : "2400",
			"name" : "东昌府区",
			"pid" : "291"
		}, {
			"id" : "2401",
			"name" : "临清市",
			"pid" : "291"
		}, {
			"id" : "2402",
			"name" : "阳谷县",
			"pid" : "291"
		}, {
			"id" : "2403",
			"name" : "莘县",
			"pid" : "291"
		}, {
			"id" : "2404",
			"name" : "茌平县",
			"pid" : "291"
		}, {
			"id" : "2405",
			"name" : "东阿县",
			"pid" : "291"
		}, {
			"id" : "2406",
			"name" : "冠县",
			"pid" : "291"
		}, {
			"id" : "2407",
			"name" : "高唐县",
			"pid" : "291"
		} ],
		"name" : "聊城",
		"pid" : "22"
	}, {
		"id" : "292",
		"sub" : [ {
			"id" : "2408",
			"name" : "兰山区",
			"pid" : "292"
		}, {
			"id" : "2409",
			"name" : "罗庄区",
			"pid" : "292"
		}, {
			"id" : "2410",
			"name" : "河东区",
			"pid" : "292"
		}, {
			"id" : "2411",
			"name" : "沂南县",
			"pid" : "292"
		}, {
			"id" : "2412",
			"name" : "郯城县",
			"pid" : "292"
		}, {
			"id" : "2413",
			"name" : "沂水县",
			"pid" : "292"
		}, {
			"id" : "2414",
			"name" : "苍山县",
			"pid" : "292"
		}, {
			"id" : "2415",
			"name" : "费县",
			"pid" : "292"
		}, {
			"id" : "2416",
			"name" : "平邑县",
			"pid" : "292"
		}, {
			"id" : "2417",
			"name" : "莒南县",
			"pid" : "292"
		}, {
			"id" : "2418",
			"name" : "蒙阴县",
			"pid" : "292"
		}, {
			"id" : "2419",
			"name" : "临沭县",
			"pid" : "292"
		} ],
		"name" : "临沂",
		"pid" : "22"
	}, {
		"id" : "293",
		"sub" : [ {
			"id" : "2420",
			"name" : "东港区",
			"pid" : "293"
		}, {
			"id" : "2421",
			"name" : "岚山区",
			"pid" : "293"
		}, {
			"id" : "2422",
			"name" : "五莲县",
			"pid" : "293"
		}, {
			"id" : "2423",
			"name" : "莒县",
			"pid" : "293"
		} ],
		"name" : "日照",
		"pid" : "22"
	}, {
		"id" : "294",
		"sub" : [ {
			"id" : "2424",
			"name" : "泰山区",
			"pid" : "294"
		}, {
			"id" : "2425",
			"name" : "岱岳区",
			"pid" : "294"
		}, {
			"id" : "2426",
			"name" : "新泰市",
			"pid" : "294"
		}, {
			"id" : "2427",
			"name" : "肥城市",
			"pid" : "294"
		}, {
			"id" : "2428",
			"name" : "宁阳县",
			"pid" : "294"
		}, {
			"id" : "2429",
			"name" : "东平县",
			"pid" : "294"
		} ],
		"name" : "泰安",
		"pid" : "22"
	}, {
		"id" : "295",
		"sub" : [ {
			"id" : "2430",
			"name" : "荣成市",
			"pid" : "295"
		}, {
			"id" : "2431",
			"name" : "乳山市",
			"pid" : "295"
		}, {
			"id" : "2432",
			"name" : "环翠区",
			"pid" : "295"
		}, {
			"id" : "2433",
			"name" : "文登市",
			"pid" : "295"
		} ],
		"name" : "威海",
		"pid" : "22"
	}, {
		"id" : "296",
		"sub" : [ {
			"id" : "2434",
			"name" : "潍城区",
			"pid" : "296"
		}, {
			"id" : "2435",
			"name" : "寒亭区",
			"pid" : "296"
		}, {
			"id" : "2436",
			"name" : "坊子区",
			"pid" : "296"
		}, {
			"id" : "2437",
			"name" : "奎文区",
			"pid" : "296"
		}, {
			"id" : "2438",
			"name" : "青州市",
			"pid" : "296"
		}, {
			"id" : "2439",
			"name" : "诸城市",
			"pid" : "296"
		}, {
			"id" : "2440",
			"name" : "寿光市",
			"pid" : "296"
		}, {
			"id" : "2441",
			"name" : "安丘市",
			"pid" : "296"
		}, {
			"id" : "2442",
			"name" : "高密市",
			"pid" : "296"
		}, {
			"id" : "2443",
			"name" : "昌邑市",
			"pid" : "296"
		}, {
			"id" : "2444",
			"name" : "临朐县",
			"pid" : "296"
		}, {
			"id" : "2445",
			"name" : "昌乐县",
			"pid" : "296"
		} ],
		"name" : "潍坊",
		"pid" : "22"
	}, {
		"id" : "297",
		"sub" : [ {
			"id" : "2446",
			"name" : "芝罘区",
			"pid" : "297"
		}, {
			"id" : "2447",
			"name" : "福山区",
			"pid" : "297"
		}, {
			"id" : "2448",
			"name" : "牟平区",
			"pid" : "297"
		}, {
			"id" : "2449",
			"name" : "莱山区",
			"pid" : "297"
		}, {
			"id" : "2450",
			"name" : "开发区",
			"pid" : "297"
		}, {
			"id" : "2451",
			"name" : "龙口市",
			"pid" : "297"
		}, {
			"id" : "2452",
			"name" : "莱阳市",
			"pid" : "297"
		}, {
			"id" : "2453",
			"name" : "莱州市",
			"pid" : "297"
		}, {
			"id" : "2454",
			"name" : "蓬莱市",
			"pid" : "297"
		}, {
			"id" : "2455",
			"name" : "招远市",
			"pid" : "297"
		}, {
			"id" : "2456",
			"name" : "栖霞市",
			"pid" : "297"
		}, {
			"id" : "2457",
			"name" : "海阳市",
			"pid" : "297"
		}, {
			"id" : "2458",
			"name" : "长岛县",
			"pid" : "297"
		} ],
		"name" : "烟台",
		"pid" : "22"
	}, {
		"id" : "298",
		"sub" : [ {
			"id" : "2459",
			"name" : "市中区",
			"pid" : "298"
		}, {
			"id" : "2460",
			"name" : "山亭区",
			"pid" : "298"
		}, {
			"id" : "2461",
			"name" : "峄城区",
			"pid" : "298"
		}, {
			"id" : "2462",
			"name" : "台儿庄区",
			"pid" : "298"
		}, {
			"id" : "2463",
			"name" : "薛城区",
			"pid" : "298"
		}, {
			"id" : "2464",
			"name" : "滕州市",
			"pid" : "298"
		} ],
		"name" : "枣庄",
		"pid" : "22"
	}, {
		"id" : "299",
		"sub" : [ {
			"id" : "2465",
			"name" : "张店区",
			"pid" : "299"
		}, {
			"id" : "2466",
			"name" : "临淄区",
			"pid" : "299"
		}, {
			"id" : "2467",
			"name" : "淄川区",
			"pid" : "299"
		}, {
			"id" : "2468",
			"name" : "博山区",
			"pid" : "299"
		}, {
			"id" : "2469",
			"name" : "周村区",
			"pid" : "299"
		}, {
			"id" : "2470",
			"name" : "桓台县",
			"pid" : "299"
		}, {
			"id" : "2471",
			"name" : "高青县",
			"pid" : "299"
		}, {
			"id" : "2472",
			"name" : "沂源县",
			"pid" : "299"
		} ],
		"name" : "淄博",
		"pid" : "22"
	} ],
	"name" : "山东",
	"pid" : "1"
}, {
	"id" : "23",
	"sub" : [ {
		"id" : "300",
		"sub" : [ {
			"id" : "2473",
			"name" : "杏花岭区",
			"pid" : "300"
		}, {
			"id" : "2474",
			"name" : "小店区",
			"pid" : "300"
		}, {
			"id" : "2475",
			"name" : "迎泽区",
			"pid" : "300"
		}, {
			"id" : "2476",
			"name" : "尖草坪区",
			"pid" : "300"
		}, {
			"id" : "2477",
			"name" : "万柏林区",
			"pid" : "300"
		}, {
			"id" : "2478",
			"name" : "晋源区",
			"pid" : "300"
		}, {
			"id" : "2479",
			"name" : "高新开发区",
			"pid" : "300"
		}, {
			"id" : "2480",
			"name" : "民营经济开发区",
			"pid" : "300"
		}, {
			"id" : "2481",
			"name" : "经济技术开发区",
			"pid" : "300"
		}, {
			"id" : "2482",
			"name" : "清徐县",
			"pid" : "300"
		}, {
			"id" : "2483",
			"name" : "阳曲县",
			"pid" : "300"
		}, {
			"id" : "2484",
			"name" : "娄烦县",
			"pid" : "300"
		}, {
			"id" : "2485",
			"name" : "古交市",
			"pid" : "300"
		} ],
		"name" : "太原",
		"pid" : "23"
	}, {
		"id" : "301",
		"sub" : [ {
			"id" : "2486",
			"name" : "城区",
			"pid" : "301"
		}, {
			"id" : "2487",
			"name" : "郊区",
			"pid" : "301"
		}, {
			"id" : "2488",
			"name" : "沁县",
			"pid" : "301"
		}, {
			"id" : "2489",
			"name" : "潞城市",
			"pid" : "301"
		}, {
			"id" : "2490",
			"name" : "长治县",
			"pid" : "301"
		}, {
			"id" : "2491",
			"name" : "襄垣县",
			"pid" : "301"
		}, {
			"id" : "2492",
			"name" : "屯留县",
			"pid" : "301"
		}, {
			"id" : "2493",
			"name" : "平顺县",
			"pid" : "301"
		}, {
			"id" : "2494",
			"name" : "黎城县",
			"pid" : "301"
		}, {
			"id" : "2495",
			"name" : "壶关县",
			"pid" : "301"
		}, {
			"id" : "2496",
			"name" : "长子县",
			"pid" : "301"
		}, {
			"id" : "2497",
			"name" : "武乡县",
			"pid" : "301"
		}, {
			"id" : "2498",
			"name" : "沁源县",
			"pid" : "301"
		} ],
		"name" : "长治",
		"pid" : "23"
	}, {
		"id" : "302",
		"sub" : [ {
			"id" : "2499",
			"name" : "城区",
			"pid" : "302"
		}, {
			"id" : "2500",
			"name" : "矿区",
			"pid" : "302"
		}, {
			"id" : "2501",
			"name" : "南郊区",
			"pid" : "302"
		}, {
			"id" : "2502",
			"name" : "新荣区",
			"pid" : "302"
		}, {
			"id" : "2503",
			"name" : "阳高县",
			"pid" : "302"
		}, {
			"id" : "2504",
			"name" : "天镇县",
			"pid" : "302"
		}, {
			"id" : "2505",
			"name" : "广灵县",
			"pid" : "302"
		}, {
			"id" : "2506",
			"name" : "灵丘县",
			"pid" : "302"
		}, {
			"id" : "2507",
			"name" : "浑源县",
			"pid" : "302"
		}, {
			"id" : "2508",
			"name" : "左云县",
			"pid" : "302"
		}, {
			"id" : "2509",
			"name" : "大同县",
			"pid" : "302"
		} ],
		"name" : "大同",
		"pid" : "23"
	}, {
		"id" : "303",
		"sub" : [ {
			"id" : "2510",
			"name" : "城区",
			"pid" : "303"
		}, {
			"id" : "2511",
			"name" : "高平市",
			"pid" : "303"
		}, {
			"id" : "2512",
			"name" : "沁水县",
			"pid" : "303"
		}, {
			"id" : "2513",
			"name" : "阳城县",
			"pid" : "303"
		}, {
			"id" : "2514",
			"name" : "陵川县",
			"pid" : "303"
		}, {
			"id" : "2515",
			"name" : "泽州县",
			"pid" : "303"
		} ],
		"name" : "晋城",
		"pid" : "23"
	}, {
		"id" : "304",
		"sub" : [ {
			"id" : "2516",
			"name" : "榆次区",
			"pid" : "304"
		}, {
			"id" : "2517",
			"name" : "介休市",
			"pid" : "304"
		}, {
			"id" : "2518",
			"name" : "榆社县",
			"pid" : "304"
		}, {
			"id" : "2519",
			"name" : "左权县",
			"pid" : "304"
		}, {
			"id" : "2520",
			"name" : "和顺县",
			"pid" : "304"
		}, {
			"id" : "2521",
			"name" : "昔阳县",
			"pid" : "304"
		}, {
			"id" : "2522",
			"name" : "寿阳县",
			"pid" : "304"
		}, {
			"id" : "2523",
			"name" : "太谷县",
			"pid" : "304"
		}, {
			"id" : "2524",
			"name" : "祁县",
			"pid" : "304"
		}, {
			"id" : "2525",
			"name" : "平遥县",
			"pid" : "304"
		}, {
			"id" : "2526",
			"name" : "灵石县",
			"pid" : "304"
		} ],
		"name" : "晋中",
		"pid" : "23"
	}, {
		"id" : "305",
		"sub" : [ {
			"id" : "2527",
			"name" : "尧都区",
			"pid" : "305"
		}, {
			"id" : "2528",
			"name" : "侯马市",
			"pid" : "305"
		}, {
			"id" : "2529",
			"name" : "霍州市",
			"pid" : "305"
		}, {
			"id" : "2530",
			"name" : "曲沃县",
			"pid" : "305"
		}, {
			"id" : "2531",
			"name" : "翼城县",
			"pid" : "305"
		}, {
			"id" : "2532",
			"name" : "襄汾县",
			"pid" : "305"
		}, {
			"id" : "2533",
			"name" : "洪洞县",
			"pid" : "305"
		}, {
			"id" : "2534",
			"name" : "吉县",
			"pid" : "305"
		}, {
			"id" : "2535",
			"name" : "安泽县",
			"pid" : "305"
		}, {
			"id" : "2536",
			"name" : "浮山县",
			"pid" : "305"
		}, {
			"id" : "2537",
			"name" : "古县",
			"pid" : "305"
		}, {
			"id" : "2538",
			"name" : "乡宁县",
			"pid" : "305"
		}, {
			"id" : "2539",
			"name" : "大宁县",
			"pid" : "305"
		}, {
			"id" : "2540",
			"name" : "隰县",
			"pid" : "305"
		}, {
			"id" : "2541",
			"name" : "永和县",
			"pid" : "305"
		}, {
			"id" : "2542",
			"name" : "蒲县",
			"pid" : "305"
		}, {
			"id" : "2543",
			"name" : "汾西县",
			"pid" : "305"
		} ],
		"name" : "临汾",
		"pid" : "23"
	}, {
		"id" : "306",
		"sub" : [ {
			"id" : "2544",
			"name" : "离石市",
			"pid" : "306"
		}, {
			"id" : "2545",
			"name" : "离石区",
			"pid" : "306"
		}, {
			"id" : "2546",
			"name" : "孝义市",
			"pid" : "306"
		}, {
			"id" : "2547",
			"name" : "汾阳市",
			"pid" : "306"
		}, {
			"id" : "2548",
			"name" : "文水县",
			"pid" : "306"
		}, {
			"id" : "2549",
			"name" : "交城县",
			"pid" : "306"
		}, {
			"id" : "2550",
			"name" : "兴县",
			"pid" : "306"
		}, {
			"id" : "2551",
			"name" : "临县",
			"pid" : "306"
		}, {
			"id" : "2552",
			"name" : "柳林县",
			"pid" : "306"
		}, {
			"id" : "2553",
			"name" : "石楼县",
			"pid" : "306"
		}, {
			"id" : "2554",
			"name" : "岚县",
			"pid" : "306"
		}, {
			"id" : "2555",
			"name" : "方山县",
			"pid" : "306"
		}, {
			"id" : "2556",
			"name" : "中阳县",
			"pid" : "306"
		}, {
			"id" : "2557",
			"name" : "交口县",
			"pid" : "306"
		} ],
		"name" : "吕梁",
		"pid" : "23"
	}, {
		"id" : "307",
		"sub" : [ {
			"id" : "2558",
			"name" : "朔城区",
			"pid" : "307"
		}, {
			"id" : "2559",
			"name" : "平鲁区",
			"pid" : "307"
		}, {
			"id" : "2560",
			"name" : "山阴县",
			"pid" : "307"
		}, {
			"id" : "2561",
			"name" : "应县",
			"pid" : "307"
		}, {
			"id" : "2562",
			"name" : "右玉县",
			"pid" : "307"
		}, {
			"id" : "2563",
			"name" : "怀仁县",
			"pid" : "307"
		} ],
		"name" : "朔州",
		"pid" : "23"
	}, {
		"id" : "308",
		"sub" : [ {
			"id" : "2564",
			"name" : "忻府区",
			"pid" : "308"
		}, {
			"id" : "2565",
			"name" : "原平市",
			"pid" : "308"
		}, {
			"id" : "2566",
			"name" : "定襄县",
			"pid" : "308"
		}, {
			"id" : "2567",
			"name" : "五台县",
			"pid" : "308"
		}, {
			"id" : "2568",
			"name" : "代县",
			"pid" : "308"
		}, {
			"id" : "2569",
			"name" : "繁峙县",
			"pid" : "308"
		}, {
			"id" : "2570",
			"name" : "宁武县",
			"pid" : "308"
		}, {
			"id" : "2571",
			"name" : "静乐县",
			"pid" : "308"
		}, {
			"id" : "2572",
			"name" : "神池县",
			"pid" : "308"
		}, {
			"id" : "2573",
			"name" : "五寨县",
			"pid" : "308"
		}, {
			"id" : "2574",
			"name" : "岢岚县",
			"pid" : "308"
		}, {
			"id" : "2575",
			"name" : "河曲县",
			"pid" : "308"
		}, {
			"id" : "2576",
			"name" : "保德县",
			"pid" : "308"
		}, {
			"id" : "2577",
			"name" : "偏关县",
			"pid" : "308"
		} ],
		"name" : "忻州",
		"pid" : "23"
	}, {
		"id" : "309",
		"sub" : [ {
			"id" : "2578",
			"name" : "城区",
			"pid" : "309"
		}, {
			"id" : "2579",
			"name" : "矿区",
			"pid" : "309"
		}, {
			"id" : "2580",
			"name" : "郊区",
			"pid" : "309"
		}, {
			"id" : "2581",
			"name" : "平定县",
			"pid" : "309"
		}, {
			"id" : "2582",
			"name" : "盂县",
			"pid" : "309"
		} ],
		"name" : "阳泉",
		"pid" : "23"
	}, {
		"id" : "310",
		"sub" : [ {
			"id" : "2583",
			"name" : "盐湖区",
			"pid" : "310"
		}, {
			"id" : "2584",
			"name" : "永济市",
			"pid" : "310"
		}, {
			"id" : "2585",
			"name" : "河津市",
			"pid" : "310"
		}, {
			"id" : "2586",
			"name" : "临猗县",
			"pid" : "310"
		}, {
			"id" : "2587",
			"name" : "万荣县",
			"pid" : "310"
		}, {
			"id" : "2588",
			"name" : "闻喜县",
			"pid" : "310"
		}, {
			"id" : "2589",
			"name" : "稷山县",
			"pid" : "310"
		}, {
			"id" : "2590",
			"name" : "新绛县",
			"pid" : "310"
		}, {
			"id" : "2591",
			"name" : "绛县",
			"pid" : "310"
		}, {
			"id" : "2592",
			"name" : "垣曲县",
			"pid" : "310"
		}, {
			"id" : "2593",
			"name" : "夏县",
			"pid" : "310"
		}, {
			"id" : "2594",
			"name" : "平陆县",
			"pid" : "310"
		}, {
			"id" : "2595",
			"name" : "芮城县",
			"pid" : "310"
		} ],
		"name" : "运城",
		"pid" : "23"
	} ],
	"name" : "山西",
	"pid" : "1"
}, {
	"id" : "24",
	"sub" : [ {
		"id" : "311",
		"sub" : [ {
			"id" : "2596",
			"name" : "莲湖区",
			"pid" : "311"
		}, {
			"id" : "2597",
			"name" : "新城区",
			"pid" : "311"
		}, {
			"id" : "2598",
			"name" : "碑林区",
			"pid" : "311"
		}, {
			"id" : "2599",
			"name" : "雁塔区",
			"pid" : "311"
		}, {
			"id" : "2600",
			"name" : "灞桥区",
			"pid" : "311"
		}, {
			"id" : "2601",
			"name" : "未央区",
			"pid" : "311"
		}, {
			"id" : "2602",
			"name" : "阎良区",
			"pid" : "311"
		}, {
			"id" : "2603",
			"name" : "临潼区",
			"pid" : "311"
		}, {
			"id" : "2604",
			"name" : "长安区",
			"pid" : "311"
		}, {
			"id" : "2605",
			"name" : "蓝田县",
			"pid" : "311"
		}, {
			"id" : "2606",
			"name" : "周至县",
			"pid" : "311"
		}, {
			"id" : "2607",
			"name" : "户县",
			"pid" : "311"
		}, {
			"id" : "2608",
			"name" : "高陵县",
			"pid" : "311"
		} ],
		"name" : "西安",
		"pid" : "24"
	}, {
		"id" : "312",
		"sub" : [ {
			"id" : "2609",
			"name" : "汉滨区",
			"pid" : "312"
		}, {
			"id" : "2610",
			"name" : "汉阴县",
			"pid" : "312"
		}, {
			"id" : "2611",
			"name" : "石泉县",
			"pid" : "312"
		}, {
			"id" : "2612",
			"name" : "宁陕县",
			"pid" : "312"
		}, {
			"id" : "2613",
			"name" : "紫阳县",
			"pid" : "312"
		}, {
			"id" : "2614",
			"name" : "岚皋县",
			"pid" : "312"
		}, {
			"id" : "2615",
			"name" : "平利县",
			"pid" : "312"
		}, {
			"id" : "2616",
			"name" : "镇坪县",
			"pid" : "312"
		}, {
			"id" : "2617",
			"name" : "旬阳县",
			"pid" : "312"
		}, {
			"id" : "2618",
			"name" : "白河县",
			"pid" : "312"
		} ],
		"name" : "安康",
		"pid" : "24"
	}, {
		"id" : "313",
		"sub" : [ {
			"id" : "2619",
			"name" : "陈仓区",
			"pid" : "313"
		}, {
			"id" : "2620",
			"name" : "渭滨区",
			"pid" : "313"
		}, {
			"id" : "2621",
			"name" : "金台区",
			"pid" : "313"
		}, {
			"id" : "2622",
			"name" : "凤翔县",
			"pid" : "313"
		}, {
			"id" : "2623",
			"name" : "岐山县",
			"pid" : "313"
		}, {
			"id" : "2624",
			"name" : "扶风县",
			"pid" : "313"
		}, {
			"id" : "2625",
			"name" : "眉县",
			"pid" : "313"
		}, {
			"id" : "2626",
			"name" : "陇县",
			"pid" : "313"
		}, {
			"id" : "2627",
			"name" : "千阳县",
			"pid" : "313"
		}, {
			"id" : "2628",
			"name" : "麟游县",
			"pid" : "313"
		}, {
			"id" : "2629",
			"name" : "凤县",
			"pid" : "313"
		}, {
			"id" : "2630",
			"name" : "太白县",
			"pid" : "313"
		} ],
		"name" : "宝鸡",
		"pid" : "24"
	}, {
		"id" : "314",
		"sub" : [ {
			"id" : "2631",
			"name" : "汉台区",
			"pid" : "314"
		}, {
			"id" : "2632",
			"name" : "南郑县",
			"pid" : "314"
		}, {
			"id" : "2633",
			"name" : "城固县",
			"pid" : "314"
		}, {
			"id" : "2634",
			"name" : "洋县",
			"pid" : "314"
		}, {
			"id" : "2635",
			"name" : "西乡县",
			"pid" : "314"
		}, {
			"id" : "2636",
			"name" : "勉县",
			"pid" : "314"
		}, {
			"id" : "2637",
			"name" : "宁强县",
			"pid" : "314"
		}, {
			"id" : "2638",
			"name" : "略阳县",
			"pid" : "314"
		}, {
			"id" : "2639",
			"name" : "镇巴县",
			"pid" : "314"
		}, {
			"id" : "2640",
			"name" : "留坝县",
			"pid" : "314"
		}, {
			"id" : "2641",
			"name" : "佛坪县",
			"pid" : "314"
		} ],
		"name" : "汉中",
		"pid" : "24"
	}, {
		"id" : "315",
		"sub" : [ {
			"id" : "2642",
			"name" : "商州区",
			"pid" : "315"
		}, {
			"id" : "2643",
			"name" : "洛南县",
			"pid" : "315"
		}, {
			"id" : "2644",
			"name" : "丹凤县",
			"pid" : "315"
		}, {
			"id" : "2645",
			"name" : "商南县",
			"pid" : "315"
		}, {
			"id" : "2646",
			"name" : "山阳县",
			"pid" : "315"
		}, {
			"id" : "2647",
			"name" : "镇安县",
			"pid" : "315"
		}, {
			"id" : "2648",
			"name" : "柞水县",
			"pid" : "315"
		} ],
		"name" : "商洛",
		"pid" : "24"
	}, {
		"id" : "316",
		"sub" : [ {
			"id" : "2649",
			"name" : "耀州区",
			"pid" : "316"
		}, {
			"id" : "2650",
			"name" : "王益区",
			"pid" : "316"
		}, {
			"id" : "2651",
			"name" : "印台区",
			"pid" : "316"
		}, {
			"id" : "2652",
			"name" : "宜君县",
			"pid" : "316"
		} ],
		"name" : "铜川",
		"pid" : "24"
	}, {
		"id" : "317",
		"sub" : [ {
			"id" : "2653",
			"name" : "临渭区",
			"pid" : "317"
		}, {
			"id" : "2654",
			"name" : "韩城市",
			"pid" : "317"
		}, {
			"id" : "2655",
			"name" : "华阴市",
			"pid" : "317"
		}, {
			"id" : "2656",
			"name" : "华县",
			"pid" : "317"
		}, {
			"id" : "2657",
			"name" : "潼关县",
			"pid" : "317"
		}, {
			"id" : "2658",
			"name" : "大荔县",
			"pid" : "317"
		}, {
			"id" : "2659",
			"name" : "合阳县",
			"pid" : "317"
		}, {
			"id" : "2660",
			"name" : "澄城县",
			"pid" : "317"
		}, {
			"id" : "2661",
			"name" : "蒲城县",
			"pid" : "317"
		}, {
			"id" : "2662",
			"name" : "白水县",
			"pid" : "317"
		}, {
			"id" : "2663",
			"name" : "富平县",
			"pid" : "317"
		} ],
		"name" : "渭南",
		"pid" : "24"
	}, {
		"id" : "318",
		"sub" : [ {
			"id" : "2664",
			"name" : "秦都区",
			"pid" : "318"
		}, {
			"id" : "2665",
			"name" : "渭城区",
			"pid" : "318"
		}, {
			"id" : "2666",
			"name" : "杨陵区",
			"pid" : "318"
		}, {
			"id" : "2667",
			"name" : "兴平市",
			"pid" : "318"
		}, {
			"id" : "2668",
			"name" : "三原县",
			"pid" : "318"
		}, {
			"id" : "2669",
			"name" : "泾阳县",
			"pid" : "318"
		}, {
			"id" : "2670",
			"name" : "乾县",
			"pid" : "318"
		}, {
			"id" : "2671",
			"name" : "礼泉县",
			"pid" : "318"
		}, {
			"id" : "2672",
			"name" : "永寿县",
			"pid" : "318"
		}, {
			"id" : "2673",
			"name" : "彬县",
			"pid" : "318"
		}, {
			"id" : "2674",
			"name" : "长武县",
			"pid" : "318"
		}, {
			"id" : "2675",
			"name" : "旬邑县",
			"pid" : "318"
		}, {
			"id" : "2676",
			"name" : "淳化县",
			"pid" : "318"
		}, {
			"id" : "2677",
			"name" : "武功县",
			"pid" : "318"
		} ],
		"name" : "咸阳",
		"pid" : "24"
	}, {
		"id" : "319",
		"sub" : [ {
			"id" : "2678",
			"name" : "吴起县",
			"pid" : "319"
		}, {
			"id" : "2679",
			"name" : "宝塔区",
			"pid" : "319"
		}, {
			"id" : "2680",
			"name" : "延长县",
			"pid" : "319"
		}, {
			"id" : "2681",
			"name" : "延川县",
			"pid" : "319"
		}, {
			"id" : "2682",
			"name" : "子长县",
			"pid" : "319"
		}, {
			"id" : "2683",
			"name" : "安塞县",
			"pid" : "319"
		}, {
			"id" : "2684",
			"name" : "志丹县",
			"pid" : "319"
		}, {
			"id" : "2685",
			"name" : "甘泉县",
			"pid" : "319"
		}, {
			"id" : "2686",
			"name" : "富县",
			"pid" : "319"
		}, {
			"id" : "2687",
			"name" : "洛川县",
			"pid" : "319"
		}, {
			"id" : "2688",
			"name" : "宜川县",
			"pid" : "319"
		}, {
			"id" : "2689",
			"name" : "黄龙县",
			"pid" : "319"
		}, {
			"id" : "2690",
			"name" : "黄陵县",
			"pid" : "319"
		} ],
		"name" : "延安",
		"pid" : "24"
	}, {
		"id" : "320",
		"sub" : [ {
			"id" : "2691",
			"name" : "榆阳区",
			"pid" : "320"
		}, {
			"id" : "2692",
			"name" : "神木县",
			"pid" : "320"
		}, {
			"id" : "2693",
			"name" : "府谷县",
			"pid" : "320"
		}, {
			"id" : "2694",
			"name" : "横山县",
			"pid" : "320"
		}, {
			"id" : "2695",
			"name" : "靖边县",
			"pid" : "320"
		}, {
			"id" : "2696",
			"name" : "定边县",
			"pid" : "320"
		}, {
			"id" : "2697",
			"name" : "绥德县",
			"pid" : "320"
		}, {
			"id" : "2698",
			"name" : "米脂县",
			"pid" : "320"
		}, {
			"id" : "2699",
			"name" : "佳县",
			"pid" : "320"
		}, {
			"id" : "2700",
			"name" : "吴堡县",
			"pid" : "320"
		}, {
			"id" : "2701",
			"name" : "清涧县",
			"pid" : "320"
		}, {
			"id" : "2702",
			"name" : "子洲县",
			"pid" : "320"
		} ],
		"name" : "榆林",
		"pid" : "24"
	} ],
	"name" : "陕西",
	"pid" : "1"
}, {
	"id" : "25",
	"sub" : [ {
		"id" : "321",
		"sub" : [ {
			"id" : "2703",
			"name" : "长宁区",
			"pid" : "321"
		}, {
			"id" : "2704",
			"name" : "闸北区",
			"pid" : "321"
		}, {
			"id" : "2705",
			"name" : "闵行区",
			"pid" : "321"
		}, {
			"id" : "2706",
			"name" : "徐汇区",
			"pid" : "321"
		}, {
			"id" : "2707",
			"name" : "浦东新区",
			"pid" : "321"
		}, {
			"id" : "2708",
			"name" : "杨浦区",
			"pid" : "321"
		}, {
			"id" : "2709",
			"name" : "普陀区",
			"pid" : "321"
		}, {
			"id" : "2710",
			"name" : "静安区",
			"pid" : "321"
		}, {
			"id" : "2711",
			"name" : "卢湾区",
			"pid" : "321"
		}, {
			"id" : "2712",
			"name" : "虹口区",
			"pid" : "321"
		}, {
			"id" : "2713",
			"name" : "黄浦区",
			"pid" : "321"
		}, {
			"id" : "2714",
			"name" : "南汇区",
			"pid" : "321"
		}, {
			"id" : "2715",
			"name" : "松江区",
			"pid" : "321"
		}, {
			"id" : "2716",
			"name" : "嘉定区",
			"pid" : "321"
		}, {
			"id" : "2717",
			"name" : "宝山区",
			"pid" : "321"
		}, {
			"id" : "2718",
			"name" : "青浦区",
			"pid" : "321"
		}, {
			"id" : "2719",
			"name" : "金山区",
			"pid" : "321"
		}, {
			"id" : "2720",
			"name" : "奉贤区",
			"pid" : "321"
		}, {
			"id" : "2721",
			"name" : "崇明县",
			"pid" : "321"
		} ],
		"name" : "上海",
		"pid" : "25"
	} ],
	"name" : "上海",
	"pid" : "1"
}, {
	"id" : "26",
	"sub" : [ {
		"id" : "322",
		"sub" : [ {
			"id" : "2722",
			"name" : "青羊区",
			"pid" : "322"
		}, {
			"id" : "2723",
			"name" : "锦江区",
			"pid" : "322"
		}, {
			"id" : "2724",
			"name" : "金牛区",
			"pid" : "322"
		}, {
			"id" : "2725",
			"name" : "武侯区",
			"pid" : "322"
		}, {
			"id" : "2726",
			"name" : "成华区",
			"pid" : "322"
		}, {
			"id" : "2727",
			"name" : "龙泉驿区",
			"pid" : "322"
		}, {
			"id" : "2728",
			"name" : "青白江区",
			"pid" : "322"
		}, {
			"id" : "2729",
			"name" : "新都区",
			"pid" : "322"
		}, {
			"id" : "2730",
			"name" : "温江区",
			"pid" : "322"
		}, {
			"id" : "2731",
			"name" : "高新区",
			"pid" : "322"
		}, {
			"id" : "2732",
			"name" : "高新西区",
			"pid" : "322"
		}, {
			"id" : "2733",
			"name" : "都江堰市",
			"pid" : "322"
		}, {
			"id" : "2734",
			"name" : "彭州市",
			"pid" : "322"
		}, {
			"id" : "2735",
			"name" : "邛崃市",
			"pid" : "322"
		}, {
			"id" : "2736",
			"name" : "崇州市",
			"pid" : "322"
		}, {
			"id" : "2737",
			"name" : "金堂县",
			"pid" : "322"
		}, {
			"id" : "2738",
			"name" : "双流县",
			"pid" : "322"
		}, {
			"id" : "2739",
			"name" : "郫县",
			"pid" : "322"
		}, {
			"id" : "2740",
			"name" : "大邑县",
			"pid" : "322"
		}, {
			"id" : "2741",
			"name" : "蒲江县",
			"pid" : "322"
		}, {
			"id" : "2742",
			"name" : "新津县",
			"pid" : "322"
		}, {
			"id" : "2743",
			"name" : "都江堰市",
			"pid" : "322"
		}, {
			"id" : "2744",
			"name" : "彭州市",
			"pid" : "322"
		}, {
			"id" : "2745",
			"name" : "邛崃市",
			"pid" : "322"
		}, {
			"id" : "2746",
			"name" : "崇州市",
			"pid" : "322"
		}, {
			"id" : "2747",
			"name" : "金堂县",
			"pid" : "322"
		}, {
			"id" : "2748",
			"name" : "双流县",
			"pid" : "322"
		}, {
			"id" : "2749",
			"name" : "郫县",
			"pid" : "322"
		}, {
			"id" : "2750",
			"name" : "大邑县",
			"pid" : "322"
		}, {
			"id" : "2751",
			"name" : "蒲江县",
			"pid" : "322"
		}, {
			"id" : "2752",
			"name" : "新津县",
			"pid" : "322"
		} ],
		"name" : "成都",
		"pid" : "26"
	}, {
		"id" : "323",
		"sub" : [ {
			"id" : "2753",
			"name" : "涪城区",
			"pid" : "323"
		}, {
			"id" : "2754",
			"name" : "游仙区",
			"pid" : "323"
		}, {
			"id" : "2755",
			"name" : "江油市",
			"pid" : "323"
		}, {
			"id" : "2756",
			"name" : "盐亭县",
			"pid" : "323"
		}, {
			"id" : "2757",
			"name" : "三台县",
			"pid" : "323"
		}, {
			"id" : "2758",
			"name" : "平武县",
			"pid" : "323"
		}, {
			"id" : "2759",
			"name" : "安县",
			"pid" : "323"
		}, {
			"id" : "2760",
			"name" : "梓潼县",
			"pid" : "323"
		}, {
			"id" : "2761",
			"name" : "北川县",
			"pid" : "323"
		} ],
		"name" : "绵阳",
		"pid" : "26"
	}, {
		"id" : "324",
		"sub" : [ {
			"id" : "2762",
			"name" : "马尔康县",
			"pid" : "324"
		}, {
			"id" : "2763",
			"name" : "汶川县",
			"pid" : "324"
		}, {
			"id" : "2764",
			"name" : "理县",
			"pid" : "324"
		}, {
			"id" : "2765",
			"name" : "茂县",
			"pid" : "324"
		}, {
			"id" : "2766",
			"name" : "松潘县",
			"pid" : "324"
		}, {
			"id" : "2767",
			"name" : "九寨沟县",
			"pid" : "324"
		}, {
			"id" : "2768",
			"name" : "金川县",
			"pid" : "324"
		}, {
			"id" : "2769",
			"name" : "小金县",
			"pid" : "324"
		}, {
			"id" : "2770",
			"name" : "黑水县",
			"pid" : "324"
		}, {
			"id" : "2771",
			"name" : "壤塘县",
			"pid" : "324"
		}, {
			"id" : "2772",
			"name" : "阿坝县",
			"pid" : "324"
		}, {
			"id" : "2773",
			"name" : "若尔盖县",
			"pid" : "324"
		}, {
			"id" : "2774",
			"name" : "红原县",
			"pid" : "324"
		} ],
		"name" : "阿坝",
		"pid" : "26"
	}, {
		"id" : "325",
		"sub" : [ {
			"id" : "2775",
			"name" : "巴州区",
			"pid" : "325"
		}, {
			"id" : "2776",
			"name" : "通江县",
			"pid" : "325"
		}, {
			"id" : "2777",
			"name" : "南江县",
			"pid" : "325"
		}, {
			"id" : "2778",
			"name" : "平昌县",
			"pid" : "325"
		} ],
		"name" : "巴中",
		"pid" : "26"
	}, {
		"id" : "326",
		"sub" : [ {
			"id" : "2779",
			"name" : "通川区",
			"pid" : "326"
		}, {
			"id" : "2780",
			"name" : "万源市",
			"pid" : "326"
		}, {
			"id" : "2781",
			"name" : "达县",
			"pid" : "326"
		}, {
			"id" : "2782",
			"name" : "宣汉县",
			"pid" : "326"
		}, {
			"id" : "2783",
			"name" : "开江县",
			"pid" : "326"
		}, {
			"id" : "2784",
			"name" : "大竹县",
			"pid" : "326"
		}, {
			"id" : "2785",
			"name" : "渠县",
			"pid" : "326"
		} ],
		"name" : "达州",
		"pid" : "26"
	}, {
		"id" : "327",
		"sub" : [ {
			"id" : "2786",
			"name" : "旌阳区",
			"pid" : "327"
		}, {
			"id" : "2787",
			"name" : "广汉市",
			"pid" : "327"
		}, {
			"id" : "2788",
			"name" : "什邡市",
			"pid" : "327"
		}, {
			"id" : "2789",
			"name" : "绵竹市",
			"pid" : "327"
		}, {
			"id" : "2790",
			"name" : "罗江县",
			"pid" : "327"
		}, {
			"id" : "2791",
			"name" : "中江县",
			"pid" : "327"
		} ],
		"name" : "德阳",
		"pid" : "26"
	}, {
		"id" : "328",
		"sub" : [ {
			"id" : "2792",
			"name" : "康定县",
			"pid" : "328"
		}, {
			"id" : "2793",
			"name" : "丹巴县",
			"pid" : "328"
		}, {
			"id" : "2794",
			"name" : "泸定县",
			"pid" : "328"
		}, {
			"id" : "2795",
			"name" : "炉霍县",
			"pid" : "328"
		}, {
			"id" : "2796",
			"name" : "九龙县",
			"pid" : "328"
		}, {
			"id" : "2797",
			"name" : "甘孜县",
			"pid" : "328"
		}, {
			"id" : "2798",
			"name" : "雅江县",
			"pid" : "328"
		}, {
			"id" : "2799",
			"name" : "新龙县",
			"pid" : "328"
		}, {
			"id" : "2800",
			"name" : "道孚县",
			"pid" : "328"
		}, {
			"id" : "2801",
			"name" : "白玉县",
			"pid" : "328"
		}, {
			"id" : "2802",
			"name" : "理塘县",
			"pid" : "328"
		}, {
			"id" : "2803",
			"name" : "德格县",
			"pid" : "328"
		}, {
			"id" : "2804",
			"name" : "乡城县",
			"pid" : "328"
		}, {
			"id" : "2805",
			"name" : "石渠县",
			"pid" : "328"
		}, {
			"id" : "2806",
			"name" : "稻城县",
			"pid" : "328"
		}, {
			"id" : "2807",
			"name" : "色达县",
			"pid" : "328"
		}, {
			"id" : "2808",
			"name" : "巴塘县",
			"pid" : "328"
		}, {
			"id" : "2809",
			"name" : "得荣县",
			"pid" : "328"
		} ],
		"name" : "甘孜",
		"pid" : "26"
	}, {
		"id" : "329",
		"sub" : [ {
			"id" : "2810",
			"name" : "广安区",
			"pid" : "329"
		}, {
			"id" : "2811",
			"name" : "华蓥市",
			"pid" : "329"
		}, {
			"id" : "2812",
			"name" : "岳池县",
			"pid" : "329"
		}, {
			"id" : "2813",
			"name" : "武胜县",
			"pid" : "329"
		}, {
			"id" : "2814",
			"name" : "邻水县",
			"pid" : "329"
		} ],
		"name" : "广安",
		"pid" : "26"
	}, {
		"id" : "330",
		"sub" : [ {
			"id" : "2815",
			"name" : "利州区",
			"pid" : "330"
		}, {
			"id" : "2816",
			"name" : "元坝区",
			"pid" : "330"
		}, {
			"id" : "2817",
			"name" : "朝天区",
			"pid" : "330"
		}, {
			"id" : "2818",
			"name" : "旺苍县",
			"pid" : "330"
		}, {
			"id" : "2819",
			"name" : "青川县",
			"pid" : "330"
		}, {
			"id" : "2820",
			"name" : "剑阁县",
			"pid" : "330"
		}, {
			"id" : "2821",
			"name" : "苍溪县",
			"pid" : "330"
		} ],
		"name" : "广元",
		"pid" : "26"
	}, {
		"id" : "331",
		"sub" : [ {
			"id" : "2822",
			"name" : "峨眉山市",
			"pid" : "331"
		}, {
			"id" : "2823",
			"name" : "乐山市",
			"pid" : "331"
		}, {
			"id" : "2824",
			"name" : "犍为县",
			"pid" : "331"
		}, {
			"id" : "2825",
			"name" : "井研县",
			"pid" : "331"
		}, {
			"id" : "2826",
			"name" : "夹江县",
			"pid" : "331"
		}, {
			"id" : "2827",
			"name" : "沐川县",
			"pid" : "331"
		}, {
			"id" : "2828",
			"name" : "峨边",
			"pid" : "331"
		}, {
			"id" : "2829",
			"name" : "马边",
			"pid" : "331"
		} ],
		"name" : "乐山",
		"pid" : "26"
	}, {
		"id" : "332",
		"sub" : [ {
			"id" : "2830",
			"name" : "西昌市",
			"pid" : "332"
		}, {
			"id" : "2831",
			"name" : "盐源县",
			"pid" : "332"
		}, {
			"id" : "2832",
			"name" : "德昌县",
			"pid" : "332"
		}, {
			"id" : "2833",
			"name" : "会理县",
			"pid" : "332"
		}, {
			"id" : "2834",
			"name" : "会东县",
			"pid" : "332"
		}, {
			"id" : "2835",
			"name" : "宁南县",
			"pid" : "332"
		}, {
			"id" : "2836",
			"name" : "普格县",
			"pid" : "332"
		}, {
			"id" : "2837",
			"name" : "布拖县",
			"pid" : "332"
		}, {
			"id" : "2838",
			"name" : "金阳县",
			"pid" : "332"
		}, {
			"id" : "2839",
			"name" : "昭觉县",
			"pid" : "332"
		}, {
			"id" : "2840",
			"name" : "喜德县",
			"pid" : "332"
		}, {
			"id" : "2841",
			"name" : "冕宁县",
			"pid" : "332"
		}, {
			"id" : "2842",
			"name" : "越西县",
			"pid" : "332"
		}, {
			"id" : "2843",
			"name" : "甘洛县",
			"pid" : "332"
		}, {
			"id" : "2844",
			"name" : "美姑县",
			"pid" : "332"
		}, {
			"id" : "2845",
			"name" : "雷波县",
			"pid" : "332"
		}, {
			"id" : "2846",
			"name" : "木里",
			"pid" : "332"
		} ],
		"name" : "凉山",
		"pid" : "26"
	}, {
		"id" : "333",
		"sub" : [ {
			"id" : "2847",
			"name" : "东坡区",
			"pid" : "333"
		}, {
			"id" : "2848",
			"name" : "仁寿县",
			"pid" : "333"
		}, {
			"id" : "2849",
			"name" : "彭山县",
			"pid" : "333"
		}, {
			"id" : "2850",
			"name" : "洪雅县",
			"pid" : "333"
		}, {
			"id" : "2851",
			"name" : "丹棱县",
			"pid" : "333"
		}, {
			"id" : "2852",
			"name" : "青神县",
			"pid" : "333"
		} ],
		"name" : "眉山",
		"pid" : "26"
	}, {
		"id" : "334",
		"sub" : [ {
			"id" : "2853",
			"name" : "阆中市",
			"pid" : "334"
		}, {
			"id" : "2854",
			"name" : "南部县",
			"pid" : "334"
		}, {
			"id" : "2855",
			"name" : "营山县",
			"pid" : "334"
		}, {
			"id" : "2856",
			"name" : "蓬安县",
			"pid" : "334"
		}, {
			"id" : "2857",
			"name" : "仪陇县",
			"pid" : "334"
		}, {
			"id" : "2858",
			"name" : "顺庆区",
			"pid" : "334"
		}, {
			"id" : "2859",
			"name" : "高坪区",
			"pid" : "334"
		}, {
			"id" : "2860",
			"name" : "嘉陵区",
			"pid" : "334"
		}, {
			"id" : "2861",
			"name" : "西充县",
			"pid" : "334"
		} ],
		"name" : "南充",
		"pid" : "26"
	}, {
		"id" : "335",
		"sub" : [ {
			"id" : "2862",
			"name" : "市中区",
			"pid" : "335"
		}, {
			"id" : "2863",
			"name" : "东兴区",
			"pid" : "335"
		}, {
			"id" : "2864",
			"name" : "威远县",
			"pid" : "335"
		}, {
			"id" : "2865",
			"name" : "资中县",
			"pid" : "335"
		}, {
			"id" : "2866",
			"name" : "隆昌县",
			"pid" : "335"
		} ],
		"name" : "内江",
		"pid" : "26"
	}, {
		"id" : "336",
		"sub" : [ {
			"id" : "2867",
			"name" : "东 区",
			"pid" : "336"
		}, {
			"id" : "2868",
			"name" : "西 区",
			"pid" : "336"
		}, {
			"id" : "2869",
			"name" : "仁和区",
			"pid" : "336"
		}, {
			"id" : "2870",
			"name" : "米易县",
			"pid" : "336"
		}, {
			"id" : "2871",
			"name" : "盐边县",
			"pid" : "336"
		} ],
		"name" : "攀枝花",
		"pid" : "26"
	}, {
		"id" : "337",
		"sub" : [ {
			"id" : "2872",
			"name" : "船山区",
			"pid" : "337"
		}, {
			"id" : "2873",
			"name" : "安居区",
			"pid" : "337"
		}, {
			"id" : "2874",
			"name" : "蓬溪县",
			"pid" : "337"
		}, {
			"id" : "2875",
			"name" : "射洪县",
			"pid" : "337"
		}, {
			"id" : "2876",
			"name" : "大英县",
			"pid" : "337"
		} ],
		"name" : "遂宁",
		"pid" : "26"
	}, {
		"id" : "338",
		"sub" : [ {
			"id" : "2877",
			"name" : "雨城区",
			"pid" : "338"
		}, {
			"id" : "2878",
			"name" : "名山县",
			"pid" : "338"
		}, {
			"id" : "2879",
			"name" : "荥经县",
			"pid" : "338"
		}, {
			"id" : "2880",
			"name" : "汉源县",
			"pid" : "338"
		}, {
			"id" : "2881",
			"name" : "石棉县",
			"pid" : "338"
		}, {
			"id" : "2882",
			"name" : "天全县",
			"pid" : "338"
		}, {
			"id" : "2883",
			"name" : "芦山县",
			"pid" : "338"
		}, {
			"id" : "2884",
			"name" : "宝兴县",
			"pid" : "338"
		} ],
		"name" : "雅安",
		"pid" : "26"
	}, {
		"id" : "339",
		"sub" : [ {
			"id" : "2885",
			"name" : "翠屏区",
			"pid" : "339"
		}, {
			"id" : "2886",
			"name" : "宜宾县",
			"pid" : "339"
		}, {
			"id" : "2887",
			"name" : "南溪县",
			"pid" : "339"
		}, {
			"id" : "2888",
			"name" : "江安县",
			"pid" : "339"
		}, {
			"id" : "2889",
			"name" : "长宁县",
			"pid" : "339"
		}, {
			"id" : "2890",
			"name" : "高县",
			"pid" : "339"
		}, {
			"id" : "2891",
			"name" : "珙县",
			"pid" : "339"
		}, {
			"id" : "2892",
			"name" : "筠连县",
			"pid" : "339"
		}, {
			"id" : "2893",
			"name" : "兴文县",
			"pid" : "339"
		}, {
			"id" : "2894",
			"name" : "屏山县",
			"pid" : "339"
		} ],
		"name" : "宜宾",
		"pid" : "26"
	}, {
		"id" : "340",
		"sub" : [ {
			"id" : "2895",
			"name" : "雁江区",
			"pid" : "340"
		}, {
			"id" : "2896",
			"name" : "简阳市",
			"pid" : "340"
		}, {
			"id" : "2897",
			"name" : "安岳县",
			"pid" : "340"
		}, {
			"id" : "2898",
			"name" : "乐至县",
			"pid" : "340"
		} ],
		"name" : "资阳",
		"pid" : "26"
	}, {
		"id" : "341",
		"sub" : [ {
			"id" : "2899",
			"name" : "大安区",
			"pid" : "341"
		}, {
			"id" : "2900",
			"name" : "自流井区",
			"pid" : "341"
		}, {
			"id" : "2901",
			"name" : "贡井区",
			"pid" : "341"
		}, {
			"id" : "2902",
			"name" : "沿滩区",
			"pid" : "341"
		}, {
			"id" : "2903",
			"name" : "荣县",
			"pid" : "341"
		}, {
			"id" : "2904",
			"name" : "富顺县",
			"pid" : "341"
		} ],
		"name" : "自贡",
		"pid" : "26"
	}, {
		"id" : "342",
		"sub" : [ {
			"id" : "2905",
			"name" : "江阳区",
			"pid" : "342"
		}, {
			"id" : "2906",
			"name" : "纳溪区",
			"pid" : "342"
		}, {
			"id" : "2907",
			"name" : "龙马潭区",
			"pid" : "342"
		}, {
			"id" : "2908",
			"name" : "泸县",
			"pid" : "342"
		}, {
			"id" : "2909",
			"name" : "合江县",
			"pid" : "342"
		}, {
			"id" : "2910",
			"name" : "叙永县",
			"pid" : "342"
		}, {
			"id" : "2911",
			"name" : "古蔺县",
			"pid" : "342"
		} ],
		"name" : "泸州",
		"pid" : "26"
	} ],
	"name" : "四川",
	"pid" : "1"
}, {
	"id" : "27",
	"sub" : [ {
		"id" : "343",
		"sub" : [ {
			"id" : "2912",
			"name" : "和平区",
			"pid" : "343"
		}, {
			"id" : "2913",
			"name" : "河西区",
			"pid" : "343"
		}, {
			"id" : "2914",
			"name" : "南开区",
			"pid" : "343"
		}, {
			"id" : "2915",
			"name" : "河北区",
			"pid" : "343"
		}, {
			"id" : "2916",
			"name" : "河东区",
			"pid" : "343"
		}, {
			"id" : "2917",
			"name" : "红桥区",
			"pid" : "343"
		}, {
			"id" : "2918",
			"name" : "东丽区",
			"pid" : "343"
		}, {
			"id" : "2919",
			"name" : "津南区",
			"pid" : "343"
		}, {
			"id" : "2920",
			"name" : "西青区",
			"pid" : "343"
		}, {
			"id" : "2921",
			"name" : "北辰区",
			"pid" : "343"
		}, {
			"id" : "2922",
			"name" : "塘沽区",
			"pid" : "343"
		}, {
			"id" : "2923",
			"name" : "汉沽区",
			"pid" : "343"
		}, {
			"id" : "2924",
			"name" : "大港区",
			"pid" : "343"
		}, {
			"id" : "2925",
			"name" : "武清区",
			"pid" : "343"
		}, {
			"id" : "2926",
			"name" : "宝坻区",
			"pid" : "343"
		}, {
			"id" : "2927",
			"name" : "经济开发区",
			"pid" : "343"
		}, {
			"id" : "2928",
			"name" : "宁河县",
			"pid" : "343"
		}, {
			"id" : "2929",
			"name" : "静海县",
			"pid" : "343"
		}, {
			"id" : "2930",
			"name" : "蓟县",
			"pid" : "343"
		} ],
		"name" : "天津",
		"pid" : "27"
	} ],
	"name" : "天津",
	"pid" : "1"
}, {
	"id" : "28",
	"sub" : [ {
		"id" : "344",
		"sub" : [ {
			"id" : "2931",
			"name" : "城关区",
			"pid" : "344"
		}, {
			"id" : "2932",
			"name" : "林周县",
			"pid" : "344"
		}, {
			"id" : "2933",
			"name" : "当雄县",
			"pid" : "344"
		}, {
			"id" : "2934",
			"name" : "尼木县",
			"pid" : "344"
		}, {
			"id" : "2935",
			"name" : "曲水县",
			"pid" : "344"
		}, {
			"id" : "2936",
			"name" : "堆龙德庆县",
			"pid" : "344"
		}, {
			"id" : "2937",
			"name" : "达孜县",
			"pid" : "344"
		}, {
			"id" : "2938",
			"name" : "墨竹工卡县",
			"pid" : "344"
		} ],
		"name" : "拉萨",
		"pid" : "28"
	}, {
		"id" : "345",
		"sub" : [ {
			"id" : "2939",
			"name" : "噶尔县",
			"pid" : "345"
		}, {
			"id" : "2940",
			"name" : "普兰县",
			"pid" : "345"
		}, {
			"id" : "2941",
			"name" : "札达县",
			"pid" : "345"
		}, {
			"id" : "2942",
			"name" : "日土县",
			"pid" : "345"
		}, {
			"id" : "2943",
			"name" : "革吉县",
			"pid" : "345"
		}, {
			"id" : "2944",
			"name" : "改则县",
			"pid" : "345"
		}, {
			"id" : "2945",
			"name" : "措勤县",
			"pid" : "345"
		} ],
		"name" : "阿里",
		"pid" : "28"
	}, {
		"id" : "346",
		"sub" : [ {
			"id" : "2946",
			"name" : "昌都县",
			"pid" : "346"
		}, {
			"id" : "2947",
			"name" : "江达县",
			"pid" : "346"
		}, {
			"id" : "2948",
			"name" : "贡觉县",
			"pid" : "346"
		}, {
			"id" : "2949",
			"name" : "类乌齐县",
			"pid" : "346"
		}, {
			"id" : "2950",
			"name" : "丁青县",
			"pid" : "346"
		}, {
			"id" : "2951",
			"name" : "察雅县",
			"pid" : "346"
		}, {
			"id" : "2952",
			"name" : "八宿县",
			"pid" : "346"
		}, {
			"id" : "2953",
			"name" : "左贡县",
			"pid" : "346"
		}, {
			"id" : "2954",
			"name" : "芒康县",
			"pid" : "346"
		}, {
			"id" : "2955",
			"name" : "洛隆县",
			"pid" : "346"
		}, {
			"id" : "2956",
			"name" : "边坝县",
			"pid" : "346"
		} ],
		"name" : "昌都",
		"pid" : "28"
	}, {
		"id" : "347",
		"sub" : [ {
			"id" : "2957",
			"name" : "林芝县",
			"pid" : "347"
		}, {
			"id" : "2958",
			"name" : "工布江达县",
			"pid" : "347"
		}, {
			"id" : "2959",
			"name" : "米林县",
			"pid" : "347"
		}, {
			"id" : "2960",
			"name" : "墨脱县",
			"pid" : "347"
		}, {
			"id" : "2961",
			"name" : "波密县",
			"pid" : "347"
		}, {
			"id" : "2962",
			"name" : "察隅县",
			"pid" : "347"
		}, {
			"id" : "2963",
			"name" : "朗县",
			"pid" : "347"
		} ],
		"name" : "林芝",
		"pid" : "28"
	}, {
		"id" : "348",
		"sub" : [ {
			"id" : "2964",
			"name" : "那曲县",
			"pid" : "348"
		}, {
			"id" : "2965",
			"name" : "嘉黎县",
			"pid" : "348"
		}, {
			"id" : "2966",
			"name" : "比如县",
			"pid" : "348"
		}, {
			"id" : "2967",
			"name" : "聂荣县",
			"pid" : "348"
		}, {
			"id" : "2968",
			"name" : "安多县",
			"pid" : "348"
		}, {
			"id" : "2969",
			"name" : "申扎县",
			"pid" : "348"
		}, {
			"id" : "2970",
			"name" : "索县",
			"pid" : "348"
		}, {
			"id" : "2971",
			"name" : "班戈县",
			"pid" : "348"
		}, {
			"id" : "2972",
			"name" : "巴青县",
			"pid" : "348"
		}, {
			"id" : "2973",
			"name" : "尼玛县",
			"pid" : "348"
		} ],
		"name" : "那曲",
		"pid" : "28"
	}, {
		"id" : "349",
		"sub" : [ {
			"id" : "2974",
			"name" : "日喀则市",
			"pid" : "349"
		}, {
			"id" : "2975",
			"name" : "南木林县",
			"pid" : "349"
		}, {
			"id" : "2976",
			"name" : "江孜县",
			"pid" : "349"
		}, {
			"id" : "2977",
			"name" : "定日县",
			"pid" : "349"
		}, {
			"id" : "2978",
			"name" : "萨迦县",
			"pid" : "349"
		}, {
			"id" : "2979",
			"name" : "拉孜县",
			"pid" : "349"
		}, {
			"id" : "2980",
			"name" : "昂仁县",
			"pid" : "349"
		}, {
			"id" : "2981",
			"name" : "谢通门县",
			"pid" : "349"
		}, {
			"id" : "2982",
			"name" : "白朗县",
			"pid" : "349"
		}, {
			"id" : "2983",
			"name" : "仁布县",
			"pid" : "349"
		}, {
			"id" : "2984",
			"name" : "康马县",
			"pid" : "349"
		}, {
			"id" : "2985",
			"name" : "定结县",
			"pid" : "349"
		}, {
			"id" : "2986",
			"name" : "仲巴县",
			"pid" : "349"
		}, {
			"id" : "2987",
			"name" : "亚东县",
			"pid" : "349"
		}, {
			"id" : "2988",
			"name" : "吉隆县",
			"pid" : "349"
		}, {
			"id" : "2989",
			"name" : "聂拉木县",
			"pid" : "349"
		}, {
			"id" : "2990",
			"name" : "萨嘎县",
			"pid" : "349"
		}, {
			"id" : "2991",
			"name" : "岗巴县",
			"pid" : "349"
		} ],
		"name" : "日喀则",
		"pid" : "28"
	}, {
		"id" : "350",
		"sub" : [ {
			"id" : "2992",
			"name" : "乃东县",
			"pid" : "350"
		}, {
			"id" : "2993",
			"name" : "扎囊县",
			"pid" : "350"
		}, {
			"id" : "2994",
			"name" : "贡嘎县",
			"pid" : "350"
		}, {
			"id" : "2995",
			"name" : "桑日县",
			"pid" : "350"
		}, {
			"id" : "2996",
			"name" : "琼结县",
			"pid" : "350"
		}, {
			"id" : "2997",
			"name" : "曲松县",
			"pid" : "350"
		}, {
			"id" : "2998",
			"name" : "措美县",
			"pid" : "350"
		}, {
			"id" : "2999",
			"name" : "洛扎县",
			"pid" : "350"
		}, {
			"id" : "3000",
			"name" : "加查县",
			"pid" : "350"
		}, {
			"id" : "3001",
			"name" : "隆子县",
			"pid" : "350"
		}, {
			"id" : "3002",
			"name" : "错那县",
			"pid" : "350"
		}, {
			"id" : "3003",
			"name" : "浪卡子县",
			"pid" : "350"
		} ],
		"name" : "山南",
		"pid" : "28"
	} ],
	"name" : "西藏",
	"pid" : "1"
}, {
	"id" : "29",
	"sub" : [ {
		"id" : "351",
		"sub" : [ {
			"id" : "3004",
			"name" : "天山区",
			"pid" : "351"
		}, {
			"id" : "3005",
			"name" : "沙依巴克区",
			"pid" : "351"
		}, {
			"id" : "3006",
			"name" : "新市区",
			"pid" : "351"
		}, {
			"id" : "3007",
			"name" : "水磨沟区",
			"pid" : "351"
		}, {
			"id" : "3008",
			"name" : "头屯河区",
			"pid" : "351"
		}, {
			"id" : "3009",
			"name" : "达坂城区",
			"pid" : "351"
		}, {
			"id" : "3010",
			"name" : "米东区",
			"pid" : "351"
		}, {
			"id" : "3011",
			"name" : "乌鲁木齐县",
			"pid" : "351"
		} ],
		"name" : "乌鲁木齐",
		"pid" : "29"
	}, {
		"id" : "352",
		"sub" : [ {
			"id" : "3012",
			"name" : "阿克苏市",
			"pid" : "352"
		}, {
			"id" : "3013",
			"name" : "温宿县",
			"pid" : "352"
		}, {
			"id" : "3014",
			"name" : "库车县",
			"pid" : "352"
		}, {
			"id" : "3015",
			"name" : "沙雅县",
			"pid" : "352"
		}, {
			"id" : "3016",
			"name" : "新和县",
			"pid" : "352"
		}, {
			"id" : "3017",
			"name" : "拜城县",
			"pid" : "352"
		}, {
			"id" : "3018",
			"name" : "乌什县",
			"pid" : "352"
		}, {
			"id" : "3019",
			"name" : "阿瓦提县",
			"pid" : "352"
		}, {
			"id" : "3020",
			"name" : "柯坪县",
			"pid" : "352"
		} ],
		"name" : "阿克苏",
		"pid" : "29"
	}, {
		"id" : "353",
		"sub" : [ {
			"id" : "3021",
			"name" : "阿拉尔市",
			"pid" : "353"
		} ],
		"name" : "阿拉尔",
		"pid" : "29"
	}, {
		"id" : "354",
		"sub" : [ {
			"id" : "3022",
			"name" : "库尔勒市",
			"pid" : "354"
		}, {
			"id" : "3023",
			"name" : "轮台县",
			"pid" : "354"
		}, {
			"id" : "3024",
			"name" : "尉犁县",
			"pid" : "354"
		}, {
			"id" : "3025",
			"name" : "若羌县",
			"pid" : "354"
		}, {
			"id" : "3026",
			"name" : "且末县",
			"pid" : "354"
		}, {
			"id" : "3027",
			"name" : "焉耆",
			"pid" : "354"
		}, {
			"id" : "3028",
			"name" : "和静县",
			"pid" : "354"
		}, {
			"id" : "3029",
			"name" : "和硕县",
			"pid" : "354"
		}, {
			"id" : "3030",
			"name" : "博湖县",
			"pid" : "354"
		} ],
		"name" : "巴音郭楞",
		"pid" : "29"
	}, {
		"id" : "355",
		"sub" : [ {
			"id" : "3031",
			"name" : "博乐市",
			"pid" : "355"
		}, {
			"id" : "3032",
			"name" : "精河县",
			"pid" : "355"
		}, {
			"id" : "3033",
			"name" : "温泉县",
			"pid" : "355"
		} ],
		"name" : "博尔塔拉",
		"pid" : "29"
	}, {
		"id" : "356",
		"sub" : [ {
			"id" : "3034",
			"name" : "呼图壁县",
			"pid" : "356"
		}, {
			"id" : "3035",
			"name" : "米泉市",
			"pid" : "356"
		}, {
			"id" : "3036",
			"name" : "昌吉市",
			"pid" : "356"
		}, {
			"id" : "3037",
			"name" : "阜康市",
			"pid" : "356"
		}, {
			"id" : "3038",
			"name" : "玛纳斯县",
			"pid" : "356"
		}, {
			"id" : "3039",
			"name" : "奇台县",
			"pid" : "356"
		}, {
			"id" : "3040",
			"name" : "吉木萨尔县",
			"pid" : "356"
		}, {
			"id" : "3041",
			"name" : "木垒",
			"pid" : "356"
		} ],
		"name" : "昌吉",
		"pid" : "29"
	}, {
		"id" : "357",
		"sub" : [ {
			"id" : "3042",
			"name" : "哈密市",
			"pid" : "357"
		}, {
			"id" : "3043",
			"name" : "伊吾县",
			"pid" : "357"
		}, {
			"id" : "3044",
			"name" : "巴里坤",
			"pid" : "357"
		} ],
		"name" : "哈密",
		"pid" : "29"
	}, {
		"id" : "358",
		"sub" : [ {
			"id" : "3045",
			"name" : "和田市",
			"pid" : "358"
		}, {
			"id" : "3046",
			"name" : "和田县",
			"pid" : "358"
		}, {
			"id" : "3047",
			"name" : "墨玉县",
			"pid" : "358"
		}, {
			"id" : "3048",
			"name" : "皮山县",
			"pid" : "358"
		}, {
			"id" : "3049",
			"name" : "洛浦县",
			"pid" : "358"
		}, {
			"id" : "3050",
			"name" : "策勒县",
			"pid" : "358"
		}, {
			"id" : "3051",
			"name" : "于田县",
			"pid" : "358"
		}, {
			"id" : "3052",
			"name" : "民丰县",
			"pid" : "358"
		} ],
		"name" : "和田",
		"pid" : "29"
	}, {
		"id" : "359",
		"sub" : [ {
			"id" : "3053",
			"name" : "喀什市",
			"pid" : "359"
		}, {
			"id" : "3054",
			"name" : "疏附县",
			"pid" : "359"
		}, {
			"id" : "3055",
			"name" : "疏勒县",
			"pid" : "359"
		}, {
			"id" : "3056",
			"name" : "英吉沙县",
			"pid" : "359"
		}, {
			"id" : "3057",
			"name" : "泽普县",
			"pid" : "359"
		}, {
			"id" : "3058",
			"name" : "莎车县",
			"pid" : "359"
		}, {
			"id" : "3059",
			"name" : "叶城县",
			"pid" : "359"
		}, {
			"id" : "3060",
			"name" : "麦盖提县",
			"pid" : "359"
		}, {
			"id" : "3061",
			"name" : "岳普湖县",
			"pid" : "359"
		}, {
			"id" : "3062",
			"name" : "伽师县",
			"pid" : "359"
		}, {
			"id" : "3063",
			"name" : "巴楚县",
			"pid" : "359"
		}, {
			"id" : "3064",
			"name" : "塔什库尔干",
			"pid" : "359"
		} ],
		"name" : "喀什",
		"pid" : "29"
	}, {
		"id" : "360",
		"sub" : [ {
			"id" : "3065",
			"name" : "克拉玛依市",
			"pid" : "360"
		} ],
		"name" : "克拉玛依",
		"pid" : "29"
	}, {
		"id" : "361",
		"sub" : [ {
			"id" : "3066",
			"name" : "阿图什市",
			"pid" : "361"
		}, {
			"id" : "3067",
			"name" : "阿克陶县",
			"pid" : "361"
		}, {
			"id" : "3068",
			"name" : "阿合奇县",
			"pid" : "361"
		}, {
			"id" : "3069",
			"name" : "乌恰县",
			"pid" : "361"
		} ],
		"name" : "克孜勒苏",
		"pid" : "29"
	}, {
		"id" : "362",
		"sub" : [ {
			"id" : "3070",
			"name" : "石河子市",
			"pid" : "362"
		} ],
		"name" : "石河子",
		"pid" : "29"
	}, {
		"id" : "363",
		"sub" : [ {
			"id" : "3071",
			"name" : "图木舒克市",
			"pid" : "363"
		} ],
		"name" : "图木舒克",
		"pid" : "29"
	}, {
		"id" : "364",
		"sub" : [ {
			"id" : "3072",
			"name" : "吐鲁番市",
			"pid" : "364"
		}, {
			"id" : "3073",
			"name" : "鄯善县",
			"pid" : "364"
		}, {
			"id" : "3074",
			"name" : "托克逊县",
			"pid" : "364"
		} ],
		"name" : "吐鲁番",
		"pid" : "29"
	}, {
		"id" : "365",
		"sub" : [ {
			"id" : "3075",
			"name" : "五家渠市",
			"pid" : "365"
		} ],
		"name" : "五家渠",
		"pid" : "29"
	}, {
		"id" : "366",
		"sub" : [ {
			"id" : "3076",
			"name" : "阿勒泰市",
			"pid" : "366"
		}, {
			"id" : "3077",
			"name" : "布克赛尔",
			"pid" : "366"
		}, {
			"id" : "3078",
			"name" : "伊宁市",
			"pid" : "366"
		}, {
			"id" : "3079",
			"name" : "布尔津县",
			"pid" : "366"
		}, {
			"id" : "3080",
			"name" : "奎屯市",
			"pid" : "366"
		}, {
			"id" : "3081",
			"name" : "乌苏市",
			"pid" : "366"
		}, {
			"id" : "3082",
			"name" : "额敏县",
			"pid" : "366"
		}, {
			"id" : "3083",
			"name" : "富蕴县",
			"pid" : "366"
		}, {
			"id" : "3084",
			"name" : "伊宁县",
			"pid" : "366"
		}, {
			"id" : "3085",
			"name" : "福海县",
			"pid" : "366"
		}, {
			"id" : "3086",
			"name" : "霍城县",
			"pid" : "366"
		}, {
			"id" : "3087",
			"name" : "沙湾县",
			"pid" : "366"
		}, {
			"id" : "3088",
			"name" : "巩留县",
			"pid" : "366"
		}, {
			"id" : "3089",
			"name" : "哈巴河县",
			"pid" : "366"
		}, {
			"id" : "3090",
			"name" : "托里县",
			"pid" : "366"
		}, {
			"id" : "3091",
			"name" : "青河县",
			"pid" : "366"
		}, {
			"id" : "3092",
			"name" : "新源县",
			"pid" : "366"
		}, {
			"id" : "3093",
			"name" : "裕民县",
			"pid" : "366"
		}, {
			"id" : "3094",
			"name" : "和布克赛尔",
			"pid" : "366"
		}, {
			"id" : "3095",
			"name" : "吉木乃县",
			"pid" : "366"
		}, {
			"id" : "3096",
			"name" : "昭苏县",
			"pid" : "366"
		}, {
			"id" : "3097",
			"name" : "特克斯县",
			"pid" : "366"
		}, {
			"id" : "3098",
			"name" : "尼勒克县",
			"pid" : "366"
		}, {
			"id" : "3099",
			"name" : "察布查尔",
			"pid" : "366"
		} ],
		"name" : "伊犁",
		"pid" : "29"
	} ],
	"name" : "新疆",
	"pid" : "1"
}, {
	"id" : "30",
	"sub" : [ {
		"id" : "367",
		"sub" : [ {
			"id" : "3100",
			"name" : "盘龙区",
			"pid" : "367"
		}, {
			"id" : "3101",
			"name" : "五华区",
			"pid" : "367"
		}, {
			"id" : "3102",
			"name" : "官渡区",
			"pid" : "367"
		}, {
			"id" : "3103",
			"name" : "西山区",
			"pid" : "367"
		}, {
			"id" : "3104",
			"name" : "东川区",
			"pid" : "367"
		}, {
			"id" : "3105",
			"name" : "安宁市",
			"pid" : "367"
		}, {
			"id" : "3106",
			"name" : "呈贡县",
			"pid" : "367"
		}, {
			"id" : "3107",
			"name" : "晋宁县",
			"pid" : "367"
		}, {
			"id" : "3108",
			"name" : "富民县",
			"pid" : "367"
		}, {
			"id" : "3109",
			"name" : "宜良县",
			"pid" : "367"
		}, {
			"id" : "3110",
			"name" : "嵩明县",
			"pid" : "367"
		}, {
			"id" : "3111",
			"name" : "石林县",
			"pid" : "367"
		}, {
			"id" : "3112",
			"name" : "禄劝",
			"pid" : "367"
		}, {
			"id" : "3113",
			"name" : "寻甸",
			"pid" : "367"
		} ],
		"name" : "昆明",
		"pid" : "30"
	}, {
		"id" : "368",
		"sub" : [ {
			"id" : "3114",
			"name" : "兰坪",
			"pid" : "368"
		}, {
			"id" : "3115",
			"name" : "泸水县",
			"pid" : "368"
		}, {
			"id" : "3116",
			"name" : "福贡县",
			"pid" : "368"
		}, {
			"id" : "3117",
			"name" : "贡山",
			"pid" : "368"
		} ],
		"name" : "怒江",
		"pid" : "30"
	}, {
		"id" : "369",
		"sub" : [ {
			"id" : "3118",
			"name" : "宁洱",
			"pid" : "369"
		}, {
			"id" : "3119",
			"name" : "思茅区",
			"pid" : "369"
		}, {
			"id" : "3120",
			"name" : "墨江",
			"pid" : "369"
		}, {
			"id" : "3121",
			"name" : "景东",
			"pid" : "369"
		}, {
			"id" : "3122",
			"name" : "景谷",
			"pid" : "369"
		}, {
			"id" : "3123",
			"name" : "镇沅",
			"pid" : "369"
		}, {
			"id" : "3124",
			"name" : "江城",
			"pid" : "369"
		}, {
			"id" : "3125",
			"name" : "孟连",
			"pid" : "369"
		}, {
			"id" : "3126",
			"name" : "澜沧",
			"pid" : "369"
		}, {
			"id" : "3127",
			"name" : "西盟",
			"pid" : "369"
		} ],
		"name" : "普洱",
		"pid" : "30"
	}, {
		"id" : "370",
		"sub" : [ {
			"id" : "3128",
			"name" : "古城区",
			"pid" : "370"
		}, {
			"id" : "3129",
			"name" : "宁蒗",
			"pid" : "370"
		}, {
			"id" : "3130",
			"name" : "玉龙",
			"pid" : "370"
		}, {
			"id" : "3131",
			"name" : "永胜县",
			"pid" : "370"
		}, {
			"id" : "3132",
			"name" : "华坪县",
			"pid" : "370"
		} ],
		"name" : "丽江",
		"pid" : "30"
	}, {
		"id" : "371",
		"sub" : [ {
			"id" : "3133",
			"name" : "隆阳区",
			"pid" : "371"
		}, {
			"id" : "3134",
			"name" : "施甸县",
			"pid" : "371"
		}, {
			"id" : "3135",
			"name" : "腾冲县",
			"pid" : "371"
		}, {
			"id" : "3136",
			"name" : "龙陵县",
			"pid" : "371"
		}, {
			"id" : "3137",
			"name" : "昌宁县",
			"pid" : "371"
		} ],
		"name" : "保山",
		"pid" : "30"
	}, {
		"id" : "372",
		"sub" : [ {
			"id" : "3138",
			"name" : "楚雄市",
			"pid" : "372"
		}, {
			"id" : "3139",
			"name" : "双柏县",
			"pid" : "372"
		}, {
			"id" : "3140",
			"name" : "牟定县",
			"pid" : "372"
		}, {
			"id" : "3141",
			"name" : "南华县",
			"pid" : "372"
		}, {
			"id" : "3142",
			"name" : "姚安县",
			"pid" : "372"
		}, {
			"id" : "3143",
			"name" : "大姚县",
			"pid" : "372"
		}, {
			"id" : "3144",
			"name" : "永仁县",
			"pid" : "372"
		}, {
			"id" : "3145",
			"name" : "元谋县",
			"pid" : "372"
		}, {
			"id" : "3146",
			"name" : "武定县",
			"pid" : "372"
		}, {
			"id" : "3147",
			"name" : "禄丰县",
			"pid" : "372"
		} ],
		"name" : "楚雄",
		"pid" : "30"
	}, {
		"id" : "373",
		"sub" : [ {
			"id" : "3148",
			"name" : "大理市",
			"pid" : "373"
		}, {
			"id" : "3149",
			"name" : "祥云县",
			"pid" : "373"
		}, {
			"id" : "3150",
			"name" : "宾川县",
			"pid" : "373"
		}, {
			"id" : "3151",
			"name" : "弥渡县",
			"pid" : "373"
		}, {
			"id" : "3152",
			"name" : "永平县",
			"pid" : "373"
		}, {
			"id" : "3153",
			"name" : "云龙县",
			"pid" : "373"
		}, {
			"id" : "3154",
			"name" : "洱源县",
			"pid" : "373"
		}, {
			"id" : "3155",
			"name" : "剑川县",
			"pid" : "373"
		}, {
			"id" : "3156",
			"name" : "鹤庆县",
			"pid" : "373"
		}, {
			"id" : "3157",
			"name" : "漾濞",
			"pid" : "373"
		}, {
			"id" : "3158",
			"name" : "南涧",
			"pid" : "373"
		}, {
			"id" : "3159",
			"name" : "巍山",
			"pid" : "373"
		} ],
		"name" : "大理",
		"pid" : "30"
	}, {
		"id" : "374",
		"sub" : [ {
			"id" : "3160",
			"name" : "潞西市",
			"pid" : "374"
		}, {
			"id" : "3161",
			"name" : "瑞丽市",
			"pid" : "374"
		}, {
			"id" : "3162",
			"name" : "梁河县",
			"pid" : "374"
		}, {
			"id" : "3163",
			"name" : "盈江县",
			"pid" : "374"
		}, {
			"id" : "3164",
			"name" : "陇川县",
			"pid" : "374"
		} ],
		"name" : "德宏",
		"pid" : "30"
	}, {
		"id" : "375",
		"sub" : [ {
			"id" : "3165",
			"name" : "香格里拉县",
			"pid" : "375"
		}, {
			"id" : "3166",
			"name" : "德钦县",
			"pid" : "375"
		}, {
			"id" : "3167",
			"name" : "维西",
			"pid" : "375"
		} ],
		"name" : "迪庆",
		"pid" : "30"
	}, {
		"id" : "376",
		"sub" : [ {
			"id" : "3168",
			"name" : "泸西县",
			"pid" : "376"
		}, {
			"id" : "3169",
			"name" : "蒙自县",
			"pid" : "376"
		}, {
			"id" : "3170",
			"name" : "个旧市",
			"pid" : "376"
		}, {
			"id" : "3171",
			"name" : "开远市",
			"pid" : "376"
		}, {
			"id" : "3172",
			"name" : "绿春县",
			"pid" : "376"
		}, {
			"id" : "3173",
			"name" : "建水县",
			"pid" : "376"
		}, {
			"id" : "3174",
			"name" : "石屏县",
			"pid" : "376"
		}, {
			"id" : "3175",
			"name" : "弥勒县",
			"pid" : "376"
		}, {
			"id" : "3176",
			"name" : "元阳县",
			"pid" : "376"
		}, {
			"id" : "3177",
			"name" : "红河县",
			"pid" : "376"
		}, {
			"id" : "3178",
			"name" : "金平",
			"pid" : "376"
		}, {
			"id" : "3179",
			"name" : "河口",
			"pid" : "376"
		}, {
			"id" : "3180",
			"name" : "屏边",
			"pid" : "376"
		} ],
		"name" : "红河",
		"pid" : "30"
	}, {
		"id" : "377",
		"sub" : [ {
			"id" : "3181",
			"name" : "临翔区",
			"pid" : "377"
		}, {
			"id" : "3182",
			"name" : "凤庆县",
			"pid" : "377"
		}, {
			"id" : "3183",
			"name" : "云县",
			"pid" : "377"
		}, {
			"id" : "3184",
			"name" : "永德县",
			"pid" : "377"
		}, {
			"id" : "3185",
			"name" : "镇康县",
			"pid" : "377"
		}, {
			"id" : "3186",
			"name" : "双江",
			"pid" : "377"
		}, {
			"id" : "3187",
			"name" : "耿马",
			"pid" : "377"
		}, {
			"id" : "3188",
			"name" : "沧源",
			"pid" : "377"
		} ],
		"name" : "临沧",
		"pid" : "30"
	}, {
		"id" : "378",
		"sub" : [ {
			"id" : "3189",
			"name" : "麒麟区",
			"pid" : "378"
		}, {
			"id" : "3190",
			"name" : "宣威市",
			"pid" : "378"
		}, {
			"id" : "3191",
			"name" : "马龙县",
			"pid" : "378"
		}, {
			"id" : "3192",
			"name" : "陆良县",
			"pid" : "378"
		}, {
			"id" : "3193",
			"name" : "师宗县",
			"pid" : "378"
		}, {
			"id" : "3194",
			"name" : "罗平县",
			"pid" : "378"
		}, {
			"id" : "3195",
			"name" : "富源县",
			"pid" : "378"
		}, {
			"id" : "3196",
			"name" : "会泽县",
			"pid" : "378"
		}, {
			"id" : "3197",
			"name" : "沾益县",
			"pid" : "378"
		} ],
		"name" : "曲靖",
		"pid" : "30"
	}, {
		"id" : "379",
		"sub" : [ {
			"id" : "3198",
			"name" : "文山县",
			"pid" : "379"
		}, {
			"id" : "3199",
			"name" : "砚山县",
			"pid" : "379"
		}, {
			"id" : "3200",
			"name" : "西畴县",
			"pid" : "379"
		}, {
			"id" : "3201",
			"name" : "麻栗坡县",
			"pid" : "379"
		}, {
			"id" : "3202",
			"name" : "马关县",
			"pid" : "379"
		}, {
			"id" : "3203",
			"name" : "丘北县",
			"pid" : "379"
		}, {
			"id" : "3204",
			"name" : "广南县",
			"pid" : "379"
		}, {
			"id" : "3205",
			"name" : "富宁县",
			"pid" : "379"
		} ],
		"name" : "文山",
		"pid" : "30"
	}, {
		"id" : "380",
		"sub" : [ {
			"id" : "3206",
			"name" : "景洪市",
			"pid" : "380"
		}, {
			"id" : "3207",
			"name" : "勐海县",
			"pid" : "380"
		}, {
			"id" : "3208",
			"name" : "勐腊县",
			"pid" : "380"
		} ],
		"name" : "西双版纳",
		"pid" : "30"
	}, {
		"id" : "381",
		"sub" : [ {
			"id" : "3209",
			"name" : "红塔区",
			"pid" : "381"
		}, {
			"id" : "3210",
			"name" : "江川县",
			"pid" : "381"
		}, {
			"id" : "3211",
			"name" : "澄江县",
			"pid" : "381"
		}, {
			"id" : "3212",
			"name" : "通海县",
			"pid" : "381"
		}, {
			"id" : "3213",
			"name" : "华宁县",
			"pid" : "381"
		}, {
			"id" : "3214",
			"name" : "易门县",
			"pid" : "381"
		}, {
			"id" : "3215",
			"name" : "峨山",
			"pid" : "381"
		}, {
			"id" : "3216",
			"name" : "新平",
			"pid" : "381"
		}, {
			"id" : "3217",
			"name" : "元江",
			"pid" : "381"
		} ],
		"name" : "玉溪",
		"pid" : "30"
	}, {
		"id" : "382",
		"sub" : [ {
			"id" : "3218",
			"name" : "昭阳区",
			"pid" : "382"
		}, {
			"id" : "3219",
			"name" : "鲁甸县",
			"pid" : "382"
		}, {
			"id" : "3220",
			"name" : "巧家县",
			"pid" : "382"
		}, {
			"id" : "3221",
			"name" : "盐津县",
			"pid" : "382"
		}, {
			"id" : "3222",
			"name" : "大关县",
			"pid" : "382"
		}, {
			"id" : "3223",
			"name" : "永善县",
			"pid" : "382"
		}, {
			"id" : "3224",
			"name" : "绥江县",
			"pid" : "382"
		}, {
			"id" : "3225",
			"name" : "镇雄县",
			"pid" : "382"
		}, {
			"id" : "3226",
			"name" : "彝良县",
			"pid" : "382"
		}, {
			"id" : "3227",
			"name" : "威信县",
			"pid" : "382"
		}, {
			"id" : "3228",
			"name" : "水富县",
			"pid" : "382"
		} ],
		"name" : "昭通",
		"pid" : "30"
	} ],
	"name" : "云南",
	"pid" : "1"
}, {
	"id" : "31",
	"sub" : [ {
		"id" : "383",
		"sub" : [ {
			"id" : "3229",
			"name" : "西湖区",
			"pid" : "383"
		}, {
			"id" : "3230",
			"name" : "上城区",
			"pid" : "383"
		}, {
			"id" : "3231",
			"name" : "下城区",
			"pid" : "383"
		}, {
			"id" : "3232",
			"name" : "拱墅区",
			"pid" : "383"
		}, {
			"id" : "3233",
			"name" : "滨江区",
			"pid" : "383"
		}, {
			"id" : "3234",
			"name" : "江干区",
			"pid" : "383"
		}, {
			"id" : "3235",
			"name" : "萧山区",
			"pid" : "383"
		}, {
			"id" : "3236",
			"name" : "余杭区",
			"pid" : "383"
		}, {
			"id" : "3237",
			"name" : "市郊",
			"pid" : "383"
		}, {
			"id" : "3238",
			"name" : "建德市",
			"pid" : "383"
		}, {
			"id" : "3239",
			"name" : "富阳市",
			"pid" : "383"
		}, {
			"id" : "3240",
			"name" : "临安市",
			"pid" : "383"
		}, {
			"id" : "3241",
			"name" : "桐庐县",
			"pid" : "383"
		}, {
			"id" : "3242",
			"name" : "淳安县",
			"pid" : "383"
		} ],
		"name" : "杭州",
		"pid" : "31"
	}, {
		"id" : "384",
		"sub" : [ {
			"id" : "3243",
			"name" : "吴兴区",
			"pid" : "384"
		}, {
			"id" : "3244",
			"name" : "南浔区",
			"pid" : "384"
		}, {
			"id" : "3245",
			"name" : "德清县",
			"pid" : "384"
		}, {
			"id" : "3246",
			"name" : "长兴县",
			"pid" : "384"
		}, {
			"id" : "3247",
			"name" : "安吉县",
			"pid" : "384"
		} ],
		"name" : "湖州",
		"pid" : "31"
	}, {
		"id" : "385",
		"sub" : [ {
			"id" : "3248",
			"name" : "南湖区",
			"pid" : "385"
		}, {
			"id" : "3249",
			"name" : "秀洲区",
			"pid" : "385"
		}, {
			"id" : "3250",
			"name" : "海宁市",
			"pid" : "385"
		}, {
			"id" : "3251",
			"name" : "嘉善县",
			"pid" : "385"
		}, {
			"id" : "3252",
			"name" : "平湖市",
			"pid" : "385"
		}, {
			"id" : "3253",
			"name" : "桐乡市",
			"pid" : "385"
		}, {
			"id" : "3254",
			"name" : "海盐县",
			"pid" : "385"
		} ],
		"name" : "嘉兴",
		"pid" : "31"
	}, {
		"id" : "386",
		"sub" : [ {
			"id" : "3255",
			"name" : "婺城区",
			"pid" : "386"
		}, {
			"id" : "3256",
			"name" : "金东区",
			"pid" : "386"
		}, {
			"id" : "3257",
			"name" : "兰溪市",
			"pid" : "386"
		}, {
			"id" : "3258",
			"name" : "市区",
			"pid" : "386"
		}, {
			"id" : "3259",
			"name" : "佛堂镇",
			"pid" : "386"
		}, {
			"id" : "3260",
			"name" : "上溪镇",
			"pid" : "386"
		}, {
			"id" : "3261",
			"name" : "义亭镇",
			"pid" : "386"
		}, {
			"id" : "3262",
			"name" : "大陈镇",
			"pid" : "386"
		}, {
			"id" : "3263",
			"name" : "苏溪镇",
			"pid" : "386"
		}, {
			"id" : "3264",
			"name" : "赤岸镇",
			"pid" : "386"
		}, {
			"id" : "3265",
			"name" : "东阳市",
			"pid" : "386"
		}, {
			"id" : "3266",
			"name" : "永康市",
			"pid" : "386"
		}, {
			"id" : "3267",
			"name" : "武义县",
			"pid" : "386"
		}, {
			"id" : "3268",
			"name" : "浦江县",
			"pid" : "386"
		}, {
			"id" : "3269",
			"name" : "磐安县",
			"pid" : "386"
		} ],
		"name" : "金华",
		"pid" : "31"
	}, {
		"id" : "387",
		"sub" : [ {
			"id" : "3270",
			"name" : "莲都区",
			"pid" : "387"
		}, {
			"id" : "3271",
			"name" : "龙泉市",
			"pid" : "387"
		}, {
			"id" : "3272",
			"name" : "青田县",
			"pid" : "387"
		}, {
			"id" : "3273",
			"name" : "缙云县",
			"pid" : "387"
		}, {
			"id" : "3274",
			"name" : "遂昌县",
			"pid" : "387"
		}, {
			"id" : "3275",
			"name" : "松阳县",
			"pid" : "387"
		}, {
			"id" : "3276",
			"name" : "云和县",
			"pid" : "387"
		}, {
			"id" : "3277",
			"name" : "庆元县",
			"pid" : "387"
		}, {
			"id" : "3278",
			"name" : "景宁",
			"pid" : "387"
		} ],
		"name" : "丽水",
		"pid" : "31"
	}, {
		"id" : "388",
		"sub" : [ {
			"id" : "3279",
			"name" : "海曙区",
			"pid" : "388"
		}, {
			"id" : "3280",
			"name" : "江东区",
			"pid" : "388"
		}, {
			"id" : "3281",
			"name" : "江北区",
			"pid" : "388"
		}, {
			"id" : "3282",
			"name" : "镇海区",
			"pid" : "388"
		}, {
			"id" : "3283",
			"name" : "北仑区",
			"pid" : "388"
		}, {
			"id" : "3284",
			"name" : "鄞州区",
			"pid" : "388"
		}, {
			"id" : "3285",
			"name" : "余姚市",
			"pid" : "388"
		}, {
			"id" : "3286",
			"name" : "慈溪市",
			"pid" : "388"
		}, {
			"id" : "3287",
			"name" : "奉化市",
			"pid" : "388"
		}, {
			"id" : "3288",
			"name" : "象山县",
			"pid" : "388"
		}, {
			"id" : "3289",
			"name" : "宁海县",
			"pid" : "388"
		} ],
		"name" : "宁波",
		"pid" : "31"
	}, {
		"id" : "389",
		"sub" : [ {
			"id" : "3290",
			"name" : "越城区",
			"pid" : "389"
		}, {
			"id" : "3291",
			"name" : "上虞市",
			"pid" : "389"
		}, {
			"id" : "3292",
			"name" : "嵊州市",
			"pid" : "389"
		}, {
			"id" : "3293",
			"name" : "绍兴县",
			"pid" : "389"
		}, {
			"id" : "3294",
			"name" : "新昌县",
			"pid" : "389"
		}, {
			"id" : "3295",
			"name" : "诸暨市",
			"pid" : "389"
		} ],
		"name" : "绍兴",
		"pid" : "31"
	}, {
		"id" : "390",
		"sub" : [ {
			"id" : "3296",
			"name" : "椒江区",
			"pid" : "390"
		}, {
			"id" : "3297",
			"name" : "黄岩区",
			"pid" : "390"
		}, {
			"id" : "3298",
			"name" : "路桥区",
			"pid" : "390"
		}, {
			"id" : "3299",
			"name" : "温岭市",
			"pid" : "390"
		}, {
			"id" : "3300",
			"name" : "临海市",
			"pid" : "390"
		}, {
			"id" : "3301",
			"name" : "玉环县",
			"pid" : "390"
		}, {
			"id" : "3302",
			"name" : "三门县",
			"pid" : "390"
		}, {
			"id" : "3303",
			"name" : "天台县",
			"pid" : "390"
		}, {
			"id" : "3304",
			"name" : "仙居县",
			"pid" : "390"
		} ],
		"name" : "台州",
		"pid" : "31"
	}, {
		"id" : "391",
		"sub" : [ {
			"id" : "3305",
			"name" : "鹿城区",
			"pid" : "391"
		}, {
			"id" : "3306",
			"name" : "龙湾区",
			"pid" : "391"
		}, {
			"id" : "3307",
			"name" : "瓯海区",
			"pid" : "391"
		}, {
			"id" : "3308",
			"name" : "瑞安市",
			"pid" : "391"
		}, {
			"id" : "3309",
			"name" : "乐清市",
			"pid" : "391"
		}, {
			"id" : "3310",
			"name" : "洞头县",
			"pid" : "391"
		}, {
			"id" : "3311",
			"name" : "永嘉县",
			"pid" : "391"
		}, {
			"id" : "3312",
			"name" : "平阳县",
			"pid" : "391"
		}, {
			"id" : "3313",
			"name" : "苍南县",
			"pid" : "391"
		}, {
			"id" : "3314",
			"name" : "文成县",
			"pid" : "391"
		}, {
			"id" : "3315",
			"name" : "泰顺县",
			"pid" : "391"
		} ],
		"name" : "温州",
		"pid" : "31"
	}, {
		"id" : "392",
		"sub" : [ {
			"id" : "3316",
			"name" : "定海区",
			"pid" : "392"
		}, {
			"id" : "3317",
			"name" : "普陀区",
			"pid" : "392"
		}, {
			"id" : "3318",
			"name" : "岱山县",
			"pid" : "392"
		}, {
			"id" : "3319",
			"name" : "嵊泗县",
			"pid" : "392"
		} ],
		"name" : "舟山",
		"pid" : "31"
	}, {
		"id" : "393",
		"sub" : [ {
			"id" : "3320",
			"name" : "衢州市",
			"pid" : "393"
		}, {
			"id" : "3321",
			"name" : "江山市",
			"pid" : "393"
		}, {
			"id" : "3322",
			"name" : "常山县",
			"pid" : "393"
		}, {
			"id" : "3323",
			"name" : "开化县",
			"pid" : "393"
		}, {
			"id" : "3324",
			"name" : "龙游县",
			"pid" : "393"
		} ],
		"name" : "衢州",
		"pid" : "31"
	} ],
	"name" : "浙江",
	"pid" : "1"
}, {
	"id" : "32",
	"sub" : [ {
		"id" : "394",
		"sub" : [ {
			"id" : "3325",
			"name" : "合川区",
			"pid" : "394"
		}, {
			"id" : "3326",
			"name" : "江津区",
			"pid" : "394"
		}, {
			"id" : "3327",
			"name" : "南川区",
			"pid" : "394"
		}, {
			"id" : "3328",
			"name" : "永川区",
			"pid" : "394"
		}, {
			"id" : "3329",
			"name" : "南岸区",
			"pid" : "394"
		}, {
			"id" : "3330",
			"name" : "渝北区",
			"pid" : "394"
		}, {
			"id" : "3331",
			"name" : "万盛区",
			"pid" : "394"
		}, {
			"id" : "3332",
			"name" : "大渡口区",
			"pid" : "394"
		}, {
			"id" : "3333",
			"name" : "万州区",
			"pid" : "394"
		}, {
			"id" : "3334",
			"name" : "北碚区",
			"pid" : "394"
		}, {
			"id" : "3335",
			"name" : "沙坪坝区",
			"pid" : "394"
		}, {
			"id" : "3336",
			"name" : "巴南区",
			"pid" : "394"
		}, {
			"id" : "3337",
			"name" : "涪陵区",
			"pid" : "394"
		}, {
			"id" : "3338",
			"name" : "江北区",
			"pid" : "394"
		}, {
			"id" : "3339",
			"name" : "九龙坡区",
			"pid" : "394"
		}, {
			"id" : "3340",
			"name" : "渝中区",
			"pid" : "394"
		}, {
			"id" : "3341",
			"name" : "黔江开发区",
			"pid" : "394"
		}, {
			"id" : "3342",
			"name" : "长寿区",
			"pid" : "394"
		}, {
			"id" : "3343",
			"name" : "双桥区",
			"pid" : "394"
		}, {
			"id" : "3344",
			"name" : "綦江县",
			"pid" : "394"
		}, {
			"id" : "3345",
			"name" : "潼南县",
			"pid" : "394"
		}, {
			"id" : "3346",
			"name" : "铜梁县",
			"pid" : "394"
		}, {
			"id" : "3347",
			"name" : "大足县",
			"pid" : "394"
		}, {
			"id" : "3348",
			"name" : "荣昌县",
			"pid" : "394"
		}, {
			"id" : "3349",
			"name" : "璧山县",
			"pid" : "394"
		}, {
			"id" : "3350",
			"name" : "垫江县",
			"pid" : "394"
		}, {
			"id" : "3351",
			"name" : "武隆县",
			"pid" : "394"
		}, {
			"id" : "3352",
			"name" : "丰都县",
			"pid" : "394"
		}, {
			"id" : "3353",
			"name" : "城口县",
			"pid" : "394"
		}, {
			"id" : "3354",
			"name" : "梁平县",
			"pid" : "394"
		}, {
			"id" : "3355",
			"name" : "开县",
			"pid" : "394"
		}, {
			"id" : "3356",
			"name" : "巫溪县",
			"pid" : "394"
		}, {
			"id" : "3357",
			"name" : "巫山县",
			"pid" : "394"
		}, {
			"id" : "3358",
			"name" : "奉节县",
			"pid" : "394"
		}, {
			"id" : "3359",
			"name" : "云阳县",
			"pid" : "394"
		}, {
			"id" : "3360",
			"name" : "忠县",
			"pid" : "394"
		}, {
			"id" : "3361",
			"name" : "石柱",
			"pid" : "394"
		}, {
			"id" : "3362",
			"name" : "彭水",
			"pid" : "394"
		}, {
			"id" : "3363",
			"name" : "酉阳",
			"pid" : "394"
		}, {
			"id" : "3364",
			"name" : "秀山",
			"pid" : "394"
		} ],
		"name" : "重庆",
		"pid" : "32"
	} ],
	"name" : "重庆",
	"pid" : "1"
}, {
	"id" : "33",
	"sub" : [ {
		"id" : "395",
		"sub" : [ {
			"id" : "3365",
			"name" : "沙田区",
			"pid" : "395"
		}, {
			"id" : "3366",
			"name" : "东区",
			"pid" : "395"
		}, {
			"id" : "3367",
			"name" : "观塘区",
			"pid" : "395"
		}, {
			"id" : "3368",
			"name" : "黄大仙区",
			"pid" : "395"
		}, {
			"id" : "3369",
			"name" : "九龙城区",
			"pid" : "395"
		}, {
			"id" : "3370",
			"name" : "屯门区",
			"pid" : "395"
		}, {
			"id" : "3371",
			"name" : "葵青区",
			"pid" : "395"
		}, {
			"id" : "3372",
			"name" : "元朗区",
			"pid" : "395"
		}, {
			"id" : "3373",
			"name" : "深水埗区",
			"pid" : "395"
		}, {
			"id" : "3374",
			"name" : "西贡区",
			"pid" : "395"
		}, {
			"id" : "3375",
			"name" : "大埔区",
			"pid" : "395"
		}, {
			"id" : "3376",
			"name" : "湾仔区",
			"pid" : "395"
		}, {
			"id" : "3377",
			"name" : "油尖旺区",
			"pid" : "395"
		}, {
			"id" : "3378",
			"name" : "北区",
			"pid" : "395"
		}, {
			"id" : "3379",
			"name" : "南区",
			"pid" : "395"
		}, {
			"id" : "3380",
			"name" : "荃湾区",
			"pid" : "395"
		}, {
			"id" : "3381",
			"name" : "中西区",
			"pid" : "395"
		}, {
			"id" : "3382",
			"name" : "离岛区",
			"pid" : "395"
		} ],
		"name" : "香港",
		"pid" : "33"
	} ],
	"name" : "香港",
	"pid" : "1"
}, {
	"id" : "34",
	"sub" : [ {
		"id" : "396",
		"sub" : [ {
			"id" : "3383",
			"name" : "澳门",
			"pid" : "396"
		} ],
		"name" : "澳门",
		"pid" : "34"
	} ],
	"name" : "澳门",
	"pid" : "1"
}, {
	"id" : "35",
	"sub" : [ {
		"id" : "397",
		"sub" : [ {
			"id" : "3384",
			"name" : "台北",
			"pid" : "397"
		}, {
			"id" : "3385",
			"name" : "高雄",
			"pid" : "397"
		}, {
			"id" : "3386",
			"name" : "基隆",
			"pid" : "397"
		}, {
			"id" : "3387",
			"name" : "台中",
			"pid" : "397"
		}, {
			"id" : "3388",
			"name" : "台南",
			"pid" : "397"
		}, {
			"id" : "3389",
			"name" : "新竹",
			"pid" : "397"
		}, {
			"id" : "3390",
			"name" : "嘉义",
			"pid" : "397"
		}, {
			"id" : "3391",
			"name" : "宜兰县",
			"pid" : "397"
		}, {
			"id" : "3392",
			"name" : "桃园县",
			"pid" : "397"
		}, {
			"id" : "3393",
			"name" : "苗栗县",
			"pid" : "397"
		}, {
			"id" : "3394",
			"name" : "彰化县",
			"pid" : "397"
		}, {
			"id" : "3395",
			"name" : "南投县",
			"pid" : "397"
		}, {
			"id" : "3396",
			"name" : "云林县",
			"pid" : "397"
		}, {
			"id" : "3397",
			"name" : "屏东县",
			"pid" : "397"
		}, {
			"id" : "3398",
			"name" : "台东县",
			"pid" : "397"
		}, {
			"id" : "3399",
			"name" : "花莲县",
			"pid" : "397"
		}, {
			"id" : "3400",
			"name" : "澎湖县",
			"pid" : "397"
		} ],
		"name" : "台湾",
		"pid" : "35"
	} ],
	"name" : "台湾",
	"pid" : "1"
} ];

function init() {
	var _country = document.getElementById("country");
	for ( var e in list) {
		var opt_1 = new Option(list[e].name, list[e].id);
		_country.add(opt_1);
	}
}

function toProvince() {

	var _country = document.getElementById("country");
	var _province = document.getElementById("city");
	var _city = document.getElementById("children");
	var v_country = _country.value;

	_province.options.length = 1;
	_city.options.length = 1;

	for ( var e in list) {

		if (list[e].id == v_country) {

			for ( var p in list[e].sub) {
				var opt_2 = new Option(list[e].sub[p].name, list[e].sub[p].id);
				_province.add(opt_2);

			}
			break;
		}
	}
}

function toCity() {
	var _country = document.getElementById("country");
	var _province = document.getElementById("city");
	var _city = document.getElementById("children");

	var v_country = _country.value;
	var v_province = _province.value;

	// _province.options.length=1;
	_city.options.length = 1;

	for ( var e in list) {
		if (list[e].id == v_country) {
			for ( var p in list[e].sub) {
				// alert(list[e].province[p].value);
				if (list[e].sub[p].id == v_province) {
					// alert(list[e].province[p].value);
					for ( var cc in list[e].sub[p].sub) {
						var opt_3 = new Option(list[e].sub[p].sub[cc].name,
								list[e].sub[p].sub[cc].id);
						_city.add(opt_3);
					}

					return;
				}

			}
			break;
		}
	}
}

/* ##########################公用方法##begin############################ */

// 监听窗口大小变化
window.onresize = function() {
	setTimeout(domresize, 300);
};
// 改变表格和查询表单宽高
function domresize() {
	$('tt_District').datagrid('resize', {
		height : $("#body").height() - $('#search_areaUser').height() - 5,
		width : $("#body").width()
	});
	$('#search_areaUser').panel('resize', {
		width : $("#body").width()
	});
	$('#detailLoanDiv').dialog('resize', {
		height : $("#body").height() - 25,
		width : $("#body").width() - 30
	});
}

/* ##########################公用方法##end############################ */