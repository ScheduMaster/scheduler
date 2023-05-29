using System;

namespace Application.Exceptions
{
    class NoResultException : Exception
    {
        public NoResultException() : base("Class not found.")
        {
        }

        public NoResultException(string message) : base(message)
        {
        }

        public NoResultException(string message, Exception innerException) : base(message, innerException)
        {
        }
    }
}