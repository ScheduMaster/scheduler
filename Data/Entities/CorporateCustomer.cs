using System;
using Application.Data.Entities;

namespace Application.Data.Entities
{
    public class CorporateCustomer
    {
        public Guid IdCustomer { get; set; }
        public string VatNumber { get; set; }
        public string CompanyName { get; set; }
    }
}