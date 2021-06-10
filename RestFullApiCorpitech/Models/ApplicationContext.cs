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
            modelBuilder.Entity<User>().HasData(
                new User[]
                {
                    new User 
                    { 
                        Id = Guid.NewGuid(),
                        Surname = "Иванов",
                        Name = "Иван",
                        Middlename = "Иванович",
                        dateOfEmployment = new DateTime(2015, 11, 11)

                    },
                    new User
                    {
                        Id = Guid.NewGuid(),
                        Surname = "Пупкин",
                        Name = "Дмитрий",
                        Middlename = "Василиевич",
                        dateOfEmployment = new DateTime(2020, 05, 05)

                    },
                    new User
                    {
                        Id = Guid.NewGuid(),
                        Surname = "Козий",
                        Name = "Максим",
                        Middlename = "Яновичк",
                        dateOfEmployment = new DateTime(2017, 09, 20)

                    },
                    new User
                    {
                        Id = Guid.NewGuid(),
                        Surname = "Гордынский",
                        Name = "Ян",
                        Middlename = "Безотчествович",
                        dateOfEmployment = new DateTime(2016, 12, 11)

                    },
                    new User
                    {
                        Id = Guid.NewGuid(),
                        Surname = "Новиков",
                        Name = "Антон",
                        Middlename = "Сергеевич",
                        dateOfEmployment = new DateTime(2021, 03, 25)

                    },
                    new User
                    {
                        Id = Guid.NewGuid(),
                        Surname = "Васин",
                        Name = "Василий",
                        Middlename = "Васильевич",
                        dateOfEmployment = new DateTime(2018, 02, 11)

                    }, new User
                    {
                        Id = Guid.NewGuid(),
                        Surname = "Обжигайлов",
                        Name = "Иван",
                        Middlename = "Данилович",
                        dateOfEmployment = new DateTime(2017, 07, 20)

                    }, new User
                    {
                        Id = Guid.NewGuid(),
                        Surname = "Кузина",
                        Name = "Альбина",
                        Middlename = "Андреевна",
                        dateOfEmployment = new DateTime(2019, 01, 01)

                    },

                });

            modelBuilder.Entity<User>().HasMany(c => c.Vacations).WithOne(e => e.user);
        }

    }
}
