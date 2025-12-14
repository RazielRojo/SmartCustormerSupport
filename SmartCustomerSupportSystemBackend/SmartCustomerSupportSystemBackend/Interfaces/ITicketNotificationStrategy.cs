using SmartCustomerSupportSystemBackend.Entities;

namespace SmartCustomerSupportSystemBackend.Interfaces
{
    public interface ITicketNotificationStrategy
    {
        Task NotifyAsync(SupportTicket ticket, TicketAction action);
    }
}
