using API.Data;
using API.Dto;
using API.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Security.Cryptography;
using System.Text;

namespace API.Controllers
{

    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {

        private readonly UserContext _context;

        public UserController(UserContext context)
        {
            _context = context;
        }



        [HttpPost("registeruser")]
        public async Task<ActionResult<bool>> RegisterUser(RegisterDto register)
        {
            string passwordHash = BCrypt.Net.BCrypt.HashPassword(register.password);

            Register obj = new Register   // model obj is created 
            {
                name = register.name,
                type = register.type,
                email = register.email,
                password = passwordHash,
            };

            _context.Register.Add(obj);      // added in context->dbset
            await _context.SaveChangesAsync();


            if (register.type == "user")              // if user , it is stored in leaderboard database as well
            {
                Leaderboard leader = new Leaderboard
                {
                    email = register.email,        // count is 0 by default in DB 
                    name = register.name,
                };

                _context.Leaderboard.Add(leader);
                await _context.SaveChangesAsync();

            }

            return true;

        }


        [HttpPost("checkemailpassword")]

        public async Task<ActionResult> CheckEmailPassword(LoginDto login)
        {

            // 1. Check if the email exists in the database
            var user = await _context.Register.FirstOrDefaultAsync(u => u.email == login.email);

            // 2. If email doesn't exist, return an error message
            if (user == null || !BCrypt.Net.BCrypt.Verify(login.password, user.password) || user.type != login.type)
            {
                // If any of the conditions fail, return unauthorized 
                return Unauthorized();
            }

            var claims = new[]
            {
            new Claim(ClaimTypes.Email,login.email),    // Add other claims as needed
            new Claim(ClaimTypes.Role, login.type)

            };

            var secretKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes("superdooperSafetySecretKerdtfhyhey@456789"));
            var signinCredentials = new SigningCredentials(secretKey, SecurityAlgorithms.HmacSha256);
            var tokeOptions = new JwtSecurityToken(
                issuer: "https://localhost:7100",
                audience: "https://localhost:7100",
                claims: claims,
                expires: DateTime.Now.AddMinutes(30),
                signingCredentials: signinCredentials
            );
            var tokenString = new JwtSecurityTokenHandler().WriteToken(tokeOptions);

            return Ok( new AuthenticatedResponse { acesstoken = tokenString } );



        }




        [HttpPost("registerpet")]
        [Authorize(Roles = "owner")]
        public async Task<IActionResult> RegisterPet(PetsDto pets)
        {
            // Convert image to byte array (binary data)
            byte[] imageBytes;
            using (var memoryStream = new MemoryStream())
            {
                await pets.image.CopyToAsync(memoryStream);
                imageBytes = memoryStream.ToArray();
            }

            // Create a new pet object
            Pets newPet = new Pets
            {
                email = pets.email,
                image = imageBytes,  // Storing image as byte array
                name = pets.name,
                type = pets.type,
                breed = pets.breed,
                age = pets.age,
                quoted_price = pets.quoted_price
            };

            _context.Pets.Add(newPet);
            await _context.SaveChangesAsync();

            return Ok();
        }


        [HttpGet("owneranimals")]
        [Authorize(Roles = "owner")]
        public IActionResult GetOwnerAnimals(string email)
        {
            if (string.IsNullOrEmpty(email))
                return BadRequest();

            // Fetch data from the database
            var animals = _context.Pets
                .Where(a => a.email == email)
                .Select(a => new
                {
                    a.name,
                    a.quoted_price,
                    a.bought_price,
                    a.is_adopted,
                }).ToList();     // if nothing , empty list 

         
            return Ok(animals);
        }



        [HttpGet("allpets")]
        [Authorize(Roles = "user")]
        public async Task<IActionResult> GetAllPets()
        {
            var pets = await _context.Pets.ToListAsync();

            // Convert byte[] images to Base64 strings
            var petsWithImages = pets.Select(pet => new
            {
                pet.id,
                pet.email,
                pet.name,
                pet.type,
                pet.breed,
                pet.age,
                pet.quoted_price,
                pet.is_adopted,
                image = pet.image != null ? Convert.ToBase64String(pet.image) : null // Base64 conversion
            });

            return Ok(petsWithImages);
        }


        [HttpPut("setadoptandprice")]
        [Authorize(Roles = "user")]
        public async Task<IActionResult> UpdateAdoptionandPricce(int id, int price)
        {
            var pet = _context.Pets.FirstOrDefault(p => p.id == id);
            if (pet == null)
            {
                return NotFound();
            }

            pet.is_adopted = true;
            pet.bought_price = price;
            await _context.SaveChangesAsync();

            return Ok();
        }

        [HttpGet("leaders")]
        [Authorize(Roles = "user")]
        public async Task<IActionResult> GetLeaderboard()
        {
            var leaders = await _context.Leaderboard.OrderByDescending(l => l.purchasecount).ToListAsync();
            return Ok(leaders);
        }

        [HttpPut("setcount")]
        [Authorize(Roles = "user")]
        public async Task<IActionResult> UpdatePurchaseCount(string email)
        {
            var user = _context.Leaderboard.FirstOrDefault(p => p.email == email);
            if (user == null)
            {
                return NotFound();
            }

            user.purchasecount += 1;
            await _context.SaveChangesAsync();

            return Ok();
        }



    }
    
}
