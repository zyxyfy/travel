<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/fmt" prefix="fmt"%>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
<head>
<title>编辑商品</title>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<meta http-equiv="Cache-Control" content="no-cache" />
<jsp:include page="../common_easyui_cus.jsp"></jsp:include>
</head>
<body>

	<!-- 内容 -->
	<form id="editGoodsForm" method="post" enctype="multipart/form-data"
		action="<c:url value='goods/saveGoods.html'/>">
		<div>

			<table width="100%" border="0" align="center" cellpadding="3">
				<input type="hidden" id="goodsId" name="goodsId"
					value="${goods.goodsId}" />
				<tr>
					<td align="right"><label for="name">商品名称：</label></td>
					<td><input type="text" name="title" id="title"
						value="${goods.title}" /></td>
				</tr>
				<tr>
					<td align="right"><label for="name">列表小图：</label></td>
					<td>
						<input type="file" id="goodsImgFileObj" name="goodsImgFileObj"/>
						<input type="button" value="上传" id="btn_upload" onclick="ajaxFileUpload('goodsImgFileObj','goodsImg');" />
						<input type="hidden" id="goodsImg" name="goodsImg" value="${goods.goodsImg}"/>
						<input type="button" onclick="cleanImg('goodsImg');" value="清除原图"/>
					</td>
				</tr>
				
				<tr>
					<td align="right"><label for="name">详情banner图：</label></td>
					<td>
						<input type="file" id="goodsBannerFileObj" name="goodsBannerFileObj"/>
						<input type="button" value="上传" id="btn_upload" onclick="ajaxFileUpload('goodsBannerFileObj','goodsBanner');" />
						<input type="hidden" id="goodsBanner" name="goodsBanner" value="${goods.goodsBanner}"/>
						<input type="button" onclick="cleanImg('goodsBanner');" value="清除原图"/>
					</td>
				</tr>
				
				<tr>
					<td align="right"><label for="name">详情图：</label></td>
					<td>
						<input type="file" id="goodsDetailImgFileObj" name="goodsDetailImgFileObj"/>
						<input type="button" value="上传" id="btn_upload" onclick="ajaxFileUpload('goodsDetailImgFileObj','goodsDetailImg');" />
						<input type="hidden" id="goodsDetailImg" name="goodsDetailImg" value="${goods.goodsDetailImg}"/>
						<input type="button" onclick="cleanImg('goodsDetailImg');" value="清除原图"/>
					</td>
				</tr>
				
				<tr>
					<td align="right"><label for="name">商品单位：</label></td>
					<td><input type="text" id="goodsUnit" name="goodsUnit"
						value="${goods.goodsUnit}" /></td>
				</tr>

				<tr>
					<td align="right"><label for="name">商品价格：</label></td>
					<td><input type="text" id="shopPrice" name="shopPrice"
						value="${goods.shopPrice}" /></td>
				</tr>
				<tr>
					<td align="right"><label for="name">商品内容：</label></td>
					<td><input type="text" id="goodsDesc" name="goodsDesc"
						value="${goods.goodsDesc}" /></td>
				</tr>
				
				<tr>
					<td align="right"><label for="name">商品利润：</label></td>
					<td><input type="text" id="profit" name="profit"
						value="${goods.profit}" /></td>
				</tr>
				<tr>
					<td align="right"><label for="name">商品已售数量：</label></td>
					<td><input type="text" id="saleCount" name="saleCount"
						value="${goods.saleCount}" /></td>
				</tr>
				<tr>
					<td align="right"><label for="name">商品详情展示页面地址：</label></td>
					<td><input type="text" id="detailLink" name="detailLink"
						value="${goods.detailLink}" /></td>
				</tr>
				<tr>
					<td align="right"><label for="name">商品类别：</label></td>
					<td>
					<select id="goodsFlag" class="easyui-combobox"
						style="width: 150px;">
							<option value="1"
								<c:if test="${goods.goodsFlag==1}">selected="selected"</c:if>>旅游卡</option>
							<option value="2"
								<c:if test="${goods.goodsFlag==2}">selected="selected"</c:if>>爆款商品</option>
							<option value="3"
								<c:if test="${goods.goodsFlag==3}">selected="selected"</c:if>>常规商品</option>
							<option value="4"
								<c:if test="${goods.goodsFlag==4}">selected="selected"</c:if>>旅游路线</option>
					</select>
					</td>
				</tr>
				<tr>
					<td align="right"><label for="name">商品类别：</label></td>
					<td>
					<select id="shopCatId1" class="easyui-combobox"
						style="width: 150px;">
							<option value="1"
								<c:if test="${goods.shopCatId1==1}">selected="selected"</c:if>>积分商品</option>
							<option value="2"
								<c:if test="${goods.shopCatId1==2}">selected="selected"</c:if>>会员商品</option>
					</select>
					</td>
				</tr>
				
				<tr>
					<td align="right"><label for="name">商品上架状态：</label></td>
					<td><select id="status" class="easyui-combobox"
						style="width: 150px;">
							<option value="0"
								<c:if test="${goods.status==0}">selected="selected"</c:if>>未上架</option>
							<option value="1"
								<c:if test="${goods.status==1}">selected="selected"</c:if>>已上架</option>
					</select></td>
				</tr>
			</table>
		</div>
	</form>
<script type="text/javascript"	src="<c:url value='/js/ajax-fileupload.js?'/>v=${jsversion}"></script>
	
<script type="text/javascript">
 function cleanImg(imgFieldName){
	 $("#"+imgFieldName).val("");
	 alert("已清除");
 }

 function ajaxFileUpload(fileInputObj,urlObj) {
       $.ajaxFileUpload
       (
           {
               url: '<c:url value="/upload/imgUpload.html"/>', //用于文件上传的服务器端请求地址
               secureuri: false, //是否需要安全协议，一般设置为false
               fileElementId: fileInputObj, //文件上传域的ID
               dataType: 'json', //返回值类型 一般设置为json
               async:false,
               success: function (data, status)  //服务器成功响应处理函数
               {
                   var urlVal = $("#"+urlObj).val();
                   if(urlVal == ""){
                   	urlVal = data.url;
                   }else{
                    urlVal = urlVal+","+data.url;
                   }
                   $("#"+urlObj).val(urlVal);
                   $("#imgDiv").append("<img style='width: 300px; height: 300px; align: center' src='"+data.url+"'>");
                   if (typeof (data.error) != 'undefined') {
                       if (data.error != '') {
                           alert(data.error);
                       } else {
                           alert(data.message);
                       }
                   }
               },
               error: function (data, status, e)//服务器响应失败处理函数
               {
                   alert(e);
               }
           }
       )
       return false;
  }
</script>
	
	<div align="center" id="imgDiv">
		<c:if test="${not empty goods.goodsImg }">
			<img style="width: 300px; height: 300px; align: center" id="img"
				src="${goods.goodsImg }">
		</c:if>
	</div>
</body>

</html>