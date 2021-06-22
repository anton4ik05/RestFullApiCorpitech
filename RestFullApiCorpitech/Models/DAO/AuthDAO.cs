using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace RestFullApiCorpitech.Models.DAO
{
    public class AuthRequest
    {
        [Required(AllowEmptyStrings = false)]
        [Display(Name = "Логин")]
        private string login { get; set; }

        [Display(Name = "Пароль")]
        [DataType(DataType.Password)]
        private string password { get; set; }

    }
}
