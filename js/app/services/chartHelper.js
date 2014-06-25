/**
 * Created by daniel.whittaker on 24/06/2014.
 */


var irisHighChartWrapper = function() {

    var waterFall = function(options) {
        var settings = {
            title: {
                text: ''
            },

            xAxis: {
                type: 'category',
                title: {
                    text: options.xAxisTitle || ""
                }
            },

            yAxis: [{
                title: {
                    text: options.yAxisTitle || ""
                },
                gridLineDashStyle: 'dash',
                gridLineWidth: 1
            }],

            legend: {
                enabled: false
            },

            plotOptions: {
                series: {
                    shadow: false,
                    borderWidth: 0
                }
            },

            tooltip: {
                formatter: function () {
                    var name = this.point.name ? this.point.name + "<br />" : "Total<br/>";
                    var nv = Math.abs(this.y).toFixed(2);
                    var txt = name + "<b>" + nv + "</b> %";
                    return txt;
                }
            },

            credits: {
                enabled: false
            },

            series: [{
                upColor: Highcharts.getOptions().colors[2],
                color: Highcharts.getOptions().colors[3],
                type: 'waterfall',
                data: options.waterFallData,
                dataLabels: {
                    enabled: options.dataLabels,
                    formatter: function () {
                        if (this.y === 0) return null;
                        var val = this.y;

                        if (val < 0) {
                            val = this.y - this.y - this.y;
                        }

                        return val.toFixed(2) + '%';
                    },
                    style: {
                        color: '#0a0c0e',
                        fontWeight: 'bold'
                    },
                    verticalAlign: 'top',
                    y: -25
                },
                pointPadding: 0
            },{
                type: 'column',
                data: options.independantData,
                dataLabels: {
                    enabled: true,
                    formatter: function () {
                        if (this.y === 0) return null;
                        return this.y.toFixed(2) + '%';
                    },
                    style: {
                        color: '#000000',
                        fontWeight: 'bold'
                    }
                }
            }]
        };

        $("#riskChart").highcharts(settings);
        return settings;
    };

    var columnChart = function (options) {
        if (options == undefined) {
            options = {};
        }
        var self = this;

        self.display = function () {
            var chart = new Highcharts.Chart({
                chart: {
                    renderTo: options.chartId,
                    type: options.type || 'column'
                },
                colors: options.colours || ["#2FABE9", "#FA5833", "#bdea74", "#eae874"],
                title: {
                    text: '&nbsp;',
                    useHTML : true
                },
                xAxis: {
                    categories: options.categories
                },
                yAxis: {
                    //min: 0,
                    title: {
                        enabled: true,
                        text: options.Title || 'GBP Millions'
                    },
                    gridLineDashStyle: 'dash',
                    gridLineWidth: 1,
                    labels: {
                        overflow: 'justify',
                        style: {
                            fontSize: '1em'
                        },
                        formatter: function () {
                            return this.value + (options.postFix || '');
                        }
                    }
                },
                credits: {
                    enabled: false
                },
                plotOptions: {
                    column: {
                        dataLabels: {
                            enabled: options.dataLabelsEnabled || false
                        }
                    },
                    series: {
                        enableMouseTracking: false
                    }
                },
                series: options.series
            });
        };

        return self;
    };

    var barChart = function(options) {
        var settings = {
            chart: {
                type: 'bar'
            },
            colors: options.colours || ["#2FABE9", "#FA5833", "#bdea74", "#eae874"],
            title: {
                text: ''
            },
            xAxis: {
                categories: options.categories,
                title: {
                    text: null
                }
            },
            yAxis: {
                //min: 0,
                title: {
                    enabled: true,
                    text: options.Title || 'GBP Millions'
                },
                gridLineDashStyle: 'dash',
                gridLineWidth: 1,
                labels: {
                    overflow: 'justify'
                }
            },
            tooltip: {
                valueSuffix: ' thousands'
            },
            plotOptions: {
                bar: {
                    dataLabels: {
                        enabled: true
                    }
                },
                series: {
                    enableMouseTracking: false
                }
            },
            credits: {
                enabled: false
            },
            series: options.series,
            style: {
                width: 0
            }

        };

        return settings;
    };

    var stackedColumnChart = function(options) {
        var settings = {
            chart: {
                type: 'column'
            },
            title: {
                text: ''
            },
            xAxis: {
                categories: options.categories
            },
            yAxis: {
                min: 0,
                title: {
                    text: options.yAxisTitle
                },
                stackLabels: {
                    enabled: true,
                    style: {
                        fontWeight: 'bold',
                        color: (Highcharts.theme && Highcharts.theme.textColor) || 'gray'
                    }
                }
            },
            legend: {
                show: true,
                backgroundOpacity: 0.5,
                noColumns: 0,
                position: 'ne'
            },
            tooltip: {
                formatter: function() {
                    return '<b>' + this.series.name + '</b>: ' + this.y + '<br/>';
                }
            },
            credits: {
                enabled: false
            },
            plotOptions: {
                column: {
                    stacking: 'normal',
                    dataLabels: {
                        enabled: true,
                        color: (Highcharts.theme && Highcharts.theme.dataLabelsColor) || 'white',
                        formatter: function() {
                            if (this.point.yBottom - this.point.plotY > 13) {
                                return this.y;
                            } else {
                                return '';
                            }
                        }
                    }
                }
            }
            ,
            series: options.series
        };
        $(options.renderTo).highcharts(settings);
        return settings;
    };

    var displayDonutChart = function (options) {
        var settings = {
            chart: {
                type: 'pie'
            },
            title: {
                text: ''
            },
            credits: {
                enabled: false
            },
            yAxis: {
                title: {
                    text: ''
                }
            },
            legend: {
                show: true
            },
            plotOptions: {
                pie: {
                    shadow: false,
                    center: ['50%', '50%']
                }
            },
            tooltip: {
                valueSuffix: '%'
            },
            series: [
                {
                    name: 'Assets',
                    data: options.series.inner,
                    size: '40%',
                    dataLabels: {
                        formatter: function () {
                            return this.y > 5 ? this.point.name : null;
                        },
                        color: 'white',
                        distance: -30
                    }
                }, {
                    name: 'Allocation',
                    data: options.series.outer,
                    size: '80%',
                    innerSize: '60%',
                    dataLabels: {
                        formatter: function () {
                            // display only if larger than 1
                            return this.y > 1 ? '<b>' + this.point.name + ':</b> ' + this.y + '%' : null;
                        }
                    }
                }
            ]
        };

        $(options.renderTo).highcharts(settings);
        return settings;
    };

    var displayPieChart = function (options) {
        var settings = {
            chart: {
                plotBackgroundColor: null,
                plotBorderWidth: null,
                plotShadow: false
            },
            credits: {
                enabled: false
            },
            title: {
                text: ''
            },
            tooltip: {
                pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
            },
            plotOptions: {
                pie: {
                    allowPointSelect: true,
                    cursor: 'pointer',
                    dataLabels: {
                        enabled: true,
                        color: '#000000',
                        connectorColor: '#000000',
                        format: '<b>{point.name}</b>: {point.percentage:.1f} %'
                    }
                }
            },
            series: options.series
        };

        $(options.renderTo).highcharts(settings);
        return settings;
    };

    var stackedColumnAndLineChart = function (options) {
        var settings = {
            chart: {
            },
            title: {
                text: options.name
            },
            xAxis: {
                categories: options.categories
            },
            yAxis: {
                min: 0,
                title: {
                    text: options.Title || 'GBP Millions'
                },
                stackLabels: {
                    enabled: false,
                    style: {
                        fontWeight: 'bold',
                        color: (Highcharts.theme && Highcharts.theme.textColor) || 'gray'
                    }
                }
            },
            legend: {
                show: true,
                backgroundOpacity: 0.5,
                noColumns: 0,
                position: 'ne'
            },
            tooltip: {
                formatter: function () {
                    return '<b>' + this.series.name + '</b>: ' + this.y + '<br/>';
                }
            },
            credits: {
                enabled: false
            },
            plotOptions: {
                column: {
                    stacking: 'normal',
                    dataLabels: {
                        enabled: true,
                        color: (Highcharts.theme && Highcharts.theme.dataLabelsColor) || 'white',
                        formatter: function () {
                            if (this.point.yBottom - this.point.plotY > 13) {
                                return this.y;
                            } else {
                                return '';
                            }
                        }
                    }
                }
            },
            series: options.stackedColumnSeriesData
        };
        $(options.renderTo).highcharts(settings);
        return settings;
    };

    var flightPlanLineChart = function (options){
        var settings = {
            chart: {
                type: 'line'
            },
            credits: {
                enabled: false
            },
            title: {
                text: null
            },
            xAxis: {
                title: {
                  text: options.xAxisTitle || 'Date'
                },
                type: 'datetime',
                gridLineWidth: 1,
                gridLineDashStyle: 'dash'
            },
            yAxis: {
                title: {
                    enabled: true,
                    text: options.yAxisTitle || 'GBP Millions'
                },
                gridLineDashStyle: 'dash'
            },
            tooltip: {
                xDateFormat: '%Y'
            },
            legend: {
                enabled: true,
                layout: 'vertical',
                floating: true,
                verticalAlign: 'bottom',
                align: 'right',
                y: -100
            },
            plotOptions: {
                line: {
                    marker: {
                        symbol: 'circle',
                        fillColor: '#FFFFFF',
                        lineWidth: 2,
                        radius: 3,
                        lineColor: null
                    }
                }
            },
            series: options.lineSeriesData
        };

        $(options.renderTo).highcharts(settings);
    };

    return {
        displayColumnChart: columnChart,
        displayFlightPlanLineChart: flightPlanLineChart,
        displayBarChart: barChart,
        displayWaterfallChart: waterFall,
        displayStackedColumnChart: stackedColumnChart,
        displayStackedColumnAndLineChart: stackedColumnAndLineChart,
        displayDonutChart: displayDonutChart,
        displayPieChart: displayPieChart
    };
}