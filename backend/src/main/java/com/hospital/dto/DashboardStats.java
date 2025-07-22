// src/main/java/com/yourcompany/hospital/dto/DashboardStats.java

package com.yourcompany.hospital.dto;

import lombok.Data;

@Data
public class DashboardStats {
    private int totalPatients;
    private int totalDoctors;
    private int todayAppointments;
    private int pendingBills;
}
