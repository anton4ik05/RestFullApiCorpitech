using RestFullApiCorpitech.Models;
using RestFullApiCorpitech.Repos;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;

namespace RestFullApiCorpitech.Service
{
    public class UserService
    {

        private readonly ApplicationContext context;

        private EFGenericRepository<User> userRepository;

        public UserService(ApplicationContext context)
        {
            this.context = context;
            this.userRepository = new EFGenericRepository<User>(context);
        }

        public void EvalUsers(DateTime startDate, DateTime endDate)
        {
            foreach (User user in userRepository.Get())
            {
                user.eval(startDate, endDate);
            }
        }

        public void SaveUser(User model)
        {
            userRepository.Create(model);
        }

        public void UpdateUser(User model)
        {
            userRepository.Update(model);
        }


        public void DeleteUser(Guid id)
        {
            userRepository.Remove(new User() { Id = id });
        }

        public IEnumerable<User> GetUsers()
        {
            return userRepository.Get();
        }
    }
}
