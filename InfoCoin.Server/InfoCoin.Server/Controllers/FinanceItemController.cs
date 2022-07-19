using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using System.Data.SqlClient;
using System.Data;
using Microsoft.Extensions.Configuration;
using System.Data.SqlClient;
using System.Data;
using InfoCoin.Server.Models;


namespace InfoCoin.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class FinanceItemController : ControllerBase
    {
        private readonly IConfiguration _configuration;

        public FinanceItemController(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        [HttpGet]
        public JsonResult Get()
        {
            string query = @"select FinanceItemID, Cost, [Description], [Date], FinanceID from dbo.FinanceItem";

            DataTable table = new DataTable();
            string sqlDataSource = _configuration.GetConnectionString("InfoCoinAppCon");
            SqlDataReader myReader;
            using (SqlConnection myCon = new SqlConnection(sqlDataSource))
            {
                myCon.Open();
                using (SqlCommand myCommand = new SqlCommand(query, myCon))
                {
                    myReader = myCommand.ExecuteReader();
                    table.Load(myReader); ;

                    myReader.Close();
                    myCon.Close();
                }
            }

            return new JsonResult(table);
        }

        [HttpGet("{id}")]
        public JsonResult Get(int id)
        {
            string query = @"select Cost, [Description], [Date], FinanceID from dbo.FinanceItem
                                where FinanceItemID = " + id + @"
                            ";

            DataTable table = new DataTable();
            string sqlDataSource = _configuration.GetConnectionString("InfoCoinAppCon");
            SqlDataReader myReader;
            using (SqlConnection myCon = new SqlConnection(sqlDataSource))
            {
                myCon.Open();
                using (SqlCommand myCommand = new SqlCommand(query, myCon))
                {
                    myReader = myCommand.ExecuteReader();
                    table.Load(myReader); ;

                    myReader.Close();
                    myCon.Close();
                }
            }

            return new JsonResult(table);
        }

        [HttpPost]
        public JsonResult Post(FinanceItem financeItem)
        {
            string query = @"
                insert into [dbo].FinanceItem values
                ('" + financeItem.Cost + @"','" + financeItem.Description + @"','" + financeItem.Date + @"','" + financeItem.FinanceId + @"')
            ";

            DataTable table = new DataTable();
            string sqlDataSource = _configuration.GetConnectionString("InfoCoinAppCon");
            SqlDataReader myReader;
            using (SqlConnection myCon = new SqlConnection(sqlDataSource))
            {
                myCon.Open();
                using (SqlCommand myCommand = new SqlCommand(query, myCon))
                {
                    myReader = myCommand.ExecuteReader();
                    table.Load(myReader); ;

                    myReader.Close();
                    myCon.Close();
                }
            }

            return new JsonResult("Операция успешно добавлена");
        }

        [HttpPatch]
        public JsonResult Patch(FinanceItem financeitem)
        {
            string query = @"
                update [dbo].FinanceItem set
                
                Cost = '" + financeitem.Cost + @"',
                [Description] = '" + financeitem.Description + @"',
                [Date] = '" + financeitem.Date + @"',
                FinanceID = '" + financeitem.FinanceId + @"'
                where FinanceItemID = " + financeitem.FinanceItemId + @"
            ";

            DataTable table = new DataTable();
            string sqlDataSource = _configuration.GetConnectionString("InfoCoinAppCon");
            SqlDataReader myReader;
            using (SqlConnection myCon = new SqlConnection(sqlDataSource))
            {
                myCon.Open();
                using (SqlCommand myCommand = new SqlCommand(query, myCon))
                {
                    myReader = myCommand.ExecuteReader();
                    table.Load(myReader); ;

                    myReader.Close();
                    myCon.Close();
                }
            }

            return new JsonResult("Операция успешно изменена");
        }

        [HttpDelete("{id}")]
        public JsonResult Delete(int id)
        {
            string query = @"
                delete from [dbo].FinanceItem
                where FinanceItemID = " + id + @"
            ";

            DataTable table = new DataTable();
            string sqlDataSource = _configuration.GetConnectionString("InfoCoinAppCon");
            SqlDataReader myReader;
            using (SqlConnection myCon = new SqlConnection(sqlDataSource))
            {
                myCon.Open();
                using (SqlCommand myCommand = new SqlCommand(query, myCon))
                {
                    myReader = myCommand.ExecuteReader();
                    table.Load(myReader); ;

                    myReader.Close();
                    myCon.Close();
                }
            }

            return new JsonResult("Операция успешно удалена");
        }
    }
}
