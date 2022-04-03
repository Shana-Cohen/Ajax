using Ajax.Data;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.IO;
using System.Threading.Tasks;
using System.Data.SqlClient;
using Microsoft.Data.SqlClient;

namespace Ajax.Controllers
{
    public class HomeController : Controller
    {

        private string _connectionString = @"Data Source=.\sqlexpress;Initial Catalog=PeopleDB;Integrated Security=true;Encrypt=False;";
        public IActionResult Index()
        {
            return View();
        }

        public IActionResult GetAll()
        {
            var repo = new PeopleDB(_connectionString);
            List<Person> people = repo.GetAll();
            return Json(people);
        }

        [HttpPost]
        public IActionResult AddPerson(Person person)
        {
            var repo = new PeopleDB(_connectionString);
            repo.AddPerson(person);
            return Json(person);
        }

        [HttpPost]
        public void UpdatePerson(Person person)
        {
            var repo = new PeopleDB(_connectionString);
            repo.UpdatePerson(person);
        }

        [HttpPost]
        public void DeletePerson(int id)
        {
            var repo = new PeopleDB(_connectionString);
            repo.Delete(id);
        }
    }
}
