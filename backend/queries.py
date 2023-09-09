import mysql.connector
import json


mydb = mysql.connector.connect(
    host="localhost",
    user="root",
    passwd="barlox69",
    database="sudokers"
)

mycursor = mydb.cursor()


# Consulta que devuelve el nombre de usuario en función del email

def checkUsername(email):

    sql = "SELECT * FROM users WHERE email = '{}'".format(email)

    mycursor.execute(sql)

    myresult = mycursor.fetchall()

    return myresult[0][1]


# Consulta que devuelve PUT o POST en función del resultado del sudoku, con los valores a incluir en cada campo

def checkRanking(name, category, num, time, attemp):

    sql = "SELECT time, attemp FROM ranking WHERE name = '{}' AND category = '{}' AND num = '{}'".format(
        name, category, num)

    mycursor.execute(sql)

    myresult = mycursor.fetchall()

    if len(myresult[0]) > 0:
        if myresult[0][0] > time:
            return {
                'method': 'PUT',
                'name': name,
                'category': category,
                'num': num,
                'time': time,
                'attemp': attemp + myresult[0][1]
            }
        else:
            return {
                'method': 'Null'
            }

    return {
        'method': 'POST',
        'name': name,
        'category': category,
        'num': num,
        'time': time,
        'attemp': attemp
    }


# Consulta que devuelve el sudoku para hacer (todo) o el completado (total)


def searchSudoku(category, num, mode):

    """ mydb = mysql.connector.connect(
        host="localhost",
        user="root",
        passwd="barlox69",
        database="sudokers"
    )

    mycursor = mydb.cursor() """

    sql = "SELECT {} FROM sudokus WHERE category = '{}' AND num = '{}'".format(
        mode, category, num)

    mycursor.execute(sql)

    myresult = mycursor.fetchone()

    return myresult[0]





def checkSudokuCompleted(category, num, completed):
  
  sql = "SELECT total FROM sudokus WHERE category = '{}' AND num = '{}'".format(category, num)

  mycursor.execute(sql)

  myresult = mycursor.fetchone()
  
  myresult = json.loads(myresult[0]) 
  
  response = myresult == completed
    
  if response:
    return 'ok'
  else:
    return 'not ok'