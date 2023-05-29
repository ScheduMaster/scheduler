using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Application.Data.Entities;

namespace Application.Data
{
    public class ConnectionConfiguration : IEntityTypeConfiguration<Connection>
    {
        public void Configure(EntityTypeBuilder<Connection> builder)
        {
            builder.ToTable("connections");

            builder.HasKey(connection => connection.Id);
            builder.Property(connection => connection.Id)
                .HasColumnName("id")
                .ValueGeneratedOnAdd();

            builder.Property(connection => connection.FisrtUserId)
                .HasColumnName("first_user_id")
                .IsRequired();

            builder.Property(connection => connection.SecondUserId)
                .HasColumnName("second_user_id")
                .IsRequired();

            builder.Property(connection => connection.Status).HasColumnName("status");
            builder.Property(connection => connection.ConnectionDate).HasColumnName("connection_date");
            builder.Property(connection => connection.Message).HasColumnName("message");

            builder.HasOne(connection => connection.FirstUser)
                .WithMany(user => user.Connections)
                .HasForeignKey(connection => connection.FisrtUserId)
                .HasConstraintName("FK_connection_first_user")
                .OnDelete(DeleteBehavior.NoAction)
                .IsRequired();
            
            // Ignore the SecondUser navigation property before configuring the relationship
            builder.Ignore(connection => connection.SecondUser);

            builder.HasOne(connection => connection.SecondUser)
                .WithMany()
                .HasForeignKey(connection => connection.SecondUserId)
                .HasConstraintName("FK_connection_second_user")
                .OnDelete(DeleteBehavior.NoAction)
                .IsRequired();
        }
    }
}