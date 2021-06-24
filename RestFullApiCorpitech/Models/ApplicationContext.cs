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

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);


            //modelBuilder.Entity<User>().Property<bool>("isDeleted");
            //modelBuilder.Entity<User>().HasQueryFilter(m => EF.Property<bool>(m, "isDeleted") == false);

            //modelBuilder.Entity<Vacation>().Property<bool>("isDeleted");
            //modelBuilder.Entity<Vacation>().HasQueryFilter(m => EF.Property<bool>(m, "isDeleted") == false);

            modelBuilder.Entity<User>().HasMany(x => x.Vacations).WithOne(x => x.User);

            modelBuilder.Entity<User>().HasData(new User
            {
                Id = Guid.NewGuid(),
                Surname = "admin",
                Name = "admin",
                Middlename = "admin",
                DateOfEmployment = new DateTime(2015, 1, 1),
                vacationYear = 28,
                Vacations = new List<Vacation>(),
                Login = "admin",
                password = "admin",
                Role = "admin",
            });

        }

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
    }
}
