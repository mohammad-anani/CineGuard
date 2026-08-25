using CineGuard_Backend.Business;
using CineGuard_Backend.Data;
using CineGuard_Backend.Data.DbContextStore;
using CineGuard_Backend.ExternalClients;
using CineGuard_Backend.Middlewares;
using Microsoft.EntityFrameworkCore;
using Serilog;
using System.Text.Json.Serialization;

var builder = WebApplication.CreateBuilder(args);

// ======================================================
// Serilog
// ======================================================

Log.Logger = new LoggerConfiguration()
    .ReadFrom.Configuration(builder.Configuration)
    .Enrich.FromLogContext()
    .WriteTo.Console(
        outputTemplate:
        "[{Timestamp:HH:mm:ss} {Level:u3}] " +
        "{Message:lj}{NewLine}{Exception}")
    .CreateLogger();

builder.Host.UseSerilog();

// ======================================================
// Database
// ======================================================

var connectionString =
    builder.Configuration.GetConnectionString("DefaultConnection");

builder.Services.AddDbContext<CineGuardDbContext>(options =>
{
    options.UseSqlServer(connectionString);

    // Show EF Core SQL queries in the console
    options.LogTo(Console.WriteLine, LogLevel.Information);
});

// ======================================================
// Business / Data Services
// ======================================================

builder.Services.AddHttpClient<AI_Client>(client =>
{
    client.BaseAddress = new Uri("http://localhost:8000");
});
builder.Services.AddScoped<MoviesData>();
builder.Services.AddScoped<MovieGuideSectionsData>();
builder.Services.AddScoped<MoviesBusiness>();

// ======================================================
// Controllers
// ======================================================

builder.Services.AddControllers()
    .AddJsonOptions(options =>
    {
        options.JsonSerializerOptions.Converters.Add(
            new JsonStringEnumConverter()
        );
    });

// ======================================================
// Swagger
// ======================================================

builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

// ======================================================
//  CORS
// ======================================================

builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAll", policy =>
    {
        policy
            .AllowAnyOrigin()
            .AllowAnyMethod()
            .AllowAnyHeader();
    });
});

// ======================================================
// Build application
// ======================================================

var app = builder.Build();

// ======================================================
// Middleware
// ======================================================

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();

    app.UseSwaggerUI();
}

app.UseCors("AllowAll");

app.UseStaticFiles();

app.UseHttpsRedirection();

app.UseSerilogRequestLogging();

app.UseMiddleware<ExceptionMiddleware>();

app.UseAuthorization();

// ======================================================
// Controllers / Endpoints
// ======================================================

app.MapControllers();

app.Run();