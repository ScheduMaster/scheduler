using Application.Data.Entities;
using System;
using System.Linq;
using System.Threading.Tasks;
using Application.Data;
using Application.Models.Requests;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;
using Application.Exceptions;

namespace Application.Services 
{
    public class UserService : IUserService
    {
        private readonly DBContext _context;
        private readonly IHashService _hashService;
        private readonly IDetectService _detectService;

        public UserService(DBContext context, IHashService hashService, IDetectService detectService)
        {
            _context = context;
            _hashService = hashService;
            _hashService = hashService;
            _detectService = detectService;
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

        public async Task<User> CreateUserAsync(CreateUserModel CreateUserModel)
        {
            // Hash the password using BCrypt.Net
            string hashedPassword = _hashService.HashPassword(CreateUserModel.Password);

            // Create a new user model with the data from the RegisterModel
            User createdUser = new User
            {
                Email = CreateUserModel.Email,
                FirstName = CreateUserModel.FirstName,
                LastName = CreateUserModel.LastName,
                Address = CreateUserModel.Address,
                PhoneNumber = CreateUserModel.PhoneNumber,
                PasswordHash = hashedPassword,
                Role = CreateUserModel.Role
            };

            // Call the userContext to create the user
            _context.Users.Add(createdUser);
            await _context.SaveChangesAsync();

            return createdUser;
        }

        public async Task<User> UpdatePasswordAsync(User user, string NewPassword)
        {
            // Hash the password using BCrypt.Net
            string hashedPassword = _hashService.HashPassword(NewPassword);

            // Update user model with the data from the RegisterModel
            user.PasswordHash = hashedPassword;

            // Call the userContext to create the user
            _context.Users.Update(user);
            await _context.SaveChangesAsync();

            return user;
        }

        public async Task<User> UpdateUserAsync(User userToUpdate, UpdateUserModel model)
        {
            // Update the user's properties
            if (!string.IsNullOrEmpty(model.FirstName) && userToUpdate.FirstName != model.FirstName)
            {
                userToUpdate.FirstName = model.FirstName;
            }

            if (!string.IsNullOrEmpty(model.LastName) && userToUpdate.LastName != model.LastName)
            {
                userToUpdate.LastName = model.LastName;
            }

            if (!string.IsNullOrEmpty(model.Address) && userToUpdate.Address != model.Address)
            {
                userToUpdate.Address = model.Address;
            }

            if (!string.IsNullOrEmpty(model.PhoneNumber) && userToUpdate.PhoneNumber != model.PhoneNumber)
            {
                userToUpdate.PhoneNumber = model.PhoneNumber;
            }

            if (!string.IsNullOrEmpty(model.Email) && userToUpdate.Email != model.Email)
            {
                // Check if the email address is already in use
                if (_context.Users.Any(u => u.Email == model.Email))
                {
                    throw new UnauthorizedAccessException("This email address already exists");
                }
                userToUpdate.Email = model.Email;
            }

            if (!string.IsNullOrEmpty(model.Role) && userToUpdate.Role != model.Role)
            {
                // Check if the role is valid
                if (model.Role != "Admin" || model.Role != "Client")
                {
                    throw new UnauthorizedAccessException("This role is not exists");
                }
                userToUpdate.Role = model.Role;
            }

            // Call the userContext to update the user
            _context.Users.Update(userToUpdate);
            await _context.SaveChangesAsync();

            return userToUpdate;
        }

        public async Task<User> UpdateUserAsync(User userToUpdate, UpdateProfileModel model)
        {
            // Update the user's properties
            if (!string.IsNullOrEmpty(model.FirstName) && userToUpdate.FirstName != model.FirstName)
            {
                userToUpdate.FirstName = model.FirstName;
            }

            if (!string.IsNullOrEmpty(model.LastName) && userToUpdate.LastName != model.LastName)
            {
                userToUpdate.LastName = model.LastName;
            }

            if (!string.IsNullOrEmpty(model.Address) && userToUpdate.Address != model.Address)
            {
                userToUpdate.Address = model.Address;
            }

            if (!string.IsNullOrEmpty(model.PhoneNumber) && userToUpdate.PhoneNumber != model.PhoneNumber)
            {
                userToUpdate.PhoneNumber = model.PhoneNumber;
            }

            if (!string.IsNullOrEmpty(model.Email) && userToUpdate.Email != model.Email)
            {
                // Check if the email address is already in use
                if (_context.Users.Any(u => u.Email == model.Email))
                {
                    throw new UnauthorizedAccessException("This email address already exists");
                }
                userToUpdate.Email = model.Email;
            }

            // Call the userContext to update the user
            _context.Users.Update(userToUpdate);
            await _context.SaveChangesAsync();

            return userToUpdate;
        }

        public async Task<bool> DeleteUserAsync(User deleteUser)
        {
            // Call the userContext to delete the user
            _context.Users.Remove(deleteUser);
            await _context.SaveChangesAsync();
            
            return true;
        }

        public List<User> GetUsers()
        {
            // Call the userContext to get the users
            List<User> users = _context.Users.ToList();
            
            return users;
        }

        public async Task<Connection> CreateRequestConnection(User user, CreateConnectionModel model)
        {
            // Check if it exits any pending request connections
            Connection previousConnection = _context.Connection
                .SingleOrDefault(c => (c.FisrtUserId == user.Id && c.SecondUserId == model.PatnerId) || 
                    (c.FisrtUserId == model.PatnerId && c.SecondUserId == user.Id));


            if (previousConnection != null)
            {
                return previousConnection;
            }

            // Create new request connection
            Connection connection = new Connection
            {
                FisrtUserId = user.Id,
                SecondUserId = model.PatnerId,
                Status = Status.PENDING,
                Message = model.Message
            };
            
            _context.Connection.Add(connection);
            await _context.SaveChangesAsync();

            return connection;
        }

        public async Task<List<User>> SearchUsers(string queryString, int recordsPerPage, int pageNumber)
        {
            IQueryable<User> query = _context.Users.AsQueryable();
            
            // Detect queryString and apply search criteria
            if (!string.IsNullOrEmpty(queryString))
            {
                if (_detectService.IsName(queryString))
                {
                    query = query.Where(u => u.FirstName.Contains(queryString) || u.LastName.Contains(queryString));
                }
                else if (_detectService.IsPhoneNumber(queryString))
                {
                    query = query.Where(u => u.PhoneNumber.Contains(queryString));
                }
                else if (_detectService.IsEmail(queryString))
                {
                    query = query.Where(u => u.Email.Contains(queryString));
                }
                else
                {
                    throw new ArgumentException("Unable to detect the type of the input string.");
                }
            } 
            else
            {
                throw new ArgumentException("Please input more information.");
            }

            // Calculate the number of records to skip based on page number and records per page
            int recordsToSkip = (pageNumber - 1) * recordsPerPage;

            // Apply pagination
            query = query.Skip(recordsToSkip).Take(recordsPerPage).OrderBy(u => u.FirstName);

            // Execute the query and retrieve the users
            List<User> users = await query.ToListAsync();
            if (users.Count == 0)
            {
                throw new NoResultException("Can not found any records.");
            }

            return users;
        }
    }
}