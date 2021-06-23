using RestFullApiCorpitech.util;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text.Json.Serialization;
using System.Threading.Tasks;

namespace RestFullApiCorpitech.Models.DAO
{
    public class DateIntervalDAO
    {

        [Display(Name = "Начальная дата")]
        [DisplayFormat(DataFormatString = "{0:dd.MM.yyyy}", ApplyFormatInEditMode = false)]
        [DataType(DataType.Date)]
        [JsonConverter(typeof(DateConverter))]
        public DateTime startDate { get; set; } = DateTime.MinValue;

        [Display(Name = "Конечная дата")]
        [DisplayFormat(DataFormatString = "{0:dd.MM.yyyy}", ApplyFormatInEditMode = false)]
        [DataType(DataType.Date)]
        [JsonConverter(typeof(DateConverter))]
        public DateTime endDate { get; set; } = DateTime.MinValue;
    }
}
