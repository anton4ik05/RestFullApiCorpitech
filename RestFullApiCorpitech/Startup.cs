using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.OpenApi.Models;
using Microsoft.EntityFrameworkCore;
using RestFullApiCorpitech.Models;
using RestFullApiCorpitech.Repos;
using Microsoft.AspNetCore.Http;
using React.AspNet;
using JavaScriptEngineSwitcher.ChakraCore;
using JavaScriptEngineSwitcher.Extensions.MsDependencyInjection;
using JavaScriptEngineSwitcher.V8;
using RestFullApiCorpitech.Service;

namespace RestFullApiCorpitech
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        public void ConfigureServices(IServiceCollection services)
        {
            services.AddControllersWithViews();
            services.AddControllers();
            services.AddSwaggerGen(c =>
            {
                c.SwaggerDoc("v1", new OpenApiInfo { Title = "RestFullApiCorpitech", Version = "v1" });
            });

            services.AddTransient<UserRepository>();
            services.AddTransient<UserService>();

            string connection = Configuration.GetConnectionString("DefaultConnection");
            services.AddMvc();
            services.AddDbContext<ApplicationContext>(options =>
                options.UseSqlServer(connection));

            services.AddJsEngineSwitcher(options => options.DefaultEngineName = V8JsEngine.EngineName)
              .AddV8();
            services.AddMemoryCache();
            services.AddSingleton<IHttpContextAccessor, HttpContextAccessor>();
            services.AddJsEngineSwitcher(options => options.DefaultEngineName = ChakraCoreJsEngine.EngineName).AddChakraCore();

        }

        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                
                app.UseDeveloperExceptionPage();
                app.UseSwagger();
                app.UseSwaggerUI(c => c.SwaggerEndpoint("/swagger/v1/swagger.json", "RestFullApiCorpitech v1"));
            }
           
            app.UseHttpsRedirection();
            
            app.UseDefaultFiles();
            app.UseStaticFiles();
            app.UseReact(config => { });
            app.UseRouting();

            app.UseAuthorization();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
            });
        }
    }
}
