using Application.Data.Entities;
using System.Threading.Tasks;
using Application.Models.Requests;
using System.Collections.Generic;
using System;

namespace Application.Services
{
    public interface IUserService
    {
        // Login a user and return an access token
        User GetUserInfo(Guid UserId);
        Task<User> CreateUserAsync(CreateUserModel CreateUserModel);
        Task<User> UpdatePasswordAsync(User user, string NewPassword);
        Task<User> UpdateUserAsync(User user, UpdateUserModel model);
        Task<User> UpdateUserAsync(User user, UpdateProfileModel model);
        Task<bool> DeleteUserAsync(User user);
        List<User> GetUsers();
        Task<Connection> CreateRequestConnection(User user, CreateConnectionModel model);
        Task<List<User>> SearchUsers(string queryString, int recordsPerPage, int pageNumber);
    }
}