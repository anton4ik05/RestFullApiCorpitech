using System;
using System.Collections.Generic;
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
                surname = "Иванов",
                name = "Иван",
                middlename = "Иванович",
                dateOfEmployment = DateTime.Parse("11.11.2015" ),
                dateOfStartVacation = DateTime.Parse("04.04.2016"),
                dateOfEndVacation = DateTime.Parse("04.14.2016")
            });
        }

    }
}
