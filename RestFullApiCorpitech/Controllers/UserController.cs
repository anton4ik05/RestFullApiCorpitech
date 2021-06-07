using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Collections;

namespace RestFullApiCorpitech
{
    [ApiController]
    [Route("/user")]
    public class UserController : Controller
    {
        [HttpGet]
        public ActionResult Get()
        {
            var rng = new Random();
            ArrayList list = new ArrayList();
            list.Add(1);
            list.Add(55);
            return new ObjectResult(list);
        }

    }
}
