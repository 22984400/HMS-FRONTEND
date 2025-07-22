// src/main/java/com/yourcompany/hospital/service/DashboardService.java

package com.yourcompany.hospital.service;

import com.yourcompany.hospital.dto.DashboardStats;
import org.springframework.stereotype.Service;

@Service
public class DashboardService {

    public DashboardStats getStats() {
        DashboardStats stats = new DashboardStats();
        stats.setTotalPatients(125); // replace with actual DB call
        stats.setTotalDoctors(34);   // replace with actual DB call
        stats.setTodayAppointments(12); // logic for today's appointments
        stats.setPendingBills(8);    // logic for unpaid bills
        return stats;
    }
}
