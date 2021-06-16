using System;
using System.Collections.Generic;
using Microsoft.AspNetCore.Mvc;
using RestFullApiCorpitech.Models;
using RestFullApiCorpitech.Service;
using RestFullApiCorpitech.ViewModels;

namespace RestFullApiCorpitech
{
   
    [ApiController]
    [Route("/api/users")]
    
    public class UserController : Controller
    {
        private readonly UserService userService;

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
        public IActionResult UserCreate(UserEditViewModel model)
        {
            if (ModelState.IsValid)
            {
                userService.SaveUser(model);
            }

            return new OkObjectResult(model);
        }

        [HttpPut]
        [Route("/api/users/{id}")]
        public IActionResult UserEdit(Guid id, UserEditViewModel model)
        {
            if (ModelState.IsValid)
            {
                userService.UpdateUser(id, model);
                return new ObjectResult(userService.GetUser(id));
            }

            return new BadRequestResult();
        }


        [HttpDelete]
        [Route("/api/users/del")]
        public IActionResult UserDelete(Guid id)
        {
            if (userService.GetUser(id) != null)
            {
                userService.DeleteUser(id);
                return new OkResult();
            }

            return new BadRequestResult();
        }

        
    }
}
