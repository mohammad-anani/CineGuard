namespace CineGuard_Backend.Data
{
    public class QueryResult
    {
        public string Answer { get; set; } = null!;
    }

    public class MovieGuideSectionResult
    {
        public string SeverityLevel { get; set; } = null!;
        public List<MovieGuideDescription> Descriptions { get; set; } = new();
    }

    public class MovieGuideDescription
    {
        public string Description { get; set; } = null!;
        public string SeverityLevel { get; set; } = null!;
    }

    public class AI_Client
    {
        private readonly HttpClient _httpClient;

        public AI_Client(HttpClient httpClient)
        {
            _httpClient = httpClient;
        }

        public async Task<Dictionary<string, MovieGuideSectionResult>> GenerateGuideAsync(
            int movieId,
            string script)
        {
            var request = new
            {
                script
            };

            var response = await _httpClient.PostAsJsonAsync(
                $"/movies/{movieId}/generate_guide",
                request
            );

            response.EnsureSuccessStatusCode();

            var result = await response.Content.ReadFromJsonAsync<Dictionary<string, MovieGuideSectionResult>>();

            return result ?? new Dictionary<string, MovieGuideSectionResult>();
        }

        public async Task<QueryResult> QueryMovieAsync(
            int movieId,
            string query)
        {
            var request = new
            {
                query
            };

            var response = await _httpClient.PostAsJsonAsync(
                $"/movies/{movieId}/query",
                request
            );

            response.EnsureSuccessStatusCode();

            QueryResult? result = await response.Content.ReadFromJsonAsync<QueryResult>();
            return result ?? new QueryResult { Answer = "No Answer" };
        }

        public async Task ResetConversationAsync(int movieId)
        {
            var response = await _httpClient.PutAsync(
                $"/movies/{movieId}/reset-conversation",
                null
            );

            response.EnsureSuccessStatusCode();
        }
    }
}