import cx_Oracle
dsnStr = cx_Oracle.makedsn("oracle.cise.ufl.edu", "1521", "orcl")
con = cx_Oracle.connect(user="username", password="password!", dsn=dsnStr)
print con.version
cur = con.cursor()
cur.execute("select name, gdp from world")
for result in cur:
	print result
cur.close()
con.close()
