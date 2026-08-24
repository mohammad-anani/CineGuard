from ..embeddings.embed_movie import process_movie_script_into_vector_db

from ..scoring.score_movie_semantically import calculate_section_score_for_chunks_and_update_vector_db
from ..scoring.score_movie_by_keywords import calculate_section_keyword_score_for_chunks_and_update_vector_db

from ..filtering.filter_movie_chunks import get_sections_filtered_chunk_ids

from ..util.util import group_rows, merge_section_chunk_ids
from ..util.constants import SECTION_KEYWORD_SCORE_DATABASE_KEYS,SECTION_SCORE_DATABASE_KEYS, CHUNK_SCORE_THRESHOLD


def process_movie(script,movie_id):
  print("Received movie with ID: "+ str(movie_id)+ " and Script first 100 chars:" + script[0:100])


  # Movie embedded in db
  print("Starting script processing(chunking, embedding, storing into vector db)")
  process_movie_script_into_vector_db(script, movie_id)
  print("Finished script processing into vector db")


  # Movie chunks scored by each section, and stored in metadatas field of db, semantically and by keyword
  print("Calculating movie chunks semantic scores for each guide section and setting them in vector db")
  calculate_section_score_for_chunks_and_update_vector_db(movie_id)
  print("Finished calculating movie chunks semantic scores")

  print("Calculating movie chunks keyword scores for each guide section and setting them in vector db")
  calculate_section_keyword_score_for_chunks_and_update_vector_db(movie_id)
  print("Finished calculating movie chunks keyword scores")


  # Filter chunks by a threshold to eliminate low matches
  print("Filtering semantically retreived chunks by a threshold of "+ str(CHUNK_SCORE_THRESHOLD))
  section_semantic_filtered_chunks_ids = get_sections_filtered_chunk_ids(
    movie_id,CHUNK_SCORE_THRESHOLD, SECTION_SCORE_DATABASE_KEYS
  )
  print("Finished filtering semantically retreived chunks. Resulting chunks list length "+ str(len(section_semantic_filtered_chunks_ids)))


  print("Filtering keyword retreived chunks by a threshold of "+ str(0.4))  
  section_keyword_filtered_chunks_ids = get_sections_filtered_chunk_ids(
    movie_id, CHUNK_SCORE_THRESHOLD,SECTION_KEYWORD_SCORE_DATABASE_KEYS
  )
  print("Finished filtering keyword retreived chunks. Resulting chunks list length "+ str(len(section_keyword_filtered_chunks_ids)))


  # Merge both lists
  print("Merging semantically and keyword retreived chunks lists into one list(using union)")
  merged_section_filtered_chunks_ids=merge_section_chunk_ids(section_semantic_filtered_chunks_ids,section_keyword_filtered_chunks_ids)
  print("Finished merging semantically and keyword retreived chunks lists. Resulting chunks list length: " + str(len(merged_section_filtered_chunks_ids)) )


  return merged_section_filtered_chunks_ids

