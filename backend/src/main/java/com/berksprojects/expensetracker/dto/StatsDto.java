package com.berksprojects.expensetracker.dto;

import com.berksprojects.expensetracker.entity.Expense;
import com.berksprojects.expensetracker.entity.Income;
import lombok.Data;

@Data
public class StatsDto {
    private Double income;
    private Double expense;
    private Income latestIncome;
    private Expense latestExpense;
    private Double balance;
    private Double minIncome;
    private Double maxIncome;
    private Double minExpense;
    private Double maxExpense;
}
