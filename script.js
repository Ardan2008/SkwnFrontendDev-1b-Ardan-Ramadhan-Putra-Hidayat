$(document).ready(function() {
    // Generate random transactions
    function generateTransactions() {
        const types = ['Deposit', 'Withdraw'];
        const locations = ['Bank Mandiri ATM', 'Bank BCA ATM', 'Bank BNI ATM', 'Bank BRI ATM'];
        const transactions = [];
        
        for (let i = 0; i < 10; i++) {
            const isDeposit = Math.random() > 0.5;
            const amount = Math.floor(Math.random() * 20000000) + 5000000;
            const day = Math.floor(Math.random() * 28) + 1;
            const hour = Math.floor(Math.random() * 12) + 1;
            const minute = Math.floor(Math.random() * 60);
            
            transactions.push({
                type: isDeposit ? 'Deposit' : 'Withdraw',
                amount: amount,
                location: locations[Math.floor(Math.random() * locations.length)],
                date: `${day} March 2022`,
                time: `${hour}.${minute.toString().padStart(2, '0')} ${hour < 12 ? 'AM' : 'PM'}`
            });
        }
        
        return transactions;
    }

    // Render activity items
    function renderActivities(transactions, containerId, limit = 3) {
        const container = $(containerId);
        container.empty();
        
        const items = limit ? transactions.slice(0, limit) : transactions;
        
        items.forEach(transaction => {
            const isDeposit = transaction.type === 'Deposit';
            const icon = isDeposit ? 'fa-arrow-trend-up' : 'fa-arrow-trend-down';
            const iconClass = isDeposit ? 'deposit' : 'withdraw';
            const amountClass = isDeposit ? 'deposit' : 'withdraw';
            const formattedAmount = 'Rp' + transaction.amount.toLocaleString('id-ID') + ',-';
            
            const html = `
                <div class="activity-item">
                    <div class="activity-icon ${iconClass}">
                        <i class="fas ${icon}"></i>
                    </div>
                    <div class="activity-details">
                        <div class="activity-title">${transaction.type}</div>
                        <div class="activity-amount ${amountClass}">${formattedAmount}</div>
                        <div class="activity-location">
                            <i class="fas fa-map-marker-alt"></i>
                            <span>${transaction.location}</span>
                        </div>
                    </div>
                    <div class="activity-meta">
                        <div class="activity-date">${transaction.date}</div>
                        <div class="activity-time">${transaction.time}</div>
                    </div>
                </div>
            `;
            
            container.append(html);
        });
    }

    // Initialize transactions
    const transactions = generateTransactions();
    renderActivities(transactions, '#activityList', 3);
    renderActivities(transactions, '#financeActivityList');

    // Navigation
    $('#financeBtn').click(function() {
        $('#homeScreen').removeClass('active');
        $('#financeScreen').addClass('active');
        initChart();
    });

    $('#backBtn').click(function() {
        $('#financeScreen').removeClass('active');
        $('#homeScreen').addClass('active');
    });

    // Chart initialization
    function initChart() {
        const ctx = document.getElementById('financeChart');
        if (ctx && !ctx.chart) {
            ctx.chart = new Chart(ctx, {
                type: 'line',
                data: {
                    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May'],
                    datasets: [{
                        label: 'Balance',
                        data: [2500000, 4800000, 3000000, 4500000, 2200000],
                        borderColor: '#4A90E2',
                        backgroundColor: 'rgba(74, 144, 226, 0.1)',
                        borderWidth: 3,
                        tension: 0.4,
                        fill: true,
                        pointRadius: 0,
                        pointHoverRadius: 8,
                        pointHoverBackgroundColor: '#4A90E2',
                        pointHoverBorderColor: '#fff',
                        pointHoverBorderWidth: 3
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: true,
                    plugins: {
                        legend: {
                            display: false
                        },
                        tooltip: {
                            enabled: true,
                            backgroundColor: '#fff',
                            titleColor: '#000',
                            bodyColor: '#000',
                            borderColor: '#4A90E2',
                            borderWidth: 1,
                            padding: 12,
                            displayColors: false,
                            callbacks: {
                                label: function(context) {
                                    return 'Rp ' + context.parsed.y.toLocaleString('id-ID') + ',-';
                                }
                            }
                        }
                    },
                    scales: {
                        y: {
                            beginAtZero: false,
                            min: 1000000,
                            max: 5000000,
                            ticks: {
                                callback: function(value) {
                                    return (value / 1000000) + 'M';
                                },
                                color: '#8E8E93',
                                font: {
                                    size: 11
                                }
                            },
                            grid: {
                                display: false
                            },
                            border: {
                                display: false
                            }
                        },
                        x: {
                            ticks: {
                                color: '#8E8E93',
                                font: {
                                    size: 12
                                }
                            },
                            grid: {
                                display: false
                            },
                            border: {
                                display: false
                            }
                        }
                    }
                }
            });
        }
    }
});