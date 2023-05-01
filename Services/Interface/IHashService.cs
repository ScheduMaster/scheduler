using Application.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;

namespace Application.Services
{
    public interface IHashService
    {
        // Hashes a password using a randomly generated salt
        string HashPassword(string password);

        // Verifies that a password matches a given hash
        bool VerifyPassword(string password, string hash);
    }
}