package com.hospital.repository;

import com.hospital.entity.Bill;
import com.hospital.entity.Patient;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface BillRepository extends JpaRepository<Bill, Long> {
    List<Bill> findByPatient(Patient patient);
    List<Bill> findByStatus(String status); // e.g., PAID, PENDING
}
