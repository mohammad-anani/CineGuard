from ..clients.llm_client import ask_llm
from ..util.constants import RAG_LLM_SYSTEM_PROMPT, QUERY_REWRITE_SYSTEM_PROMPT

def analyze_chunks(query,documents,history):

  payload={'userQuery':query,'retreivedDocuments':documents,'conversationHistory':history}

  response= ask_llm(RAG_LLM_SYSTEM_PROMPT,payload)

  answer= response["answer"] if response['answer'] is not None else "Could not retreive answer"
  print("LLM Responded with: " +answer)


  return answer


def prepare_query(query,history):
  payload={'query':query, 'conversationHistory':history}

  response= ask_llm(QUERY_REWRITE_SYSTEM_PROMPT,payload)

  new_query= response["query"] if response['query'] is not None else query
  print("LLM Responded with: " +new_query)


  return new_query