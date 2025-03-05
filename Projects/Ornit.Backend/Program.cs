using Microsoft.EntityFrameworkCore;
using Ornit.Backend.src.Features.Auth0;
using Ornit.Backend.src.Features.User;
using Ornit.Backend.src.Shared.AppData;
using Ornit.Backend.src.Shared.Extensions;
using Ornit.Backend.src.Shared.Image;
using Ornit.Backend.src.Shared.TypeScript;

internal class Program
{
    private static void Main(string[] args)
    {
        var builder = WebApplication.CreateBuilder(args);
        var services = builder.Services;

        services.AddEndpointsApiExplorer();
        services.AddControllers();
        services.AddLogging();
        services.AddResponseCompression(o => o.EnableForHttps = true);

        services.AddUserServices();
        services.AddImageSupport();
        services.AddAuth0Support();

        services.AddTypeScriptSupport(options =>
        {
            options.ClientLogging = false;
            options.RelativeFolderPath = "../Ornit.Frontend/src/features";
        });

        services.ConfigureSwaggerAuthentication();
        builder.ConfigureJwtValidation();
        builder.ConfigureNamedHttpClients();

        services.AddDbContext<AppDbContext>(o =>
        {
            var connectionString = builder.Configuration.GetConnectionString("Database");
            if (string.IsNullOrEmpty(connectionString))
            {
                o.UseInMemoryDatabase("InMemoryDb");
            }
            else
            {
                o.UseNpgsql(connectionString);
            }
        });

        var app = builder.Build();

        app.UseHttpsRedirection();
        app.UseRouting();
        app.UseAuthentication();
        app.UseAuthorization();
        app.MapControllers();

        if (app.Environment.IsDevelopment())
        {
            app.UseSwagger();
            app.UseSwaggerUI();
        }

        app.Run();
    }
}