using Application.Data.Entities;
using System.Threading.Tasks;
using System;

namespace Application.Services
{
    public interface IUserService
    {
        // Login a user and return an access token
        User GetUserInfo(Guid UserId);
    }

}