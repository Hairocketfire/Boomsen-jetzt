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

Das ist ein Test

CHUNK = 1024
FORMAT = pyaudio.paInt16
CHANNELS = 2
RATE = 44100
RECORD_SECONDS = 5
WAVE_OUTPUT_FILENAME = "recording1.wav"

p = pyaudio.PyAudio()

stream = p.open(
    format=FORMAT, channels=CHANNELS, rate=RATE, input=True, frames_per_buffer=CHUNK
)

print("* recording")

frames = []

for i in range(0, int(RATE / CHUNK * RECORD_SECONDS)):
    data = stream.read(CHUNK)
    frames.append(data)

print("* done recording")

stream.stop_stream()
stream.close()
p.terminate()

wf = wave.open(WAVE_OUTPUT_FILENAME, "wb")
wf.setnchannels(CHANNELS)
wf.setsampwidth(p.get_sample_size(FORMAT))
wf.setframerate(RATE)
wf.writeframes(b"".join(frames))
wf.close()


model = whisper.load_model("small")
result = model.transcribe("recording1.wav")
print(result["text"])

txt_info = result["text"]


# Dialogflow credentials
credentials = Credentials.from_service_account_file("Otto.json")

session_client = dialogflow.SessionsClient(
    credentials=credentials,
)

session = session_client.session_path("otto-bnct", "unique_session_id")
text_input = dialogflow.types.TextInput(text=txt_info, language_code="de-DE")
query_input = dialogflow.types.QueryInput(text=text_input)
response = session_client.detect_intent(session=session, query_input=query_input)

print("=" * 20)
print("Query text: {}".format(response.query_result.query_text))
print(
    "Detected intent: {} (confidence: {})\n".format(
        response.query_result.intent.display_name,
        response.query_result.intent_detection_confidence,
    )
)
print("Fulfillment text: {}\n".format(response.query_result.fulfillment_text))

output_speech = open("output_speech.wav", "wb")
output_speech.write(response.output_audio)
output_speech.close()

ps.playsound("output_speech.wav")
intent = response.query_result.intent.display_name
location = response.query_result.parameters.get("location").get("city")


if intent == "Wetter" and location != "":
    import A


def bar():
    print(A.foo())


bar()
