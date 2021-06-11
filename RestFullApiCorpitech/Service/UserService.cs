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
            //Set<User> output = new Set<User>();

            foreach (User user in context.Users.Include(x => x.Vacations).ToList())
            {
                output.Add(user);
                eval(user, startDate, endDate);
            }

        }

        public List<Double> eval(User user, DateTime startDate, DateTime endDate)

        {
            List<Double> output = new List<Double>();

            if (startDate < user.dateOfEmployment || endDate < user.dateOfEmployment || startDate > endDate)
            {
                output.Add(0);
                output.Add(0);
                return output;
            }

            if (startDate == endDate)
            {
                output.Add(1);
                output.Add(0);
                return output;
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
            Double value = Math.Round(Math.Round(days / 29.7) * 2.33);

            output.Add(days);
            output.Add(value);
            return output;
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

        public void UpdateUser(Guid id, String Surname, String Name, String Middlename, DateTime dateOfEmployment, ICollection<Vacation> Vacations)
        {
            User user = context.Users.Where(x => x.Id == id).FirstOrDefault();
            user.Name = Name;
            user.Surname = Surname;
            user.Middlename = Middlename;
            user.dateOfEmployment = dateOfEmployment;
            user.Vacations = Vacations;

            context.Update(user);
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
            return context.Users.Find(id);
        }

        public User GetUser(User model)
        {
            return context.Users.Find(model);
        }
    }
}
