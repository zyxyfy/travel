<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
	<head>
		<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
		<meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1" />
		<meta name="viewport" content="width=device-width, initial-scale=1.0, user-scalable=no" />
		<meta name="format-detection" content="telephone=no">
		<meta name="apple-mobile-web-app-capable" content="yes" />
		<meta name="apple-mobile-web-app-status-bar-style" content="black" />
		<meta name="keywords" content="" />
		<meta name="description" content="" />
		<title>扫描支付</title>
		
<link rel="shortcut icon" href="/favicon.ico" type="image/x-icon" />
<link rel="stylesheet" type="text/css" href="<c:url value ='/res/css/modal.css' />">

<style type="text/css">
	html {
		font-size: 100%;
		height: 100%;
		word-break: break-all;
	}

	body {
		font-size: 14px;
		font-family: Helvetica;
		margin: 0 auto;
		max-width: 540px;
		color: #666;
		background: #fff;
		-webkit-tap-highlight-color: transparent;
		-webkit-text-size-adjust: none;
		cursor: pointer;
	}
	
	* {
		margin: 0;
		padding: 0;
	}

	.header, .navbar {
		position: fixed;
		left: 0;
		right: 0;
		z-index: 8;
		border: 0 solid #d0cac2;
	}

	.header .title {
		text-align: center;
		font-size: 18px;
		color: #48423b;
		position: absolute;
		left: 75px;
		right: 75px;
		top: 15px;
	}
	
	.header {
		top: 0;
		background: #fff;
		height: 20px;
		line-height: 20px;
		padding: 15px 20px 13px;
		border-bottom-width: .5pt;
		border: 1px solid #EDEFF2;
    }

	content .i-back, .header .i-back {
		width: 9px;
		height: 18px;
		background-position: 0 0;
		margin-top: 1px;
	}

	.content .icon, .header .icon {
		background: url("");
		background-size: auto 18px;
	}
	.icon {
		display: inline-block;
		vertical-align: top;
	}
	em, i {
		font-style: normal;
	}

	.header .a-fl {
		float: left;
		font-size: 1pc;
		color: #676157;
	}
	a {
		color: inherit;
		text-decoration: none;
	}

	a:-webkit-any-link {
		color: -webkit-link;
		cursor: pointer;
		text-decoration: underline;
	}

	.simg{background-size: 100% auto;}
    .simg:before{content: "";
                            display: block;
                            padding-top: 15%;}
				
	.rec_btn {
		width: 90%;
		/* background: #F7931D; */
		border-radius: 4px;
		line-height: 3.5rem;
		margin: 0px auto 0 auto;
		text-align: center;
		font-size: 1.2rem;
		color: #fff;
		box-shadow: 1px 8px 50px #F7931D, 1px 1px 1px #fff;
	}
	.rec_btn span:nth-child(1) {
		float: left;
		background: #F7931D;
		width: 48%;
	}
	
	.rec_btn span:nth-child(2) {
		float: right;
		background: #F7931D;
		width: 48%;
	}

</style>
</head>
	
<body>
	
		<div class="header">
			<a class="a-fl" href="javascript:;"><i class="icon i-back"></i></a>
			<p class="title">扫描支付</p>
		</div>
		<div id="shareImg" class="simg">
			<img style="vertical-align: middle;display: inline-block;margin: auto;width: 100%;" src="<c:url value ='/barcode/paybarcode.do' />?userId=${userId}&orderId=${orderId}"></img>
			<div class="rec_btn" style="position:fixed;bottom:0; width:100%;background: #F7931D;">
	             	请用微信扫描支付
             </div>
		</div>
		
	</body>
	
</html>