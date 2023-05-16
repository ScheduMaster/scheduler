using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Application.Data.Entities;

namespace Application.Data
{
   public class WorksProviderConfiguration : IEntityTypeConfiguration<WorkProvider>
    {
        public void Configure(EntityTypeBuilder<WorkProvider> builder)
        {
            builder.ToTable("works_providers");

            builder.HasKey(works_provider => new { works_provider.UserId, works_provider.WorkId });

            builder.HasOne(works_provider => works_provider.User)
                .WithMany(user => user.WorkProviders)
                .HasForeignKey(works_provider => works_provider.UserId)
                .OnDelete(DeleteBehavior.NoAction);

            builder.HasOne(works_provider => works_provider.Work)
                .WithMany(work => work.WorkProviders)
                .HasForeignKey(works_provider => works_provider.WorkId)
                .OnDelete(DeleteBehavior.NoAction);
        }
    }
}