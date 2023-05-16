using System.Collections.Generic;

namespace Application.Data.Entities
{
    public class Work
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public int Duration { get; set; }
        public bool Editable { get; set; }
        public string Target { get; set; }
        public string Description { get; set; }

        public virtual ICollection<WorkProvider> WorkProviders { get; set; }
    }
}
