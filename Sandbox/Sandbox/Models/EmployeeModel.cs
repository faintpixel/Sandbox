using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Sandbox.Models
{
    public class EmployeeModel
    {
        public string employee { get; set; }
        public int number { get; set; }
        public bool worksInOffice { get; set; }
        public string office { get; set; }
        public string comment { get; set; }
    }
}