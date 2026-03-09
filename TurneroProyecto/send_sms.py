from twilio.rest import Client

def sendsms():
    account_sid = '#'
    auth_token = '#'
    client = Client(account_sid, auth_token)

    message = client.messages.create(
        to='+573217171562'
    )

    print(message.sid)