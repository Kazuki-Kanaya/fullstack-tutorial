import uvicorn
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.encoders import jsonable_encoder
from transformers import pipeline
from database import collection

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
    await collection.insert_one({
        "text": input.text,
        "label": result["label"],
        "score": result["score"]
    })
    return {
        "label": result["label"],
        "score": round(result["score"], 4)
    }

@app.get("/results")
async def get_results():
    results = []
    async for doc in collection.find():
        doc["_id"] = str(doc["_id"])
        results.append(doc)
    return jsonable_encoder(results)

@app.delete("/results")
async def delete_results():
    result = await collection.delete_many({})
    if result.acknowledged:
        return {"message": f"{result.deleted_count} 件の履歴を削除しました"}
    else:
        return {"message": "削除に失敗しました"}
