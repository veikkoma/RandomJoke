using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using System.Net.Http;
using System.Threading.Tasks;

namespace RandomJoke.Controller
{
    [ApiController]
    [Route("api/jokes")]
    public class JokeController : ControllerBase
    {
        private readonly HttpClient _httpClient;

        public JokeController(HttpClient httpClient)
        {
            _httpClient = httpClient;
        }

        [HttpGet("categories")]
        public async Task<IActionResult> GetCategories()
        {
            var response = await _httpClient.GetAsync("https://api.chucknorris.io/jokes/categories");
            if (!response.IsSuccessStatusCode)
                return BadRequest("Error fetching categories.");

            var content = await response.Content.ReadAsStringAsync();
            var categories = JsonConvert.DeserializeObject<List<string>>(content);
            return Ok(categories);
        }

        [HttpGet("category/{category}")]
        public async Task<IActionResult> GetJokeByCategory(string category)
        {
            var response = await _httpClient.GetAsync($"https://api.chucknorris.io/jokes/random?category={category}");
            if (!response.IsSuccessStatusCode)
                return NotFound($"No joke found for category: {category}");

            var content = await response.Content.ReadAsStringAsync();
            var json = JsonConvert.DeserializeObject<dynamic>(content);
            string joke = json?.value ?? "No joke found."; 
            return Ok(new { joke });
        }
    }
}
