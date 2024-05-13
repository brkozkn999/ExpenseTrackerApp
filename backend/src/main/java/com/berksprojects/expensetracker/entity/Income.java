package com.berksprojects.expensetracker.entity;

import com.berksprojects.expensetracker.dto.IncomeDto;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.Data;

import java.time.LocalDate;

@Data
@Entity
public class Income {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String title;
    private Integer amount;
    private LocalDate date;
    private String category;
    private String description;

    public IncomeDto getIncomeDto() {
        IncomeDto incomeDto = new IncomeDto();
        incomeDto.setId(id);
        incomeDto.setTitle(title);
        incomeDto.setAmount(amount);
        incomeDto.setCategory(category);
        incomeDto.setDescription(description);
        incomeDto.setDate(date);
        return incomeDto;
    }
}
