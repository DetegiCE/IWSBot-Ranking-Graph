window.onload = function() {
    var today = new Date();
    var yyt = today.getFullYear();
    var mmt = today.getMonth()+1;
    var ddt = today.getDate();
    var hht = today.getHours();
    if(hht <= 4) {
        ddt--;
    }
    
    if(Number(ddt) < 10) document.getElementById("day").innerText = "0"+(Number(ddt));
    else document.getElementById("day").innerText = Number(ddt);
    
    document.getElementById("year").innerText = yyt;
    document.getElementById("month").innerText = "0"+Number(mmt);
    
    var upFile = new XMLHttpRequest();
    upFile.open("GET", "./updatetime.txt", false);
    upFile.onreadystatechange = function() {
        if(upFile.readyState === 4) {
            if(upFile.status === 200 || upFile.status === 0) {
                var upText = upFile.responseText;
                document.getElementById("updatetime").innerText = "최근 업데이트 : "+upText;
            }
        }
    };
    upFile.send(null);
};

function prevCheck() {
    var yy = document.getElementById("year").innerText;
    var mm = document.getElementById("month").innerText;
    var dd = document.getElementById("day").innerText;

    if (yy == "2020" && mm == "03" && dd == "05") {
        alert("3월 5일 이전의 데이터는 없습니다.");
    }
    else {
        if(dd == "10") document.getElementById("day").innerText = "09";
        else if(Number(dd) < 10) document.getElementById("day").innerText = "0"+(Number(dd)-1);
        else document.getElementById("day").innerText = Number(dd)-1;
    }
}

function nextCheck() {
    var yy = document.getElementById("year").innerText;
    var mm = document.getElementById("month").innerText;
    var dd = document.getElementById("day").innerText;

    var today = new Date();
    var yys = today.getFullYear();
    var mms = today.getMonth()+1;
    var dds = today.getDate();
    var hhs = today.getHours();
    if(hhs <= 4) {
        dds--;
    }

    if (Number(yy) == yys && Number(mm) == mms && Number(dd) == dds) {
        alert("다음 날짜는 존재하지 않습니다.");
    }
    else {
        if(dd == "09") document.getElementById("day").innerText = "10";
        else if(Number(dd) < 10) document.getElementById("day").innerText = "0"+(Number(dd)+1);
        else document.getElementById("day").innerText = Number(dd)+1;
    }
}
