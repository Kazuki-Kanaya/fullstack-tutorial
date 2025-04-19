import uvicorn
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from transformers import pipeline
from database import db

from models import TextInput

classifier = pipeline("sentiment-analysis")

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "http://127.0.0.1:5173",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def read_root() -> dict:
    return {"message": "hello world!"}

@app.get("/message")
def hello() -> dict:
    return {"message": "hello FastAPI!"}


@app.post("/predict")
async def predict_sentiment(input: TextInput):
    result = classifier(input.text)[0]
    await db.items.insert_one({
        "text": input.text,
        "label": result["label"],
        "score": result["score"]
    })
    return {
        "label": result["label"],
        "score": round(result["score"], 4)
    }