from ..util.constants import SECTION_SCORE_DATABASE_KEYS

def prepare_ids(movie_id, number_of_chunks):
  return [
    f"movie_{movie_id}_chunk_{i}"
    for i in range(number_of_chunks)
  ]


def prepare_insert_metadatas(movie_id, number_of_chunks):
  return [
    {
      "movie_id": movie_id,
      "chunk_index": i
    }
    for i in range(number_of_chunks)
  ]


def prepare_update_metadatas(existing_metadatas,sections_scores,KEYS=SECTION_SCORE_DATABASE_KEYS):

  metadatas = []

  for metadata, scores in zip(existing_metadatas, sections_scores):

    metadata = metadata.copy()

    for section, score in scores.items():
      metadata[KEYS[section]] = float(score)

    metadatas.append(metadata)
  return metadatas
