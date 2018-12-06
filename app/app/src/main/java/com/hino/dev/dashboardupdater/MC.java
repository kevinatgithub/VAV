package com.hino.dev.dashboardupdater;

public class MC {

    private String id;
    private String sectionId;
    private String chassisNumber;
    private String remarks;
    private Boolean isResolved;
    private String dateTimeCreated;
    private String createdBy;

    public MC(String id, String sectionId, String chassisNumber, String remarks, Boolean isResolved, String dateTimeCreated, String createdBy) {
        this.id = id;
        this.sectionId = sectionId;
        this.chassisNumber = chassisNumber;
        this.remarks = remarks;
        this.isResolved = isResolved;
        this.dateTimeCreated = dateTimeCreated;
        this.createdBy = createdBy;
    }

    public String getId() {
        return id;
    }

    public String getSectionId() {
        return sectionId;
    }

    public String getChassisNumber() {
        return chassisNumber;
    }

    public String getRemarks() {
        return remarks;
    }

    public Boolean getResolved() {
        return isResolved;
    }

    public String getDateTimeCreated() {
        return dateTimeCreated;
    }

    public String getCreatedBy() {
        return createdBy;
    }
}
