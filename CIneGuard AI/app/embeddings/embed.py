from sentence_transformers import SentenceTransformer

model = SentenceTransformer("all-MiniLM-L6-v2")

def embed_list(text_list):
  embeddings = model.encode(
    text_list,
    convert_to_numpy=True
  ).tolist()

  return embeddings


def embed(text):
  embedding = model.encode(
      [text],
      convert_to_numpy=True
  )[0]

  return embedding