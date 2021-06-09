using System;
using Microsoft.AspNetCore.Mvc;
using RestFullApiCorpitech.Models;
using RestFullApiCorpitech.Repos;
using RestFullApiCorpitech.Service;

namespace RestFullApiCorpitech
{
   
    [ApiController]
    [Route("/users")]
    
    public class UserController : Controller
    {
        private UserRepository userRepository;
        private UserService userService;

        public UserController(UserRepository userRepository)
        {
            this.userRepository = userRepository;
        }

        [HttpGet]
        public IActionResult Get()
        {
            userService.EvalUsers();
            return new ObjectResult(userRepository.GetUsers());
        }


        [HttpPost]
        public IActionResult UserEdit(User model)
        {
            if (ModelState.IsValid)
            {
                userService.SaveUser(model);
            }

            return new ObjectResult(model);
        }


        [HttpDelete]
        public IActionResult UserDelete(Guid id)
        {
            userService.DeleteUser(id);
            return new ObjectResult("success");
        }

        
    }
}
