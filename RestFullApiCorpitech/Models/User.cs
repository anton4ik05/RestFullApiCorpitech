using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace RestFullApiCorpitech.Models
{
    public class User
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public Guid Id { get; set; }

        [Required(ErrorMessage = "Заполните Фамилию")]
        [Display(Name = "Фамилия")]
        public String surname { get; set; }

        [Required(ErrorMessage = "Заполните Имя")]
        [Display(Name = "Имя")]
        public String name { get; set; }

        [Required(ErrorMessage = "Заполните Отчество")]
        [Display(Name = "Отчество")]
        public String middlename { get; set; }
    }
}
