using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Application.Data.Entities;

namespace Application.Data
{
    public class TokenConfiguration : IEntityTypeConfiguration<AuthToken>
    {
        public void Configure(EntityTypeBuilder<AuthToken> builder)
        {
            builder.ToTable("tokens");
            builder.HasKey(token => token.Id);
            builder.Property(token => token.Token).HasColumnName("token");
            builder.Property(token => token.Type).HasColumnName("type");
            builder.Property(token => token.ExpiresAt).HasColumnName("expires_at");
            builder.Property(token => token.Blacklisted).HasColumnName("black_listed");            
            builder.Property(token => token.UserId).HasColumnName("user_id");

            builder.HasOne(token => token.User)
               .WithMany(user => user.Tokens)
               .HasForeignKey(token => token.UserId);
        }
    }
}