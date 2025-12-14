using SmartCustomerSupportSystemBackend.Entities;
using SmartCustomerSupportSystemBackend.Interfaces;

namespace SmartCustomerSupportSystemBackend.Services
{
    public class SupportTicketService
    {
        private readonly ISupportTicketRepository _repo;
        private readonly ITicketNotificationStrategy _strategy;

        public SupportTicketService(ISupportTicketRepository repo, ITicketNotificationStrategy strategy)
        {
            _repo = repo;
            _strategy = strategy;
        }

        public Task<List<SupportTicket>> GetAllTicketsAsync()
            => _repo.GetAllAsync();

        public async Task<Guid> CreateTicketAsync(SupportTicket ticket)
        {
            ticket.Id = Guid.NewGuid();
            ticket.Status = "New";
            ticket.CreatedAt = DateTime.UtcNow;
            ticket.UpdatedAt = DateTime.UtcNow;

            var res = await _repo.AddAsync(ticket);
            await _strategy.NotifyAsync(ticket, TicketAction.Created);
            return res;
        }

        public async Task UpdateStatusAsync(Guid id, string status, string resolution = "")
        {
            var ticket = await _repo.GetByIdAsync(id);
            if (ticket == null) throw new Exception("Ticket not found"); ;

            ticket.Status = status;
            ticket.Resolution = resolution;
            ticket.UpdatedAt = DateTime.UtcNow;

            await _repo.UpdateAsync(ticket);
            await _strategy.NotifyAsync(ticket, TicketAction.Updated);
        }
        public async Task<SupportTicket?> GetByIdAsync(Guid id)
        {
           return await _repo.GetByIdAsync(id);
        }
    }

}

