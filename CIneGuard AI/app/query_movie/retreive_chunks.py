from ..embeddings.embed import embed
from ..database_operations.movie_script_crud import query_movie_script


def retreive_chunks(query,movie_id):
  query_embedding= embed(query)

  result=query_movie_script(query_embedding,movie_id)

  documents=result['documents'][0]

  return documents

