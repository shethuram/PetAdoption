using System.ComponentModel.DataAnnotations;

namespace API.Models
{
    public class Register
    {

        [Key]
        public required string email { get; set; } // Primary key
        public required string name { get; set; }
        public required string type { get; set; }
        public required string password { get; set; }

    }
}
