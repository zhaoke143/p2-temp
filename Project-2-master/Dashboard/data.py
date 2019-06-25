import pymongo
from flask import Flask, jsonify
from bson.json_util import dumps

app = Flask(__name__)

conn = 'mongodb://localhost:27017'
client = pymongo.MongoClient(conn)

db = client.record_db
collection = db.item




@app.route("/")
def home():
    print("received request from 'home page'")
    return ("/api/v1.0/terrorism_data")

@app.route("/api/v1.0/terrorism_data")
def data():
    print("received request from 'station page'")
    results = db.item.find()
    # data = dumps(results)
    # return jsonify(data)

    return dumps(results)

   

if __name__=="__main__":
    app.run(debug=True)