using System;
using System.Collections;
using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;
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

        public DbSet<Vacation> Vacations { get; set; }


        public DbSet<VacationDay> VacationDays { get; set; }

        public DbSet<Holiday> Holidays { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);


            //modelBuilder.Entity<User>().Property<bool>("isDeleted");
            //modelBuilder.Entity<User>().HasQueryFilter(m => EF.Property<bool>(m, "isDeleted") == false);

            //modelBuilder.Entity<Vacation>().Property<bool>("isDeleted");
            //modelBuilder.Entity<Vacation>().HasQueryFilter(m => EF.Property<bool>(m, "isDeleted") == false);

            modelBuilder.Entity<User>().HasMany(x => x.Vacations).WithOne(x => x.User);
            modelBuilder.Entity<User>().HasMany(x => x.VacationDays).WithOne(x => x.User);

            modelBuilder.Entity<User>().HasData(new User
            {
                Id = Guid.NewGuid(),
                Surname = "admin",
                Name = "admin",
                Middlename = "admin",
                DateOfEmployment = new DateTime(2015, 1, 1),
                Vacations = new List<Vacation>(),
                Login = "admin",
                Password = "admin",
                Role = "admin",
            });

            modelBuilder.Entity<Holiday>().HasData(new Holiday[]
            {
                new Holiday
                {
                    Id = Guid.NewGuid(),
                    date = new DateTime(2021,1,1),
                    name = "Новый год",
                    isActive = true
                },
                new Holiday
                {
                    Id = Guid.NewGuid(),
                    date = new DateTime(2021,1,2),
                    name = "Новый год",
                    isActive = true
                },
                new Holiday
                {
                    Id = Guid.NewGuid(),
                    date = new DateTime(2021,1,8),
                    name = "Рождество Христово",
                    isActive = true
                },
                new Holiday
                {
                    Id = Guid.NewGuid(),
                    date = new DateTime(2021,3,8),
                    name = "День женщин",
                    isActive = true
                },
                new Holiday
                {
                    Id = Guid.NewGuid(),
                    date = new DateTime(2021,5,1),
                    name = "Праздник труда",
                    isActive = true
                },
                new Holiday
                {
                    Id = Guid.NewGuid(),
                    date = new DateTime(2021,5,9),
                    name = "День победы",
                    isActive = true
                },
                new Holiday
                {
                    Id = Guid.NewGuid(),
                    date = new DateTime(2021,5,11),
                    name = "Радуница 2021",
                    isActive = false
                },
                new Holiday
                {
                    Id = Guid.NewGuid(),
                    date = new DateTime(2021,7,3),
                    name = "День Независимости",
                    isActive = true
                },
                new Holiday
                {
                    Id = Guid.NewGuid(),
                    date = new DateTime(2021,11,7),
                    name = "День Октябрьской революции",
                    isActive = true
                },
                new Holiday
                {
                    Id = Guid.NewGuid(),
                    date = new DateTime(2021,12,25),
                    name = "Рождество Христово",
                    isActive = true
                },

            });


            modelBuilder
                .Entity<User>()
                .HasIndex(u => u.Login)
                .IsUnique();

        }
        /*

        public override int SaveChanges()
        {
            UpdateSoftDeleteStatuses();
            return base.SaveChanges();
        }

        public override Task<int> SaveChangesAsync(bool acceptAllChangesOnSuccess, CancellationToken cancellationToken = default)
        {
            UpdateSoftDeleteStatuses();
            return base.SaveChangesAsync(acceptAllChangesOnSuccess, cancellationToken);
        }

        private void UpdateSoftDeleteStatuses()
        {
            foreach (var entry in ChangeTracker.Entries())
            {
                switch (entry.State)
                {
                    case EntityState.Added:
                        entry.CurrentValues["isDeleted"] = false;
                        break;
                    case EntityState.Deleted:
                        entry.State = EntityState.Modified;
                        entry.CurrentValues["isDeleted"] = true;
                        break;
                }
            }
        }
      */
    }
}
