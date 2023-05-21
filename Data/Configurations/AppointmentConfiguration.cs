using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Application.Data.Entities;

namespace Application.Data
{
    public class AppointmentConfiguration : IEntityTypeConfiguration<Appointment>
    {
        public void Configure(EntityTypeBuilder<Appointment> builder)
        {
            builder.ToTable("appointments");

            builder.HasKey(appointment => appointment.Id);
            builder.Property(appointment => appointment.Name).HasColumnName("name");
            builder.Property(appointment => appointment.Location).HasColumnName("location");
            builder.Property(appointment => appointment.Start).HasColumnName("start");
            builder.Property(appointment => appointment.End).HasColumnName("end");
            builder.Property(appointment => appointment.CanceledAt).HasColumnName("canceled_at");
            builder.Property(appointment => appointment.Status).HasColumnName("status");
            builder.Property(appointment => appointment.Editable).HasColumnName("edit_able");
            builder.Property(appointment => appointment.UserId).HasColumnName("id_user");
            builder.Property(appointment => appointment.CalendarId).HasColumnName("id_calendar");

            builder.HasOne(appointment => appointment.Initiator)
                .WithMany()
                .HasForeignKey(appointment => appointment.UserId)
                .HasConstraintName("appointments_users_owner")
                .OnDelete(DeleteBehavior.NoAction);
            
            builder.HasOne(appointment => appointment.Calendar)
                .WithMany()
                .HasForeignKey(appointment => appointment.CalendarId)
                .HasConstraintName("appointments_calendar_topic")
                .OnDelete(DeleteBehavior.NoAction);
        }
    }
}