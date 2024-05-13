package com.berksprojects.expensetracker.service.expense;

import com.berksprojects.expensetracker.dto.ExpenseDto;
import com.berksprojects.expensetracker.entity.Expense;

import java.util.List;

public interface ExpenseService {
    Expense postExpense(ExpenseDto expenseDto);

    List<Expense> getAllExpenses();

    Expense getExpenseById(Long id);

    Expense updateExpense(Long id, ExpenseDto expenseDto);

    void deleteExpense(Long id);
}
