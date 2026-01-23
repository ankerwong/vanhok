// Charts for Organization Profile Page

document.addEventListener('DOMContentLoaded', function() {
    // Market Share Chart
    const marketShareCtx = document.getElementById('marketShareChart');
    if (marketShareCtx) {
        new Chart(marketShareCtx, {
            type: 'bar',
            data: {
                labels: ['Taobao', 'Amazon', 'Price', 'HKTVmall', 'Others'],
                datasets: [{
                    label: 'Market Share (%)',
                    data: [20.9, 11.0, 9.8, 9.2, 49.1],
                    backgroundColor: [
                        '#ff6b00',
                        '#ff9900',
                        '#34a853',
                        '#6366f1',
                        '#9ca3af'
                    ],
                    borderColor: [
                        '#ff6b00',
                        '#ff9900',
                        '#34a853',
                        '#6366f1',
                        '#9ca3af'
                    ],
                    borderWidth: 2,
                    borderRadius: 8
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        display: false
                    },
                    title: {
                        display: false
                    },
                    tooltip: {
                        callbacks: {
                            label: function(context) {
                                return context.label + ': ' + context.parsed.y + '%';
                            }
                        }
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        max: 25,
                        ticks: {
                            callback: function(value) {
                                return value + '%';
                            },
                            font: {
                                size: 12
                            }
                        },
                        grid: {
                            color: 'rgba(0, 0, 0, 0.05)'
                        }
                    },
                    x: {
                        grid: {
                            display: false
                        },
                        ticks: {
                            font: {
                                size: 12,
                                weight: 'bold'
                            }
                        }
                    }
                }
            }
        });
    }

    // Product Category Chart
    const categoryCtx = document.getElementById('categoryChart');
    if (categoryCtx) {
        new Chart(categoryCtx, {
            type: 'doughnut',
            data: {
                labels: [
                    'Groceries (HK$3,480M)',
                    'Beauty & Health (HK$2,060M)',
                    'Digital & Electronics (HK$840M)',
                    'Pets (HK$770M)',
                    'Houseware & Household (HK$370M)',
                    'Others (HK$670M)'
                ],
                datasets: [{
                    data: [3480, 2060, 840, 770, 370, 670],
                    backgroundColor: [
                        '#6366f1',
                        '#ec4899',
                        '#8b5cf6',
                        '#10b981',
                        '#f59e0b',
                        '#9ca3af'
                    ],
                    borderColor: '#ffffff',
                    borderWidth: 3
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        position: 'bottom',
                        labels: {
                            padding: 20,
                            font: {
                                size: 12
                            },
                            generateLabels: function(chart) {
                                const data = chart.data;
                                const total = data.datasets[0].data.reduce((a, b) => a + b, 0);
                                return data.labels.map((label, i) => {
                                    const value = data.datasets[0].data[i];
                                    const percentage = ((value / total) * 100).toFixed(1);
                                    return {
                                        text: label + ' (' + percentage + '%)',
                                        fillStyle: data.datasets[0].backgroundColor[i],
                                        hidden: false,
                                        index: i
                                    };
                                });
                            }
                        }
                    },
                    tooltip: {
                        callbacks: {
                            label: function(context) {
                                const label = context.label || '';
                                const value = context.parsed;
                                const total = context.dataset.data.reduce((a, b) => a + b, 0);
                                const percentage = ((value / total) * 100).toFixed(1);
                                return label + ': ' + percentage + '%';
                            }
                        }
                    }
                }
            }
        });
    }
});