using System;
using System.Text.RegularExpressions;

namespace Application.Services 
{
    public class DetectService : IDetectService
    {
        public bool IsName(string input)
        {
            // Regular expression pattern for a name (assuming only alphabets and spaces)
            string pattern = @"^[A-Za-z\s]+$";

            return Regex.IsMatch(input, pattern);
        }

        public bool IsPhoneNumber(string input)
        {
            // Regular expression pattern for a phone number (assuming a simple format)
            string pattern = @"^\d{10}$";

            return Regex.IsMatch(input, pattern);
        }

        public bool IsEmail(string input)
        {
            // Regular expression pattern for an email address (assuming a simple format)
            string pattern = @"^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$";

            return Regex.IsMatch(input, pattern);
        }
    }
}
