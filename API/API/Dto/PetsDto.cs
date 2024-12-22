using Microsoft.AspNetCore.Http;

public class PetsDto
{
  
    public required string email { get; set; }

    // Image will be uploaded as a file
    public required IFormFile image { get; set; }

    public required string name { get; set; }
    public required string type { get; set; }
    public required string breed { get; set; }
    public required int age { get; set; }
    public required int quoted_price { get; set; }
}
