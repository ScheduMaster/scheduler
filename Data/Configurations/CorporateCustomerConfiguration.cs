using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Application.Data.Entities;

namespace Application.Data
{
    public class CorporateCustomerConfiguration : IEntityTypeConfiguration<CorporateCustomer>
    {
        public void Configure(EntityTypeBuilder<CorporateCustomer> builder)
        {
            builder.ToTable("corporate_customers");

            builder.HasKey(coporate_customer => coporate_customer.IdCustomer);
            builder.Property(coporate_customer => coporate_customer.IdCustomer).HasColumnName("id_customer");
            builder.Property(coporate_customer => coporate_customer.VatNumber).HasColumnName("vat_number");
            builder.Property(coporate_customer => coporate_customer.CompanyName).HasColumnName("company_name");

            builder.HasOne<User>()
                .WithOne()
                .HasForeignKey<CorporateCustomer>(coporate_customer => coporate_customer.IdCustomer)
                .HasConstraintName("FK_corporate_customer_user");
        }
    }
}