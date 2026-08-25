using CineGuard_Backend.Business;
using CineGuard_Backend.Controller.Dtos;
using CineGuard_Backend.Data.DbContextStore.Entities;
using CineGuard_Backend.ExternalClients;
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
        public async Task<ActionResult<Movie>> Get([FromRoute] int id)
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
            [FromRoute] int movieId,
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
        public async Task<IActionResult> ResetConversation([FromRoute] int movieId)
        {
            await _moviesBusiness.ResetConversationHistory(movieId);
            return Ok();
        }

        [HttpDelete("{movieId}")]
        public async Task<IActionResult> DeleteMovie([FromRoute] int movieId)
        {
            bool result = await _moviesBusiness.DeleteMovieAsync(movieId);
            if (!result)
            {
                return NotFound();
            }
            return Ok();
        }
    }
}