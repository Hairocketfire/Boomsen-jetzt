import google.cloud.dialogflow_v2 as dialogflow
from google.oauth2.service_account import Credentials
from google.cloud import texttospeech
import playsound as ps
import requests
import subprocess
import whisper
import wavio as wv
import time
import pyttsx3
import pyaudio
import wave
import requests
import json

def foo():
    return "
            api_key = "b2874bab4efee9c70be3407a31e97c1c"
                # location

                weather_url = (
                    f"http://api.openweathermap.org/data/2.5/weather?q={location}&appid={api_key}"
                )
                weather_response = requests.get(weather_url)
                weather_data = weather_response.json()

                if weather_response.status_code == 200:
                    weather_data = weather_response.json()

                    temperature = weather_data["main"]["temp"] - 273.15
                    temperature = round(temperature, 2)

                    response = "Die aktuelle Temperatur beträgt " + str(temperature) + " Grad Celsius."


                    humidity = weather_data["main"]["humidity"]
                    wind_speed = weather_data["wind"]["speed"]

                    print("----------------")
                    print("Temperatur: " + str(temperature) + " °C")
                    print("Luftfeuchtigkeit: " + str(humidity) + "%")
                    print("Windgeschwindigkeit: " + str(wind_speed) + "m/s")

                else:
                    print("Fehler beim Abrufen des Wetters: " + weather_response.text)

                    print(weather_response)
            
            
