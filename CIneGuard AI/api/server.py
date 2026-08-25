from fastapi import FastAPI, HTTPException, Response
from pydantic import BaseModel
from app.main import generate_movie_guide,query_movie_script_semantically,reset_conversation_history,delete_movie_by_id

api_app = FastAPI(title="CineGuard AI API")


class GenerateGuideRequest(BaseModel):
  script: str

class QueryMovieRequest(BaseModel):
  query: str


@api_app.post("/movies/{movie_id}/generate_guide")
def create_movie_guide(movie_id:int,request: GenerateGuideRequest):
  try:
    guide = generate_movie_guide(request.script, movie_id)
    return guide
  except Exception as e:
    raise HTTPException(status_code=500, detail=str(e))


@api_app.post("/movies/{movie_id}/query")
def query_movie(movie_id:int,request: QueryMovieRequest):
  try:
    answer = query_movie_script_semantically(request.query, movie_id)
    return {'answer':answer}
  except Exception as e:
    raise HTTPException(status_code=500, detail=str(e))


@api_app.put("/movies/{movie_id}/reset-conversation")
def reset_conversation(movie_id:int):
  try:
    reset_conversation_history(movie_id)
    return Response(status_code=200)
  except Exception as e:
    raise HTTPException(status_code=500, detail=str(e))



@api_app.delete("/movies/{movie_id}")
def delete_movie(movie_id:int):
  try:
    delete_movie_by_id(movie_id)
    return Response(status_code=200)
  except Exception as e:
    raise HTTPException(status_code=500, detail=str(e))