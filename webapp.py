#import modules
from flask import*

app = Flask(__name__)

@app.route('/')
def brokersetup():
    return render_template('brokersetup.html')
@app.route('/homepage')
def index():
    return render_template('index.html')

@app.route('/setup')
def setup():
    return render_template('setup.html')

if __name__ == "__main__":
    app.run(host = '0.0.0.0', port = 5000)
