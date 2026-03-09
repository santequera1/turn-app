from twilio.rest import Client
from django.conf import settings
from .forms import TurnoForm
from .models import Turno 



def sendsms(numero_telefono, nombre, motocicleta):
    account_sid = 'ACe7a057609a825f9966c7490f97a62726'
    auth_token = '9b701d4310ed4bc4c8b11596cf29bb52'
    client = Client(account_sid, auth_token)
    mensaje = "¡Hola " + nombre + "! Tienes un turno asignado en Motos Top para tu motocicleta: " + motocicleta"
    
    message = client.messages.create(
        body=mensaje,
        from_='whatsapp:+14155238886',
        to='whatsapp:+57' + numero_telefono
    )

    print(message.sid)
    print(message)
