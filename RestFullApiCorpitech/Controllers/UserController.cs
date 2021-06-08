using Microsoft.AspNetCore.Mvc;
using RestFullApiCorpitech.Repos;

namespace RestFullApiCorpitech
{
   
    [ApiController]
    [Route("/user")]
    
    public class UserController : Controller
    {
        private readonly UserRepository userRepository;

        public UserController(UserRepository userRepository)
        {
            this.userRepository = userRepository;
        }

        [HttpGet]
        public ActionResult Get()
        {
            return new ObjectResult(userRepository.GetUsers());
        }

    }
}
