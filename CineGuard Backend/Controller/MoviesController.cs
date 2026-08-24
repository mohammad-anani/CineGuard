using CineGuard_Backend.Business;
using CineGuard_Backend.Data;
using CineGuard_Backend.Data.DbContextStore;
using Microsoft.AspNetCore.Mvc;

namespace CineGuard_Backend.Controller
{
    [Route("api/movies")]
    [ApiController]
    public class MoviesController : ControllerBase
    {
        private readonly MoviesBusiness _moviesBusiness;

        public MoviesController(MoviesBusiness moviesBusiness)
        {
            _moviesBusiness = moviesBusiness;
        }

        [HttpPost]
        public async Task<ActionResult<int>> InsertMovieAndGenerateGuide(
            [FromBody] InsertMovieRequest request)
        {
            var result = await _moviesBusiness.AddMovieAndGenerateGuideAsync(
                request.MovieName,
                request.Script
            );

            return Ok(result);
        }

        [HttpGet]
        public async Task<ActionResult<List<Movie>>> GetAll()
        {
            var movies = await _moviesBusiness.GetAllMoviesAsync();

            return Ok(movies);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Movie>> Get(int id)
        {
            var movie = await _moviesBusiness.Get(id);

            if (movie == null)
            {
                return NotFound();
            }

            return Ok(movie);
        }

        [HttpGet("{movieId}/query")]
        public async Task<ActionResult<QueryResult>> QueryMovie(
            int movieId,
            [FromQuery] string query)
        {
            var result = await _moviesBusiness.QueryMovieAsync(
                movieId,
                query
            );

            if (result == null)
            {
                return NotFound();
            }

            return Ok(result);
        }

        [HttpPut("{movieId}/reset-conversation")]
        public async Task<IActionResult> ResetConversation(int movieId)
        {
            await _moviesBusiness.ResetConversationHistory(movieId);
            return Ok();
        }
    }
}