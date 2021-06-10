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

        public Double value { get; set; } = 0;

        public Double days { get; set; } = 0;

        public ICollection<Vacation> Vacations { get; set; } = new List<Vacation>();


        public Double eval(DateTime startDate, DateTime endDate)

        {
            
            ICollection<DateTime> allVacationDates = new List<DateTime>();
            var vacations = Vacations.ToArray();

            foreach (var vacation in vacations)
            {
                DateTime date = vacation.endVacation;
                allVacationDates = AllDates(vacation.startVacation, vacation.endVacation, allVacationDates);
            }

            Double intersect = 0;

            foreach (var date in allVacationDates)
            {
                if(Between(date ,startDate, endDate))
                {
                    intersect++;
                };
            }

            Double days = (endDate - startDate).Days + 1 - intersect;
            this.days = days;
            this.value = Math.Round(Math.Round(days / 29.7) * 2.33);

            return this.value;
        }

        private static ICollection<DateTime> AllDates(DateTime startDate, DateTime endDate, ICollection<DateTime> allDates)
        {
            for (DateTime date = startDate; date <= endDate; date = date.AddDays(1))
                allDates.Add(date);
            return allDates;
        }

        public static bool Between(DateTime input, DateTime date1, DateTime date2)
        {
            return (input >= date1 && input <= date2);
        }
    }
}
