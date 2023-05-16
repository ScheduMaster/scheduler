using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Application.Data.Entities;

namespace Application.Data
{
    public class ProviderConfiguration : IEntityTypeConfiguration<Provider>
    {
        public void Configure(EntityTypeBuilder<Provider> builder)
        {
            builder.ToTable("providers");

            builder.HasKey(provider => provider.Id);

            builder.HasOne(provider => provider.User)
                .WithOne()
                .HasForeignKey<Provider>(provider => provider.UserId)
                .HasConstraintName("FK_provider_user");

            builder.HasIndex(provider => provider.UserId);
        }
    }
}