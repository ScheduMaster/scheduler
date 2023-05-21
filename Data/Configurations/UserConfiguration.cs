using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Application.Data.Entities;

namespace Application.Data
{
    public class UserConfiguration : IEntityTypeConfiguration<User>
    {
        public void Configure(EntityTypeBuilder<User> builder)
        {
            builder.ToTable("users");
            builder.HasKey(user => user.Id);
            builder.Property(user => user.FirstName);
            builder.Property(user => user.LastName);
            builder.Property(user => user.Address);
            builder.Property(user => user.Email);
            builder.Property(user => user.Role);
            builder.Property(user => user.DateOfBirth);
            builder.Property(user => user.IsActive);
        }
    }
}