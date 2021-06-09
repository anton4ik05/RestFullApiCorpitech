using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace RestFullApiCorpitech.Models
{
    public class User
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        [JsonIgnore]
        public Guid Id { get; set; }

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
        public DateTime dateOfEmployment { get; set; }

        [Required(ErrorMessage = "Введите дату начала отпуска")]
        [Display(Name = "Дата начала отпуска")]
        public DateTime dateOfStartVacation { get; set; }

        [Required(ErrorMessage = "Введите дату конца отпуска")]
        [Display(Name = "Дата конца отпуска")]
        public DateTime dateOfEndVacation { get; set; }


    }
}
