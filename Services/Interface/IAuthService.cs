using Application.Data.Entities;
using System.Threading.Tasks;

namespace Application.Services
{
    public interface IAuthService
    {
        // Login a user and return an access token
        User Login(string username, string password);

        // Register a new user and return an access token
        Task Register(User user);

        // Update a user's password
        Task<bool> UpdatePassword(User user, string oldPassword, string newPassword);

        // Update a user's email address
        Task<bool> UpdateEmail(User user, string password, string newEmail);
    }

}