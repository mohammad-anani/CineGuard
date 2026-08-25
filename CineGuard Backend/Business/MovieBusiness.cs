using CineGuard_Backend.Data;
using CineGuard_Backend.Data.DbContextStore.Entities;
using CineGuard_Backend.ExternalClients;

namespace CineGuard_Backend.Business
{
    public class MoviesBusiness
    {
        private readonly MoviesData _moviesData;
        private readonly MovieGuideSectionsData movieGuideSectionsData;
        private readonly AI_Client aiClient;

        public MoviesBusiness(MoviesData moviesData, MovieGuideSectionsData movieGuideSectionsData, AI_Client aiClient)
        {
            _moviesData = moviesData;
            this.movieGuideSectionsData = movieGuideSectionsData;
            this.aiClient = aiClient;
        }

        public async Task<int> AddMovieAndGenerateGuideAsync(
            string movieName, string movieScript)
        {
            string scriptPath = await SaveScriptAsync(movieScript);

            Movie movie = new Movie
            {
                Id = 0,
                Name = movieName,
                ScriptPath = scriptPath
            };

            var result = await _moviesData.InsertAsync(movie);

            Dictionary<string, MovieGuideSectionResult> movieSections = await aiClient.GenerateGuideAsync(result.Id, movieScript);

            List<MovieGuideSection> movieGuideSections = ConvertToMovieGuideSections(result.Id, movieSections);

            await movieGuideSectionsData.InsertBatchAsync(movieGuideSections);

            return result.Id;
        }

        public async Task<bool> DeleteMovieAsync(int movieId)
        {
            bool localResult = await _moviesData.DeleteMovie(movieId);

            if (localResult)
                return await aiClient.DeleteMovie(movieId);

            return false;
        }

        public async Task<QueryResult> QueryMovieAsync(int movieId, string query)
        {
            return await aiClient.QueryMovieAsync(movieId, query);
        }

        public async Task<List<Movie>> GetAllMoviesAsync()
        {
            return await _moviesData.GetAllAsync();
        }

        public async Task<Movie?> Get(int movieId)
        {
            return await _moviesData.GetByMovieIdAsync(movieId);
        }

        public async Task ResetConversationHistory(int movieId)
        {
            await aiClient.ResetConversationAsync(movieId);
        }

        public async Task<string> SaveScriptAsync(string script)
        {
            if (string.IsNullOrWhiteSpace(script))
                throw new ArgumentException("Script is required.");

            var scriptsFolder = Path.Combine(
                Directory.GetCurrentDirectory(),
                "wwwroot",
                "movies",
                "scripts"
            );

            Directory.CreateDirectory(scriptsFolder);

            var fileName = $"{Guid.NewGuid()}.txt";

            var filePath = Path.Combine(scriptsFolder, fileName);

            await File.WriteAllTextAsync(filePath, script);

            // Path that can be stored in the database
            return $"/movies/scripts/{fileName}";
        }

        public static List<MovieGuideSection> ConvertToMovieGuideSections(int movieId,
    Dictionary<string, MovieGuideSectionResult> guide)
        {
            var sections = new List<MovieGuideSection>();

            foreach (var entry in guide)
            {
                var section = new MovieGuideSection
                {
                    MovieId = movieId,
                    SectionType = entry.Key switch
                    {
                        "Sex & Nudity" => enGuideSectionTypes.Sex_Nudity,
                        "Violence & Gore" => enGuideSectionTypes.Violence_Gore,
                        "Profanity" => enGuideSectionTypes.Profanity,
                        "Alcohol & Drugs & Smoking" => enGuideSectionTypes.Alcohol_Drugs_Smoking,
                        "Frightening & Intense Scenes" => enGuideSectionTypes.Frightening_Intense_Scenes,
                        _ => throw new ArgumentException(
                            $"Unknown section type: {entry.Key}")
                    },

                    SeverityLevel = entry.Value.SeverityLevel switch
                    {
                        "None" => enSeverityLevels.None,
                        "Mild" => enSeverityLevels.Mild,
                        "Moderate" => enSeverityLevels.Moderate,
                        "Severe" => enSeverityLevels.Severe,
                        _ => throw new ArgumentException(
                            $"Unknown severity level: {entry.Value.SeverityLevel}")
                    },

                    MovieGuideItems = entry.Value.Descriptions
                        .Select(description => new MovieGuideItem
                        {
                            Description = description.Description,
                            SeverityLevel = description.SeverityLevel switch
                            {
                                "None" => enSeverityLevels.None,
                                "Mild" => enSeverityLevels.Mild,
                                "Moderate" => enSeverityLevels.Moderate,
                                "Severe" => enSeverityLevels.Severe,
                                _ => throw new ArgumentException(
                                    $"Unknown severity level: {description.SeverityLevel}")
                            }
                        })
                        .ToList()
                };

                sections.Add(section);
            }

            return sections;
        }
    }
}