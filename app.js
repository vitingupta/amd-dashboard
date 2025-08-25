// AMD vs NVIDIA Dashboard JavaScript
document.addEventListener('DOMContentLoaded', function() {
    // Color scheme constants
    const colors = {
        amdRed: '#C5282F',
        amdRedLight: '#E53E47',
        nvidiaGreen: '#76B900',
        nvidiaGreenLight: '#8FD41A',
        neutral: '#626C71',
        background: 'rgba(255, 255, 255, 0.1)',
        text: '#1F2121',
        grid: 'rgba(0, 0, 0, 0.1)'
    };

    // Check if in dark mode
    const isDarkMode = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    if (isDarkMode) {
        colors.text = '#F5F5F5';
        colors.grid = 'rgba(255, 255, 255, 0.1)';
    }

    // Common chart options
    const commonOptions = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                labels: {
                    color: colors.text,
                    font: {
                        family: 'FKGroteskNeue, Inter, sans-serif',
                        size: 12
                    }
                }
            }
        },
        scales: {
            x: {
                ticks: {
                    color: colors.text,
                    font: {
                        family: 'FKGroteskNeue, Inter, sans-serif'
                    }
                },
                grid: {
                    color: colors.grid
                }
            },
            y: {
                ticks: {
                    color: colors.text,
                    font: {
                        family: 'FKGroteskNeue, Inter, sans-serif'
                    }
                },
                grid: {
                    color: colors.grid
                }
            }
        }
    };

    // 1. Performance Chart - Llama 3.1 405B Inference
    const performanceCtx = document.getElementById('performanceChart');
    if (performanceCtx) {
        new Chart(performanceCtx, {
            type: 'bar',
            data: {
                labels: ['AMD MI355X', 'NVIDIA B200'],
                datasets: [{
                    label: 'Relative Performance (Higher is Better)',
                    data: [1.59, 1.0],
                    backgroundColor: [colors.amdRed, colors.nvidiaGreen],
                    borderColor: [colors.amdRed, colors.nvidiaGreen],
                    borderWidth: 2,
                    borderRadius: 6
                }]
            },
            options: {
                ...commonOptions,
                scales: {
                    ...commonOptions.scales,
                    y: {
                        ...commonOptions.scales.y,
                        beginAtZero: true,
                        max: 2.0,
                        ticks: {
                            ...commonOptions.scales.y.ticks,
                            callback: function(value) {
                                return value + 'x';
                            }
                        }
                    }
                },
                plugins: {
                    ...commonOptions.plugins,
                    tooltip: {
                        callbacks: {
                            label: function(context) {
                                const label = context.dataset.label || '';
                                const value = context.parsed.y;
                                const advantage = value > 1 ? `(${((value - 1) * 100).toFixed(0)}% faster)` : '';
                                return `${label}: ${value}x ${advantage}`;
                            }
                        }
                    }
                }
            }
        });
    }

    // 2. Cost per Token Comparison
    const costCtx = document.getElementById('costChart');
    if (costCtx) {
        new Chart(costCtx, {
            type: 'bar',
            data: {
                labels: ['AMD MI355X', 'NVIDIA B200'],
                datasets: [{
                    label: 'Relative Cost per Token (Lower is Better)',
                    data: [0.65, 1.0],
                    backgroundColor: [colors.amdRed, colors.nvidiaGreen],
                    borderColor: [colors.amdRed, colors.nvidiaGreen],
                    borderWidth: 2,
                    borderRadius: 6
                }]
            },
            options: {
                ...commonOptions,
                scales: {
                    ...commonOptions.scales,
                    y: {
                        ...commonOptions.scales.y,
                        beginAtZero: true,
                        max: 1.2,
                        ticks: {
                            ...commonOptions.scales.y.ticks,
                            callback: function(value) {
                                return (value * 100) + '%';
                            }
                        }
                    }
                },
                plugins: {
                    ...commonOptions.plugins,
                    tooltip: {
                        callbacks: {
                            label: function(context) {
                                const label = context.dataset.label || '';
                                const value = context.parsed.y;
                                const savings = value < 1 ? `(${((1 - value) * 100).toFixed(0)}% savings)` : '';
                                return `${label}: ${(value * 100).toFixed(0)}% ${savings}`;
                            }
                        }
                    }
                }
            }
        });
    }

    // 3. Developer Ecosystem Chart
    const ecosystemCtx = document.getElementById('ecosystemChart');
    if (ecosystemCtx) {
        new Chart(ecosystemCtx, {
            type: 'doughnut',
            data: {
                labels: ['CUDA Ecosystem', 'ROCm & Others'],
                datasets: [{
                    data: [90, 10],
                    backgroundColor: [colors.nvidiaGreen, colors.amdRed],
                    borderColor: [colors.nvidiaGreen, colors.amdRed],
                    borderWidth: 2
                }]
            },
            options: {
                ...commonOptions,
                scales: undefined,
                plugins: {
                    ...commonOptions.plugins,
                    tooltip: {
                        callbacks: {
                            label: function(context) {
                                const label = context.label || '';
                                const value = context.parsed;
                                return `${label}: ${value}%`;
                            }
                        }
                    }
                }
            }
        });
    }

    // 4. TAM Growth Chart (Lisa Su's $500B+ Vision)
    const tamCtx = document.getElementById('tamChart');
    if (tamCtx) {
        new Chart(tamCtx, {
            type: 'line',
            data: {
                labels: ['2023', '2024', '2025', '2026', '2027', '2028'],
                datasets: [{
                    label: 'GPU TAM ($B)',
                    data: [150, 200, 280, 360, 450, 500],
                    borderColor: colors.amdRed,
                    backgroundColor: colors.amdRedLight + '20',
                    borderWidth: 3,
                    fill: true,
                    tension: 0.4,
                    pointBackgroundColor: colors.amdRed,
                    pointBorderColor: colors.amdRed,
                    pointBorderWidth: 2,
                    pointRadius: 6
                }, {
                    label: 'AMD Opportunity ($B)',
                    data: [3, 8, 20, 35, 60, 75],
                    borderColor: colors.amdRedLight,
                    backgroundColor: colors.amdRedLight + '40',
                    borderWidth: 2,
                    fill: false,
                    tension: 0.4,
                    pointBackgroundColor: colors.amdRedLight,
                    pointBorderColor: colors.amdRedLight,
                    pointBorderWidth: 2,
                    pointRadius: 4,
                    borderDash: [5, 5]
                }]
            },
            options: {
                ...commonOptions,
                scales: {
                    ...commonOptions.scales,
                    y: {
                        ...commonOptions.scales.y,
                        beginAtZero: true,
                        max: 550,
                        ticks: {
                            ...commonOptions.scales.y.ticks,
                            callback: function(value) {
                                return '$' + value + 'B';
                            }
                        }
                    }
                },
                plugins: {
                    ...commonOptions.plugins,
                    tooltip: {
                        callbacks: {
                            label: function(context) {
                                const label = context.dataset.label || '';
                                const value = context.parsed.y;
                                return `${label}: $${value}B`;
                            }
                        }
                    }
                }
            }
        });
    }

    // 5. Current Market Share 2024
    const currentShareCtx = document.getElementById('currentShareChart');
    if (currentShareCtx) {
        new Chart(currentShareCtx, {
            type: 'pie',
            data: {
                labels: ['NVIDIA', 'AMD', 'Others'],
                datasets: [{
                    data: [87.5, 3.5, 9],
                    backgroundColor: [colors.nvidiaGreen, colors.amdRed, colors.neutral],
                    borderColor: [colors.nvidiaGreen, colors.amdRed, colors.neutral],
                    borderWidth: 2
                }]
            },
            options: {
                ...commonOptions,
                scales: undefined,
                plugins: {
                    ...commonOptions.plugins,
                    tooltip: {
                        callbacks: {
                            label: function(context) {
                                const label = context.label || '';
                                const value = context.parsed;
                                return `${label}: ${value}%`;
                            }
                        }
                    }
                }
            }
        });
    }

    // 6. Projected Market Share 2027-2028
    const projectedShareCtx = document.getElementById('projectedShareChart');
    if (projectedShareCtx) {
        new Chart(projectedShareCtx, {
            type: 'pie',
            data: {
                labels: ['NVIDIA', 'AMD', 'Others'],
                datasets: [{
                    data: [75, 12.5, 12.5],
                    backgroundColor: [colors.nvidiaGreen, colors.amdRed, colors.neutral],
                    borderColor: [colors.nvidiaGreen, colors.amdRed, colors.neutral],
                    borderWidth: 2
                }]
            },
            options: {
                ...commonOptions,
                scales: undefined,
                plugins: {
                    ...commonOptions.plugins,
                    tooltip: {
                        callbacks: {
                            label: function(context) {
                                const label = context.label || '';
                                const value = context.parsed;
                                return `${label}: ${value}%`;
                            }
                        }
                    }
                }
            }
        });
    }

    // Add smooth scrolling for navigation if needed
    function smoothScroll(target) {
        const element = document.querySelector(target);
        if (element) {
            element.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    }

    // Add click handlers for any navigation elements
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = this.getAttribute('href');
            smoothScroll(target);
        });
    });

    // Add hover effects for interactive elements
    const cards = document.querySelectorAll('.summary-card, .opportunity-card, .partner-item');
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-2px)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });

    // Add animation for metric numbers
    function animateNumbers() {
        const metrics = document.querySelectorAll('.metric, .big-number');
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const element = entry.target;
                    const text = element.textContent;
                    const numbers = text.match(/[\d.]+/g);
                    
                    if (numbers) {
                        const finalNumber = parseFloat(numbers[0]);
                        let currentNumber = 0;
                        const increment = finalNumber / 50;
                        const timer = setInterval(() => {
                            currentNumber += increment;
                            if (currentNumber >= finalNumber) {
                                currentNumber = finalNumber;
                                clearInterval(timer);
                            }
                            
                            // Update the text while preserving non-numeric parts
                            const updatedText = text.replace(/[\d.]+/, currentNumber.toFixed(finalNumber < 10 ? 1 : 0));
                            element.textContent = updatedText;
                        }, 20);
                    }
                    observer.unobserve(element);
                }
            });
        });
        
        metrics.forEach(metric => observer.observe(metric));
    }

    // Initialize number animations
    animateNumbers();

    // Add dark mode support for charts
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    mediaQuery.addListener(function(e) {
        if (e.matches) {
            colors.text = '#F5F5F5';
            colors.grid = 'rgba(255, 255, 255, 0.1)';
        } else {
            colors.text = '#1F2121';
            colors.grid = 'rgba(0, 0, 0, 0.1)';
        }
        
        // Redraw charts with new colors
        Chart.helpers.each(Chart.instances, function(instance) {
            instance.options.plugins.legend.labels.color = colors.text;
            if (instance.options.scales) {
                instance.options.scales.x.ticks.color = colors.text;
                instance.options.scales.x.grid.color = colors.grid;
                instance.options.scales.y.ticks.color = colors.text;
                instance.options.scales.y.grid.color = colors.grid;
            }
            instance.update();
        });
    });

    // Add print styles optimization
    window.addEventListener('beforeprint', function() {
        // Adjust chart sizes for printing
        Chart.helpers.each(Chart.instances, function(instance) {
            instance.resize();
        });
    });

    // Performance optimization - lazy load charts
    const chartObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const chart = entry.target;
                if (chart.tagName === 'CANVAS' && !chart.getAttribute('data-chart-loaded')) {
                    chart.setAttribute('data-chart-loaded', 'true');
                    // Chart is already initialized above, this is just for future enhancement
                }
            }
        });
    });

    document.querySelectorAll('canvas').forEach(canvas => {
        chartObserver.observe(canvas);
    });

    // Add keyboard navigation support
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Tab') {
            // Ensure proper tab navigation through interactive elements
            const focusableElements = document.querySelectorAll(
                'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
            );
            
            if (focusableElements.length > 0) {
                const firstFocusable = focusableElements[0];
                const lastFocusable = focusableElements[focusableElements.length - 1];
                
                if (e.shiftKey) {
                    if (document.activeElement === firstFocusable) {
                        lastFocusable.focus();
                        e.preventDefault();
                    }
                } else {
                    if (document.activeElement === lastFocusable) {
                        firstFocusable.focus();
                        e.preventDefault();
                    }
                }
            }
        }
    });

    console.log('AMD vs NVIDIA Dashboard initialized successfully');
});