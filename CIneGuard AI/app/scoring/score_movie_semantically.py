from ..embeddings.embed import embed_list
from ..database_operations.movie_script_crud import update_chunks_scores,get_movie_chunks_embeddings
from ..util.constants import SECTION_QUERIES
from ..util.util import cosine_similarity


def calculate_section_score_for_chunks_and_update_vector_db(movie_id):

  print("Fetching the chunks of the movie ID: "+ str(movie_id))
  result = get_movie_chunks_embeddings(movie_id)
  chunk_ids = result["ids"]
  chunk_embeddings = result["embeddings"]
  print("Fetched "+str(len(chunk_ids))+" chunks")

  print("Embedding section queries")
  section_embeddings=embed_sections_queries()
  print("Embedded section queries into "+ str(len(section_embeddings))+" embeddings")


  sections_scores = []

  print("Comparing section embeddings to the movie chunks embeddings")
  for chunk_embedding in chunk_embeddings:
    compare_sections_to_chunk_and_set_scores(sections_scores,chunk_embedding,section_embeddings)
  print("Compared section embeddings to the movie chunks embeddings")

  print("Setting the section semantic scores for each chunk in the database")
  update_chunks_scores(
    chunk_ids,
    sections_scores
  )
  print("Successfully set the section semantic scores for each chunk in the database")



def compare_sections_to_chunk_and_set_scores(sections_scores,chunk_embedding,section_embeddings):
    scores = {}

    for section, query_embeddings in section_embeddings.items():
      compare_section_to_chunk_and_set_max_score(scores,chunk_embedding,query_embeddings,section)

    sections_scores.append(scores)


def compare_section_to_chunk_and_set_max_score(scores,chunk_embedding,query_embeddings,section):
  similarities = [
    cosine_similarity(
      chunk_embedding,
      query_embedding
    )
    for query_embedding in query_embeddings
  ]

  scores[section] = max(similarities)


def embed_sections_queries():
  section_embeddings = {
    section: embed_list(queries)
    for section, queries in SECTION_QUERIES.items()
  }

  return section_embeddings