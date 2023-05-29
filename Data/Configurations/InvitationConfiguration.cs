using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Application.Data.Entities;

namespace Application.Data
{
   public class InvitationConfiguration : IEntityTypeConfiguration<Invitation>
    {
        public void Configure(EntityTypeBuilder<Invitation> builder)
        {
            builder.ToTable("invitations");

            builder.HasKey(invitation => invitation.Id);

            builder.Property(invitation => invitation.Id).HasColumnName("id");
            builder.Property(invitation => invitation.PartnerId).HasColumnName("partner_id");
            builder.Property(invitation => invitation.UserId).HasColumnName("user_id");
            builder.Property(invitation => invitation.AppointmentId).HasColumnName("appointment_id");
            builder.Property(invitation => invitation.ExpiresAt).HasColumnName("expires_at");
            builder.Property(invitation => invitation.Status).HasColumnName("status");

            builder.HasOne(invitation => invitation.Appointment)
                .WithMany()
                .HasForeignKey(invitation => invitation.AppointmentId)
                .OnDelete(DeleteBehavior.NoAction);
        }
    }
}