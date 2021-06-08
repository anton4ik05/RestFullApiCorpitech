using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Collections;
using RestFullApiCorpitech.Repos;
using RestFullApiCorpitech.Models;

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
