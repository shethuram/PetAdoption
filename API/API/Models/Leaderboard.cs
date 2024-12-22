using System.ComponentModel.DataAnnotations;

namespace API.Models
{
    public class Leaderboard
    {
        [Key]
        public required string email { get; set; } // Primary key
        public required string name { get; set; }
        public int  purchasecount { get; set; }
    }
}
