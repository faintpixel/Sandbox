using Sandbox.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace Sandbox.Controllers
{
    public class HomeController : Controller
    {
        public ActionResult Index()
        {
            ViewBag.EmployeeName = "Mike";
            var officeList = new List<KeyValuePair<string, string>>();
            officeList.Add(new KeyValuePair<string, string>("", "-select value-"));
            officeList.Add(new KeyValuePair<string, string>("1", "Somewhere"));
            officeList.Add(new KeyValuePair<string, string>("2", "Somewhere else"));
            officeList.Add(new KeyValuePair<string, string>("3", "Other"));
            ViewBag.OfficeList = officeList;

            List<string> messages = new List<string>();
            messages.Add("This is a message");
            messages.Add("So is this");
            messages.Add("And this.");

            ViewBag.Messages = messages;

            return View();
        }

        public ActionResult SubmitEmployee(EmployeeModel employee)
        {
            if (employee.number == 322)
                throw new Exception("breaking");
            return Json(employee, JsonRequestBehavior.AllowGet);
        }
    }
}