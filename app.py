from flask import Flask, render_template, redirect, url_for, flash, abort, request, jsonify
from flask_login import UserMixin, login_user, LoginManager, current_user, logout_user, login_required
from werkzeug.security import generate_password_hash, check_password_hash
from flask_sqlalchemy import SQLAlchemy
from forms import RegisterForm, LoginForm
from datetime import datetime
from flask_bootstrap import Bootstrap

from flask_marshmallow import Marshmallow

import psycopg2

app = Flask(__name__)
app.config['SECRET_KEY'] = 'thesecretest'
app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql://postgres:2020@localhost:5432/postgres'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db = SQLAlchemy(app)
ma = Marshmallow(app)
login_manager = LoginManager()
login_manager.init_app(app)
Bootstrap(app)


@login_manager.user_loader
def load_user(user_id):
    return User.query.get(int(user_id))


# CONFIGURE Database
class User(UserMixin, db.Model):
    __tablename__ = "users"
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(100), unique=True)
    password = db.Column(db.String(100), nullable=False)
    name = db.Column(db.String(100), nullable=False)


db.create_all()


class UserSchema(ma.Schema):
    class Meta:
        fields = ('id', 'email', 'password', 'name')


class LoginSchema(ma.Schema):
    class Meta:
        fields = ('email', 'password')


user_schema = UserSchema()
users_schema = UserSchema(many=True)
login_schema = LoginSchema()


@app.route('/register', methods=["GET", "POST"])
def register():
    name = request.json['name']
    email = request.json['email']
    password = request.json['password']
    print(name, email, password)
    new_user = User(
                email=email,
                password=password,
                name=name
                )
    print("got here second")

    db.session.add(new_user)
    db.session.commit()
    print('new user created successfully')
    return users_schema.jsonify(new_user)


@app.route('/login', methods=["GET", "POST"])
def login():
    email = request.json['email']
    user = User.query.filter_by(email=email).first()
    # Email doesn't exist or password incorrect.
    if user:
        login_user(user)
        print('user logged in')
        print(current_user.name)
        return login_schema.jsonify(user)
    print('here bitched')
    return print(email)


@app.route('/logout')
def logout():
    email = 'nice'
    print('user logout')
    logout_user()
    return email

    # form = RegisterForm()
    # if form.validate_on_submit():
    #
    #     if User.query.filter_by(email=form.email.data).first():
    #         print(User.query.filter_by(email=form.email.data).first())
    #         # User already exists
    #         flash("You've already signed up with that email, log in instead!")
    #         return redirect(url_for('login'))
    #     # Hashing and Salting Password
    #     hash_and_salted_password = generate_password_hash(
    #         form.password.data,
    #         method='pbkdf2:sha256',
    #         salt_length=8
    #     )
    #     new_user = User(
    #         email=form.email.data,
    #         name=form.name.data,
    #         password=hash_and_salted_password,
    #     )






# @app.route('/add', methods=['GET', 'POST'])
# def add_articles():
#     title = request.json['title']
#     body = request.json['body']
#     print(title)
#     print(body)
#     articles = Articles(title, body)
#     db.session.add(articles)
#     db.session.commit()
#     return article_schema.jsonify(articles)
#
#
# @app.route('/update/<id>/', methods=['PUT'])
# def update_article(id):
#     article = Articles.query.get(id)
#
#     title = request.json['title']
#     body = request.json['body']
#
#     article.title = title
#     article.body = body
#     db.session.commit()
#     return article_schema.jsonify(article)
#
#
# @app.route('/delete/<id>/', methods=['DELETE'])
# def article_delete(id):
#     print(request.method)
#     article = Articles.query.get(id)
#     db.session.delete(article)
#     db.session.commit()
#
#     return article_schema.jsonify(article)


if __name__ == "__main__":
    app.run(debug=True)
