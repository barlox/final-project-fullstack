import mysql.connector

mydb = mysql.connector.connect(
      host = "localhost",
      user = "root",
      passwd = "barlox69",
      database = "sudokers"
    )

mycursor = mydb.cursor()



def postRanking(result):
  
  try:
    
    name = result['name']
    category = result['category']
    num = result['num']
    time = result['time']
    attemp = result['attemp']    

    sql = "INSERT INTO ranking (name, category, num, time, attemp) VALUES ('{}', '{}', '{}', {}, {})".format(name, category, num, time, attemp)
    
    mycursor.execute(sql)
    
    mydb.commit()
    
    mydb.close()
    
    return 'posted'
    
  except:
    
    return 'error'