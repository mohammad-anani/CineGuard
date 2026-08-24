using CineGuard_Backend.Data.DbContextStore;

namespace CineGuard_Backend.Data
{
    public class MovieGuideSectionsData
    {
        private readonly CineGuardDbContext _context;

        public MovieGuideSectionsData(CineGuardDbContext context)
        {
            _context = context;
        }

        public async Task<bool> InsertBatchAsync(List<MovieGuideSection> movieGuideSections)
        {
            _context.MovieGuideSections.AddRange(movieGuideSections);
            await _context.SaveChangesAsync();
            return true;
        }
    }
}