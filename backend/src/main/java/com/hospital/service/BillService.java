package com.hospital.service;

import com.hospital.entity.Bill;
import com.hospital.repository.BillRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class BillService {

    private final BillRepository billRepository;

    public BillService(BillRepository billRepository) {
        this.billRepository = billRepository;
    }

    public List<Bill> getAllBills() {
        return billRepository.findAll();
    }

    public Optional<Bill> getBillById(Long id) {
        return billRepository.findById(id);
    }

    public Bill createBill(Bill bill) {
        return billRepository.save(bill);
    }

    public Bill updateBill(Long id, Bill updatedBill) {
        return billRepository.findById(id)
            .map(existing -> {
                existing.setPatient(updatedBill.getPatient());
                existing.setAmount(updatedBill.getAmount());
                existing.setStatus(updatedBill.getStatus());
                existing.setDate(updatedBill.getDate());
                existing.setDescription(updatedBill.getDescription());
                return billRepository.save(existing);
            })
            .orElseThrow(() -> new RuntimeException("Bill not found"));
    }

    public void deleteBill(Long id) {
        billRepository.deleteById(id);
    }
}
