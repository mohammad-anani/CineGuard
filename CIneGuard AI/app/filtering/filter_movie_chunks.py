from ..database_operations.movie_script_crud import get_movie_chunks_id_and_metadatas
from ..util.constants import SECTION_SCORE_DATABASE_KEYS


def get_sections_filtered_chunk_ids(movie_id,threshold=0.4,KEYS=SECTION_SCORE_DATABASE_KEYS):

  print("Fetching chunks for movie ID: "+ str(movie_id) )
  result=get_movie_chunks_id_and_metadatas(movie_id)
  ids=result["ids"]
  metadatas=result["metadatas"]
  print("Fetched "+str(len(ids))+" chunks")

  section_chunks={}

  print("Passing through chunks of each section and filtering them based on the threshold")
  for section_name in KEYS.keys():
    filtered_ids= filter_movie_chunks_by_section_score_threshold(ids,metadatas,section_name,threshold,KEYS)
    section_chunks[section_name]=filtered_ids
  print("Filtered the sections chunks")
  

  return section_chunks



def filter_movie_chunks_by_section_score_threshold(ids,metadatas,section,threshold,KEYS=SECTION_SCORE_DATABASE_KEYS):
  section_key=KEYS[section]

  filtered_ids=[]

  for chunk_id,metadata in zip(ids,metadatas):
    section_score=metadata.get(section_key)

    if section_score>=threshold:
      filtered_ids.append(chunk_id)

  return filtered_ids
