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

            builder.HasKey(calendar => calendar.Id);
            builder.Property(calendar => calendar.Id)
                .HasColumnName("id")
                .ValueGeneratedOnAdd();

            builder.Property(calendar => calendar.UserId)
                .HasColumnName("user_id")
                .IsRequired();

            builder.Property(calendar => calendar.Name).HasColumnName("name");
            builder.Property(calendar => calendar.BackgroundColor).HasColumnName("background_color");
            builder.Property(calendar => calendar.BorderColor).HasColumnName("border_color");
            builder.Property(calendar => calendar.DragBackgroundColor).HasColumnName("drag_background_color");

            builder.HasOne<User>()
                .WithMany()
                .HasForeignKey(calendar => calendar.UserId)
                .HasConstraintName("FK_calendar_user")
                .OnDelete(DeleteBehavior.Restrict)
                .IsRequired();
        }
    }
}