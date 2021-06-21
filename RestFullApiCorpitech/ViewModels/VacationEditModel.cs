using System;
using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;
using RestFullApiCorpitech.Models;

namespace RestFullApiCorpitech.ViewModels
{
    public class VacationEditModel
    {
        [Display(Name = "Дата начала отпуска")]
        [DisplayFormat(ApplyFormatInEditMode = true, DataFormatString = "{yyyy-MM-dd}")]
        [DataType(DataType.Date)]
        public DateTime startVacation { get; set; }

        [Display(Name = "Дата конца отпуска")]
        [DisplayFormat(ApplyFormatInEditMode = true, DataFormatString = "{yyyy-MM-dd}")]
        [DataType(DataType.Date)]
        public DateTime endVacation { get; set; }

        [JsonIgnore]
        public User user { get; set; }

        [JsonIgnore]
        public Guid userId { get; set; }

        public string OrderNumber { get; set; }

        public DateTime DateOrder { get; set; }
    }
}
