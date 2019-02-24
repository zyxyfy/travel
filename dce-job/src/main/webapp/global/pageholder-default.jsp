<%@ page contentType="text/html; charset=utf-8" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%--
参数：
pageHolderName：PageHolder在requestScope里面的名字，默认为"pageHolder"。
--%>
<%
	String pageHolderName=request.getParameter("pageHolderName");
	if(pageHolderName==null){
		pageHolderName="pageHolder";
	}
	pageContext.setAttribute("pageHolder",request.getAttribute(pageHolderName));
%>
<div>总数：${pageHolder.rowCount}
  <c:choose>
    <c:when test="${pageHolder.firstPage}">[首页] [上一页]</c:when>
    <c:otherwise>
      <c:url var="firstPage" value="">
        <c:param name="${pageHolder.pageIndexKey}" value="1"/>
        <c:param name="${pageHolder.rowCountKey}" value="${pageHolder.rowCount}"/>
      </c:url>
      <c:url var="previousPage" value="">
        <c:param name="${pageHolder.pageIndexKey}" value="${pageHolder.pageIndex-1}"/>
        <c:param name="${pageHolder.rowCountKey}" value="${pageHolder.rowCount}"/>
      </c:url>
      [<a href="${firstPage}${pageHolder.params}">首页</a>] [<a href="${previousPage}${pageHolder.params}">上一页</a>]</c:otherwise>
  </c:choose>
  <c:choose>
    <c:when test="${pageHolder.lastPage}">[下一页] [末页]</c:when>
    <c:otherwise>
      <c:url var="nextPage" value="">
        <c:param name="${pageHolder.pageIndexKey}" value="${pageHolder.pageIndex+1}"/>
        <c:param name="${pageHolder.rowCountKey}" value="${pageHolder.rowCount}"/>
      </c:url>
      <c:url var="lastPage" value="">
        <c:param name="${pageHolder.pageIndexKey}" value="${pageHolder.pageCount}"/>
        <c:param name="${pageHolder.rowCountKey}" value="${pageHolder.rowCount}"/>
      </c:url>
      [<a href="${nextPage}${pageHolder.params}">下一页</a>] [<a href="${lastPage}${pageHolder.params}">末页</a>]</c:otherwise>
  </c:choose>
  第${pageHolder.pageIndex}/${pageHolder.pageCount}页
  <input type="text" id="pageIndex" style= "width:20px;" onkeyup="this.value=this.value.replace(/\D/g,'')" onafterpaste="this.value=this.value.replace(/\D/g,'')" />
  <input type="button" value="go" onclick="var pageIndex=$('#pageIndex').val();if(!pageIndex)return false;this.disabled=true;location.href='?${pageHolder.pageIndexKey}='+pageIndex+'${pageHolder.params}'"/>
  <a href="javascript:location.reload()">刷新</a></div>
