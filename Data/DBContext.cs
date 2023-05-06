using System;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Application.Data.Entities;

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
            modelBuilder.ApplyConfiguration(new TokenConfiguration());
        }
        public DbSet<User> User { get; set; }
        public DbSet<AuthToken> AuthToken { get; set; }
    }
}