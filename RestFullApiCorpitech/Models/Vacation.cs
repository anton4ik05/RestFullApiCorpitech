using System;
using System.ComponentModel.DataAnnotations;
using Calabonga.EntityFrameworkCore.Entities.Base;

namespace RestFullApiCorpitech.Models
{
    public class Vacation: Identity
    {

        [Display(Name = "Дата начала отпуска")]
        [DisplayFormat(ApplyFormatInEditMode = true, DataFormatString = "{yyyy-MM-dd}")]
        [DataType(DataType.Date)]
        public DateTime startVacation { get; set; }

        [Display(Name = "Дата конца отпуска")]
        [DisplayFormat(ApplyFormatInEditMode = true, DataFormatString = "{yyyy-MM-dd}")]
        [DataType(DataType.Date)]
        public DateTime endVacation { get; set; }

        public User user { get; set; }

    }
}
