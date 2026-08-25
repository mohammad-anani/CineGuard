using CineGuard_Backend.Data.DbContextStore;
using CineGuard_Backend.Data.DbContextStore.Entities;
using Microsoft.EntityFrameworkCore;

namespace CineGuard_Backend.Data
{
    public class MoviesData
    {
        private readonly CineGuardDbContext _context;

        public MoviesData(CineGuardDbContext context)
        {
            _context = context;
        }

        public async Task<Movie> InsertAsync(Movie movie)
        {
            _context.Movies.Add(movie);
            await _context.SaveChangesAsync();
            return movie;
        }

        public async Task<List<Movie>> GetAllAsync()
        {
            return await _context.Movies
                .AsNoTracking()
                .ToListAsync();
        }

        public async Task<bool> DeleteMovie(int movieId)
        {
            var movie = await _context.Movies.FindAsync(movieId);
            if (movie == null)
            {
                return false;
            }
            _context.Movies.Remove(movie);
            await _context.SaveChangesAsync();
            return true;
        }

        public async Task<Movie?> GetByMovieIdAsync(int movieId)
        {
            return await _context.Movies
                .AsNoTracking()
                .Where(m => m.Id == movieId)
                .Include(m => m.MovieGuideSections)
                .ThenInclude
               (mgs => mgs.MovieGuideItems)
                .FirstOrDefaultAsync();
        }
    }
}