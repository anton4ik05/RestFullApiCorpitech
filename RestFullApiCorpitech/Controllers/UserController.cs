using System;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
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
        // [Authorize(Roles = "admin")]
        public IActionResult Get()
        {
            return new ObjectResult(userService.GetUsers());
        }

        [HttpGet]
        [Route("/api/users/{id}")]
        //[Authorize]
        public IActionResult Get(Guid id, string startDate, string endDate)
        {
            var start = DateTime.ParseExact(startDate, "dd.MM.yyyy", System.Globalization.CultureInfo.InvariantCulture);
            var end = DateTime.ParseExact(endDate, "dd.MM.yyyy", System.Globalization.CultureInfo.InvariantCulture);



            return new ObjectResult(userService.EvalUser(id, start, end));
        }

        [HttpGet]
        [Route("/api/users/{id}/days")]
        //[Authorize]
        public IActionResult GetDays(Guid id, string startDate, string endDate)
        {
            var start = DateTime.ParseExact(startDate, "dd.MM.yyyy", System.Globalization.CultureInfo.InvariantCulture);
            var end = DateTime.ParseExact(endDate, "dd.MM.yyyy", System.Globalization.CultureInfo.InvariantCulture);
            return new ObjectResult(userService.EvalUserDays(id, start, end));
        }

        [HttpGet]
        [Route("/api/users/getVacations")]
       // [Authorize]
        public IActionResult GetVacations(Guid id)
        {

            return new ObjectResult(userService.GetVacations(id));
        }

        [HttpPost]
        [Route("/api/users")]
       // [Authorize(Roles = "admin")]
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
       // [Authorize]

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
        //[Authorize(Roles = "admin")]
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
