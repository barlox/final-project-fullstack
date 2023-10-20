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


# Query that returns the username based on the email

def checkUsername(email):

    sql = "SELECT * FROM users WHERE email = '{}'".format(email)

    mycursor.execute(sql)

    myresult = mycursor.fetchall()

    return myresult[0][1]


# Query that returns a dict based on whether there is a matching result (summary an attemp)

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


# Query that requests the three records with the shortest time by category and number

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


# Query that returns the sudoku to do (all) or the completed one (total) depending on the mode


def searchSudoku(category, num, mode):
    
    sql = "SELECT {} FROM sudokus WHERE category = '{}' AND num = '{}'".format(
        mode, category, num)

    mycursor.execute(sql)

    myresult = mycursor.fetchone()

    return myresult[0]


# Check if the sudoku sent is correct

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
    

# Check if the username, email and password match

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
    
