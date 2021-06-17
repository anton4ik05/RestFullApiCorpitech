using RestFullApiCorpitech.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using Microsoft.EntityFrameworkCore;
using RestFullApiCorpitech.ViewModels;

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
                Eval(user, startDate, endDate);
            }

        }

        public Double EvalUser(Guid id, DateTime startDate, DateTime endDate)
        {
            return Eval(GetUser(id), startDate, endDate);

        }

        public Double EvalUserDays(Guid id, DateTime startDate, DateTime endDate)
        {
            return EvalDays(GetUser(id), startDate, endDate);

        }

        public Double Eval(User user, DateTime startDate, DateTime endDate)

        {
            Double value = 0;

            if (!(startDate < user.DateOfEmployment || endDate < user.DateOfEmployment || startDate > endDate || startDate == endDate))
            {
                Double intersect = 0;

                if (user.Vacations != null || user.Vacations.Any())
                {

                    ICollection<DateTime> allVacationDates = new List<DateTime>();
                    var vacations = user.Vacations.ToArray();

                    foreach (var vacation in vacations)
                    {
                        allVacationDates = AllDates(vacation.StartVacation, vacation.EndVacation, allVacationDates);
                    }


                    foreach (var date in allVacationDates)
                    {
                        if (Between(date, startDate, endDate))
                        {
                            intersect++;
                        };
                    }

                }

                Double days = (endDate - startDate).Days + 1 - intersect;
                value = Math.Round(Math.Round(days / 29.7) * (user.vacationYear/12));

            }

            return value;
        }

        public Double EvalDays(User user, DateTime startDate, DateTime endDate)

        {
            Double days = 0;

            if (!(startDate < user.DateOfEmployment || endDate < user.DateOfEmployment || startDate > endDate || startDate == endDate))
            {
                Double intersect = 0;

                if (user.Vacations != null || user.Vacations.Any())
                {

                    ICollection<DateTime> allVacationDates = new List<DateTime>();
                    var vacations = user.Vacations.ToArray();

                    foreach (var vacation in vacations)
                    {
                        allVacationDates = AllDates(vacation.StartVacation, vacation.EndVacation, allVacationDates);
                    }


                    foreach (var date in allVacationDates)
                    {
                        if (Between(date, startDate, endDate))
                        {
                            intersect++;
                        };
                    }

                }

                days = (endDate - startDate).Days + 1 - intersect;

            }

            return days;
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

        public void SaveUser(UserEditViewModel model)
        {
            var record = new User
            {
                Vacations = new List<Vacation>()
            };

            if (model.Vacations == null)
            {
                model.Vacations = new List<VacationEditModel>();
            }

            foreach (var rec in model.Vacations)
            {
                record.Vacations.Add(new Vacation()
                {
                    StartVacation = rec.startVacation,
                    EndVacation = rec.endVacation,
                    User = rec.user,
                    UserId = rec.userId
                });

            }
            record.Middlename = model.Middlename;
            record.Name = model.Name;
            record.Surname = model.Surname;
            record.DateOfEmployment = model.DateOfEmployment;
            record.vacationYear = model.vacationYear;
            record.Login = model.Login;
            record.Role = model.Role;

            context.Users.Add(record);
            context.SaveChanges();
        }

        public void UpdateUser(Guid id, UserEditViewModel model)
        {
            var record = context.Users.Include(x => x.Vacations).SingleOrDefault(x => x.Id == id);

            if (record == null) return;

            record.Vacations = new List<Vacation>();

            foreach (var rec in model.Vacations)
            {
                record.Vacations.Add(new Vacation()
                {
                    StartVacation = rec.startVacation,
                    EndVacation = rec.endVacation,
                    User = rec.user,
                    UserId = rec.userId
                });

            }

            record.Middlename = model.Middlename;
            record.Name = model.Name;
            record.Surname = model.Surname;
            record.DateOfEmployment = model.DateOfEmployment;
            record.Login = model.Login;
            record.Role = model.Role;
            record.vacationYear = model.vacationYear;
            context.SaveChanges();
        }


        public void DeleteUser(Guid id)
        {

            User user = context.Users.Include(x => x.Vacations).FirstOrDefault(x => x.Id == id);
            if (user != null)
            {
                context.Users.Remove(user!);
                context.SaveChanges();
            }

        }

        public IEnumerable<User> GetUsers()
        {
            return context.Users.Include(x => x.Vacations.OrderBy(x => x.StartVacation)).OrderBy(x => x.Surname).ThenBy(x => x.Name).ToList();
        }

        public User GetUser(Guid id)
        {
            return context.Users.Include(x => x.Vacations).SingleOrDefault(x => x.Id == id);
        }

        public User GetUserForLogin(string login)
        {
            return context.Users.FirstOrDefault(x => x.Login == login);
        }
    }
}
