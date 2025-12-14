using Microsoft.AspNetCore.Mvc;
using SmartCustomerSupportSystemBackend.DTOs;
using SmartCustomerSupportSystemBackend.Entities;
using SmartCustomerSupportSystemBackend.Services;

namespace SmartCustomerSupportSystemBackend.Controllers
{
    [ApiController]
    [Route("api/[controller]/[action]")]
    public class SupportTicketController: ControllerBase
    {
        private readonly SupportTicketService _supportTicketService;

        public SupportTicketController(SupportTicketService supportTicketService)
        {
            _supportTicketService = supportTicketService;
        }

        [HttpGet]
        public async Task<ActionResult> GetAllTickets()
        {
            var tickets = await _supportTicketService.GetAllTicketsAsync();
            return Ok(tickets);

        }
        [HttpGet]
        public async Task<ActionResult?> GetTicketById(Guid id)
        {
            var ticket = await _supportTicketService.GetByIdAsync(id);
            return Ok(ticket);
        }
        [HttpPost]
        public async Task<ActionResult> CreateSupportTicket([FromBody] SupportTicketDTO ticket)
        {
            var res = await _supportTicketService.CreateTicketAsync(new SupportTicket(ticket.Name, ticket.Email, ticket.Description));
            return Ok(res);
        }
        [HttpPost]
        public async Task<ActionResult> UpdateSupportTicket([FromBody] List<UpdateTicketDTO> updatedTickets)
        {
            foreach (var ticket in updatedTickets)
            {
                await _supportTicketService.UpdateStatusAsync(
                    ticket.Id,
                    ticket?.Status,
                    ticket?.Resolution
                );
            }

            return Ok();
        }

    }
}
