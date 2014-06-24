
var FlotChartWrapper = function () {

    var lineChart = function (options) {
        if (options == undefined) {
            options = {};
        }
        var self = this;
        self.seriesData = options.seriesData;
        self.chartId = options.id;
        self.colours = options.colours || ["#bdea74", "#eae874", "#2FABE9", "#FA5833"];

        self.plot = {};

        var display = function () {
            // ######################################

            self.plot = $.plot($(self.chartId),
                self.seriesData,
                {
                    series: {
                        lines: {
                            show: true,
                            lineWidth: 2
                        },
                        points: {
                            show: true,
                            lineWidth: 2
                        },
                        shadowSize: 0
                    },
                    grid: {
                        hoverable: true,
                        clickable: true,
                        tickColor: "#f9f9f9",
                        borderWidth: 0
                    },
                    legend: {
                        show: true,
                        backgroundOpacity: 0.5,
                        noColumns: 0,
                        position: 'ne'
                    },
                    colors: self.colours,
                    xaxis: {
                        mode: "time",
                        timeformat: "%m/%y",
                        axisLabel: options.xLabel || '',
                        axisLabelUseCanvas: true,
                        axisLabelFontSizePixels: 15,
                        axisLabelFontFamily: 'Arial'
                    },
                    yaxis: {
                        axisLabel: options.yLabel || '',
                        axisLabelUseCanvas: true,
                        axisLabelFontSizePixels: 15,
                        axisLabelFontFamily: 'Arial'
                    }
                });

            function showTooltip(x, y, contents) {
                $('<div id="tooltip">' + contents + '</div>').css({
                    position: 'absolute',
                    display: 'none',
                    top: y + 5,
                    left: x + 5,
                    border: '1px solid #fdd',
                    padding: '2px',
                    'background-color': '#dfeffc',
                    opacity: 0.80
                }).appendTo("body").fadeIn(200);
            }

            var previousPoint = null;
            $(self.chartId).bind("plothover", function (event, pos, item) {
                $("#x").text(pos.x.toFixed(2));
                $("#y").text(pos.y.toFixed(2));

                if (item) {
                    if (previousPoint != item.dataIndex) {
                        previousPoint = item.dataIndex;

                        $("#tooltip").remove();
                        var x = item.datapoint[0].toFixed(2),
                            y = item.datapoint[1].toFixed(2);

                        showTooltip(item.pageX, item.pageY,
                                item.series.label + " at " + moment(x - 0).format('DD/MM/YYYY') + " = " + Math.round(y));
                    }
                }
                else {
                    $("#tooltip").remove();
                    previousPoint = null;
                }
            });
            // ######################################
        };

        display();
        return self;
    };

    return {
        displayLineChart: lineChart
    };
};

