<p align="center">
    <h1 align="center">Backend</h1>
</p>
<p align="center">
    <em>Flask api for Year of the Dragon site... in case anyone would possibly ever want to contribute to this. </em>
</p>

## Getting Started

**_Requirements_**

Ensure you have the following ready:

-   **Python**: `version 3.0.0+`
-   **Resend**: `acc created and api key obtained`
-   **AWS CLI**: `aws configure completed`

### Setup

1. Change to the backend directory:

```sh
cd backend
```

2. Install the dependencies:

```sh
pip install -r requirements.txt
```

3. Create .env file

```sh
touch .env
```

4. Add the following lines to the .env file

```sh
FLASK_APP=server.py
RESEND_API_KEY=<YOUR RESEND API KEY HERE>
```

### Running `happynewyear`

Use the following command to run happynewyear:

```sh
flask --debug run -p 8080
```

## Misc

Reach out to me (Daren Hua) via email if you actually want to work more on this app with me! You can leave a github issue and we can start communicating..
