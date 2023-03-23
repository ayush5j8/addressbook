using DapperApi;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using System.Data.SqlClient;

namespace ApiAuth.Services
{
    public interface IContactServices
    {
        public Task<ActionResult<List<Schema>>> GetAllContacts();
        public Task<ActionResult<Schema>> GetWithId(int contactID);
        public void CreateContact(Schema schema);
        public void UpdateContact(int contactId, Schema schema);
        public void DeleteContact(int contactID);
       
    }
}
