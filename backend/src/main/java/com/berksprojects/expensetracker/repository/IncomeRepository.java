package com.berksprojects.expensetracker.repository;

import com.berksprojects.expensetracker.entity.Expense;
import com.berksprojects.expensetracker.entity.Income;
import org.springframework.cglib.core.Local;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@Repository
public interface IncomeRepository extends JpaRepository<Income, Long> {
    List<Income> findByDateBetween(LocalDate startDate, LocalDate endDate);

    @Query("SELECT SUM(i.amount) FROM Income i")
    Double sumAllAmounts();

    Optional<Income> findFirstByOrderByDateDesc();

    List<Income> findByDateBetweenOrderByDateAsc(LocalDate startDate, LocalDate endDate);
}
