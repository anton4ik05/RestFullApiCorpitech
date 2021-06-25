using System;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using RestFullApiCorpitech.Models.DAO;
using RestFullApiCorpitech.Service;
using RestFullApiCorpitech.ViewModels;

namespace RestFullApiCorpitech.Controllers
{
   
    [ApiController]
    [Route("/api/users")]
    //[Authorize]
    public class UserController : ControllerBase
    {
        private readonly UserService userService;

        public UserController(UserService userService)
        {
            this.userService = userService;
        }

        [HttpGet]
        //[Authorize]
        public IActionResult Get(Guid id)
        {
            return new ObjectResult(userService.GetUser(id));
        }

        [HttpGet]
        [Route("/api/admin/users")]
        //[Authorize(Roles = "admin")]
        public IActionResult AdminGet()
        {
            return new ObjectResult(userService.GetUsers());
        }

        [HttpGet]
        [Route("/api/users/{id}")]
        [Authorize]
        public IActionResult Get(Guid id, string startDate, string endDate)
        {
           return new ObjectResult(userService.EvalUser(id, userService.ParseDate(startDate), userService.ParseDate(endDate)));
        }

        [HttpGet]
        [Route("/api/users/{id}/days")]
        [Authorize]
        public IActionResult GetDays(Guid id, string startDate, string endDate)
        {
            return new ObjectResult(userService.EvalUserDays(id, userService.ParseDate(startDate), userService.ParseDate(endDate)));
        }


        [HttpGet]
        [Route("/api/users/getVacations")]
        [Authorize]
        public IActionResult GetVacations(Guid id)
        {

            return new ObjectResult(userService.GetVacations(id));
        }

        [HttpPost]
        [Route("/api/users")]
        [Authorize(Roles = "admin")]
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
        [Authorize(Roles="admin")]

        public IActionResult UserEdit(Guid id, UserEditViewModel model)
        {
            if (ModelState.IsValid)
            {
                userService.UpdateUser(id, model);
                return new ObjectResult(userService.GetUser(id));
            }

            return new BadRequestResult();
        }

        [HttpPut]
        [Route("/api/users/{id}/credentials")]
        [Authorize(Roles = "admin")]
        public IActionResult UserEditCredentials(Guid id, AuthDTO model)
        {
            if (ModelState.IsValid)
            {
                userService.UpdateUserCredentials(id, model);
                return new ObjectResult(userService.GetUser(id));
            }

            return new BadRequestResult();
        }

        [HttpDelete]
        [Route("/api/users/del")]
        [Authorize(Roles = "admin")]
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
