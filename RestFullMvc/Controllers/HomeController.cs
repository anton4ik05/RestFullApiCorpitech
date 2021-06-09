using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using RestFullMvc.Models;
using System.Diagnostics;
using System.Net.Http;
using System.Text;
using System.Threading.Tasks;

namespace RestFullMvc.Controllers
{
    public class HomeController : Controller
    {
        private readonly ILogger<HomeController> _logger;

        public HomeController(ILogger<HomeController> logger)
        {
            _logger = logger;
        }

        public async Task<IActionResult> IndexAsync()
        {
            string bodystring="";
            var body = new StringContent(bodystring, Encoding.UTF8, "application/json");

            using (var client = new HttpClient())
            {
                var response = await client.GetAsync("https://localhost:5001/users");
                var content = await response.Content.ReadAsStringAsync();
            }

            return View();
        }

        public IActionResult Privacy()
        {
            return View();
        }

        [ResponseCache(Duration = 0, Location = ResponseCacheLocation.None, NoStore = true)]
        public IActionResult Error()
        {
            return View(new ErrorViewModel { RequestId = Activity.Current?.Id ?? HttpContext.TraceIdentifier });
        }
    }
}
