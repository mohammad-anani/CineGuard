# import json
# import ollama

# def ask_llm(system_prompt, user_prompt):
#   try:
#   response = ollama.chat(
#     model="qwen3:8b",
#     messages=[
#     {"role": "system", "content": system_prompt},
#     {"role": "user", "content": json.dumps(user_prompt)}
#     ],
#     format="json",
#     options={"temperature": 0.2}
#   )
#   except Exception as e:
#   print(f"Ollama call failed: {e}")
#   return []

#   raw_content = response["message"]["content"]

#   try:
#   return json.loads(raw_content)
#   except json.JSONDecodeError as e:
#   print(f"Failed to parse LLM response as JSON: {e}")
#   print(f"Raw response was: {raw_content[:500]}")  # helps you see what actually came back
#   return []

import json
from google import genai
from google.genai import types
from dotenv import load_dotenv
import os

load_dotenv()

api_key = os.getenv("LLM_API_KEY")

client = genai.Client(api_key=api_key)

def ask_llm(system_prompt, user_prompt):

  try:
    response = client.models.generate_content(
      model="gemini-3.5-flash-lite",
      contents=json.dumps(user_prompt),
      config=types.GenerateContentConfig(
        system_instruction=system_prompt,
        temperature=0.2,
        response_mime_type="application/json"
      )
    )

  except Exception as e:
    print(f"Gemini call failed: {e}")
    return []

  raw_content = response.text

  try:
    return json.loads(raw_content)

  except json.JSONDecodeError as e:
    print(f"Failed to parse LLM response as JSON: {e}")
    print(f"Raw response was: {raw_content[:500]}")
    return {'descriptions':[],'confidence':'Low'}