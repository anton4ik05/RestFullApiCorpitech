using System;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using RestFullApiCorpitech.Service;
using RestFullApiCorpitech.ViewModels;

namespace RestFullApiCorpitech.Controllers
{
   
    [ApiController]
    [Route("/api/users")]
    public class UserController : ControllerBase
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

        [HttpGet]
        [Route("/api/users/{id}/days")]
        public IActionResult GetDays(Guid id, DateTime startDate, DateTime endDate)
        {
            return new ObjectResult(userService.EvalUserDays(id, startDate, endDate));
        }

        [HttpGet]
        [Route("/api/users/getVacations")]
        public IActionResult GetVacations(Guid id)
        {
            return new ObjectResult(userService.GetVacations(id));
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

            return new BadRequestObjectResult("User not found");
        }

    }
}
