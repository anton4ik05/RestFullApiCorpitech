using System;
using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;
using RestFullApiCorpitech.Models;
using RestFullApiCorpitech.util;

namespace RestFullApiCorpitech.ViewModels
{
    public class VacationEditModel
    {
        [Display(Name = "Дата начала отпуска")]
        [DisplayFormat(DataFormatString = "{0:dd.MM.yyyy}", ApplyFormatInEditMode = true)]
        [DataType(DataType.Date)]
        [JsonConverter(typeof(DateConverter))]
        public DateTime startVacation { get; set; }

        [Display(Name = "Дата конца отпуска")]
        [DisplayFormat(DataFormatString = "{0:dd.MM.yyyy}", ApplyFormatInEditMode = true)]
        [DataType(DataType.Date)]
        [JsonConverter(typeof(DateConverter))]
        public DateTime endVacation { get; set; }

        [JsonIgnore]
        public User user { get; set; }

        [JsonIgnore]
        public Guid userId { get; set; }

        public string OrderNumber { get; set; }

        [JsonConverter(typeof(DateConverter))]
        public DateTime DateOrder { get; set; }
    }
}
