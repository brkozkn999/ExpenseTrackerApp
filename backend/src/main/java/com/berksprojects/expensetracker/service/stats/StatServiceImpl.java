package com.berksprojects.expensetracker.service.stats;

import com.berksprojects.expensetracker.dto.GraphDto;
import com.berksprojects.expensetracker.dto.StatsDto;
import com.berksprojects.expensetracker.entity.Expense;
import com.berksprojects.expensetracker.entity.Income;
import com.berksprojects.expensetracker.repository.ExpenseRepository;
import com.berksprojects.expensetracker.repository.IncomeRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;
import java.util.OptionalDouble;

@Service
@RequiredArgsConstructor
public class StatServiceImpl implements StatsService {
    private final IncomeRepository incomeRepository;
    private final ExpenseRepository expenseRepository;
    public GraphDto getChartData() {
        LocalDate endDate = LocalDate.now();
        LocalDate startDate = endDate.minusDays(27);

        GraphDto graphDto = new GraphDto();
        graphDto.setExpenseList(expenseRepository.findByDateBetween(startDate, endDate));
        graphDto.setIncomeList(incomeRepository.findByDateBetweenOrderByDateAsc(startDate, endDate)); // Tarihe göre sıralanmış şekilde al
        return graphDto;
    }


    public StatsDto getStats() {
        Double totalIncome = incomeRepository.sumAllAmounts();
        Double totalExpense = expenseRepository.sumAllAmounts();

        if (totalIncome == null)
            totalIncome = 0.0;
        if (totalExpense == null)
            totalExpense = 0.0;

        Optional<Income> optionalIncome = incomeRepository.findFirstByOrderByDateDesc();
        Optional<Expense> optionalExpense = expenseRepository.findFirstByOrderByDateDesc();

        StatsDto statsDto = new StatsDto();
        statsDto.setExpense(totalExpense);
        statsDto.setIncome(totalIncome);

        optionalIncome.ifPresentOrElse(statsDto::setLatestIncome, () -> {
                    Income nullIncome = new Income();
                    nullIncome.setAmount(0);
                    statsDto.setLatestIncome(nullIncome);
                }
        );

        optionalExpense.ifPresentOrElse(statsDto::setLatestExpense, () -> {
                    Expense nullExpense = new Expense();
                    nullExpense.setAmount(0);
                    statsDto.setLatestExpense(nullExpense);
                }
        );

        statsDto.setBalance(totalIncome-totalExpense);
        List<Income> incomeList = incomeRepository.findAll();
        List<Expense> expenseList = expenseRepository.findAll();

        OptionalDouble minIncome = incomeList.stream().mapToDouble(Income::getAmount).min();
        OptionalDouble maxIncome = incomeList.stream().mapToDouble(Income::getAmount).max();

        OptionalDouble minExpense = expenseList.stream().mapToDouble(Expense::getAmount).min();
        OptionalDouble maxExpense = expenseList.stream().mapToDouble(Expense::getAmount).max();

        statsDto.setMinExpense(minExpense.isPresent() ? minExpense.getAsDouble() : 0);
        statsDto.setMaxExpense(maxExpense.isPresent() ? maxExpense.getAsDouble() : 0);

        statsDto.setMinIncome(minIncome.isPresent() ? minIncome.getAsDouble() : 0);
        statsDto.setMaxIncome(maxIncome.isPresent() ? maxIncome.getAsDouble() : 0);

        return statsDto;
    }
}
