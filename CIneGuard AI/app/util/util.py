import numpy as np


def segment_text(text:str,chunk_size=500,chunk_overlap=50):
  chunks = []

  start = 0
  while start < len(text):
    end = start + chunk_size
    chunk = text[start:end].strip()

    if chunk:
      chunks.append(chunk)

    start += chunk_size - chunk_overlap

  return chunks


def cosine_similarity(vector_a, vector_b):
  return np.dot(vector_a, vector_b) / (
    np.linalg.norm(vector_a) * np.linalg.norm(vector_b)
  )


def group_rows(ids, documents, metadatas):

  return [
    {
      "id": chunk_id,
      "document": document,
      "metadata": metadata
    }
    for chunk_id, document, metadata
    in zip(ids, documents, metadatas)
  ]


def merge_section_chunk_ids(
  semantic_chunks,
  keyword_chunks
):
  return {
    section: list(
      set(semantic_chunks[section]) |
      set(keyword_chunks[section])
    )
    for section in semantic_chunks
  }