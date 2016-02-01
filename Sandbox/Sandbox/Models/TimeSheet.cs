using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Sandbox.Models
{
    public class TimeSheet
    {
        public string EmployeeNumber { get; set; }
        public string EmployeeName { get; set; }
        public string Project { get; set; }
        public string Phase { get; set; }
        public string SubPhase { get; set; }
        public double Hours { get; set; }
        public string Comment { get; set; }
    }
}