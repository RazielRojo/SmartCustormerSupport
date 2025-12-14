

using SmartCustomerSupportSystemBackend.Interfaces;
using SmartCustomerSupportSystemBackend.Services;
using SmartCustomerSupportSystemBackend.Utilities;
using System.Text;
Console.OutputEncoding = Encoding.UTF8;
var builder = WebApplication.CreateBuilder(args);
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowReact",
        policy => policy
            .AllowAnyOrigin()
            .AllowAnyMethod()
            .AllowAnyHeader()
        );
});

builder.Services.AddControllers();
builder.Services.AddSingleton<ISupportTicketRepository, FileSupportTicketRepository>();
builder.Services.AddSingleton<IEmailSender,SmtpEmailSender>();
builder.Services.AddScoped<ITicketNotificationStrategy,
                           EmailTicketNotificationStrategy>();
builder.Services.AddScoped<SupportTicketService>();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();
app.UseAuthorization();
app.UseCors("AllowReact");
app.MapControllers();
app.Run();
