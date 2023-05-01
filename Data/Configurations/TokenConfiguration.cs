using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Application.Models;

namespace Application.Data
{
    public class TokenConfiguration : IEntityTypeConfiguration<AuthToken>
    {
        public void Configure(EntityTypeBuilder<AuthToken> builder)
        {
            builder.ToTable("TOKEN");
            builder.HasKey(token => token.Id);
            builder.Property(token => token.Token);
            builder.Property(token => token.Type);
            builder.Property(token => token.UserId);
            builder.Property(token => token.ExpiresAt);
            builder.Property(token => token.Blacklisted);
        }
    }
}