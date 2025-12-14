using SmartCustomerSupportSystemBackend.Entities;
using System.Runtime.CompilerServices;

namespace SmartCustomerSupportSystemBackend.Interfaces
{
    public interface ISupportTicketRepository
    {
        Task<List<SupportTicket>> GetAllAsync();
        Task<SupportTicket?> GetByIdAsync(Guid id);
        Task<Guid> AddAsync(SupportTicket ticket);
        Task UpdateAsync(SupportTicket ticket);
        //this is not required for the task but usually is used in repository pattern
        //Task DeleteAsync(Guid id);
    }
}
