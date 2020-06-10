using System;
using System.Collections.Generic;
using System.Web.Mvc;
using ROC.Models;
using FastReport;
using FastReport.Export.Pdf;
using System.IO;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;

namespace ROC.Controllers
{
    public class RequestController : Controller
    {
        // GET: Citizens
        [JsonRequestBehavior]
        public JsonResult GetCitizens(string LastName, string FirstName, string MiddleName, DateTime? BeginDate, DateTime? EndDate,
            string sort,
            int start, int limit)
        {
            string between = "";

            string order = "";
            if (sort != null)
            {
                sort = sort.Replace("[", "");
                sort = sort.Replace("]", "");
                var sortObject = JsonConvert.DeserializeObject<SortData>(sort);
                order = $" order by {sortObject.property} {sortObject.direction}";
            }

            if ((BeginDate != null)
            && (EndDate != null)) {
                DateTime BDate = (DateTime)BeginDate;
                string StrBDate = BDate.ToString("d");
                DateTime EDate = (DateTime)EndDate;
                string StrEDate = EDate.ToString("d");
                between = $" and DateOfBirth between '{StrBDate}' and '{StrEDate}'";
            }
            else {
                if (BeginDate != null)
                {
                    DateTime BDate = (DateTime)BeginDate;
                    string StrBDate = BDate.ToString("d");
                    between = $" and DateOfBirth >= '{StrBDate}'";
                }
                else
                {
                    if (EndDate != null)
                    {
                        DateTime EDate = (DateTime)EndDate;
                        string StrEDate = EDate.ToString("d");
                        between = $" and DateOfBirth <= '{StrEDate}'";
                    }
                    else
                    {
                        between = "";
                    }
                }
            };

            string SqlCount = $"select count(*) from citizens" +
                $" where Upper(LastName) like Upper('%{LastName}%')" +
                $" and Upper(FirstName) like Upper('%{FirstName}%')" +
                $" and Upper(MiddleName) like Upper('%{MiddleName}%')" +
                $"{between}";

            string Sql = $"select skip {start} first {limit} * from citizens" +
                $" where Upper(LastName) like Upper('%{LastName}%')" +
                $" and Upper(FirstName) like Upper('%{FirstName}%')" +
                $" and Upper(MiddleName) like Upper('%{MiddleName}%')" +
                $"{between}" +
                $"{order}";

            Search SearchList = new Sql().Select(SqlCount, Sql);

            var cnt = SearchList.Total;
            var List = SearchList.ListCitizen;

            if (List != null)
                return Json( new { total = cnt, Data = List });
            else
            {
                return Json(null);
            }
        }

        // Set: Citizens
        [JsonRequestBehavior]
        public ActionResult SetCitizen(string LastName, string FirstName, string MiddleName, DateTime? DateOfBirth)
        {
            string dt;
            if (DateOfBirth != null)
            {
                DateTime _DateOfBirth = (DateTime)DateOfBirth;
                dt = _DateOfBirth.ToString("d");
            }
            else
            {
                dt = "";
            }

            string Sql = $"insert into citizens (LastName,FirstName,MiddleName,DateOfBirth)" +
                $" values(" +
                $"Upper('{LastName}')," +
                $"Upper('{FirstName}')," +
                $"Upper('{MiddleName}')," +
                $"'{dt}')";
            List<Citizen> List = new Sql().Insert(Sql);
            if (List != null)
                return Json(List);
            else
            {
                return Json(null);
            }
        }

        // Update: Citizen
        [JsonRequestBehavior]
        public ActionResult UpdateCitizen(string Id,string LastName, string FirstName, string MiddleName, string DateOfBirth)
        {
            string Sql = $"update citizens" +
                $" set LastName = Upper('{LastName}')," +
                $" FirstName = Upper('{FirstName}')," +
                $" MiddleName = Upper('{MiddleName}')," +
                $" DateOfBirth = '{DateOfBirth}'" +
                $" where id = {Id}";
            List<Citizen> List = new Sql().Update(Id, Sql);
            if (List != null)
                return Json(List);
            else
            {
                return Json(null);
            }
        }

        // Delete: Citizens
        [JsonRequestBehavior]
        public ActionResult DeleteCitizen(string Id)
        {
            string Sql = $"delete citizens" +
                $" where id = {Id}";
            bool b = new Sql().Delete(Sql);
            if (b)
                return Json(b);
            else
            {
                return Json(b);
            }
        }

        // Print: Citizens
        [JsonRequestBehavior]
        public ActionResult PrintCitizen(string jsonString)
        {            
            List<Citizen> Citizens = JsonConvert.DeserializeObject<List<Citizen>>(jsonString);

            Report report = new Report();
            report.Load($"{AppDomain.CurrentDomain.BaseDirectory}Reports\\Citizens.frx");
            report.RegisterData(Citizens, "Citizens");
            report.Prepare();
            //report.Design();

            var exportPDF = new PDFExport();
            var ms = new MemoryStream {Position = 0};
            exportPDF.Export(report, ms);
            ms.Flush();
            ms.Close();

            string destinationFileName = Convert.ToBase64String(ms.ToArray());
            ms.Close();

            return Json(destinationFileName);

            //return Json(null);
        }
    }
}