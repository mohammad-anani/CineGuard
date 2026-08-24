namespace CineGuard_Backend.Data.DbContextStore
{
    public class Movie
    {
        public int Id { get; set; }
        public string Name { get; set; } = null!;

        public string ScriptPath { get; set; } = null!;

        public IEnumerable<MovieGuideSection> MovieGuideSections { get; set; } = new List<MovieGuideSection>();
    }
}