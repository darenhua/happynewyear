import resend
import os
from flask import Flask, request, jsonify
from dotenv import load_dotenv
from datetime import datetime
from flask_cors import CORS
import boto3
from boto3.dynamodb.conditions import Key

load_dotenv()
resend.api_key = os.environ["RESEND_API_KEY"]
app = Flask(__name__)
CORS(app)
dynamodb = boto3.resource("dynamodb")
tableName = "resend-app"
table = dynamodb.Table(tableName)
timestamp = datetime.now().strftime("%Y-%m-%d %H:%M:%S")


@app.route("/history/<name>/<timestamp>", methods=["PATCH"])
def updateSent(name, timestamp):
    try:
        table.update_item(
            Key={"name": name, "timestamp": timestamp},
            UpdateExpression="set sent = :s",
            ExpressionAttributeValues={":s": True},
            ReturnValues="UPDATED_NEW",
        )
        return jsonify({"message": "Email sent status updated successfully"}), 200
    except Exception as e:
        print(e)
        return jsonify({"error": "Error updating item in DynamoDB"}), 500


@app.route("/history")
def getEmails():
    try:
        # GET ALL items from dynamodb, 2000 items
        response = table.query(
            IndexName="pagination",
            KeyConditionExpression=Key("ALL").eq("ALL"),
            ScanIndexForward=False,  # This sorts the results in descending order
            Limit=2000,
        )
        data = response["Items"]
        return jsonify(data), 200
    except Exception as e:
        print(e)
        return jsonify({"error": "Error fetching data from DynamoDB"}), 500


@app.route("/history", methods=["POST"])
def insertEmail():
    timestamp = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
    req_data = request.json

    # Validate request data
    name = req_data.get("name")
    target = req_data.get("target")
    private = req_data.get("private")
    if not all([name, target, private is not None]):
        return jsonify({"error": "Missing required fields"}), 400

    defaultParams = {
        "sent": False,
        "timestamp": timestamp,
        "ALL": "ALL",
    }
    try:
        response = table.put_item(
            Item={"name": name, "target": target, "private": private, **defaultParams}
        )
        return (
            jsonify(
                {
                    "message": "Email record inserted successfully",
                    "timestamp": timestamp,
                    "response": response,
                }
            ),
            201,
        )

    except Exception as e:
        print(e)
        return jsonify({"error": "Error inserting data from DynamoDB"}), 500


@app.route("/email", methods=["POST"])
def sendEmail():
    # Get JSON Body
    req_data = request.json

    # Validate request data
    name = req_data.get("name")
    target = req_data.get("target")
    if not all([name, target]):
        return jsonify({"error": "Missing required fields"}), 400

    # Send Email
    greeting_subject = f"Happy Chinese New Year {name}"

    params = {
        "from": "Daren <darenhua@happyyearofthedragon.com>",
        "to": target,
        "subject": greeting_subject,
        "html": "<div><p>hi</p> <p>daren</p></div>",
    }

    try:
        res = resend.Emails.send(params)
        return jsonify(res), 200
    except Exception as e:
        print(e)
        return jsonify({"error": "Error sending resend mail"}), 500


if __name__ == "__main__":
    app.run()
