using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using System;
using Application.Data.Entities;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;

namespace Application.Data
{
    public class DBContext : IdentityDbContext<User, IdentityRole<Guid>, Guid>
    {
        public DBContext(DbContextOptions<DBContext> options)
            : base(options)
        {
        }
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);
            modelBuilder.ApplyConfiguration(new UserConfiguration());
        }
        public DbSet<User> User { get; set; }
    }
}