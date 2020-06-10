using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace ROC.Models
{
    public class Search
    {
        public string Total { get; set; }
        public List<Citizen> ListCitizen;
    }

    public class Citizen
    {
        public string Id { get; set; }
        public string LastName { get; set; }
        public string FirstName { get; set; }
        public string MiddleName { get; set; }        
        public string DateOfBirth { get; set; }
    }

    public class SortData
    {
        public string direction { get; set; }
        public string property { get; set; }
    }

    public class JsonRequestBehaviorAttribute : ActionFilterAttribute
    {
        private JsonRequestBehavior Behavior { get; set; }

        public JsonRequestBehaviorAttribute()
        {
            Behavior = JsonRequestBehavior.AllowGet;
        }

        public override void OnResultExecuting(ResultExecutingContext filterContext)
        {
            var result = filterContext.Result as JsonResult;

            if (result != null)
            {
                result.JsonRequestBehavior = Behavior;
            }
        }
    }
}