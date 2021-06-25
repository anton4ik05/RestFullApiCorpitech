using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace RestFullApiCorpitech.Models.DAO
{
    public class AuthDTO
    {

        [Required(AllowEmptyStrings = false)]
        [Display(Name = "Логин")]
        public string login { get; set; }
        

        [Display(Name = "Пароль")]
        [DataType(DataType.Password)]
        public string password { get; set; }

    }
}
