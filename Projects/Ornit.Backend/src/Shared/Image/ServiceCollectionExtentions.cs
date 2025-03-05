namespace Ornit.Backend.src.Shared.Image
{
    public static class ServiceCollectionExtentions
    {
        public static IServiceCollection AddImageSupport(this IServiceCollection services)
        {
            services.AddScoped<IImageHandler, ImageHandler>();

            return services;
        }
    }
}