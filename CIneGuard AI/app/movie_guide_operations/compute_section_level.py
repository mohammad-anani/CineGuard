from ..util.constants import LEVELS,SECTION_LEVEL_THRESHOLDS


def compute_max_level(descriptions):
  max_level='None'

  if len(descriptions) == 0:
    return max_level

  for desc in descriptions:
    desc_level=desc['severityLevel']

    if desc_level=='Severe':
      return 'Severe'
      
    
    if LEVELS[desc_level] > LEVELS[max_level]:
      max_level=desc_level

  return max_level


def count_levels(descriptions):
  counts = {'Mild': 0, 'Moderate': 0, 'Severe': 0}

  for desc in descriptions:
    desc_level = desc['severityLevel']
    counts[desc_level] += 1

  return counts


def compute_score_level(counts):
  total_score = sum(LEVELS[level_name] * count for level_name, count in counts.items())

  score_level = 'None'

  if total_score >= SECTION_LEVEL_THRESHOLDS['Severe']:
    score_level = 'Severe'
  elif total_score >= SECTION_LEVEL_THRESHOLDS['Moderate']:
    score_level = 'Moderate'
  elif total_score >= SECTION_LEVEL_THRESHOLDS['Mild']:
    score_level = 'Mild'

  return score_level


def compute_section_level(descriptions):

  max_level = compute_max_level(descriptions)

  counts = count_levels(descriptions)
  score_level = compute_score_level(counts)

  final_level = max_level if LEVELS[max_level] > LEVELS[score_level] else score_level

  return final_level