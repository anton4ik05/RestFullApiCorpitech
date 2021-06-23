using RestFullApiCorpitech.util;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace RestFullApiCorpitech.ViewModels
{
    public class UserEditViewModel
    {
        [Required(ErrorMessage = "Заполните Фамилию")]
        [Display(Name = "Фамилия")]
        public String Surname { get; set; }

        [Required(ErrorMessage = "Заполните Имя")]
        [Display(Name = "Имя")]
        public String Name { get; set; }

        [Required(ErrorMessage = "Заполните Отчество")]
        [Display(Name = "Отчество")]
        public String Middlename { get; set; }

        [Required(ErrorMessage = "Введите дату найма")]
        [Display(Name = "Дата найма")]
        [DisplayFormat(DataFormatString = "{0:dd.MM.yyyy}", ApplyFormatInEditMode = true)]
        [DataType(DataType.Date)]

        [JsonConverter(typeof(DateConverter))]
        public DateTime DateOfEmployment { get; set; } = DateTime.MinValue;

        public ICollection<VacationEditModel> Vacations { get; set; } = new List<VacationEditModel>();

        public Double vacationYear { get; set; } = 28;

        public string Login { get; set; }

        public string Role { get; set; }

    }
}
