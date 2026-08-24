from ..database_operations.movie_script_crud import update_chunks_scores, get_movie_chunks
from ..util.constants import SECTION_KEYWORDS,SECTION_KEYWORD_SCORE_DATABASE_KEYS
import re
import math

#   for chunk_embedding in chunk_embeddings:
#     compare_sections_to_chunk_and_set_scores(sections_scores,chunk_embedding,section_embeddings)
#   print("Compared section embeddings to the movie chunks embeddings")

#   print("Setting the section scores for each chunk in the database")
#   update_chunks_scores(
#     chunk_ids,
#     sections_scores
#   )
#   print("Successfully set the section scores for each chunk in the database")

def calculate_section_keyword_score_for_chunks_and_update_vector_db(movie_id):

    print("Fetching the chunks of the movie ID: "+ str(movie_id))
    result = get_movie_chunks(movie_id)
    chunk_ids = result["ids"]
    chunk_documents = result["documents"]
    print("Fetched "+str(len(chunk_ids))+" chunks")

    sections_scores = []

    print("Searching for section keywords in the movie chunks documents")
    for chunk_document in chunk_documents:
        compare_sections_to_chunk_and_set_keyword_scores(
            sections_scores,
            chunk_document
        )
    print("Searched for section keywords in the movie chunks documents")

    print("Setting the section keyword scores for each chunk in the database")
    update_chunks_scores(
        chunk_ids,
        sections_scores,
        SECTION_KEYWORD_SCORE_DATABASE_KEYS
    )
    print("Successfully set the section keyword scores for each chunk in the database")


def compare_sections_to_chunk_and_set_keyword_scores(
    sections_scores,
    chunk_document
):
    scores = {}

    for section, keywords in SECTION_KEYWORDS.items():

        compare_section_to_chunk_and_set_keyword_score(
            scores,
            chunk_document,
            keywords,
            section
        )

    sections_scores.append(scores)


def keyword_exists(text, keyword):
    pattern = rf"\b{re.escape(keyword.lower())}\b"
    return re.search(pattern, text.lower()) is not None


def compare_section_to_chunk_and_set_keyword_score(
    scores,
    chunk_document,
    keywords,
    section
):
    matched_keywords = [
        keyword
        for keyword in keywords
        if keyword_exists(chunk_document, keyword)
    ]

    match_count = len(matched_keywords)

    score = 1 - math.exp(-match_count)

    scores[section] = score