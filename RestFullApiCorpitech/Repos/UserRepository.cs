using Microsoft.EntityFrameworkCore;
using RestFullApiCorpitech.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace RestFullApiCorpitech.Repos
{
    public class UserRepository
    {
        //класс-репозиторий напрямую обращается к контексту базы данных

        private readonly ApplicationContext context;
        public UserRepository(ApplicationContext context)
        {
            this.context = context;
        }

        //выбрать все записи из таблицы Users
        public IQueryable<User> GetUsers()
        {
            return context.Users.OrderBy(x => x.surname);
        }

        //найти определенную запись по id
        public User GetUserById(Guid id)
        {
            return context.Users.Single(x => x.Id == id);
        }

        //сохранить новую либо обновить существующую запись в БД
        public Guid SaveUser(User entity)
        {
            if (entity.Id == default)
                context.Entry(entity).State = EntityState.Added;
            else
                context.Entry(entity).State = EntityState.Modified;
            context.SaveChanges();

            return entity.Id;
        }

        //удалить существующую запись
        public void DeleteArticle(User entity)
        {
            context.Users.Remove(entity);
            context.SaveChanges();
        }
    }
}
