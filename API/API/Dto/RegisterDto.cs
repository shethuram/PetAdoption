namespace API.Dto
{
    public class RegisterDto
    {
        public required string name { get; set; }
        public required string type { get; set; }
        public required string email { get; set; } // Primary key
        public required string password { get; set; }

    }
}

