package com.dce.business.actions.common;

import javax.servlet.http.HttpServletRequest;

import org.apache.commons.lang3.StringUtils;
import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;

import com.dce.business.common.token.TokenUtil;
import com.dce.business.common.util.Constants;
import com.dce.business.common.util.StringUtil;
import com.dce.business.entity.user.UserDo;

public class BaseController {
	
	
	public  long rows = 10;
	public  long pageNum = 1;
    protected String getString(String name) {
        HttpServletRequest request = ((ServletRequestAttributes) RequestContextHolder.getRequestAttributes()).getRequest();
        String paraVal = request.getParameter(name);
        if (StringUtils.isNotBlank(paraVal)) {
            paraVal = StringUtil.scriptingFilter(StringUtil.FilteSqlInAndScript(paraVal));
            if ("null".equalsIgnoreCase(paraVal) || "undefined".equalsIgnoreCase(paraVal)) {
                return "";
            }
            //反编码
//            try {
//            	System.out.println("=====================:" + paraVal );
//    			paraVal = URLDecoder.decode(paraVal,"UTF-8");
//    		} catch (UnsupportedEncodingException e) {
//    			// TODO Auto-generated catch block
//    			e.printStackTrace();
//    		}
        }
        
      
        return paraVal;
    }

    protected Integer getUserId() {
        HttpServletRequest request = ((ServletRequestAttributes) RequestContextHolder.getRequestAttributes()).getRequest();
        UserDo loginUser = getUserFromSession();
        if(loginUser != null ) {
        	return loginUser.getId();
        }
        
        String userId =request.getParameter(TokenUtil.USER_ID);
        if(StringUtils.isNotBlank(userId)) {
        	return Integer.valueOf(userId);
        }
        return null;
    }
    
    protected UserDo getUserFromSession() {
        HttpServletRequest request = ((ServletRequestAttributes) RequestContextHolder.getRequestAttributes()).getRequest();
        Object  user =   request.getSession().getAttribute(Constants.LOGIN_USER);
        if(user != null) {
        	return (UserDo) user;
        }
        return null;
    }
    
    protected HttpServletRequest getRequest() {
        HttpServletRequest request = ((ServletRequestAttributes) RequestContextHolder.getRequestAttributes()).getRequest();
        return request;
    }
    
    protected final String getIpAddr() {
        HttpServletRequest request = getRequest();
        if (request == null) {
            return "";
        }

        String ipaddr = request.getHeader("Cdn-Src-Ip");
        if (StringUtils.isNotBlank(ipaddr)) {
            return ipaddr;
        }

        ipaddr = request.getHeader("X-Real-IP");
        if (StringUtils.isNotBlank(ipaddr)) {
            return ipaddr;
        }

        ipaddr = request.getHeader("HTTP_X_FORWARDED_FOR");
        if (StringUtils.isBlank(ipaddr)) {
            ipaddr = request.getRemoteAddr();
        }
        return ipaddr;
    }
}
