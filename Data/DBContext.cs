using System;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Application.Data.Entities;
using Application.Services;

namespace Application.Data
{
    public class DBContext : IdentityDbContext<User, IdentityRole<Guid>, Guid>
    {
        private readonly IHashService _hashService;
        public DBContext(DbContextOptions<DBContext> options, IHashService hashService)
            : base(options)
        {
            _hashService = hashService;
        }
        
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {   
            base.OnModelCreating(modelBuilder);
            modelBuilder.ApplyConfiguration(new UserConfiguration());
            modelBuilder.ApplyConfiguration(new TokenConfiguration());
            modelBuilder.ApplyConfiguration(new AppointmentConfiguration());
            modelBuilder.ApplyConfiguration(new NotificationConfiguration());
            modelBuilder.ApplyConfiguration(new WorksProviderConfiguration());
            modelBuilder.ApplyConfiguration(new CalendarConfiguration());
            modelBuilder.ApplyConfiguration(new InvitationConfiguration());

            modelBuilder.Entity<User>().HasData(
                new User
                {
                    Id = Guid.Parse("39F84ED2-41D7-4F50-C84A-08DB59C30BA6"),
                    FirstName = "Hoc",
                    LastName = "Tran Van",
                    PasswordHash = _hashService.HashPassword("12345678"),
                    Address = "Ho Chi Minh",
                    Role = "Admin",
                    DateOfBirth = new DateTime(2001, 12, 29),
                    IsActive = false,
                    Email = "hoc@scheduler.com",
                    ConcurrencyStamp = "bdb211de-f18a-45e2-a4b0-7635cc97366a",
                    PhoneNumber = "01269454343",
                    PhoneNumberConfirmed = false
                },
                new User
                {
                    Id = Guid.Parse("EDB42291-18B6-4713-C84B-08DB59C30BA6"),
                    FirstName = "Cuong",
                    LastName = "Luu",
                    PasswordHash = _hashService.HashPassword("12345678"),
                    Address = "123 Main St, Anytown, USA",
                    Role = "Client",
                    DateOfBirth = new DateTime(1996, 12, 16),
                    IsActive = false,
                    Email = "cuong@scheduler.com",
                    ConcurrencyStamp = "a1a73651-898f-4227-9ec7-509bb1e136da",
                    PhoneNumber = "0979182391",
                    PhoneNumberConfirmed = false
                },
                new User
                {
                    Id = Guid.Parse("318C212E-C1CF-444A-7CA3-08DB602A105A"),
                    FirstName = "Admin",
                    LastName = "Demo",
                    PasswordHash = _hashService.HashPassword("12345678"),
                    Address = "257 Fireweed Ln",
                    Role = "Admin",
                    DateOfBirth = new DateTime(1954, 4, 6),
                    IsActive = false,
                    Email = "admin@scheduler.com",
                    ConcurrencyStamp = "4993d8f0-d015-45da-b263-663a9f0fe5f5",
                    PhoneNumber = "01269454344",
                    PhoneNumberConfirmed = false
                }
            );

            modelBuilder.Entity<Calendar>().HasData
            (
                new Calendar
                {
                    Id = 1,
                    UserId = Guid.Parse("39F84ED2-41D7-4F50-C84A-08DB59C30BA6"),
                    Name = "Default",
                    BackgroundColor = "#ffffff",
                    BorderColor = "#000000",
                    DragBackgroundColor = "#cccccc"
                },
                new Calendar
                {
                    Id = 2,
                    UserId = Guid.Parse("39F84ED2-41D7-4F50-C84A-08DB59C30BA6"),
                    Name = "Private",
                    BackgroundColor = "#9e5fff",
                    BorderColor = "#65a94c",
                    DragBackgroundColor = "#839334"
                },
                new Calendar
                {
                    Id = 3,
                    UserId = Guid.Parse("39F84ED2-41D7-4F50-C84A-08DB59C30BA6"),
                    Name = "Company",
                    BackgroundColor = "#00a9ff",
                    BorderColor = "#00a9ff",
                    DragBackgroundColor = "#00a9ff"
                },
                new Calendar
                {
                    Id = 4,
                    UserId = Guid.Parse("39F84ED2-41D7-4F50-C84A-08DB59C30BA6"),
                    Name = "Vacation",
                    BackgroundColor = "#66cc66",
                    BorderColor = "#66cc66",
                    DragBackgroundColor = "#66cc66"
                },
                new Calendar
                {
                    Id = 5,
                    UserId = Guid.Parse("39F84ED2-41D7-4F50-C84A-08DB59C30BA6"),
                    Name = "Meetings",
                    BackgroundColor = "#ffa500",
                    BorderColor = "#ffa500",
                    DragBackgroundColor = "#ffa500"
                },
                new Calendar
                {
                    Id = 6,
                    UserId = Guid.Parse("39F84ED2-41D7-4F50-C84A-08DB59C30BA6"),
                    Name = "Holidays",
                    BackgroundColor = "#f5f5dc",
                    BorderColor = "#f5f5dc",
                    DragBackgroundColor = "#f5f5dc"
                },
                new Calendar
                {
                    Id = 7,
                    UserId = Guid.Parse("39F84ED2-41D7-4F50-C84A-08DB59C30BA6"),
                    Name = "Birthdays",
                    BackgroundColor = "#ff69b4",
                    BorderColor = "#ff69b4",
                    DragBackgroundColor = "#ff69b4"
                },
                new Calendar
                {
                    Id = 8,
                    UserId = Guid.Parse("39F84ED2-41D7-4F50-C84A-08DB59C30BA6"),
                    Name = "Deadlines",
                    BackgroundColor = "#8b0000",
                    BorderColor = "#8b0000",
                    DragBackgroundColor = "#8b0000"
                },
                new Calendar
                {
                    Id = 9,
                    UserId = Guid.Parse("39F84ED2-41D7-4F50-C84A-08DB59C30BA6"),
                    Name = "Appointments",
                    BackgroundColor = "#00ced1",
                    BorderColor = "#00ced1",
                    DragBackgroundColor = "#00ced1"
                },
                new Calendar
                {
                    Id = 10,
                    UserId = Guid.Parse("39F84ED2-41D7-4F50-C84A-08DB59C30BA6"),
                    Name = "Tasks",
                    BackgroundColor = "#ffd700",
                    BorderColor = "#ffd700",
                    DragBackgroundColor = "#ffd700"
                },
                new Calendar
                {
                    Id = 11,
                    UserId = Guid.Parse("EDB42291-18B6-4713-C84B-08DB59C30BA6"),
                    Name = "Van Lang",
                    BackgroundColor = "#c05d5d",
                    BorderColor = "#ed0c0c",
                    DragBackgroundColor = "#2c1111"
                }
            );
        }

        public DbSet<AuthToken> AuthToken { get; set; }
        public DbSet<Appointment> Appointment { get; set; }
        public DbSet<Notification> Notification { get; set; }
        public DbSet<WorkProvider> WorkProvider { get; set; }
        public DbSet<Calendar> Calendar { get; set; }
        public DbSet<Invitation> Invitation { get; set; }
    }
}