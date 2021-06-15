using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

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
        [DisplayFormat(ApplyFormatInEditMode = true, DataFormatString = "{yyyy-MM-dd}")]
        [DataType(DataType.Date)]
        public DateTime dateOfEmployment { get; set; } = DateTime.MinValue;

        public ICollection<VacationEditModel> Vacations { get; set; } = new List<VacationEditModel>();
    }
}
