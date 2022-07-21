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
    public class CategoryController : ControllerBase
    {
        private readonly IConfiguration _configuration;

        public CategoryController(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        [HttpGet]
        public JsonResult Get()
        {
            string query = @"select CategoryID, [Name], Icon, Color, EndDate, TypeId, StartDate from dbo.Category";

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
            string query = @"select CategoryID, [Name], Icon, Color, EndDate, TypeId, StartDate from dbo.Category
                                where CategoryID = " + id + @"
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
        public JsonResult Post(Category category)
        {
            string query = @"
                insert into [dbo].Category values
                ('" + category.Name + @"','" + category.Icon + @"','" + category.Color + @"', null,'" + category.TypeId + @"', null)
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

        [HttpPatch]
        public JsonResult Patch(Category category)
        {
            string query = @"
                update [dbo].Category set
                
                Name = '" + category.Name + @"',
                Icon = '" + category.Icon + @"',
                Color = '" + category.Color + @"',
                EndDate = '" + category.EndDate + @"',
                TypeId = '" + category.TypeId + @"',
                StartDate = '" + category.StartDate + @"'
                where CategoryID = " + category.CategoryId + @"
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

            return new JsonResult("Категория успешно изменена");
        }

        [HttpDelete("{id}")]
        public JsonResult Delete(int id)
        {
            string query = @"
                delete from [dbo].Category
                where CategoryID = '" + id + @"'
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

            return new JsonResult("Категория успешно удалена");
        }

    }
}
