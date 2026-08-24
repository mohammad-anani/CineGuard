from .function_containers.generate_guide import generate_guide
from .function_containers.process_movie import process_movie
from .query_movie.retreive_chunks import retreive_chunks
from .query_movie.analyze_chunks import analyze_chunks,prepare_query

def generate_movie_guide(script: str, movie_id: int):

  merged_section_filtered_chunks_ids=process_movie(script,movie_id)

  movie_sections_guide=generate_guide(merged_section_filtered_chunks_ids)

  return movie_sections_guide



history={}
def query_movie_script_semantically(query:str, movie_id: int):

  new_query=query

  if len(history) != 0:
    print("Rewriting query: "+ query)
    new_query= prepare_query(query,history)
    print("Rewriting query succeeded. Final query: "+ new_query)

  print("Retreiving chunks from database for movie ID: "+ str(movie_id) + " and query:" + new_query)
  retreived_chunks=retreive_chunks(new_query,movie_id)
  print("Retreived "+str(len(retreived_chunks))+" chunks")

  print("Passing chunks to LLM")
  answer= analyze_chunks(new_query,retreived_chunks,history)
  print("Got answer from LLM")

  print("Adding conversation to history")
  history.setdefault(movie_id, []).append({
    "userQuery": query,
    "llmAnswer": answer
  })
  
  return answer


def reset_conversation_history(movie_id):
  history[movie_id].clear()


# if __name__ == "__main__":
#   generate_movie_guide(get_text(), 3)

