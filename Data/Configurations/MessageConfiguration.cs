using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Application.Data.Entities;

namespace Application.Data
{
    public class MessageConfiguration : IEntityTypeConfiguration<Message>
    {
        public void Configure(EntityTypeBuilder<Message> builder)
        {
            builder.ToTable("messages");

            builder.HasKey(message => message.Id);
            builder.Property(message => message.CreatedAt).HasColumnName("created_at");
            builder.Property(message => message.Text).HasColumnName("message");
            builder.Property(message => message.AuthorId).HasColumnName("id_author");
            builder.Property(message => message.AppointmentId).HasColumnName("id_appointment");

            builder
                .HasOne(message => message.Author)
                .WithMany()
                .HasForeignKey(message => message.AuthorId)
                .OnDelete(DeleteBehavior.NoAction);

            builder
                .HasOne(message => message.Appointment)
                .WithMany()
                .HasForeignKey(message => message.AppointmentId)
                .OnDelete(DeleteBehavior.NoAction);
        }
    }
}