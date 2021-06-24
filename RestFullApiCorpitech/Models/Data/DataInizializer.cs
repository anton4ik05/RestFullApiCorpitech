using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Storage;
using Microsoft.Extensions.DependencyInjection;

namespace RestFullApiCorpitech.Models.Data
{
    public static class DataInizializer
    {
        public static async Task InizializeAsync(IServiceProvider serviceProvider)
        {
            const string userName = "admin";
            string password = "qwerty";

            var scope = serviceProvider.CreateScope();
            await using var context = scope.ServiceProvider.GetService<ApplicationContext>();
            var isExists = context!.GetService<IDatabaseCreator>() is RelationalDatabaseCreator databaseCreator &&
                           await databaseCreator.ExistsAsync();

            if (isExists) return;

            await context.Database.MigrateAsync();
            
            var user = new User()
            {
                Surname = "admin",
                Name = "admin",
                Middlename = "admin",
                DateOfEmployment = new DateTime(2015,1,1),
                vacationYear = 28,
                Vacations = new List<Vacation>(),
                Login = "admin",
                password = "admin",
                Role = "admin"
            };

            context.Users.Add(user);

            context.SaveChanges();

        }
    }
}
