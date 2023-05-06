using System;

namespace Application.Data.Entities
{
    public enum TokenType
    {
        ACCESS,
        REFRESH
    } 
    public class AuthToken
    {
        public int Id { get; set; }
        public string Token { get; set; }
        public TokenType Type { get; set; }
        public DateTime ExpiresAt { get; set; }
        public Guid UserId { get; set; }
        public bool Blacklisted { get; set; }
    }
}
