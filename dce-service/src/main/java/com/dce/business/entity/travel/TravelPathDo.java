package com.dce.business.entity.travel;

import java.math.BigDecimal;

public class TravelPathDo {
	
	
	private String bannerImg;  //路线banner图片
	private String detailImg; //路线详情图片
	private String iconImg ;  //路线列表图片
	private String outline;   //路线概要
	private String detailUrl;  //详情外部url
	private Integer starLevel; //路线级别 星级
	private BigDecimal price;  //路线价格
	private Float score; //路线评分
	
	
	
	
    public String getBannerImg() {
		return bannerImg;
	}

	public void setBannerImg(String bannerImg) {
		this.bannerImg = bannerImg;
	}

	public String getDetailImg() {
		return detailImg;
	}

	public void setDetailImg(String detailImg) {
		this.detailImg = detailImg;
	}

	public String getIconImg() {
		return iconImg;
	}

	public void setIconImg(String iconImg) {
		this.iconImg = iconImg;
	}

	public String getOutline() {
		return outline;
	}

	public void setOutline(String outline) {
		this.outline = outline;
	}

	public String getDetailUrl() {
		return detailUrl;
	}

	public void setDetailUrl(String detailUrl) {
		this.detailUrl = detailUrl;
	}

	public Integer getStarLevel() {
		return starLevel;
	}

	public void setStarLevel(Integer starLevel) {
		this.starLevel = starLevel;
	}

	public BigDecimal getPrice() {
		return price;
	}

	public void setPrice(BigDecimal price) {
		this.price = price;
	}

	public Float getScore() {
		return score;
	}

	public void setScore(Float score) {
		this.score = score;
	}

	/**
     *
     * This field was generated by MyBatis Generator.
     * This field corresponds to the database column ct_travel_path.pathid
     *
     * @mbg.generated Tue Aug 07 14:21:23 CST 2018
     */
    private Integer pathid;

    /**
     *
     * This field was generated by MyBatis Generator.
     * This field corresponds to the database column ct_travel_path.linename
     *
     * @mbg.generated Tue Aug 07 14:21:23 CST 2018
     */
    private String linename;
    

    /**
     *
     * This field was generated by MyBatis Generator.
     * This field corresponds to the database column ct_travel_path.state
     *
     * @mbg.generated Tue Aug 07 14:21:23 CST 2018
     */
    private Integer state;

    /**
     *
     * This field was generated by MyBatis Generator.
     * This field corresponds to the database column ct_travel_path.remake
     *
     * @mbg.generated Tue Aug 07 14:21:23 CST 2018
     */
    private String remake;

    /**
     * This method was generated by MyBatis Generator.
     * This method returns the value of the database column ct_travel_path.pathid
     *
     * @return the value of ct_travel_path.pathid
     *
     * @mbg.generated Tue Aug 07 14:21:23 CST 2018
     */
    public Integer getPathid() {
        return pathid;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method sets the value of the database column ct_travel_path.pathid
     *
     * @param pathid the value for ct_travel_path.pathid
     *
     * @mbg.generated Tue Aug 07 14:21:23 CST 2018
     */
    public void setPathid(Integer pathid) {
        this.pathid = pathid;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method returns the value of the database column ct_travel_path.linename
     *
     * @return the value of ct_travel_path.linename
     *
     * @mbg.generated Tue Aug 07 14:21:23 CST 2018
     */
    public String getLinename() {
        return linename;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method sets the value of the database column ct_travel_path.linename
     *
     * @param linename the value for ct_travel_path.linename
     *
     * @mbg.generated Tue Aug 07 14:21:23 CST 2018
     */
    public void setLinename(String linename) {
        this.linename = linename;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method returns the value of the database column ct_travel_path.state
     *
     * @return the value of ct_travel_path.state
     *
     * @mbg.generated Tue Aug 07 14:21:23 CST 2018
     */
    public Integer getState() {
        return state;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method sets the value of the database column ct_travel_path.state
     *
     * @param state the value for ct_travel_path.state
     *
     * @mbg.generated Tue Aug 07 14:21:23 CST 2018
     */
    public void setState(Integer state) {
        this.state = state;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method returns the value of the database column ct_travel_path.remake
     *
     * @return the value of ct_travel_path.remake
     *
     * @mbg.generated Tue Aug 07 14:21:23 CST 2018
     */
    public String getRemake() {
        return remake;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method sets the value of the database column ct_travel_path.remake
     *
     * @param remake the value for ct_travel_path.remake
     *
     * @mbg.generated Tue Aug 07 14:21:23 CST 2018
     */
    public void setRemake(String remake) {
        this.remake = remake;
    }

	@Override
	public String toString() {
		return "TravelPathDo [bannerImg=" + bannerImg + ", detailImg=" + detailImg + ", iconImg=" + iconImg
				+ ", outline=" + outline + ", detailUrl=" + detailUrl + ", starLevel=" + starLevel + ", price=" + price
				+ ", score=" + score + ", pathid=" + pathid + ", linename=" + linename + ", state=" + state
				+ ", remake=" + remake + "]";
	}
    
}