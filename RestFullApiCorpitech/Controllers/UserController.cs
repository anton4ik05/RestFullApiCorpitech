﻿using System;
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
        private UserService userService;

        public UserController(UserService userService)
        {
            this.userService = userService;
        }

        [HttpGet]
        public IActionResult Get(DateTime startDate, DateTime endDate)
        {
            userService.EvalUsers(startDate, endDate);
            //userService.EvalUsers(new DateTime(2021, 06, 07), new DateTime(2021, 10, 12));
            return new ObjectResult(userService.GetUsers());
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
