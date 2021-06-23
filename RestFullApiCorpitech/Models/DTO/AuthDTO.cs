using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace RestFullApiCorpitech.Models.DAO
{
    public class AuthDAO
    {

        [Required(AllowEmptyStrings = false)]
        [Display(Name = "Логин")]
        private string login;
        

        [Display(Name = "Пароль")]
        [DataType(DataType.Password)]
        private string password { get; set; }

        public string getLogin()
        {
            return this.login;
        }

        public void setLogin(string login)
        {
            this.login = login;
        }

    }
}
