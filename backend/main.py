from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from models import *

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def read_root() -> dict:
    return {"message": "hello world!"}

@app.post("/items/{item}")
def register_item(item: Item) -> dict:
    return {"recieved": Item}