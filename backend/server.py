
from fastapi import FastAPI, APIRouter, HTTPException
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os, uuid
from pathlib import Path
from pydantic import BaseModel, Field, ConfigDict
from typing import List
from datetime import datetime, timezone
ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')
import certifi
client = AsyncIOMotorClient(os.environ['MONGO_URL'], tls=True, tlsCAFile=certifi.where())
db = client[os.environ['DB_NAME']]
app = FastAPI()
api_router = APIRouter(prefix="/api")
class Game(BaseModel):
    model_config = ConfigDict(extra="ignore")
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    title: str
    htmlCode: str
    created_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))
class GameCreate(BaseModel):
    title: str
    htmlCode: str
@api_router.get("/")
async def root():
    return {"message": "OK"}
@api_router.get("/games", response_model=List[Game])
async def get_games():
    games = await db.games.find({}, {"_id": 0}).to_list(1000)
    for g in games:
        if isinstance(g.get('created_at'), str):
            g['created_at'] = datetime.fromisoformat(g['created_at'])
    return games
@api_router.post("/games", response_model=Game)
async def create_game(gi: GameCreate):
    game = Game(title=gi.title, htmlCode=gi.htmlCode)
    doc = game.model_dump()
    doc['created_at'] = doc['created_at'].isoformat()
    await db.games.insert_one(doc)
    return game
@api_router.delete("/games/{game_id}")
async def delete_game(game_id: str):
    r = await db.games.delete_one({"id": game_id})
    if r.deleted_count == 0:
        raise HTTPException(status_code=404, detail="Not found")
    return {"message": "Deleted"}
app.include_router(api_router)
app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)
