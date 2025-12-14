using SmartCustomerSupportSystemBackend.Entities;
using SmartCustomerSupportSystemBackend.Interfaces;

namespace SmartCustomerSupportSystemBackend.Utilities
{
    public class EmailTicketNotificationStrategy
        : ITicketNotificationStrategy
    {
        public Task NotifyAsync(SupportTicket ticket, TicketAction action)
        {
            //TODO: add smtp
            Console.WriteLine(
                $"📧 Email: Ticket {ticket.Id} was {action}"
            );

            return Task.CompletedTask;
        }
    }
}
