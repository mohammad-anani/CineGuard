import chromadb

chroma_client = chromadb.PersistentClient(path="./chroma_db")

def create_chroma_client():
  return chroma_client


def insert_chunks(table_name,chunks,embeddings,ids,metadatas):
  collection = chroma_client.get_or_create_collection(
  name=table_name
  )

  collection.add(
    ids=ids,
    documents=chunks,
    embeddings=embeddings,
    metadatas=metadatas
  )


def get(table_name, ids=None, where=None, include=None):
  collection = chroma_client.get_or_create_collection(
    name=table_name
  )

  kwargs = {}

  if ids is not None:
    kwargs["ids"] = ids

  if where is not None:
    kwargs["where"] = where

  if include is not None:
    kwargs["include"] = include

  return collection.get(**kwargs)
  

def update_metadatas(table_name, ids, metadatas):
  collection = chroma_client.get_or_create_collection(
    name=table_name
  )

  collection.update(
    ids=ids,
    metadatas=metadatas
  )


def query_table(table_name,query_embedding, where, n_results=10):

  collection = chroma_client.get_or_create_collection(table_name)

  results = collection.query(
    query_embeddings=[query_embedding.tolist()],
    where=where,
    n_results=n_results
  )

  return results