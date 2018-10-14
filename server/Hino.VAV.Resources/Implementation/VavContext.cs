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

        public DbSet<Section> Section { get; set; }

        public DbSet<ChassisModel> ChassisModel { get; set; }

        public DbSet<BodyType> BodyType { get; set; }

        public DbSet<TaktTime> TaktTime { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Mo>().ToTable("Mo");
            modelBuilder.Entity<MoChassis>().ToTable("MoChassis");
            modelBuilder.Entity<Section>().ToTable("Section");
            modelBuilder.Entity<ChassisModel>().ToTable("ChassisModel");
            modelBuilder.Entity<BodyType>().ToTable("BodyType");
            modelBuilder.Entity<TaktTime>().ToTable("TaktTime");
        }
    }
}