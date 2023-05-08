using Application.Data.Entities;
using System;
using System.Linq;
using System.Threading.Tasks;
using Application.Data;

namespace Application.Services 
{
    public class UserService : IUserService
    {
        private readonly DBContext _context;

        public UserService(DBContext context)
        {
            _context = context;
        }

        public User GetUserInfo(Guid UserId)
        {
            // Get the user from the database
            User user = _context.Users.SingleOrDefault(u => u.Id == UserId);

            // Check if the user exists
            if (user == null)
            {
                return null;
            }

            return user;
        }
    }
}