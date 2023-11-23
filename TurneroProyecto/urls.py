from django.contrib import admin
from django.urls import path, include
from turnos_app import views  # Importa las vistas de la aplicación turnos_app

urlpatterns = [
    path('admin/', admin.site.urls),
    path('', views.pagina_principal, name='pagina_principal'),  # Usa el nombre correcto de la vista
    path('agendar-turno/', include('turnos_app.urls')),
]
