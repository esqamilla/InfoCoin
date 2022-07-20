using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.Extensions.Configuration;
using System.Data.SqlClient;
using System.Data;
using InfoCoin.Server.Models;

namespace InfoCoin.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class LimitsController : ControllerBase
    {
        private readonly IConfiguration _configuration;

        public LimitsController(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        [HttpGet]
        public JsonResult Get()
        {
            string query = @"select LimitID, LimitValue, StartDate, EndDate, CategoryID from dbo.Limits";

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
            string query = @"select LimitID, LimitValue, StartDate, EndDate, CategoryID from dbo.Limits
                                where LimitID = " + id + @"
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
        public JsonResult Post(Limits limit)
        {
            string query = @"
                insert into [dbo].Limits values
                ('" + limit.LimitValue + @"','" + limit.StartDate + @"','" + limit.EndDate + @"','" + limit.CategoryId + @"')
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

            return new JsonResult("Лимит успешно добавлен");
        }

        [HttpPatch]
        public JsonResult Patch(Limits limit)
        {
            string query = @"
                update [dbo].Limits set
                
                LimitValue = '" + limit.LimitValue + @"',
                StartDate = '" + limit.StartDate + @"',
                EndDate = '" + limit.EndDate + @"',
                CategoryID = '" + limit.CategoryId + @"'
                where LimitID = " + limit.LimitId + @"
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

            return new JsonResult("Лимит успешно изменен");
        }

        [HttpDelete("{id}")]
        public JsonResult Delete(int id)
        {
            string query = @"
                delete from [dbo].Limits
                where LimitID = " + id + @"
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

            return new JsonResult("Лимит успешно удален");
        }
    }
}
