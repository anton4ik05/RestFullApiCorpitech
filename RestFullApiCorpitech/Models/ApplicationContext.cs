using System;
using System.Collections;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

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
                dateOfEmployment = new DateTime(2015, 11, 11)
            }
            );

            modelBuilder.Entity<User>().HasMany(c => c.Vacations).WithOne(e => e.user);
        }

    }
}
