using System.Net.Http;
using System.Threading.Tasks;
using Newtonsoft.Json.Linq;

namespace RandomJoke.Services
{
    public class JokeService
    {
        private readonly HttpClient _httpClient;

        public JokeService(HttpClient httpClient)
        {
            _httpClient = httpClient;
        }

        public async Task<string> GetRandomJoke()
        {
            var response = await _httpClient.GetAsync("https://api.chucknorris.io/jokes/random");
            if (!response.IsSuccessStatusCode) return "Error fetching joke.";

            var content = await response.Content.ReadAsStringAsync();
            var json = JObject.Parse(content);
            return json["value"]?.ToString() ?? "No joke found.";
        }

        public async Task<string> GetJokeByCategory(string category)
        {
            var response = await _httpClient.GetAsync($"https://api.chucknorris.io/jokes/random?category={category}");
            if (!response.IsSuccessStatusCode) return "Error fetching joke.";

            var content = await response.Content.ReadAsStringAsync();
            var json = JObject.Parse(content);
            return json["value"]?.ToString() ?? "No joke found.";
        }

        public async Task<List<string>> GetCategories()
        {
            var response = await _httpClient.GetAsync("https://api.chucknorris.io/jokes/categories");
            if (!response.IsSuccessStatusCode) return new List<string>();

            var content = await response.Content.ReadAsStringAsync();
            return Newtonsoft.Json.JsonConvert.DeserializeObject<List<string>>(content) ?? new List<string>();
        }
    }
}
