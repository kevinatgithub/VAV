package com.hino.dev.dashboardupdater;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.TimeZone;

public class WipManufacturingOrder {

    private String chassisNumber = "";
    private String timeIn = "";
    private Integer workTime = 0;
    private Integer remainingTime = 0;
    private Boolean isPending = false;
    private Boolean isMc = false;
    private String moNumber = "";
    private String moDate = "";
    private String dealer = "";
    private String customer = "";
    private String chassisModel = "";
    private Integer moQuantity = 0;
    private Boolean finishedNormalEntry = false;
    private FileAttachment[] fileAttachments;
    private MC mcs;

    public WipManufacturingOrder(String chassisNumber, String timeIn, Integer workTime, Integer remainingTime, Boolean isPending, Boolean isMc, String moNumber, String moDate, String dealer, String customer, String chassisModel, Integer moQuantity, Boolean finishedNormalEntry, FileAttachment[] fileAttachments, MC mcs) {
        this.chassisNumber = chassisNumber;
        this.timeIn = timeIn;
        this.workTime = workTime;
        this.remainingTime = remainingTime;
        this.isPending = isPending;
        this.isMc = isMc;
        this.moNumber = moNumber;
        this.moDate = moDate;
        this.dealer = dealer;
        this.customer = customer;
        this.chassisModel = chassisModel;
        this.moQuantity = moQuantity;
        this.finishedNormalEntry = finishedNormalEntry;
        this.fileAttachments = fileAttachments;
        this.mcs = mcs;
    }

    public String getChassisNumber() {
        return chassisNumber;
    }

    public String getTimeIn() {
        return timeIn;
    }

    public Integer getWorkTime() {
        return workTime;
    }

    public Integer getRemainingTime() {
        return remainingTime;
    }

    public Boolean getPending() {
        return isPending;
    }

    public Boolean getMc() {
        return isMc;
    }

    public String getMoNumber() {
        return moNumber;
    }

    public String getMoDate() {
        return moDate;
    }

    public String getDealer() {
        return dealer;
    }

    public String getCustomer() {
        return customer;
    }

    public String getChassisModel() {
        return chassisModel;
    }

    public Integer getMoQuantity() {
        return moQuantity;
    }

    public Boolean getFinishedNormalEntry() {
        return finishedNormalEntry;
    }

    public FileAttachment[] getFileAttachments() {
        return fileAttachments;
    }

    public MC getMcs() {
        return mcs;
    }

    private Date getDateValueOfTimeIn(){
        SimpleDateFormat format = new SimpleDateFormat("yyyy-MM-dd'T'HH:mm:ss.SSS");
        Date date = null;
        if(this.timeIn != null){
            try {
                date =format.parse(this.timeIn);
            } catch (ParseException e) {
                e.printStackTrace();
            }
        }
        return date;
    }

    public long convertTimeInToMinutes(){
        TimeZone.setDefault(TimeZone.getTimeZone("UTC"));
        Date timeIn = this.getDateValueOfTimeIn();
        if(timeIn != null){
            Date now = new Date();
            
            long diff = now.getTime() - timeIn.getTime();
            long seconds = diff/1000;
            return seconds/ 60;
        }
        return 0;
    }

    public Date makeMoDateStringAsDate(){
        SimpleDateFormat format = new SimpleDateFormat("yyyy-MM-dd'T'HH:mm:ss.SSS");
        Date date = null;
        if(this.moDate != null){
            try {
                date =format.parse(this.moDate);
            } catch (ParseException e) {
                e.printStackTrace();
            }
        }
        return date;
    }
}
