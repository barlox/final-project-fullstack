from flask import Flask, request, jsonify, json
from flask_sqlalchemy import SQLAlchemy
from werkzeug.security import generate_password_hash, check_password_hash
from flask_cors import CORS
from flask_marshmallow import Marshmallow
from flask_login import UserMixin, LoginManager, login_user, login_required, login_fresh, logout_user, current_user
from forgotPassword import sendMail
import updateTables
import postTables
import deleteRegisters
import queries
from datetime import timedelta



app = Flask(__name__, static_folder='./build', static_url_path='/')

""" 
   Settings
"""

app.config['SECRET_KEY'] = 'JxME5dybvUR97P7k17NDZmqaU-MPkUI-3LTGykagGZD7wpcJyLnAOCWpdoTtxsPUMKaJEY'
app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql+pymysql://root:barlox69@localhost:3306/sudokers'

db = SQLAlchemy(app)
ma = Marshmallow(app)
login_manager = LoginManager(app)

SQLALCHEMY_TRACK_MODIFICATIONS = False
SQLALCHEMY_ECHO = True

CORS(app, supports_credentials=True)

with app.app_context():
    db.create_all()


""" 
   Models db tables
"""


class Users(db.Model, UserMixin):
    __tablename__ = 'users'
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), unique=True)
    email = db.Column(db.String(100), unique=True)
    password = db.Column(db.String(256))

    def __init__(self, name, email, password):
        self.name = name
        self.email = email
        self.password = password


class UsersSchema(ma.Schema):
    class Meta:
        fields = ('name', 'email', 'password')


user_schema = UsersSchema()
users_schema = UsersSchema(many=True)


class Sudokus(db.Model):
    __tablename__ = 'sudokus'
    id = db.Column(db.Integer, primary_key=True)
    todo = db.Column(db.JSON, unique=True)
    total = db.Column(db.JSON, unique=True)
    num = db.Column(db.String(100))
    category = db.Column(db.String(100))

    def __init__(self, todo, total, num, category):
        self.todo = todo
        self.total = total
        self.num = num
        self.category = category


class SudokuSchema(ma.Schema):
    class Meta:
        fields = ('todo', 'total', 'num', 'category')


sudoku_schema = SudokuSchema()
sudokus_schema = SudokuSchema(many=True)


class Ranking(db.Model):
    __tablename__ = 'ranking'
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100))
    category = db.Column(db.String(100))
    num = db.Column(db.String(100))
    time = db.Column(db.Integer)
    attemp = db.Column(db.Integer)

    def __init__(self, name, category, num, time, attemp):
        self.name = name
        self.category = category
        self.num = num
        self.time = time
        self.attemp = attemp


class RankingSchema(ma.Schema):
    class Meta:
        fields = ('name', 'category', 'num', 'time', 'attemp')


ranking_schema = RankingSchema()
rankings_schema = RankingSchema(many=True)



@login_manager.user_loader
def load_user(id):
    return Users.query.get(id)


""" 
   Routes
"""


# All routes are included in case the page is reloaded from any of them

@app.route('/')
@app.route('/instructions')
@app.route('/login')
@app.route('/register')
@app.route('/ranking')
@app.route('/settings')
def index():
    return app.send_static_file('index.html')


# If the requested resource is not found, the frontend will handle the error

@app.errorhandler(404)
def not_found(e):

    return app.send_static_file('index.html')



@app.route("/signup", methods=["POST"])
def signup():
    name = request.json['name']
    email = request.json['email']
    password = request.json['password']

    email_exists = Users.query.filter_by(email=email).first() is not None

    name_exists = Users.query.filter_by(name=name).first() is not None

    if email_exists:
        return jsonify({"error": "Email already exists"}), 409

    if name_exists:
        return jsonify({"error": "Name already exists"}), 409

    hashed_password = generate_password_hash(password)
    new_user = Users(name=name, email=email, password=hashed_password)
    db.session.add(new_user)
    db.session.commit()

    login_user(new_user)

    return jsonify({
        "id": new_user.id,
        "name": new_user.name,
        "email": new_user.email
    })



@app.route("/login", methods=["POST"])
def login():
    email = request.json["email"]
    password = request.json["password"]

    user = Users.query.filter_by(email=email).first()

    if user is None:
        return jsonify({"error": "Unauthorized Access"}), 401

    if not check_password_hash(user.password, password):
        return jsonify({"error": "Unauthorized"}), 401

    login_user(user, duration=timedelta(hours=12))

    return jsonify({
        "id": user.id,
        "email": user.email,
        "name": queries.checkUsername(user.email)
    })


# Send new password to registration email

@app.patch('/forgotPassword')
def recovery():
    email = request.json['email']

    user = Users.query.filter_by(email=email).first()

    if user is None:
        return jsonify({"error": "email does not exist"}), 404

    result = sendMail(app, queries.checkUsername(email), email)

    if result['password'] != 'failed':
        hashed_password = generate_password_hash(result['password'])
        updateTables.updateUser(email, hashed_password)

        return jsonify({"result": "updated"})

    else:
        return jsonify({"result": "wrong email or server failure",
                        "response": result['result']
                        }), 500



@app.get("/logout")
def logout():
    logout_user()
    return jsonify({
        "message": 'logout'
    })


# Check if the user is already logged in

@app.get("/islogged")
def islogged():
    if login_fresh():
        return jsonify({
            "message": 'LOGGED_IN',
            "name": current_user.name,
            "email": current_user.email
        })
    else:
        return jsonify({
            "message": 'NOT_LOGGED_IN',
            "name": '',
            "email": ''
        })


# Check & Update password

@app.patch("/checkandupdatepassword")
def changePassword():
    name = request.json['name']
    email = request.json['email']
    passwordOld = request.json['passwordOld']
    passwordNew = request.json['passwordNew']

    check = queries.checkUser(name, email, passwordOld)
    result = ""

    if (check == "correct"):
        hashed_password = generate_password_hash(passwordNew)
        update = updateTables.updateUser(email, hashed_password)
        if (update['result'] == 'not updated'):
            return jsonify(update), 409
        else:
            return jsonify(update)
    elif (check == "incorrect"):
        return jsonify({"result": "password incorrect"}), 401
    elif (check == "not found"):
        return jsonify({"result": "not found"}), 404
    else:
        return jsonify({"result": "error"}), 500



@app.delete("/deleteuser")
def deleteUser():
    name = request.json['name']
    email = request.json['email']
    password = request.json['password']

    check = queries.checkUser(name, email, password)
    result = ""

    if (check == "correct"):
        delete = deleteRegisters.deleteUser(name, email)
        if (delete['result'] == 'no deleted'):
            return jsonify(delete), 409
        else:
            return jsonify(delete)
    elif (check == "incorrect"):
        return jsonify({"result": "password incorrect"}), 401
    elif (check == "not found"):
        return jsonify({"result": "not found"}), 404
    else:
        return jsonify({"result": "error"}), 500


# Returns an array in JSON format with the requested sudoku to do

@app.get('/sudokus')
def sudo_search():
    category = request.json['category']
    num = request.json['num']
    mode = request.json['mode']

    result = queries.searchSudoku(category, num, mode)

    return jsonify({
        'result': result
    })


# Check if the sudoku made by the user is correct

@app.get('/sudokuCheck')
def sudoCheck():
    category = request.json['category']
    num = request.json['num']
    completed = request.json['completed']

    result = queries.checkSudokuCompleted(category, num, completed)

    return jsonify({
        'result': result
    })


# Checks if the user has already done the same sudoku, and if so, adds an attempt

@app.post('/ranking/checkRanking')
def sudokuPost():
    name = request.json['name']
    category = request.json['category']
    num = request.json['num']
    time = request.json['time']
    attemp = request.json['attemp']

    result = queries.checkRanking(name, category, num, time, attemp)
    final_result = postTables.postRanking(result)

    return jsonify(final_result)



@app.get('/rankings')
def get_rankings():
    all_rankings = Ranking.query.all()

    result = rankings_schema.dump(all_rankings)

    return jsonify(result)


# Returns the three best sudokus of the requested category and number

@app.get('/searchTopRankings')
def topRankings():
    category = request.json['category']
    num = request.json['num']

    result = queries.searchTopRankings(category, num)

    return jsonify(result)


if __name__ == "__main__":
    app.run(debug=True)
