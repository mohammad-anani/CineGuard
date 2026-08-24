using System.Text.Json.Serialization;

namespace CineGuard_Backend.Data.DbContextStore
{
    public enum enGuideSectionTypes
    {
        Sex_Nudity = 1,
        Violence_Gore = 2,
        Profanity = 3,
        Alcohol_Drugs_Smoking = 4,
        Frightening_Intense_Scenes = 5
    }

    public enum enSeverityLevels
    {
        None = 1,
        Mild = 2,
        Moderate = 3,
        Severe = 4
    }

    public class MovieGuideSection
    {
        public int Id { get; set; }

        public int MovieId { get; set; }

        public enGuideSectionTypes SectionType { get; set; }

        public enSeverityLevels SeverityLevel { get; set; }

        [JsonIgnore]
        public Movie? Movie { get; set; }

        public IEnumerable<MovieGuideItem> MovieGuideItems { get; set; } = new List<MovieGuideItem>();
    }
}