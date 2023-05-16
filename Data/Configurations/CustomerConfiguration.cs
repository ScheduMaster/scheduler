using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Application.Data.Entities;

namespace Application.Data
{
    public class CustomerConfiguration : IEntityTypeConfiguration<Customer>
    {
        public void Configure(EntityTypeBuilder<Customer> builder)
        {
            builder.ToTable("customers");

            builder.HasKey(customer => customer.Id);
            builder.Property(customer => customer.Id).HasColumnName("id_customer");

            builder.HasOne<User>()
                .WithOne()
                .HasForeignKey<Customer>("Id")
                .HasConstraintName("FK_customer_user")
                .IsRequired();
        }
    }
}