from  .embed import embed_list
from ..util.util import segment_text
from ..database_operations.movie_script_crud import insert_movie_script_embeddings

def process_movie_script_into_vector_db(script: str, movie_id: int):

  print("Segmenting movie script into chunks")
  chunks= segment_text(script)
  print("Segmented movie script into "+ str(len(chunks))+" chunks")

  print("Embedding the chunks")
  embeddings= embed_list(chunks)
  print("Embedded the chunks")

  print("Inserting the chunks and their data into the vector database")
  insert_movie_script_embeddings(movie_id,chunks,embeddings)
  print("Inserted the chunks into the vector database")
