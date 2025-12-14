using SmartCustomerSupportSystemBackend.Entities;
using SmartCustomerSupportSystemBackend.Interfaces;

namespace SmartCustomerSupportSystemBackend.Utilities
{
    public class EmailTicketNotificationStrategy
        : ITicketNotificationStrategy
    {
        private readonly IEmailSender _emailSender;
        private readonly string _apiAddress;
        public EmailTicketNotificationStrategy(IEmailSender emailSender, IConfiguration config)
        {
            _emailSender = emailSender;
            _apiAddress = config["APIAddress"];
        }
        public async Task NotifyAsync(SupportTicket ticket, TicketAction action)
        {
            var subject = $"Ticket {ticket.Id} {action}";
            var body =
                $"""
                Ticket ID: {ticket.Id}
                Action: {action}
                Status: {ticket.Status}
                Description:
                {ticket.Description}
                Link: {_apiAddress}{ticket.Id}
            """;
            //in order to send mail please add the credentials on the appsettings
            //await _emailSender.SendAsync(
            //    ticket.Email, // or support/admin email
            //    subject,
            //    body
            //);
            Console.WriteLine(
                $"📧 Email: Ticket {ticket.Id} was {action}"
            );
        }
    }
}
