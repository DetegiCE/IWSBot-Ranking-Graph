import pymysql
from datetime import datetime

curyr = datetime.today().year
curmn = datetime.today().month
curdt = datetime.today().day
curhr = datetime.today().hour
curmi = datetime.today().minute
cursc = datetime.today().second

if curhr <= 4:
    curdt = curdt - 1

syr = str(curyr)
smn = ""
if curmn <= 9:
    smn = "0"+str(curmn)
else:
    smn = str(curmn)
sdt = ""
if curdt <= 9:
    sdt = "0"+str(curdt)
else:
    sdt = str(curdt)

conn = pymysql.connect(host='DELETED', user='DELETED', password='DELETED', db='DELETED')
curs = conn.cursor()

sql = "select DELETED from DELETED where DELETED order by DELETED"
curs.execute(sql)
rows = curs.fetchall()

cnt = len(rows)

tfile = open("DELETED","w")

temp = 1

for i in range(0, cnt):
    if not ((i == cnt-1) or (i == 0) or (i < temp)):
        if rows[i][1] > rows[i-temp][1] and rows[i+1][1] < rows[i][1]:
            temp = temp + 1
            continue

    temp = 1
    data = ("%d %d "%(rows[i][1],rows[i][0]))
    tfile.write(data)
tfile.close()

ufile = open("DELETED","w")
if curhr <= 4:
    dataupdate = syr+"년 "+smn+"월 "+str(curdt+1)+"일 "+str(curhr)+"시 "+str(curmi)+"분 "+str(cursc)+"초"
else:
    dataupdate = syr+"년 "+smn+"월 "+sdt+"일 "+str(curhr)+"시 "+str(curmi)+"분 "+str(cursc)+"초"
ufile.write(dataupdate)
ufile.close()

conn.close()
