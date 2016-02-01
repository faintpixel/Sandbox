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

        public ActionResult TimeEntry()
        {
            var projects = new List<KeyValuePair<string, string>>();
            //projects.Add(new KeyValuePair<string, string>("", ""));
            projects.Add(new KeyValuePair<string, string>("010111123", "010111123 - Some project"));
            projects.Add(new KeyValuePair<string, string>("010111124", "010111124 - Some other project"));
            projects.Add(new KeyValuePair<string, string>("010321154", "010321154 - Another project"));
            projects.Add(new KeyValuePair<string, string>("020111111", "020111111 - More projects"));
            projects.Add(new KeyValuePair<string, string>("020111112", "020111112 - The last project"));

            ViewBag.EmployeeName = "Employee Name";
            ViewBag.EmployeeNumber = "1234";
            ViewBag.Projects = projects;
            return View();
        }

        public ActionResult GetProjectPhases(string project)
        {
            var phases = new List<KeyValuePair<string, string>>();
            //phases.Add(new KeyValuePair<string, string>("", ""));
            phases.Add(new KeyValuePair<string, string>(project.Substring(5) + "1", project.Substring(5) + "1"));
            phases.Add(new KeyValuePair<string, string>(project.Substring(5) + "2", project.Substring(5) + "2"));
            phases.Add(new KeyValuePair<string, string>(project.Substring(5) + "3", project.Substring(5) + "3"));

            return Json(phases, JsonRequestBehavior.AllowGet);
        }

        public ActionResult GetProjectPhaseSubPhasess(string project, string phase)
        {
            var phases = new List<KeyValuePair<string, string>>();
            //phases.Add(new KeyValuePair<string, string>("", ""));
            phases.Add(new KeyValuePair<string, string>(project.Substring(5) + phase.Substring(4) + "1", project.Substring(5) + phase.Substring(4) + "1"));
            phases.Add(new KeyValuePair<string, string>(project.Substring(5) + phase.Substring(4) + "2", project.Substring(5) + phase.Substring(4) + "2"));
            phases.Add(new KeyValuePair<string, string>(project.Substring(5) + phase.Substring(4) + "3", project.Substring(5) + phase.Substring(4) + "3"));

            return Json(phases, JsonRequestBehavior.AllowGet);
        }

        public ActionResult GetSubmittedDatesForMonth(int month)
        {
            var dates = new List<DateTime>();
            dates.Add(new DateTime(2016, month, 1));
            dates.Add(new DateTime(2016, month, 3));
            dates.Add(new DateTime(2016, month, 11));
            dates.Add(new DateTime(2016, month, 12));
            dates.Add(new DateTime(2016, month, 13));

            return Json(dates, JsonRequestBehavior.AllowGet);
        }

        public ActionResult GetTimesheet(DateTime date)
        {
            TimeSheet sheet = new TimeSheet();
            sheet.Comment = "timesheet for " + date.ToString();
            sheet.Hours = date.Day;
            sheet.EmployeeName = "1234";
            sheet.EmployeeName = "Bob Ross";
            sheet.Project = "010321154";
            sheet.Phase = "11542";
            sheet.SubPhase = "115422";

            return Json(sheet);
        }

        public ActionResult SubmitEmployee(EmployeeModel employee)
        {
            if (employee.number == 322)
                throw new Exception("breaking");
            return Json(employee, JsonRequestBehavior.AllowGet);
        }

        public ActionResult GetAllEmployees()
        {
            List<EmployeeModel> employees = new List<EmployeeModel>();
            employees.Add(new EmployeeModel { employee = "Someone Important", number = 123, office = "", worksInOffice = false, comment = "asdfsadf" });
            employees.Add(new EmployeeModel { employee = "Test Person", number = 145, office = "", worksInOffice = false, comment = "fghdhgjf" });
            employees.Add(new EmployeeModel { employee = "Someone Else", number = 1, office = "Calgary", worksInOffice = true, comment = "asdfsadf" });
            employees.Add(new EmployeeModel { employee = "Someone Important", number = 2, office = "", worksInOffice = false, comment = "dsg" });
            employees.Add(new EmployeeModel { employee = "Someone Important2", number = 3, office = "Edmonton", worksInOffice = true, comment = "sdg" });

            return Json(employees, JsonRequestBehavior.AllowGet);
        }
    }
}