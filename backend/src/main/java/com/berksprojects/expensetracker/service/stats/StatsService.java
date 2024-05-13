package com.berksprojects.expensetracker.service.stats;

import com.berksprojects.expensetracker.dto.GraphDto;
import com.berksprojects.expensetracker.dto.StatsDto;

public interface StatsService {
    GraphDto getChartData();

    StatsDto getStats();
}
