using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Application.Data.Entities;

namespace Application.Data
{
    public class ExchangeConfiguration : IEntityTypeConfiguration<Exchange>
    {
        public void Configure(EntityTypeBuilder<Exchange> builder)
        {
            builder.ToTable("exchanges");

            builder.HasKey(exchange => exchange.Id);
            builder.Property(exchange => exchange.Id).HasColumnName("id");

            builder.Property(exchange => exchange.ExchangeStatus)
                .HasColumnName("exchange_status");

            builder.Property(exchange => exchange.AppointmentRequestorId)
                .HasColumnName("id_appointment_requestor");

            builder.Property(exchange => exchange.AppointmentRequestedId)
                .HasColumnName("id_appointment_requested");

            builder.HasOne(exchange => exchange.AppointmentRequestor)
                .WithMany()
                .HasForeignKey(exchange => exchange.AppointmentRequestorId)
                .OnDelete(DeleteBehavior.NoAction)
                .HasConstraintName("FK_exchange_appointment_requestor");

            builder.HasOne(exchange => exchange.AppointmentRequested)
                .WithMany()
                .HasForeignKey(exchange => exchange.AppointmentRequestedId)
                .OnDelete(DeleteBehavior.NoAction)
                .HasConstraintName("FK_exchange_appointment_requested");
        }
    }
}