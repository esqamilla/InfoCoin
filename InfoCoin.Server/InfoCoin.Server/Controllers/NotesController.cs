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
    public class NotesController : ControllerBase
    {
        private readonly IConfiguration _configuration;

        public NotesController(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        [HttpGet]
        public JsonResult Get()
        {
            string query = @"select NoteID, [Name], [Description], UserID from dbo.Notes";

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
            string query = @"select NoteID, [Name], [Description], UserID from dbo.Notes
                                where NoteID = " + id + @"
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
        public JsonResult Post(Note note)
        {
            string query = @"
                insert into [dbo].Notes values
                ('" + note.Name + @"','" + note.Description + @"','" + note.UserId + @"')
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

            return new JsonResult("Заметка успешно добавлена");
        }

        [HttpPatch]
        public JsonResult Patch(Note note)
        {
            string query = @"
                update [dbo].Notes set
                
                [Name] = '" + note.Name + @"',
                [Description] = '" + note.Description + @"',
                UserID = '" + note.UserId + @"'
                where NoteID = " + note.NoteId + @"
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

            return new JsonResult("Заметка успешно изменена");
        }

        [HttpDelete("{id}")]
        public JsonResult Delete(int id)
        {
            string query = @"
                delete from [dbo].Notes
                where NoteID = " + id + @"
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

            return new JsonResult("Заметка успешно удалена");
        }
    }
}
