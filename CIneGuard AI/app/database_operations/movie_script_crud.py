from ..clients.chroma_client import insert_chunks,update_metadatas, get, query_table,delete
from ..database_operations.movie_script_crud_helpers import prepare_ids,prepare_insert_metadatas,prepare_update_metadatas
from ..util.constants import SECTION_SCORE_DATABASE_KEYS

def insert_movie_script_embeddings(movie_id, chunks, embeddings):

  ids = prepare_ids(movie_id, len(chunks))
  
  metadatas = prepare_insert_metadatas(movie_id, len(chunks))

  insert_chunks(
    "movie_scripts",chunks,embeddings,ids,metadatas
  )


def get_movie_chunks_by_ids(ids):
  result = get(
    "movie_scripts",
   ids=ids,
   include=["documents","metadatas"]
  )

  return result


def get_movie_chunks_embeddings(movie_id):
  result = get(
    "movie_scripts",
    where={"movie_id": movie_id},
    include=["embeddings"]
  )

  return result


def get_movie_chunks(movie_id):
  result = get(
    "movie_scripts",
    where={"movie_id": movie_id},
    include=["documents","metadatas","embeddings"]
  )

  return result


def get_movie_chunks_id_and_metadatas(movie_id):
  result = get(
    "movie_scripts",
    where={"movie_id": movie_id},
    include=["metadatas"]
  )

  return result


def update_chunks_scores(chunk_ids, sections_scores,KEYS=SECTION_SCORE_DATABASE_KEYS):

  result= get(table_name='movie_scripts',ids=chunk_ids,include=["metadatas"])

  existing_metadatas = result["metadatas"]

  new_metadatas=prepare_update_metadatas(existing_metadatas,sections_scores,KEYS)

  update_metadatas('movie_scripts',chunk_ids,new_metadatas)


def query_movie_script(query_embedding, movie_id:int):

  result= query_table("movie_scripts",query_embedding,{"movie_id": movie_id},10)
  print(result)
  return result


def delete_movie(movie_id):
  delete(table_name="movie_scripts",ids=None,where={'movieId':movie_id})

