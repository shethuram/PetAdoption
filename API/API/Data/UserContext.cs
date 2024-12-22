using API.Models;
using Microsoft.EntityFrameworkCore;

namespace API.Data
{
    public class UserContext : DbContext
    {

        public UserContext(DbContextOptions<UserContext> options) : base(options)
        {
        }

        public DbSet<Register> Register { get; set; }
        public DbSet<Pets> Pets { get; set; }
        public DbSet<Leaderboard> Leaderboard { get; set; }
    }


}
