import mysql.connector

mydb = mysql.connector.connect(
      host = "localhost",
      user = "root",
      passwd = "barlox69",
      database = "sudokers"
    )

mycursor = mydb.cursor()


def updateUser(email, password):
  
  try:    

    sql = "UPDATE users SET password = '{}' WHERE email = '{}'".format(password, email)

    mycursor.execute(sql)
    
    mydb.commit()
    
    mydb.close()
    
    return {
      'result': 'updated'
      }
    
  except:
    
    return {
      'result': 'error'
      }



def updateRanking(result):
  
  try:
    
    name = result['name']
    category = result['category']
    num = result['num']
    time = result['time']
    attemp = result['attemp']    

    sql = "UPDATE ranking SET time = '{}', attemp = '{}' WHERE name = '{}' AND category = '{}' AND num = '{}'".format(time, attemp, name, category, num)

    mycursor.execute(sql)
    
    mydb.commit()
    
    mydb.close()
    
    return 'updated'
    
  except:
    
    return 'error'