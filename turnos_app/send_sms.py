from twilio.rest import Client
from twilio.base.exceptions import TwilioRestException
from django.conf import settings
from .forms import TurnoForm
from .models import Turno 

def sendsms(numero_telefono, nombre, motocicleta,numero_turno_agendado):
    # Configura las credenciales de Twilio desde tu archivo settings.py
    account_sid = 'ACe7a057609a825f9966c7490f97a62726'
    auth_token = '8d9afaa431a0f9913c310a1d35ec9883'

    try:
        # Crea el cliente Twilio
        client = Client(account_sid, auth_token)

        # Crea el mensaje
        mensaje = f"¡Hola {nombre}! Tienes el turno #{numero_turno_agendado} asignado en Motos Top para tu motocicleta: {motocicleta}"

        #Enviar mensaje
        message = client.messages.create(
            messaging_service_sid='MGef4db2afb4916c4fbb61fc86ae837a51',
        body=mensaje,
        to='+57' + numero_telefono
        )

        # Imprime el SID del mensaje en la consola (opcional)
        print(f"Mensaje enviado SID: {message.sid}")
        print(f"Mensaje enviado: {message}")

    except TwilioRestException as e:
        # Manejar la excepción de Twilio, puedes imprimir un mensaje de error o realizar alguna acción específica
        print(f"Error al enviar el mensaje a {numero_telefono}: {e}")


