import mysql.connector
import json
from werkzeug.security import check_password_hash


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


# Consulta que devuelve un dict en función de si hay existe algún resultado coincidente (sumaria un attemp)

def checkRanking(name, category, num, time, attemp):

    sql = """SELECT time, attemp
    FROM ranking
    WHERE name = '{}' AND category = '{}' AND num = '{}'
    ORDER BY attemp DESC LIMIT 1""".format(name, category, num)

    mycursor.execute(sql)

    myresult = mycursor.fetchall()

    if len(myresult) > 0:
        return {
            'name': name,
            'category': category,
            'num': num,
            'time': time,
            'attemp': attemp + myresult[0][1]
        }
    else:
        return {
            'name': name,
            'category': category,
            'num': num,
            'time': time,
            'attemp': attemp
        }


# Consulta que solicita los tres registros de menor tiempo por category y num

def searchTopRankings(category, num):

    sql = """SELECT name, time FROM ranking
    WHERE category = '{}' AND num = '{}'
    ORDER BY time ASC LIMIT 3""".format(category, num)

    mycursor.execute(sql)

    myresult = mycursor.fetchall()

    try:
        return {
            'first': {
                'name': myresult[0][0],
                'time': myresult[0][1]
            },
            'second': {
                'name': myresult[1][0],
                'time': myresult[1][1]
            },
            'third': {
                'name': myresult[2][0],
                'time': myresult[2][1]
            }
        }
    except:
        return {
            'first': {
                'name': 'noname',
                'time': 'notime'
            },
            'second': {
                'name': 'noname',
                'time': 'notime'
            },
            'third': {
                'name': 'noname',
                'time': 'notime'
            }
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

    sql = "SELECT total FROM sudokus WHERE category = '{}' AND num = '{}'".format(
        category, num)

    mycursor.execute(sql)

    myresult = mycursor.fetchone()

    myresult = json.loads(myresult[0])

    response = myresult == completed

    if response:
        return 'ok'
    else:
        return 'not ok'


def checkUser(name, email, password):

    sql = "SELECT password FROM users WHERE name = '{}' AND email = '{}'".format(
        name, email)

    mycursor.execute(sql)

    myresult = mycursor.fetchall()

    if (len(myresult)):
        if (check_password_hash(myresult[0][0], password)):
            return "correct"
        else:
            return "incorrect"
    else:
        return "not found"
    
