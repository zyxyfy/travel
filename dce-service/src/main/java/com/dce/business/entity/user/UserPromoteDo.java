package com.dce.business.entity.user;

public class UserPromoteDo {
	
	public static String getUserLevelName(String userlevel) {
		if(null == userlevel) {
			return "";
		}
		
		if(userlevel.equals("0")){
			return "普通用戶";
		}else if(userlevel.equals("1")){
			return "VIP";
		}else if(userlevel.equals("2")){
			return "商家";
		}else if (userlevel.equals("3")){
			return "社区合伙人";
		}else if (userlevel.equals("4")){
			return "城市合伙人用戶";
		}else if (userlevel.equals("5")){
			return "省级合伙人";
		}else if (userlevel.equals("6")){
			return "市场股东";
		}else if (userlevel.equals("7")){
			return "董事";
		}
		return "";
	}
	
	
	
    /**
     *
     * This field was generated by MyBatis Generator.
     * This field corresponds to the database column ct_user_promote.promote_id
     *
     * @mbg.generated Fri Aug 24 10:29:09 CST 2018
     */
    private Integer promoteId;

    /**
     *
     * This field was generated by MyBatis Generator.
     * This field corresponds to the database column ct_user_promote.user_level
     *
     * @mbg.generated Fri Aug 24 10:29:09 CST 2018
     */
    private String userLevel;

    /**
     *
     * This field was generated by MyBatis Generator.
     * This field corresponds to the database column ct_user_promote.promote_level
     *
     * @mbg.generated Fri Aug 24 10:29:09 CST 2018
     */
    private String promoteLevel;

    /**
     *
     * This field was generated by MyBatis Generator.
     * This field corresponds to the database column ct_user_promote.min_qty
     *
     * @mbg.generated Fri Aug 24 10:29:09 CST 2018
     */
    private Integer minQty;

    /**
     *
     * This field was generated by MyBatis Generator.
     * This field corresponds to the database column ct_user_promote.max_qty
     *
     * @mbg.generated Fri Aug 24 10:29:09 CST 2018
     */
    private Integer maxQty;

    /**
     * This method was generated by MyBatis Generator.
     * This method returns the value of the database column ct_user_promote.promote_id
     *
     * @return the value of ct_user_promote.promote_id
     *
     * @mbg.generated Fri Aug 24 10:29:09 CST 2018
     */
    public Integer getPromoteId() {
        return promoteId;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method sets the value of the database column ct_user_promote.promote_id
     *
     * @param promoteId the value for ct_user_promote.promote_id
     *
     * @mbg.generated Fri Aug 24 10:29:09 CST 2018
     */
    public void setPromoteId(Integer promoteId) {
        this.promoteId = promoteId;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method returns the value of the database column ct_user_promote.user_level
     *
     * @return the value of ct_user_promote.user_level
     *
     * @mbg.generated Fri Aug 24 10:29:09 CST 2018
     */
    public String getUserLevel() {
        return userLevel;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method sets the value of the database column ct_user_promote.user_level
     *
     * @param userLevel the value for ct_user_promote.user_level
     *
     * @mbg.generated Fri Aug 24 10:29:09 CST 2018
     */
    public void setUserLevel(String userLevel) {
        this.userLevel = userLevel;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method returns the value of the database column ct_user_promote.promote_level
     *
     * @return the value of ct_user_promote.promote_level
     *
     * @mbg.generated Fri Aug 24 10:29:09 CST 2018
     */
    public String getPromoteLevel() {
        return promoteLevel;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method sets the value of the database column ct_user_promote.promote_level
     *
     * @param promoteLevel the value for ct_user_promote.promote_level
     *
     * @mbg.generated Fri Aug 24 10:29:09 CST 2018
     */
    public void setPromoteLevel(String promoteLevel) {
        this.promoteLevel = promoteLevel;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method returns the value of the database column ct_user_promote.min_qty
     *
     * @return the value of ct_user_promote.min_qty
     *
     * @mbg.generated Fri Aug 24 10:29:09 CST 2018
     */
    public Integer getMinQty() {
        return minQty;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method sets the value of the database column ct_user_promote.min_qty
     *
     * @param minQty the value for ct_user_promote.min_qty
     *
     * @mbg.generated Fri Aug 24 10:29:09 CST 2018
     */
    public void setMinQty(Integer minQty) {
        this.minQty = minQty;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method returns the value of the database column ct_user_promote.max_qty
     *
     * @return the value of ct_user_promote.max_qty
     *
     * @mbg.generated Fri Aug 24 10:29:09 CST 2018
     */
    public Integer getMaxQty() {
        return maxQty;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method sets the value of the database column ct_user_promote.max_qty
     *
     * @param maxQty the value for ct_user_promote.max_qty
     *
     * @mbg.generated Fri Aug 24 10:29:09 CST 2018
     */
    public void setMaxQty(Integer maxQty) {
        this.maxQty = maxQty;
    }
}