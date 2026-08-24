from ..movie_guide_operations.generate_movie_guide import generate_movie_section_guide
from ..movie_guide_operations.compute_section_level import compute_section_level

def generate_guide(merged_section_filtered_chunks_ids):

  movie_sections_guide={}

  print("Starting generating movie guide based on final filtered merged chunks list, using a LLM, for each section")
  for section_name,chunks_ids in merged_section_filtered_chunks_ids.items():

    print("Generating movie guide for section: "+ section_name + " with "+ str(len(chunks_ids)) +" chunks")
    guide_list= generate_movie_section_guide(chunks_ids,section_name)
    print("Generated movie guide. Resulting list length: " + str(len(guide_list)))

    print("Computing overall severity level for section: "+ section_name)
    section_level=compute_section_level(guide_list)
    print("Computed overall severity level : "+ section_level)

    movie_sections_guide[section_name]= {
    'severityLevel':section_level,
    'descriptions': guide_list
        }

  print("Finished processing the movie script. Resulting movie guide:") 
  print(movie_sections_guide)

  return movie_sections_guide
