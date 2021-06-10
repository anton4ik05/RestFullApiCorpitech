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
        public DateTime dateOfEmployment { get; set; } = DateTime.MinValue;

        [Display(Name = "Дата начала отпуска")]
        [DisplayFormat(ApplyFormatInEditMode = true, DataFormatString = "{yyyy-MM-dd}")]
        [DataType(DataType.Date)]
        public DateTime dateOfStartVacation { get; set; } = DateTime.MinValue;

        [Display(Name = "Дата конца отпуска")]
        [DisplayFormat(ApplyFormatInEditMode = true, DataFormatString = "{yyyy-MM-dd}")]
        [DataType(DataType.Date)]
        public DateTime dateOfEndVacation { get; set; } = DateTime.MinValue;

        public Double value { get; set; } = 0;

        public Double days { get; set; } = 0;

        public ICollection<Vacation> Vacations { get; set; } = new List<Vacation>();


        public Double eval(DateTime endDate)

        {
            DateTime startDate = new DateTime();
            if(dateOfEndVacation != DateTime.MinValue)
            {
                startDate = dateOfEndVacation;
            }
            else
            {
                startDate = dateOfEmployment;
            }

            Double days = (endDate - startDate).Days;
            this.days = days;
            this.value = Math.Round(days / 29.7) * 2.33;

            return this.value;
        }
    }
}
