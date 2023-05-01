using Application.Models;
using System;
using System.Linq;
using System.Threading.Tasks;
using Application.Data;

namespace Application.Services 
{
    public class AuthService : IAuthService
    {
        private readonly DBContext _context;
        private readonly IHashService _hashService;

        public AuthService(DBContext context, IHashService hashService)
        {
            _context = context;
            _hashService = hashService;
        }

        public User Login(string email, string password)
        {
            // Get the user from the database
            User user = _context.Users.SingleOrDefault(u => u.Email == email);

            // Check if the user exists
            if (user == null)
            {
                throw new UnauthorizedAccessException("Invalid email or password");
            }

            // Verify the password
            if (!_hashService.VerifyPassword(password, user.PasswordHash))
            {
                throw new UnauthorizedAccessException("Invalid email or password");
            }

            return user;
        }

        public async Task Register(User user) 
        {
            // Hash the password using BCrypt.Net
            string hashedPassword = _hashService.HashPassword(user.Password);

            // Create a new User object and save it to the database using Entity Framework
            User newUser = new User
            {
                FirstName = user.FirstName,
                LastName = user.LastName,
                Email = user.Email,
                PhoneNumber = user.PhoneNumber,
                PasswordHash = hashedPassword
            };

            // Add user to database
            _context.Users.Add(newUser);
            await _context.SaveChangesAsync();
        }

        public async Task<bool> UpdatePassword(User user, string oldPassword, string newPassword)
        {
            // Check if user's password is same than old password
            if(user.PasswordHash != _hashService.HashPassword(oldPassword))
            {
                throw new UnauthorizedAccessException("Invalid password");
            }

            // Check if user's password is different than new password
            string NewHashPassword = _hashService.HashPassword(newPassword);

            if(user.PasswordHash == NewHashPassword)
            {
                throw new UnauthorizedAccessException("Invalid new password");
            }

            // Update new password and save
            user.PasswordHash = NewHashPassword;
            await _context.SaveChangesAsync();

            return true;
        }

        public async Task<bool> UpdateEmail(User user, string password, string newEmail)
        {
            // Check if user's password is same than input password
            if(user.PasswordHash != _hashService.HashPassword(password))
            {
                throw new UnauthorizedAccessException("Invalid password");
            }

            // Check if user's email is different than new email
            if(user.Email == newEmail)
            {
                throw new UnauthorizedAccessException("Invalid new email");
            }

            // Update new email and save
            user.Email = newEmail;
            await _context.SaveChangesAsync();

            return true;
        }
    }
}