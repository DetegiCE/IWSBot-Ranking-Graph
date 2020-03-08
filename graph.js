google.charts.load('current', {packages: ['corechart', 'line']});
google.charts.setOnLoadCallback(drawBasic);

function drawBasic() {
    var data = new google.visualization.DataTable();
    data.addColumn('number', '퍼센트');
    data.addColumn('number', '점수');

    var today = new Date();
    var yy = today.getFullYear();
    var mm = today.getMonth()+1;
    var dd = today.getDate();
    var hh = today.getHours();
    if(hh<=4) dd = dd - 1;
    if(dd<10) dd = '0'+dd;
    if(mm<10) mm = '0'+mm;

    yy = document.getElementById("year").innerText;
    mm = document.getElementById("month").innerText;
    dd = document.getElementById("day").innerText;

    var nAr;

    var rawFile = new XMLHttpRequest();
    rawFile.open("GET", "./"+yy+mm+dd+".txt", false);
    rawFile.onreadystatechange = function() {
        if(rawFile.readyState === 4) {
            if(rawFile.status === 200 || rawFile.status == 0) {
                var allText = rawFile.responseText;
                var stAr1 = allText.split(" ");
                var sz = stAr1.length-1;
                var cnt = 0;
                nAr = new Array(sz/2);
                for(var i=0 ; i<sz/2 ; i++) {
                    nAr[i] = new Array(2);
                }

                for(var i=0 ; i<sz/2 ; i++) {
                    for(var j=0 ; j<2 ; j++) {
                        nAr[i][j] = Number(stAr1[cnt]);
                        cnt++;
                    }
                }

                for(var i=1 ; i<sz/2-1 ; i++) {
                    if(nAr[i-1][0] <= 5 && nAr[i+1][0] > 5) {
                        document.getElementById("p5").innerText = Math.round((nAr[i+1][1]*(5.5-nAr[i-1][0]) + nAr[i-1][1]*(nAr[i+1][0]-5.5))/(nAr[i+1][0]-nAr[i-1][0])) + "점";
                    }
                    if(nAr[i-1][0] <= 10 && nAr[i+1][0] > 10) {
                        document.getElementById("p10").innerText = Math.round((nAr[i+1][1]*(10.5-nAr[i-1][0]) + nAr[i-1][1]*(nAr[i+1][0]-10.5))/(nAr[i+1][0]-nAr[i-1][0])) + "점";
                    }
                    if(nAr[i-1][0] <= 20 && nAr[i+1][0] > 20) {
                        document.getElementById("p20").innerText = Math.round((nAr[i+1][1]*(20.5-nAr[i-1][0]) + nAr[i-1][1]*(nAr[i+1][0]-20.5))/(nAr[i+1][0]-nAr[i-1][0])) + "점";
                    }
                    if(nAr[i-1][0] <= 30 && nAr[i+1][0] > 30) {
                        document.getElementById("p30").innerText = Math.round((nAr[i+1][1]*(30.5-nAr[i-1][0]) + nAr[i-1][1]*(nAr[i+1][0]-30.5))/(nAr[i+1][0]-nAr[i-1][0])) + "점";
                    }
                    if(nAr[i-1][0] <= 40 && nAr[i+1][0] > 40) {
                        document.getElementById("p40").innerText = Math.round((nAr[i+1][1]*(40.5-nAr[i-1][0]) + nAr[i-1][1]*(nAr[i+1][0]-40.5))/(nAr[i+1][0]-nAr[i-1][0])) + "점";
                    }
                    if(nAr[i-1][0] <= 50 && nAr[i+1][0] > 50) {
                        document.getElementById("p50").innerText = Math.round((nAr[i+1][1]*(50.5-nAr[i-1][0]) + nAr[i-1][1]*(nAr[i+1][0]-50.5))/(nAr[i+1][0]-nAr[i-1][0])) + "점";
                    }
                }
            }
        }
    };
    rawFile.send(null);

    data.addRows(nAr);

    var ctitle = '편극광 비경수위 '+mm+'월 '+dd+'일 랭킹 그래프';
    var options = {
    title: ctitle,
    hAxis: {
        ticks: [0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100]
    },
    width: 1080,
    height: 720
    };

    var chart = new google.visualization.LineChart(document.getElementById('chart_div'));

    chart.draw(data, options);
}
