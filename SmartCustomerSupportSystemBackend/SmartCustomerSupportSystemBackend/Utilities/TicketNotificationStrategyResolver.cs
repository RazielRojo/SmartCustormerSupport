using SmartCustomerSupportSystemBackend.Interfaces;

namespace SmartCustomerSupportSystemBackend.Utilities
{
    public class TicketNotificationStrategyResolver : ITicketNotificationStrategyResolver
    {
        private readonly IServiceProvider _provider;

        public TicketNotificationStrategyResolver(IServiceProvider provider)
        {
            _provider = provider;
        }

        public ITicketNotificationStrategy Resolve(TicketAction action)
        {
            return action switch
            {
                TicketAction.Created =>
                    _provider.GetRequiredService<ITicketNotificationStrategy>(),

                _ => throw new NotSupportedException()
            };
        }
    }
}
