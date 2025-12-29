namespace SmartCustomerSupportSystemBackend.Interfaces
{
    public interface ITicketNotificationStrategyResolver
    {
        ITicketNotificationStrategy Resolve(TicketAction action);
    }
}
