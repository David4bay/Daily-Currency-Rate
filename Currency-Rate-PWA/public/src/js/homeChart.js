   var dummyServer = `http://localhost:3001/api/v1/graph?default=USD&lookup=NGN&numberOfDays=90`

   fetch(dummyServer).then(async function(response) {
    return await response.json()
}).then(function(fetchResponse) {
    let currencyPayload = Object.values(fetchResponse)
    currencyPayload = currencyPayload.map((currencyData) => {  return { "pctChange": currencyData.pctChange, "timestamp": currencyData.timestamp } })
    let  rawData = Array.from(currencyPayload)

    const chartData = rawData.map(data => ({
        x: new Date(data.timestamp * 1000), 
        y: parseFloat(data.pctChange)   
    }))
    
    Highcharts.chart('container', {
        chart: {
            type: 'line'
        },
        title: {
            text: 'USD/NGN Percentage Change Over Time'
        },
        xAxis: {
            type: 'datetime',
            title: {
                text: 'Date'
            }
        },
        yAxis: {
            title: {
                text: 'Percentage Change (%)'
            }
        },
        series: [{
            name: 'USD/NGN',
    data: chartData,
    color: {
        linearGradient: { x1: 0, y1: 0, x2: 1, y2: 0 },
        stops: [
            [0, '#3498db'], 
            [1, '#2ecc71'] 
        ]
    },
    lineWidth: 2,
    gridLineColor: '#ecf0f1',
    marker: {
        radius: 4,
        fillColor: '#3498db'
    }
        }],
        legend: {
            layout: 'horizontal',
            align: 'center',
            verticalAlign: 'bottom',
            itemStyle: {
                color: '#34495e',
                fontWeight: 'bold'
            },
            itemHoverStyle: {
                color: '#2980b9'
            }
        },
        tooltip: {
            backgroundColor: '#2c3e50',
            borderColor: '#34495e',
            style: {
                color: '#ecf0f1',
                fontSize: '12px'
            },
            valueSuffix: '%'
        }
    })
})
