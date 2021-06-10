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
        private readonly UserRepository userRepository;

        public UserService(UserRepository userRepository)
        {
            this.userRepository = userRepository;
        }

        public void EvalUsers(DateTime startDate, DateTime endDate)
        {
            foreach (User user in userRepository.GetUsers())
            {
                user.eval(startDate, endDate);
            }
        }

        public void SaveUser(User model)
        {
            userRepository.SaveUser(model);
        }

        public void DeleteUser(Guid id)
        {
            userRepository.DeleteUser(new User() { Id = id });
        }

        public IQueryable<User> GetUsers()
        {
            return userRepository.GetUsers();
        }
    }
}
