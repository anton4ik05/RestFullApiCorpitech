using System;
using System.Collections.Generic;
using Microsoft.AspNetCore.Mvc;
using RestFullApiCorpitech.Models;
using RestFullApiCorpitech.Service;

namespace RestFullApiCorpitech
{
   
    [ApiController]
    [Route("/api/users")]
    
    public class UserController : Controller
    {
        private UserService userService;

        public UserController(UserService userService)
        {
            this.userService = userService;
        }

        [HttpGet]
        public IActionResult Get()
        {
            return new ObjectResult(userService.GetUsers());
        }

        [HttpGet]
        [Route("/api/users/{id}")]
        public IActionResult Get(Guid id, DateTime startDate, DateTime endDate)
        {
            
            return new ObjectResult(userService.EvalUser(id, startDate, endDate));
        }

        [HttpPost]
        [Route("/api/users")]
        public IActionResult UserCreate(User model)
        {
            if (ModelState.IsValid)
            {
                userService.SaveUser(model);
            }

            return new ObjectResult(model);
        }

        [HttpPut]
        [Route("/api/users/{id}")]
        public IActionResult UserEdit(Guid id, User model)
        {
            if (ModelState.IsValid)
            {
                userService.UpdateUser(id, model);
            }

            return new ObjectResult("updated");
    }


        [HttpDelete]
        [Route("/api/users/del")]
        public IActionResult UserDelete(Guid id)
        {
            userService.DeleteUser(id);
            return new ObjectResult("success");
        }

        
    }
}
