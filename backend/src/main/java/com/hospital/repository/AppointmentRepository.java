package com.hospital.repository;

import com.hospital.entity.Appointment;
import com.hospital.entity.Patient;
import com.hospital.entity.Doctor;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import org.springframework.stereotype.Repository;
import java.time.LocalDate;
import java.util.List;

@Repository
public interface AppointmentRepository extends JpaRepository<Appointment, Long> {
    List<Appointment> findByPatient(Patient patient);
    List<Appointment> findByDoctor(Doctor doctor);
    List<Appointment> findByAppointmentDate(LocalDate date);
    List<Appointment> findByPatientAndAppointmentDateAfter(Patient patient, LocalDate date);
    List<Appointment> findByDoctorAndAppointmentDateAfter(Doctor doctor, LocalDate date);

    // ✅ New: Count how many appointments happen today
    long countByAppointmentDate(LocalDate date);

    // ✅ New: Get appointment trend data for last 7 days
    @Query("SELECT a.appointmentDate, COUNT(a) FROM Appointment a WHERE a.appointmentDate >= :startDate GROUP BY a.appointmentDate ORDER BY a.appointmentDate ASC")
    List<Object[]> findLast7DaysTrend(@Param("startDate") LocalDate startDate);
}
