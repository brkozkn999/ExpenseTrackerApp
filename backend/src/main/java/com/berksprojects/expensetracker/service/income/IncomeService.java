package com.berksprojects.expensetracker.service.income;

import com.berksprojects.expensetracker.dto.IncomeDto;
import com.berksprojects.expensetracker.entity.Income;

import java.util.List;

public interface IncomeService {
    Income postIncome(IncomeDto incomeDto);

    List<IncomeDto> getAllIncomes();

    Income updateIncome(Long id, IncomeDto incomeDto);

    IncomeDto getIncomeById(Long id);

    void deleteIncome(Long id);
}
