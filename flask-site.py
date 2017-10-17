import sqlite3

from flask import Flask
from flask import Markup
from flask import g
from flask import render_template

app = Flask(__name__)


@app.route('/')
def index():
    g.curr = 'index'
    return render_template('index.j2')


@app.route('/sites/')
def sites():
    g.curr = 'sites'
    con = sqlite3.connect('db.sqlite')
    con.row_factory = sqlite3.Row
    cur = con.execute('''
        SELECT slug, title, ssl, link, source, blurb
        FROM sites
        WHERE display=1
        ORDER BY sort
    ''')
    folios = cur.fetchall()
    return render_template('sites.j2', folios=folios)


@app.errorhandler(404)
def page_not_found(error):
    g.curr = 'err'
    return render_template('base.j2',
                           e404=Markup('<img src="https://http.cat/404.jpg">')
                           ), 404
