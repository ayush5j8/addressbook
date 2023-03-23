using Dapper;
using DapperApi;
using Microsoft.AspNetCore.Mvc;
using System.Data.SqlClient;

namespace ApiAuth.Repository
{
    public class ContactRepo:IContactRepo
    {
        private readonly IConfiguration _configuration;
        public ContactRepo(IConfiguration configuration)
        {
            _configuration= configuration;
        }
        public async Task<ActionResult<List<Schema>>> GetAllContacts()
        {
            using var connection = new SqlConnection(_configuration.GetConnectionString("DefaultConnection"));
            IEnumerable<Schema> contacts = await SelectAllContacts(connection);
            return contacts.ToList();
        }
        public async Task<ActionResult<Schema>> GetWithId(int contactID)
        {
            using var connection = new SqlConnection(_configuration.GetConnectionString("DefaultConnection"));
            var contact = await connection.QueryFirstAsync<Schema>("select * from ApiDatabase where Id=@ID", new { ID = contactID });
            return contact;
        }
        public async void CreateContact(Schema schema)
        {
            using var connection = new SqlConnection(_configuration.GetConnectionString("DefaultConnection"));
            await connection.ExecuteAsync("insert into ApiDatabase values(@name,@email,@phone,@landline,@website,@address)", schema);
           // return (await SelectAllContacts(connection));
        }
        public async void UpdateContact(int contactId, Schema schema)
        {
            using var connection = new SqlConnection(_configuration.GetConnectionString("DefaultConnection"));
            await connection.ExecuteAsync("update ApiDatabase set name=@Name,email=@Email,phone=@Phone,landline=@Landline,website=@Website,address=@Address where id=@Id", new
            {
                Id = contactId,
                Name = schema.name,
                Email = schema.email,
                Phone = schema.phone,
                Landline = schema.landline,
                Website = schema.website,
                Address = schema.address
            });
            //return await SelectAllContacts(connection);
        }
        public async void DeleteContact(int contactID)
        {
            using var connection = new SqlConnection(_configuration.GetConnectionString("DefaultConnection"));
            await connection.ExecuteAsync("delete from ApiDatabase where id=@Id", new { Id = contactID });
            //return  SelectAllContacts(connection);
        }


        private static async Task<IEnumerable<Schema>> SelectAllContacts(SqlConnection connection)
        {
            return await connection.QueryAsync<Schema>("select * from ApiDatabase");
        }
    }
}
