using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Application.Data.Entities;

namespace Application.Data
{
    public class NotificationConfiguration : IEntityTypeConfiguration<Notification>
    {
        public void Configure(EntityTypeBuilder<Notification> builder)
        {
            builder.ToTable("notifications");

            builder.HasKey(notification => notification.Id);

            builder.Property(notification => notification.Title)
                .HasColumnType("varchar(256)");

            builder.Property(notification => notification.Message)
                .HasColumnName("message")
                .HasColumnType("text");

            builder.Property(notification => notification.CreatedAt)
                .HasColumnName("created_at");

            builder.Property(notification => notification.Url)
                .HasColumnName("url");

            builder.Property(notification => notification.IsRead)
                .HasColumnName("is_read");

            builder.Property(notification => notification.UserId)
                .HasColumnName("id_user");

            builder.HasOne(notification => notification.User)
                .WithMany(user => user.Notifications)
                .HasForeignKey(notification => notification.UserId)
                .OnDelete(DeleteBehavior.NoAction);
            }
    }
}