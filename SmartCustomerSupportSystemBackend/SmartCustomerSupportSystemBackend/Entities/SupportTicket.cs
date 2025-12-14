namespace SmartCustomerSupportSystemBackend.Entities
{
    public class SupportTicket
    {
        public SupportTicket(string? name, string? email, string? description)
        {
            Name = name;
            Email = email;
            Description = description;
        }

        public Guid Id { get; set; }
        public string? Name { get; set; }
        public string? Email { get; set; }
        public string? Description { get; set; }
        public string? Summary { get; set; }
        public string? Status { get; set; }
        public string? Resolution { get; set; }
        public DateTime CreatedAt { get; set; }
        public DateTime UpdatedAt { get; set; }
    }
}
