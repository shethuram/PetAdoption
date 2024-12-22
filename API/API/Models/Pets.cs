using System.ComponentModel.DataAnnotations;

namespace API.Models
{
    public class Pets
    {
        [Key]
        public  int id { get; set; }     // primary key 
        public required string email { get; set; }
        public required byte[] image { get; set; }
        public required string name { get; set; }
        public required string type { get; set; }
        public required string breed { get; set; }  
        public required int age { get; set; }
        public required int quoted_price { get; set; }
        public int bought_price { get; set; }
        public bool is_adopted { get; set; }





    }
}
