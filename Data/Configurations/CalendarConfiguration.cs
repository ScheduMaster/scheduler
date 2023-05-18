using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Application.Data.Entities;

namespace Application.Data
{
    public class CalendarConfiguration : IEntityTypeConfiguration<Calendar>
    {
        public void Configure(EntityTypeBuilder<Calendar> builder)
        {
            builder.ToTable("calendars");

            builder.HasKey(c => c.Id);
            builder.Property(c => c.Id)
                .HasColumnName("id")
                .ValueGeneratedOnAdd();

            builder.Property(c => c.UserId)
                .HasColumnName("user_id")
                .IsRequired();

            builder.Property(c => c.Name).HasColumnName("name");
            builder.Property(c => c.BackgroundColor).HasColumnName("background_color");
            builder.Property(c => c.BorderColor).HasColumnName("border_color");
            builder.Property(c => c.DragBackgroundColor).HasColumnName("drag_background_color");

            builder.HasOne<User>()
                .WithMany()
                .HasForeignKey(c => c.UserId)
                .HasConstraintName("FK_calendar_user")
                .OnDelete(DeleteBehavior.Restrict)
                .IsRequired();
        }
    }
}