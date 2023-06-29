using Application.Data.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;

namespace Application.Services
{
    public interface IDetectService
    {
        bool IsName(string input);
        bool IsPhoneNumber(string input);
        bool IsEmail(string input);
    }
}