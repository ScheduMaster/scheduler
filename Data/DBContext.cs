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
            modelBuilder.ApplyConfiguration(new AppointmentConfiguration());
            modelBuilder.ApplyConfiguration(new CorporateCustomerConfiguration());
            modelBuilder.ApplyConfiguration(new CustomerConfiguration());
            modelBuilder.ApplyConfiguration(new ExchangeConfiguration());
            modelBuilder.ApplyConfiguration(new MessageConfiguration());
            modelBuilder.ApplyConfiguration(new NotificationConfiguration());
            modelBuilder.ApplyConfiguration(new ProviderConfiguration());
            modelBuilder.ApplyConfiguration(new WorkConfiguration());
            modelBuilder.ApplyConfiguration(new WorkingPlanConfiguration());
            modelBuilder.ApplyConfiguration(new WorksProviderConfiguration());
            modelBuilder.ApplyConfiguration(new CalendarConfiguration());
        }

        public DbSet<AuthToken> AuthToken { get; set; }
        public DbSet<Appointment> Appointment { get; set; }
        public DbSet<CorporateCustomer> CorporateCustomer { get; set; }
        public DbSet<Customer> Customer { get; set; }
        public DbSet<Exchange> Exchange { get; set; }
        public DbSet<Message> Message { get; set; }
        public DbSet<Notification> Notification { get; set; }
        public DbSet<Provider> Provider { get; set; }
        public DbSet<Work> Work { get; set; }
        public DbSet<WorkingPlan> WorkingPlan { get; set; }
        public DbSet<WorkProvider> WorkProvider { get; set; }
        public DbSet<Calendar> Calendar { get; set; }
    }
}