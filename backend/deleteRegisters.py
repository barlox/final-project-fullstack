import mysql.connector

mydb = mysql.connector.connect(
      host = "localhost",
      user = "root",
      passwd = "barlox69",
      database = "sudokers"
    )

mycursor = mydb.cursor()


# Delete the requested user from the database

def deleteUser(name, email):
    
    try:
        
        sql = "DELETE FROM users WHERE name = '{}' AND email = '{}'".format(name, email)

        mycursor.execute(sql)

        mydb.commit()
        
        mydb.close()
      
        return {
            'result': 'deleted'
            }
  
    except:
        
        return {
            'result': 'no deleted'
            } 