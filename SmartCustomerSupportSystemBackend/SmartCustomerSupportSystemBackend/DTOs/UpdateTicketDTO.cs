namespace SmartCustomerSupportSystemBackend.DTOs
{
    public class UpdateTicketDTO
    {
        public Guid Id { get; set; }
        public string? Status { get; set; }
        public string? Resolution { get; set; }
    }
}
