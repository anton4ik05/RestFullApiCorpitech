using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace RestFullApiCorpitech.Models
{
    public class Vacation
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        [JsonIgnore]
        public Guid Id { get; set; }

        [Display(Name = "Дата начала отпуска")]
        [DisplayFormat(ApplyFormatInEditMode = true, DataFormatString = "{yyyy-MM-dd}")]
        [DataType(DataType.Date)]
        public DateTime startVacation { get; set; }

        [Display(Name = "Дата конца отпуска")]
        [DisplayFormat(ApplyFormatInEditMode = true, DataFormatString = "{yyyy-MM-dd}")]
        [DataType(DataType.Date)]
        public DateTime endVacation { get; set; }

        [JsonIgnore]
        public User user { get; set; }

    }
}
