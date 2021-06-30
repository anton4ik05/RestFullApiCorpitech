using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Text.Json.Serialization;
using System.Threading.Tasks;
using RestFullApiCorpitech.util;

namespace RestFullApiCorpitech.Models
{
    public class VacationDay
    {
        public Guid Id { get; set; }

        [DisplayFormat(DataFormatString = "{0:dd.MM.yyyy}", ApplyFormatInEditMode = false)]
        [DataType(DataType.Date)]
        [JsonConverter(typeof(DateConverter))]
        public DateTime StartWorkYear { get; set; }

        [DisplayFormat(DataFormatString = "{0:dd.MM.yyyy}", ApplyFormatInEditMode = false)]
        [DataType(DataType.Date)]
        [JsonConverter(typeof(DateConverter))]
        public DateTime EndWorkYear { get; set; }

        [JsonIgnore]
        public User User { get; set; }

        [JsonIgnore]
        public Guid UserId { get; set; }

        public int Days { get; set; }
    }
}
