using System;
using Microsoft.AspNetCore.Mvc;
using RestFullApiCorpitech.Models;
using RestFullApiCorpitech.Repos;

namespace RestFullApiCorpitech
{
   
    [ApiController]
    [Route("/users")]
    
    public class UserController : Controller
    {
        private readonly UserRepository userRepository;

        public UserController(UserRepository userRepository)
        {
            this.userRepository = userRepository;
        }

        [HttpGet]
        public IActionResult Get()
        {
            return new ObjectResult(userRepository.GetUsers());
        }

        [HttpPost]
        public IActionResult UserEdit(User model)
        {
            if (ModelState.IsValid)
            {
                userRepository.SaveUser(model);
            }

            return new ObjectResult(model);
        }

        [HttpDelete]
        public IActionResult UserDelete(Guid id)
        {
            userRepository.DeleteUser(new User() { Id = id });
            return new ObjectResult("success");
        }

    }
}
