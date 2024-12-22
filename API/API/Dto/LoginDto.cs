namespace API.Dto
{
    public class LoginDto
    {
        public required string type { get; set; }
        public required string email { get; set; } 
        public required string password { get; set; }
    }
}
