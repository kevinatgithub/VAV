using Hino.VAV.Models;
using Microsoft.EntityFrameworkCore;

namespace Hino.VAV.Resources.Implementation
{
    public class VavContext : DbContext
    {
        public VavContext(DbContextOptions<VavContext> options)
            : base(options)
        {
        }

        public DbSet<Mo> Mo { get; set; }

        public DbSet<MoChassis> MoChassis { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Mo>().ToTable("Mo");
            modelBuilder.Entity<MoChassis>().ToTable("MoChassis");
        }
    }
}