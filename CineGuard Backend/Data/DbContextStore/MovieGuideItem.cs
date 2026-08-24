using System.Text.Json.Serialization;

namespace CineGuard_Backend.Data.DbContextStore
{
    public class MovieGuideItem
    {
        public int Id { get; set; }

        public int SectionId { get; set; }

        public string Description { get; set; } = null!;

        public enSeverityLevels SeverityLevel { get; set; }

        [JsonIgnore]
        public MovieGuideSection? MovieGuideSection { get; set; }
    }
}