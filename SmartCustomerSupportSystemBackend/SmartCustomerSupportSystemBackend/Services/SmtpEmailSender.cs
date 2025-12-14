using System.Net.Mail;
using System.Net;
using SmartCustomerSupportSystemBackend.Interfaces;

namespace SmartCustomerSupportSystemBackend.Services
{
    public class SmtpEmailSender : IEmailSender
    {
        private readonly SmtpClient _client;
        private readonly string _from;

        public SmtpEmailSender(IConfiguration config)
        {
            _from = config["Smtp:From"]!;

            _client = new SmtpClient(
                config["Smtp:Host"],
                int.Parse(config["Smtp:Port"]!)
            )
            {
                Credentials = new NetworkCredential(
                    config["Smtp:Username"],
                    config["Smtp:Password"]
                ),
                EnableSsl = true
            };
        }

        public async Task SendAsync(string to, string subject, string body)
        {
            var mail = new MailMessage(_from, to, subject, body)
            {
                IsBodyHtml = false
            };

            await _client.SendMailAsync(mail);
        }
    }
}
