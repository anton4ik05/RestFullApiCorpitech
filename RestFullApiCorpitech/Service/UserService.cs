using RestFullApiCorpitech.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Collections;

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
                eval(user, startDate, endDate);
            }

        }

        public Double EvalUser(Guid id, DateTime startDate, DateTime endDate)
        {
            return eval(GetUser(id), startDate, endDate);

        }

        public Double eval(User user, DateTime startDate, DateTime endDate)

        {
            Double value = 0;

            if (startDate < user.dateOfEmployment || endDate < user.dateOfEmployment || startDate > endDate || startDate == endDate || user.Vacations == null)
            {
                return value;
            }

            ICollection<DateTime> allVacationDates = new List<DateTime>();
            var vacations = user.Vacations.ToArray();

            foreach (var vacation in vacations)
            {
                DateTime date = vacation.endVacation;
                allVacationDates = AllDates(vacation.startVacation, vacation.endVacation, allVacationDates);
            }

            Double intersect = 0;

            foreach (var date in allVacationDates)
            {
                if (Between(date, startDate, endDate))
                {
                    intersect++;
                };
            }

            Double days = (endDate - startDate).Days + 1 - intersect;
            value = Math.Round(Math.Round(days / 29.7) * 2.33);

            return value;
        }

        private static ICollection<DateTime> AllDates(DateTime startDate, DateTime endDate, ICollection<DateTime> allDates)
        {
            for (DateTime date = startDate; date <= endDate; date = date.AddDays(1))
                allDates.Add(date);
            return allDates;
        }

        private static bool Between(DateTime input, DateTime date1, DateTime date2)
        {
            return (input >= date1 && input <= date2);
        }

        public void SaveUser(User model)
        {
            context.Users.Add(model);
            context.SaveChanges();
        }

        public void UpdateUser(Guid id, User model)
        {
            var record = context.Users.Include(x => x.Vacations).SingleOrDefault(x => x.Id == id);

            if (record == null) return;
            record.Vacations = model.Vacations;
            record.Middlename = model.Middlename;
            record.Name = model.Name;
            record.Surname = model.Surname;
            record.dateOfEmployment = model.dateOfEmployment;
            context.Update(record);
            context.SaveChanges();
        }


        public void DeleteUser(Guid id)
        {

            User user = context.Users.Where(x => x.Id == id).FirstOrDefault();
            context.Users.Remove(user);
            context.SaveChanges();
        }

        public IEnumerable<User> GetUsers()
        {
            return context.Users.Include(x => x.Vacations).ToList();
        }

        public User GetUser(Guid id)
        {
            return context.Users.Include(x => x.Vacations).SingleOrDefault(x => x.Id == id);
        }
    }
}
