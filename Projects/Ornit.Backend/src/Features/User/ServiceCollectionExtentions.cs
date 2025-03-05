namespace Ornit.Backend.src.Features.User
{
    public static class ServiceCollectionExtentions
    {
        public static IServiceCollection AddUserServices(this IServiceCollection services)
        {
            services.AddScoped<IUserRepository, UserRepository>();

            return services;
        }
    }
}