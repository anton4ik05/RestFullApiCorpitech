using System;
using System.Collections.Generic;
using System.Globalization;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Storage;

namespace RestFullApiCorpitech.Models
{
    public class ApplicationContext : IdentityDbContext
    {

        public ApplicationContext(DbContextOptions<ApplicationContext> options): base(options)
        {
            Database.EnsureCreated();
        }

        public DbSet<User> Users { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder.Entity<User>().HasData(new User
            {
                Id = new Guid("716C2E99-6F6C-4472-81A5-43C56E11637C"),
                Surname = "Иванов",
                Name = "Иван",
                Middlename = "Иванович",
                dateOfEmployment = Convert.ToString(DateTimeOffset.Parse("11/06/2014").ToUnixTimeSeconds()),
                dateOfStartVacation = Convert.ToString(DateTimeOffset.Parse("05/01/2016").ToUnixTimeSeconds()),
                dateOfEndVacation = Convert.ToString(DateTimeOffset.Parse("05/11/2016").ToUnixTimeSeconds())
            });
        }

    }
}
