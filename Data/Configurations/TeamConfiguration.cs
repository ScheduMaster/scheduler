using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Application.Data.Entities;

namespace Application.Data
{
    public class TeamConfiguration : IEntityTypeConfiguration<Team>
    {
        public void Configure(EntityTypeBuilder<Team> builder)
        {
            builder.ToTable("teams");

            builder.HasKey(team => team.Id);
            builder.Property(team => team.Id)
                .HasColumnName("id")
                .ValueGeneratedOnAdd();

            builder.Property(team => team.UserId)
                .HasColumnName("user_id")
                .IsRequired();

            builder.Property(team => team.Name).HasColumnName("name");
            
            builder.HasOne(team => team.Users)
                .WithMany()
                .HasForeignKey(team => team.UserId)
                .HasConstraintName("users_team_topic")
                .OnDelete(DeleteBehavior.NoAction);
        }
    }
}