using System.ComponentModel.DataAnnotations;

namespace Application.Models.Requests
{
    public class SearchUserModel
    {
        public string SearchQuery { get; set; }
        public int RecordsPerPage { get; set; }
        public int PageNumber { get; set; }
    }
}