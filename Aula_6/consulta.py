import psycopg2


str_connect=("dbname = 'aula6' user= 'postgres' host= 'localhost' port='5432' password= 'usuarioOGL'")
#str_connect=("dbname = %s user= %s host= %s password= %s")%('desenvolvimento2018 ','postgres','200.17.225.171','usuarioOGL')
sql = "select nome from divisa_de_bairros"

conn = psycopg2.connect(str_connect)
cur = conn.cursor()
cur.execute(sql)
if (cur.rowcount == 0):
    dados=0
else:
    dados= cur.fetchmany()
    print dados[0]

cur.close()
conn.commit()
conn.close()
