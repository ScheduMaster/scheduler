using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Application.Data.Entities;

namespace Application.Data
{
    public class WorkConfiguration : IEntityTypeConfiguration<Work>
    {
        public void Configure(EntityTypeBuilder<Work> builder)
        {
            builder.ToTable("works");

            builder.HasKey(work => work.Id);
            builder.Property(work => work.Name).HasMaxLength(256);
            builder.Property(work => work.Duration);
            builder.Property(work => work.Editable);
            builder.Property(work => work.Target);
            builder.Property(work => work.Description).HasColumnType("text");
        }
    }
}