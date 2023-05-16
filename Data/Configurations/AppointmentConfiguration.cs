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
            builder.Property(appointment => appointment.Start).HasColumnName("start");
            builder.Property(appointment => appointment.End).HasColumnName("end");
            builder.Property(appointment => appointment.CanceledAt).HasColumnName("canceled_at");
            builder.Property(appointment => appointment.Status).HasColumnName("status");
            builder.Property(appointment => appointment.CancelerId).HasColumnName("id_canceler");
            builder.Property(appointment => appointment.ProviderId).HasColumnName("id_provider");
            builder.Property(appointment => appointment.CustomerId).HasColumnName("id_customer");
            builder.Property(appointment => appointment.WorkId).HasColumnName("id_work");

            builder.HasOne(appointment => appointment.Canceler)
                .WithMany()
                .HasForeignKey(appointment => appointment.CancelerId)
                .HasConstraintName("appointments_users_canceler")
                .OnDelete(DeleteBehavior.NoAction);

            builder.HasOne(appointment => appointment.Provider)
                .WithMany()
                .HasForeignKey(appointment => appointment.ProviderId)
                .HasConstraintName("appointments_users_provider")
                .OnDelete(DeleteBehavior.NoAction);

            builder.HasOne(appointment => appointment.Customer)
                .WithMany()
                .HasForeignKey(appointment => appointment.CustomerId)
                .HasConstraintName("appointments_users_customer")
                .OnDelete(DeleteBehavior.NoAction);

            builder.HasOne(appointment => appointment.Work)
                .WithMany()
                .HasForeignKey(appointment => appointment.WorkId)
                .HasConstraintName("appointments_works")
                .OnDelete(DeleteBehavior.NoAction);
        }
    }
}