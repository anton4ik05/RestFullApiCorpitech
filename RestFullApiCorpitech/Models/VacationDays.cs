using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Text.Json.Serialization;
using System.Threading.Tasks;

namespace RestFullApiCorpitech.Models
{
    public class VacationDay
    {
        public Guid Id { get; set; }

        public DateTime StartWorkYear { get; set; }

        public DateTime EndWorkYear { get; set; }

        [JsonIgnore]
        public User User { get; set; }

        [JsonIgnore]
        public Guid UserId { get; set; }

        public int Days { get; set; }
    }
}
