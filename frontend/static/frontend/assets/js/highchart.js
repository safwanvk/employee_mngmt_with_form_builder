
        const pieOneChartActivity = Highcharts.chart('pieOne', {
            chart: {
                type: 'pie'
            },
            title: {
                text: ''
            },
            plotOptions: {
                pie: {
                    innerSize: '50%', // Set the inner size to create a white center
                    showInLegend: true,
                    dataLabels: {
                        enabled: false // Disable data labels
                    }
                }
            },
            legend: {
                align: 'right',
                layout: 'vertical',
                verticalAlign: 'middle'
            },
            colors: ['#6066F6', '#9397FF', '#0095FF', '#A5D9FF', '#4045B6', '#7378F6', '#C0D4FF'],
            tooltip: {
                formatter: function() {
                    return '<b>' + this.point.name + '</b>: ' + '<b>' +  this.y +'</b>';
                }
            },
            series: [],
            credits: {
                enabled: false // Remove the "Highcharts.com" link
            }
        });

        const pieChartCustomerTypeCount = Highcharts.chart('pie-chart', {
            chart: {
                type: 'pie'
            },
            title: {
                text: ''
            },
            plotOptions: {
                pie: {
                    showInLegend: true
                }
            },
            credits: {
                enabled: false
            },
            exporting: {
                enabled: false
            },
            tooltip: {
                formatter: function() {
                    return '<b>' + this.point.name + '</b>: ' + '<b>' +  this.y +'</b>';
                }
            },
            colors: ['#9ACD32', '#C1D75C', '#E2F2C6', '#C3E7A4'],
            series: []
        });

        const customerRegistrationContainer = Highcharts.chart('container', {
            chart: {
                events: {
                    load: function () {
                        if (this.exportSVGElements) this.exportSVGElements[0].destroy(); // Remove export button
                    }
                },
                type: 'spline'
            },
            title: {
                text: ''
            },
            xAxis: {
                categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug']
            },
            yAxis: {
                title: {
                    text: '' // Remove the yAxis title
                }
            },
            colors: ['#3CD856', '#EF4444', '#0095FF'],
            series: [],
            exporting: {
                enabled: false
            },
            credits: {
                enabled: false // Remove the "Highcharts.com" link
            }
        });

        const offerCodeRegistrationContainer = Highcharts.chart('containerOfferCode', {
            chart: {
                events: {
                    load: function () {
                        if (this.exportSVGElements) this.exportSVGElements[0].destroy(); // Remove export button
                    }
                },
                type: 'spline'
            },
            title: {
                text: ''
            },
            xAxis: {
                categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug']
            },
            yAxis: {
                title: {
                    text: '' // Remove the yAxis title
                }
            },
            series: [],
            exporting: {
                enabled: false
            },
            credits: {
                enabled: false // Remove the "Highcharts.com" link
            }
        });