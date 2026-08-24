from ..database_operations.movie_script_crud import get_movie_chunks_by_ids 
from ..clients.llm_client import ask_llm
from ..util.constants import LLM_SYSTEM_PROMPT

def generate_movie_section_guide(section_chunks_ids,section_name):

  result = get_movie_chunks_by_ids(section_chunks_ids)
  texts = result["documents"]

  print("SECTION: "+ section_name+" Final Retreived Chunks")
  print(texts)

  payload={
"sectionName":section_name,
"retrievedDocuments": texts
  }

  llm_response= ask_llm(LLM_SYSTEM_PROMPT,payload)

  confidence=llm_response["confidence"] if llm_response["confidence"] is not None else 'Low'

  print("LLM responded with a confidence:" + confidence)

  descriptions= llm_response["descriptions"] if llm_response["descriptions"] is not None else []

  return descriptions
