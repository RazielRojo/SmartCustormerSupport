using SmartCustomerSupportSystemBackend.Entities;
using SmartCustomerSupportSystemBackend.Interfaces;
using Newtonsoft.Json;
using Microsoft.AspNetCore.Authentication;

public class FileSupportTicketRepository : ISupportTicketRepository
{
    private const string FilePath = "Data/dataset.json";
    //private readonly JsonSerializerOptions _options = new()
    //{
    //    WriteIndented = true
    //};

    private async Task<List<SupportTicket>> LoadAsync()
    {
        if (!File.Exists(FilePath))
            return new List<SupportTicket>();

        var json = await File.ReadAllTextAsync(FilePath);
        return JsonConvert.DeserializeObject<List<SupportTicket>>(json)
               ?? new List<SupportTicket>();
    }

    private async Task SaveAsync(List<SupportTicket> tickets)
    {
        var json = JsonConvert.SerializeObject(tickets);
        await File.WriteAllTextAsync(FilePath, json);
    }

    public async Task<List<SupportTicket>> GetAllAsync()
    {
        return await LoadAsync();
    }

    public async Task<SupportTicket?> GetByIdAsync(Guid id)
    {
        var tickets = await LoadAsync();
        return tickets.FirstOrDefault(t => t.Id == id);
    }

    public async Task<Guid> AddAsync(SupportTicket ticket)
    {
        var tickets = await LoadAsync();
        tickets.Add(ticket);
        await SaveAsync(tickets);
        return ticket.Id;
    }

    public async Task UpdateAsync(SupportTicket ticket)
    {
        var tickets = await LoadAsync();
        var index = tickets.FindIndex(t => t.Id == ticket.Id);
        if (index < 0) return;
        tickets[index] = ticket;
        await SaveAsync(tickets);
    }
    // not needed for now but usually used in the repository pattern
    //public async Task DeleteAsync(Guid id)
    //{
    //    var tickets = await LoadAsync();
    //    tickets.RemoveAll(t => t.Id == id);
    //    await SaveAsync(tickets);
    //}
}
