using Microsoft.EntityFrameworkCore;
using Backend.Models;

var builder = WebApplication.CreateBuilder(args);

//services
builder.Services.AddControllers();

string connectionString = builder.Configuration.GetConnectionString("Default") ?? throw new ArgumentNullException("ConnectionString is null");
builder.Services.AddDbContext<AppDbContext>(Op=>Op.UseSqlite(connectionString));

var app = builder.Build();

//middlewares
app.MapControllers();

app.Run();
