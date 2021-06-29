using RestFullApiCorpitech.util;
using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text.Json.Serialization;
using System.Threading.Tasks;

namespace RestFullApiCorpitech.Models
{
    public class Holiday
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        [ReadOnly(true)]
        public Guid Id { get; set; }

        [Required(ErrorMessage = "Введите дату найма")]
        [Display(Name = "Дата найма")]
        [DisplayFormat(DataFormatString = "{0:dd.MM.yyyy}", ApplyFormatInEditMode = false)]
        [DataType(DataType.Date)]
        [JsonConverter(typeof(DateConverter))]
        public DateTime date { get; set; } = DateTime.MinValue;

        public string name { get; set; } = "";

        public bool isActive { get; set; } = true;
    }
}
