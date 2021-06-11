﻿using System;
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
        public IActionResult Get(DateTime startDate, DateTime endDate)
        {
            userService.EvalUsers(startDate, endDate);
            return new ObjectResult(userService.GetUsers());
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
        public IActionResult UserEdit(Guid id, String Surname, String Name, String Middlename, DateTime dateOfEmployment, ICollection<Vacation> Vacations)
        {
            if (ModelState.IsValid)
            {
                userService.UpdateUser(id, Surname, Name, Middlename, dateOfEmployment, Vacations);
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
