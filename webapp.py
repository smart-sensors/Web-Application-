from flask import Flask, render_template

app = Flask(__name__)

@app.route('/')
def brokersetup():
    return render_template('brokersetup.html')

@app.route('/index.html')
def index():
    return render_template('index.html')

@app.route('/setup')
def setup():
    return render_template('setup.html')
a
if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0')
