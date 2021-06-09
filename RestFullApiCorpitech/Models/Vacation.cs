using System;
using Calabonga.EntityFrameworkCore.Entities.Base;

namespace RestFullApiCorpitech.Models
{
    public class Vacation: Identity
    {

        public DateTime startVacation { get; set; }

        public DateTime endVacation { get; set; }


        
    }
}
