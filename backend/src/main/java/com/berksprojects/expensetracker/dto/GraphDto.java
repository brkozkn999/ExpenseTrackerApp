package com.berksprojects.expensetracker.dto;

import com.berksprojects.expensetracker.entity.Expense;
import com.berksprojects.expensetracker.entity.Income;
import lombok.Data;

import java.util.List;

@Data
public class GraphDto {
    private List<Expense> expenseList;
    private List<Income> incomeList;
}
