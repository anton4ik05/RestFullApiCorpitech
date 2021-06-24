using RestFullApiCorpitech.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Internal;
using RestFullApiCorpitech.ViewModels;

namespace RestFullApiCorpitech.Service
{
    public class UserService
    {

        private readonly ApplicationContext context;

        ICollection<DateTime> holidayList = new List<DateTime>() {
            new DateTime(2021, 1, 1),
            new DateTime(2021, 1, 2),
            new DateTime(2021, 1, 7),
            new DateTime(2021, 3, 8),
            new DateTime(2021, 5, 1),
            new DateTime(2021, 5, 9),
            new DateTime(2021, 5, 11),
            new DateTime(2021, 7, 3),
            new DateTime(2021, 11, 7),
            new DateTime(2021, 12, 26),
        };

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
            return EvalVacationsHolidays(GetUser(id), startDate, endDate);

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

        public Double EvalVacationsHolidays(User user, DateTime startDate, DateTime endDate)

        {
            Double outVacations = 0;

            if (!(startDate < user.DateOfEmployment || endDate < user.DateOfEmployment || startDate > endDate || startDate == endDate))
            {
                Double holidays = 0;
                Double days = 0;
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

                        foreach (var holiday in holidayList){
                            if (date.Month == holiday.Month && date.Day == holiday.Day)
                            {
                                holidays++;
                            }
                        }
                    }
                }
                days = (endDate - startDate).Days + 1 - intersect;
                outVacations = Math.Round(Math.Round(days / 29.7) * (user.vacationYear / 12)) + holidays;
            }
            return outVacations;
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
                    UserId = rec.userId,
                    OrderNumber = rec.OrderNumber,
                    DateOrder = rec.DateOrder
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
                    UserId = rec.userId,
                    OrderNumber = rec.OrderNumber,
                    DateOrder = rec.DateOrder
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

        public ICollection<InfoVacation> GetVacations(Guid id)
        {
            var user = GetUser(id);

            if (user != null)
            {
                var userVacations = user.Vacations;

                ICollection<InfoVacation> info = new List<InfoVacation>();
                double days = 0;
                double maxDays = user.vacationYear;
                double count = 0;
                if (maxDays == 0) return null;

                DateTime StartWorkYear = user.DateOfEmployment;
                DateTime EndWorkYear = user.DateOfEmployment.AddYears(1) - new TimeSpan(1, 0, 0, 0);

                foreach (var userVacation in userVacations)
                {
                    double daysVacation = (userVacation.EndVacation - userVacation.StartVacation).Days + 1; // Дни отпуска
                    days +=daysVacation;

                   if (daysVacation <= maxDays)
                    {
                        if (count + daysVacation <= maxDays)
                        {
                            count += daysVacation;
                            info.Add(new InfoVacation
                            {
                                Id = userVacation.Id,
                                Days = daysVacation,
                                StartWorkYear = StartWorkYear,
                                EndWorkYear = EndWorkYear,
                                StartVacation = userVacation.StartVacation,
                                EndVacation = userVacation.EndVacation
                            });

                        }
                        else
                        {
                            // Сколько дней можно добавить
                            double notDay = maxDays - count;

                            info.Add(new InfoVacation
                            {
                                Id = userVacation.Id,
                                Days = notDay,
                                StartWorkYear = StartWorkYear,
                                EndWorkYear = EndWorkYear,
                                StartVacation = userVacation.StartVacation,
                                EndVacation = userVacation.EndVacation
                            });

                            StartWorkYear = EndWorkYear + new TimeSpan(1, 0, 0, 0);
                            EndWorkYear = StartWorkYear.AddYears(1) - new TimeSpan(1, 0, 0, 0);

                            info.Add(new InfoVacation
                            {
                                Id = userVacation.Id,
                                Days = daysVacation-notDay,
                                StartWorkYear = StartWorkYear,
                                EndWorkYear = EndWorkYear,
                                StartVacation = userVacation.StartVacation,
                                EndVacation = userVacation.EndVacation
                            });
                            count = daysVacation - notDay;
                        }
                    }
                    else
                    {
                       double notDay = maxDays - count;
                       if (notDay == 0)
                       {
                          StartWorkYear = EndWorkYear + new TimeSpan(1, 0, 0, 0);
                          EndWorkYear = StartWorkYear.AddYears(1) - new TimeSpan(1, 0, 0, 0);
                          count = 0;
                          notDay = maxDays - count;

                            if (count + daysVacation <= maxDays)
                            {
                                count += daysVacation;
                                info.Add(new InfoVacation
                                {
                                    Id = userVacation.Id,
                                    Days = daysVacation,
                                    StartWorkYear = StartWorkYear,
                                    EndWorkYear = EndWorkYear,
                                    StartVacation = userVacation.StartVacation,
                                    EndVacation = userVacation.EndVacation
                                });

                            }
                            else
                            {
                                // Сколько дней можно добавить
                                notDay = maxDays - count;

                                info.Add(new InfoVacation
                                {
                                    Id = userVacation.Id,
                                    Days = notDay,
                                    StartWorkYear = StartWorkYear,
                                    EndWorkYear = EndWorkYear,
                                    StartVacation = userVacation.StartVacation,
                                    EndVacation = userVacation.EndVacation
                                });

                                StartWorkYear = EndWorkYear + new TimeSpan(1, 0, 0, 0);
                                EndWorkYear = StartWorkYear.AddYears(1) - new TimeSpan(1, 0, 0, 0);

                                info.Add(new InfoVacation
                                {
                                    Id = userVacation.Id,
                                    Days = daysVacation - notDay,
                                    StartWorkYear = StartWorkYear,
                                    EndWorkYear = EndWorkYear,
                                    StartVacation = userVacation.StartVacation,
                                    EndVacation = userVacation.EndVacation
                                });
                                count = daysVacation - notDay;
                            }
                       }
                       else
                       {
                           info.Add(new InfoVacation
                           {
                               Id = userVacation.Id,
                               Days = notDay,
                               StartWorkYear = StartWorkYear,
                               EndWorkYear = EndWorkYear,
                               StartVacation = userVacation.StartVacation,
                               EndVacation = userVacation.EndVacation
                           });

                           StartWorkYear = EndWorkYear + new TimeSpan(1, 0, 0, 0);
                           EndWorkYear = StartWorkYear.AddYears(1) - new TimeSpan(1, 0, 0, 0);
                           count = 0;
                           info.Add(new InfoVacation
                           {
                               Id = userVacation.Id,
                               Days = daysVacation - notDay,
                               StartWorkYear = StartWorkYear,
                               EndWorkYear = EndWorkYear,
                               StartVacation = userVacation.StartVacation,
                               EndVacation = userVacation.EndVacation
                           });
                           count = daysVacation - notDay;
                       }
                       
                    }
                   
                }
                return info;
            }
            return null;
        }

        public User GetUser(Guid id)
        {
            return context.Users.Include(x => x.Vacations).SingleOrDefault(x => x.Id == id);
        }

        public User GetUserByLogin(string login)
        {
            return context.Users.FirstOrDefault(x => x.Login == login);
        }

        public class InfoVacation
        {
            public Guid Id { get; set; }
            public double Days { get; set; }

            public DateTime StartWorkYear { get; set; }

            public DateTime EndWorkYear { get; set; }

            public DateTime StartVacation { get; set; }

            public DateTime EndVacation { get; set; }


        }

        public DateTime ParseDate(string date)
        {
            return DateTime.ParseExact(date, "dd.MM.yyyy", System.Globalization.CultureInfo.InvariantCulture);
        }
    }
}
