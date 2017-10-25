import hashlib
import json
import sqlite3

from flask import Flask
from flask import Markup
from flask import g
from flask import render_template
from random import SystemRandom

choice = SystemRandom().choice
app = Flask(__name__)


@app.context_processor
def set_cdn():
    cdn = '//d22gru0dpurf8t.cloudfront.net' if not app.debug else ''
    return {'cdn': cdn}


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


@app.route('/tools/')
def tools():
    g.curr = 'tool-ind'
    return render_template('tools.j2')


@app.route('/tools/<tool>/')
def tool(tool):
    g.curr = ' '.join(['tools', tool])
    if tool in ['dicer', 'hasher']:
        return render_template(tool + '.j2')
    else:
        return page_not_found()


@app.route('/tools/dicer/<flavor>/<int:length>')
def dicer(flavor, length):
    with open('lists/' + flavor + '.txt') as f:
        words = f.read().splitlines()
    seq = [choice(words) for i in range(length)]
    phrases = {
        'hy': '-'.join(seq),
        'sp': ' '.join(seq),
        'so': ''.join(seq)
    }
    return json.dumps(phrases)


@app.route('/tools/hasher/<path:victim>')
def hasher(victim):
    venc = victim.encode('utf-8')
    hashes = {}
    for h in ['md5', 'sha1', 'sha256', 'sha512']:
        hashes[h] = getattr(hashlib, h)(venc).hexdigest()
    return json.dumps(hashes)


@app.errorhandler(404)
def page_not_found():
    g.curr = 'err'
    return render_template('base.j2',
                           e404=Markup('<img src="https://http.cat/404.jpg">')
                           ), 404


# for elastic beanstalk
application = app
