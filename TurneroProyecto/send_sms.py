from twilio.rest import Client

def sendsms():
    account_sid = 'ACe7a057609a825f9966c7490f97a62726'
    auth_token = '9b701d4310ed4bc4c8b11596cf29bb52'
    client = Client(account_sid, auth_token)

    message = client.messages.create(
        to='+573217171562'
    )

    print(message.sid)