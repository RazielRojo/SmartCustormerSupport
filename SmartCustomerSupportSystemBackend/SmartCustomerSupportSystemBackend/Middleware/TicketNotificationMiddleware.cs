using SmartCustomerSupportSystemBackend.Entities;
using SmartCustomerSupportSystemBackend.Interfaces;

namespace SmartCustomerSupportSystemBackend.Middleware
{
    public class TicketNotificationMiddleware
    {
        private readonly RequestDelegate _next;

    public TicketNotificationMiddleware(RequestDelegate next)
    {
        _next = next;
    }

    public async Task InvokeAsync(
        HttpContext context,
        ITicketNotificationStrategyResolver resolver)
    {
        await _next(context);

        if (!context.Items.TryGetValue("TicketAction", out var actionObj) ||
            !context.Items.TryGetValue("Ticket", out var ticketObj))
            return;

        var action = (TicketAction)actionObj;
        var ticket = (SupportTicket)ticketObj;

        var strategy = resolver.Resolve(action);
        await strategy.NotifyAsync(ticket, action);
    }
    }
}
