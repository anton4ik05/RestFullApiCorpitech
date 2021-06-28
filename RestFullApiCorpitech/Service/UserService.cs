using RestFullApiCorpitech.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Internal;
using RestFullApiCorpitech.ViewModels;
using RestFullApiCorpitech.Models.DAO;

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
                                if (date.Month == 1 && date.Day == 2 && date.Year >= 2020)
                                {
                                    holidays++;
                                }
                                else if (date.Month == 1 && date.Day == 2 && date.Year < 2020)
                                {
                                    holidays += 0;
                                }
                                else
                                {
                                    holidays++;
                                }

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
                    DateOrder = rec.DateOrder,
                    Days = rec.Days
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

        public void AddVacation(Guid id,VacationEditModel model)
        {
            var record = context.Users.Include(x => x.Vacations).SingleOrDefault(x => x.Id == id);

            if (record == null) return;
            if (record.Vacations == null) record.Vacations = new List<Vacation>();

            record.Vacations.Add(new Vacation
            {
                StartVacation = model.startVacation,
                EndVacation = model.endVacation,
                User = record,
                UserId = record.Id,
                OrderNumber = model.OrderNumber,
                DateOrder = model.DateOrder,
                Days = model.Days
            });

            context.SaveChanges();
        }

        public void EditVacation(Guid id, VacationEditModel model)
        {
            var record = context.Vacations.SingleOrDefault(x => x.Id == id);

            if (record == null) return;

            record.StartVacation = model.startVacation;
            record.EndVacation = model.endVacation;
            record.DateOrder = model.DateOrder;
            record.OrderNumber = model.OrderNumber;
            record.Days = model.Days;

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
                    DateOrder = rec.DateOrder,
                    Days = rec.Days
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

        public void UpdateUserCredentials(Guid id, AuthDTO model)
        {
            var record = context.Users.Include(x => x.Vacations).SingleOrDefault(x => x.Id == id);

            if (record == null) return;


            record.Login = model.login;
            if (model.password != "")
            {
                record.password = model.password;
            }
            else
            {
                record.password = null;
            }
            
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
        public void DeleteVacation(Guid id)
        {

            Vacation vacation = context.Vacations.FirstOrDefault(x => x.Id == id);
            if (vacation != null)
            {
                context.Vacations.Remove(vacation!);
                context.SaveChanges();
            }
        }

        public Vacation GetVacation(Guid id)
        {
            return context.Vacations.SingleOrDefault(x => x.Id == id);
        }

        public IEnumerable<User> GetUsers()
        {
            return context.Users.Include(x => x.Vacations.OrderBy(x => x.StartVacation)).OrderBy(x => x.Surname).ThenBy(x => x.Name).Where(x=> x.Role != "admin").ToList();
        }

        public ICollection<InfoVacation> GetVacations(Guid id)
        {
            var user = GetUser(id);

            if (user != null)
            {
                var userVacations = user.Vacations;

                ICollection<InfoVacation> info = new List<InfoVacation>();
                //double maxDays = user.vacationYear;
                int count = 0;
                int maxDays = 0;
                DateTime StartWorkYear = user.DateOfEmployment;
                DateTime EndWorkYear = user.DateOfEmployment.AddYears(1) - new TimeSpan(1, 0, 0, 0);

                foreach (var userVacation in userVacations)
                {
                    int daysVacation = HolyDays(userVacation.StartVacation, userVacation.EndVacation);
                    int lastMaxDays = maxDays;
                    maxDays = userVacation.Days;
                    //(userVacation.EndVacation - userVacation.StartVacation).Days + 1; // Дни отпуска
                    
                    if (maxDays == 0) maxDays = Convert.ToInt32(user.vacationYear);
                    if (lastMaxDays == 0) lastMaxDays = maxDays;
                    if (daysVacation <= maxDays)
                    {
                        if (daysVacation + count <= lastMaxDays)
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
                            if (count == lastMaxDays)
                            {
                                StartWorkYear = EndWorkYear + new TimeSpan(1, 0, 0, 0);
                                EndWorkYear = StartWorkYear.AddYears(1) - new TimeSpan(1, 0, 0, 0);
                                count = 0;
                            }
                        }
                        else
                        {
                            int notDay = lastMaxDays - count;

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

                            if (daysVacation - notDay > maxDays)
                            {
                                int temp = daysVacation - notDay;
                                while (temp > maxDays)
                                {
                                    info.Add(new InfoVacation
                                    {
                                        Id = userVacation.Id,
                                        Days = maxDays,
                                        StartWorkYear = StartWorkYear,
                                        EndWorkYear = EndWorkYear,
                                        StartVacation = userVacation.StartVacation,
                                        EndVacation = userVacation.EndVacation
                                    });
                                    StartWorkYear = EndWorkYear + new TimeSpan(1, 0, 0, 0);
                                    EndWorkYear = StartWorkYear.AddYears(1) - new TimeSpan(1, 0, 0, 0);
                                    temp -= maxDays;
                                }
                                info.Add(new InfoVacation
                                {
                                    Id = userVacation.Id,
                                    Days = temp,
                                    StartWorkYear = StartWorkYear,
                                    EndWorkYear = EndWorkYear,
                                    StartVacation = userVacation.StartVacation,
                                    EndVacation = userVacation.EndVacation
                                });
                                count = temp;
                            }
                            else
                            {
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
                    else
                    {
                        int notDay = lastMaxDays - count;
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
                      
                        int temp = daysVacation - notDay;

                        while (temp > maxDays)
                        {
                            info.Add(new InfoVacation
                            {
                                Id = userVacation.Id,
                                Days = maxDays,
                                StartWorkYear = StartWorkYear,
                                EndWorkYear = EndWorkYear,
                                StartVacation = userVacation.StartVacation,
                                EndVacation = userVacation.EndVacation
                            });
                            StartWorkYear = EndWorkYear + new TimeSpan(1, 0, 0, 0);
                            EndWorkYear = StartWorkYear.AddYears(1) - new TimeSpan(1, 0, 0, 0);
                            temp -= maxDays;
                        }

                        info.Add(new InfoVacation
                        {
                            Id = userVacation.Id,
                            Days = temp,
                            StartWorkYear = StartWorkYear,
                            EndWorkYear = EndWorkYear,
                            StartVacation = userVacation.StartVacation,
                            EndVacation = userVacation.EndVacation
                        });
                        count = temp;
                    }
                       
                }
                return info;
            }
            return null;
        }

        private int HolyDays(DateTime StartVacation, DateTime EndVacation)
        {
            ICollection<DateTime> allVacationDates = new List<DateTime>();
            allVacationDates = AllDates(StartVacation, EndVacation, allVacationDates);
            int intersect = 0;
            int holidays = 0;
            foreach (var date in allVacationDates)
            {
                if (Between(date, StartVacation, EndVacation))
                {
                    intersect++;
                };

                foreach (var holiday in holidayList)
                {
                    if (date.Month == holiday.Month && date.Day == holiday.Day)
                    {
                        if (date.Month == 1 && date.Day == 2 && date.Year >= 2020)
                        {
                            holidays++;
                        }
                        else if (date.Month == 1 && date.Day == 2 && date.Year < 2020)
                        {
                            holidays += 0;
                        }
                        else
                        {
                            holidays++;
                        }
                        
                    }
                }
            }

            return intersect - holidays;
        }


        public User GetUser(Guid id)
        {
            return context.Users.Include(x => x.Vacations).SingleOrDefault(x => x.Id == id);
        }

        public User GetUserByUsername(string username)
        {
            return context.Users.FirstOrDefault(x => x.Login == username);
        }

        public User GetUserByLogin(string login, string password)
        {
            return context.Users.FirstOrDefault(x => x.Login == login && x.password == password);
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
