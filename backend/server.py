import resend
import os
from flask import Flask, request, jsonify
from dotenv import load_dotenv
from datetime import datetime
from flask_cors import CORS
import boto3
from boto3.dynamodb.conditions import Key
import json

load_dotenv()
resend.api_key = os.environ["RESEND_API_KEY"]
app = Flask(__name__)
CORS(app)
dynamodb = boto3.resource("dynamodb")
tableName = "resend-app"
table = dynamodb.Table(tableName)
with open("./email.html") as file:
    html = file.read()
with open("./zodiacs.json") as file:
    zodiacs_dict = json.load(file)


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

        for record in data:
            if record["private"]:
                for key in record:
                    original = record[key]
                    if isinstance(original, str):
                        redacted = "*" * len(original)
                        record[key] = redacted
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
    target_name = req_data.get("target_name")
    target_zodiac = req_data.get("target_zodiac")
    private = req_data.get("private")
    if not all([name, target_name, private is not None]):
        return jsonify({"error": "Missing required fields"}), 400

    defaultParams = {
        "sent": False,
        "timestamp": timestamp,
        "ALL": "ALL",
    }
    try:
        response = table.put_item(
            Item={
                "name": name,
                "target_name": target_name,
                "target_zodiac": target_zodiac,
                "private": private,
                **defaultParams,
            }
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
    target_email = req_data.get("target_email")
    target_name = req_data.get("target_name")
    target_zodiac = req_data.get("target_zodiac")
    if not all([name, target_email, target_name]):
        return jsonify({"error": "Missing required fields"}), 400

    # Get Copy Data
    zodiac_copy = zodiacs_dict[target_zodiac]

    # Send Email
    greeting_subject = f"{name} wishes you a Happy Year of the Dragon!"
    greeting_email = html.format(
        name=name, target_name=target_name, zodiac_copy=zodiac_copy
    )

    params = {
        "from": "Gratitudes <darenhua@happyyearofthedragon.com>",
        "to": target_email,
        "subject": greeting_subject,
        "html": greeting_email,
    }

    try:
        res = resend.Emails.send(params)
        return jsonify(res), 200
    except Exception as e:
        print(e)
        return jsonify({"error": "Error sending resend mail"}), 500


if __name__ == "__main__":
    app.run()
