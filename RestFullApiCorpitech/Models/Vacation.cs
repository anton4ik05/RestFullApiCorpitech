using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;
using Microsoft.AspNetCore.SignalR;
using RestFullApiCorpitech.util;

namespace RestFullApiCorpitech.Models
{
    public class Vacation
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public Guid Id { get; set; }

        [Display(Name = "Дата начала отпуска")]
        [DisplayFormat(DataFormatString = "{0:dd.MM.yyyy}", ApplyFormatInEditMode = true)]
        [DataType(DataType.Date)]
        [JsonConverter(typeof(DateConverter))]
        public DateTime StartVacation { get; set; }

        [Display(Name = "Дата конца отпуска")]
        [DisplayFormat(DataFormatString = "{0:dd.MM.yyyy}", ApplyFormatInEditMode = true)]
        [DataType(DataType.Date)]
        [JsonConverter(typeof(DateConverter))]
        public DateTime EndVacation { get; set; }

        [JsonIgnore]
        public User User { get; set; }

        [JsonIgnore]
        public Guid UserId { get; set; }

        public string OrderNumber { get; set; }

        [JsonConverter(typeof(DateConverter))]
        public DateTime DateOrder { get; set; }

    }
}
