using ApiAuth.Services;
using Dapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.ComponentModel.DataAnnotations;
using System.Data.SqlClient;

namespace DapperApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    
    public class ContactController : ControllerBase
    {
        
        private readonly IContactServices _contactServices;
        public ContactController(IContactServices contactServices)
        {
            _contactServices = contactServices;
        }
        [HttpGet]
        [Authorize]
        public async Task<ActionResult<List<Schema>>> GetAllContacts()
        {
            var contacts=await _contactServices.GetAllContacts();
            return Ok(contacts);
        }

        [HttpGet("{contactID}")]
        [Authorize]
        public async Task<ActionResult<Schema>> GetWithId(int contactID)
        {
            var contact = await _contactServices.GetWithId(contactID);
            return Ok(contact);
        }
        [HttpPost]
        [Authorize]
        public async void CreateContact(Schema schema)
        {
              _contactServices.CreateContact(schema);
        }

        [HttpPut("{contactId}")]
        [Authorize]
        public async void  UpdateContact(int contactId, Schema schema)
        {
            _contactServices.UpdateContact(contactId,schema);
        }

        [HttpDelete("{contactID}")]
        [Authorize]
        public async void DeleteContact(int contactID)
        {
            _contactServices.DeleteContact(contactID);
        }

    }
}
