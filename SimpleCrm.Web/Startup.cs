using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.AspNetCore.SignalR;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using SimpleCrm.SqlDbServices;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Identity;

namespace SimpleCrm.Web
{
    public class Startup
    {
        public IConfiguration Configuration { get; }
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }


        // This method gets called by the runtime. Use this method to add services to the container.
        // For more information on how to configure your application, visit https://go.microsoft.com/fwlink/?LinkID=398940
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddMvc();
            services.AddSingleton<IGreeter, ConfigurationGreeter>();
            services.AddScoped<ICustomerData, SqlCustomerData>();
            services.AddDbContext<SimpleCrmDbContext>(options =>
            {
                options.UseSqlServer(Configuration.GetConnectionString("SimpleCrmConnection"));
            });
            services.AddDbContext<CrmIdentityDbContext>(options =>
            {
                options.UseSqlServer(Configuration.GetConnectionString("SimpleCrmConnection"));
            });
            services.AddIdentity<CrmUser, IdentityRole>()
                .AddEntityFrameworkStores<CrmIdentityDbContext>();
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env, IGreeter greeter)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }
            else
            {
                app.UseExceptionHandler(new ExceptionHandlerOptions
                {
                    ExceptionHandler = context =>

                        context.Response.WriteAsync("You went the wrong way!")

                });
            }

            app.UseStaticFiles();

            app.UseRouting();

            app.UseWelcomePage(new WelcomePageOptions
            {
                Path = "/welcome"
            });

            app.UseAuthentication();
            app.UseAuthorization();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllerRoute(name: "default", "{controller=home}/{action=index}/{id?}");

                endpoints.MapControllerRoute(
                    name: "contact",
                    pattern: "Contact/{phone}",
                    constraints: new { phone = "\\^d{3}-\\d{3}-\\d{4}$" },
                    defaults: new { controller = "Contact", action = "List" }
                    );

                endpoints.MapControllerRoute(
                    name: "address",
                    pattern: "Contact/{address}",
                    defaults: new { controller = "Contact", action = "List" }
                    );
            });

            app.Run(ctx => ctx.Response.WriteAsync("Not Found"));
        }
    }
}
