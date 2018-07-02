import application

from livereload import Server

app = application.app
app.debug = True
server = Server(app.wsgi_app)

server.watch('application.py')
server.watch('static/dist')
server.watch('static/img')
server.watch('templates')
server.watch('content')
server.serve()
