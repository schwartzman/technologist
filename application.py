import hashlib
import sqlite3

from flask import Flask
from flask import Markup
from flask import g
from flask import jsonify
from flask import render_template
from importlib_resources import path
from importlib_resources import read_text
from secrets import choice
from werkzeug.contrib.fixers import ProxyFix

app = Flask(__name__)
app.wsgi_app = ProxyFix(app.wsgi_app)


@app.context_processor
def set_buster():
    return {'bust': read_text('resources', 'revision.txt').strip()}


@app.route('/')
def index():
    g.curr = 'index'
    return render_template('index.j2')


@app.route('/sites/')
def sites():
    g.curr = 'sites'
    with path('resources', 'db.sqlite') as db:
        con = sqlite3.connect(str(db))
    con.row_factory = sqlite3.Row
    cur = con.execute('''
        SELECT slug, title, ssl, link, source, blurb
        FROM sites
        WHERE display=1
        ORDER BY sort
    ''')
    folios = cur.fetchall()
    return render_template('sites.j2', folios=folios)


@app.route('/tools/')
def tools():
    g.curr = 'tool-ind'
    return render_template('tools.j2')


@app.route('/tools/<tool>')
def tool(tool):
    g.curr = ' '.join(['tools', tool])
    if tool in ['dicer', 'hasher']:
        return render_template(tool + '.j2')
    else:
        return page_not_found()


@app.route('/tools/dicer/<flavor>/<int:length>')
def dicer(flavor, length):
    with open_text('resources.lists', flavor + '.txt') as f:
        words = f.read().splitlines()
    seq = [choice(words) for i in range(length)]
    phrases = {
        'hy': '-'.join(seq),
        'sp': ' '.join(seq),
        'so': ''.join(seq)
    }
    response = jsonify(phrases)
    response.headers['Cache-Control'] = 'no-store, no-cache'
    return response


@app.route('/tools/hasher/<path:victim>')
def hasher(victim):
    venc = victim.encode('utf-8')
    hashes = {}
    for h in ['md5', 'sha1', 'sha256', 'sha512']:
        hashes[h] = getattr(hashlib, h)(venc).hexdigest()
    response = jsonify(hashes)
    response.headers['Cache-Control'] = 'no-store, no-cache'
    return response


@app.errorhandler(404)
def page_not_found(e=None):
    g.curr = 'err'
    return render_template('base.j2',
                           e404=Markup('<img src="https://http.cat/404.jpg">')
                           ), 404
