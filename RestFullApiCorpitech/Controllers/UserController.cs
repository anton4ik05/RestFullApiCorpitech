using System;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using RestFullApiCorpitech.Models;
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
        [Authorize]
        public IActionResult Get(Guid id)
        {
            return new ObjectResult(userService.GetUser(id));
        }

        [HttpGet]
        [Route("/api/admin/users")]
        [Authorize(Roles = "admin, moderator")]
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
        [Route("/api/users/{id}/vacations")]
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
        [Authorize]
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
        [Route("/api/users/{id}")]
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
        
        [HttpPost]
        [Route("/api/users/{id}/vacations")]
        [Authorize(Roles = "admin")]
        public IActionResult AddVacation(Guid id, VacationEditModel model)
        {
            if (ModelState.IsValid)
            {
                userService.AddVacation(id,model);
            }

            return new OkObjectResult(model);
        }

        [HttpPut]
        [Route("/api/users/{id}/vacations")]
        [Authorize(Roles = "admin")]
        public IActionResult EditVacation(Guid id, VacationEditModel model)
        {
            if (ModelState.IsValid)
            {
                userService.EditVacation(id, model);
            }

            return new OkObjectResult(model);
        }

        [HttpDelete]
        [Route("/api/users/{id}/vacations")]
        [Authorize(Roles = "admin")]
        public IActionResult VacationDelete(Guid id)
        {
            if (userService.GetVacation(id) != null)
            {
                userService.DeleteVacation(id);
                return new OkResult();

            }
            return new BadRequestObjectResult("Vacation not found");

        }

        [HttpGet]
        [Route("/api/holidays")]
        //[Authorize(Roles = "admin")]
        public IActionResult getHolidays()
        {
            return new ObjectResult(userService.GetHolidays());
        }

        [HttpPost]
        [Route("/api/holidays")]
        //[Authorize(Roles = "admin")]
        public IActionResult AddHoliday(Holiday model)
        {
            if (ModelState.IsValid)
            {
                userService.AddHoliday(model);
            }

            return new OkObjectResult(model);
        }

        [HttpPut]
        [Route("/api/holidays")]
        //[Authorize(Roles = "admin")]
        public IActionResult UpdateHoliday(Holiday model)
        {
            if (ModelState.IsValid)
            {
                userService.UpdateHoliday(model);
            }

            return new OkObjectResult(model);
        }

        [HttpDelete]
        [Route("/api/holidays")]
        //[Authorize(Roles = "admin")]
        public IActionResult DeleteHoliday(Guid id)
        {
            if (userService.GetHoliday(id) != null)
            {
                userService.DeleteHoliday(id);
                return new OkResult();

            }
            return new BadRequestObjectResult("Holiday not found");
        }

        [HttpGet]
        [Route("/api/{id}/workYears")]
        //[Authorize(Roles = "admin")]
        public IActionResult getWorkYears(Guid id)
        {
            return new ObjectResult(userService.getWorkYears(id));
        }

        [HttpPost]
        [Route("/api/{id}/workYears")]
        //[Authorize(Roles = "admin")]
        public IActionResult AddWorkYear(Guid id,VacationDay model)
        {
            if (ModelState.IsValid)
            {
                userService.AddWorkYear(id, model);
            }

            return new OkObjectResult(model);
        }

        [HttpDelete]
        [Route("/api/users/{id}/workYears")]
        //[Authorize(Roles = "admin")]
        public IActionResult WorkYearDelete(Guid id)    
        {
            if (userService.GetWorkYear(id) != null)
            {
                userService.DeleteWorkYear(id);
                return new OkResult();

            }
            return new BadRequestObjectResult("Vacation not found");
        }

        [HttpPut]
        [Route("/api/users/{id}/workYears")]
        //[Authorize(Roles = "admin")]
        public IActionResult EditWorkYear(Guid id, VacationDay model)
        {
            if (ModelState.IsValid)
            {
                userService.EditWorkYear(id, model);
            }

            return new OkObjectResult(model);
        }

    }
}
