using Dapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using System.Data.SqlClient;
using System.IdentityModel.Tokens.Jwt;
using System.Text;


namespace ApiAuth.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class LoginController : ControllerBase
    {
        private IConfiguration _configuration;
        public LoginController(IConfiguration configuration)
        {
            _configuration= configuration;
        }

        private async Task<Users> AuthenticateUser(Users user)
        {
            Users _user = null;
            string query = @"select * from ApiLogins where username = @username and password = @password";
            using var connection = new SqlConnection(_configuration.GetConnectionString("DefaultConnection"));
            var result = await connection.QueryFirstAsync<Users>(query, new { username = user.UserName,password=user.Password });
            /*if(user.UserName== "admin" && user.Password=="password") {
                _user=new Users{ UserName="admin",Password="password"};
            }*/
            return result;
        }

        private string GenerateToken(Users user)
        {
            var securityKey=new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration["Jwt:Key"]));
            var credentials = new SigningCredentials(securityKey, SecurityAlgorithms.HmacSha256);
            var token = new JwtSecurityToken(_configuration["Jwt:Issuer"], _configuration["Jwt:Audience"],null,expires: DateTime.Now.AddMinutes(60),signingCredentials: credentials);
            return new JwtSecurityTokenHandler().WriteToken(token);
        }

        [AllowAnonymous]
        [HttpPost]
        //[Authorize]
        public async Task<IActionResult> Login(Users user)
        {
            IActionResult response = Unauthorized();
            var _user=await AuthenticateUser(user);
            if (_user != null)
            {
                var token = GenerateToken(_user);
                response=Ok(new {token=token});
            }

            return response;
        }
    }
}
