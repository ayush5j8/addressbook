using ApiAuth.Repository;
using DapperApi;
using Microsoft.AspNetCore.Mvc;

namespace ApiAuth.Services
{
    public class ContactServices:IContactServices
    {
        private readonly IContactRepo _contactRepo;
        public ContactServices( IContactRepo contactRepo)
        {
            _contactRepo= contactRepo;
        }

        public async Task<ActionResult<List<Schema>>> GetAllContacts()
        {
            return await _contactRepo.GetAllContacts();
        }
        public  async Task<ActionResult<Schema>> GetWithId(int contactID)
        {
            return await _contactRepo.GetWithId(contactID);
        }
        public void CreateContact(Schema schema)
        {
             _contactRepo.CreateContact(schema);
        }
        public void UpdateContact(int contactId, Schema schema)
        {
             _contactRepo.UpdateContact(contactId, schema);
        }
        public void DeleteContact(int contactID)
        {
            _contactRepo.DeleteContact(contactID);
        }
    }
}
