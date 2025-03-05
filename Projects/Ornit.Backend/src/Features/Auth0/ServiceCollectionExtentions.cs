namespace Ornit.Backend.src.Features.Auth0
{
    public static class ServiceCollectionExtentions
    {
        public static IServiceCollection AddAuth0Support(this IServiceCollection services)
        {
            services.AddScoped<IAuthService, AuthService>();

            return services;
        }
    }
}