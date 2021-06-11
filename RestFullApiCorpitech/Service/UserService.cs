using RestFullApiCorpitech.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace RestFullApiCorpitech.Service
{
    public class UserService
    {

        private readonly ApplicationContext context;

        public UserService(ApplicationContext context)
        {
            this.context = context;
        }

        public void EvalUsers(DateTime startDate, DateTime endDate)
        {
            foreach (User user in context.Users.Include(x => x.Vacations).ToList())
            {
                user.eval(startDate, endDate);
            }
        }

        public void SaveUser(User model)
        {
            context.Users.Add(model);
            context.SaveChanges();
        }

        public void UpdateUser(User model)
        {
            context.Users.Update(model);
            context.SaveChanges();
        }


        public void DeleteUser(Guid id)
        {
            context.Vacations.Remove(new Vacation() { user = new User() { Id = id } });
            context.Users.Remove(new User() { Id = id });
            context.SaveChanges();
        }

        public IEnumerable<User> GetUsers()
        {
            return context.Users.Include(x => x.Vacations).ToList();
        }
    }
}
