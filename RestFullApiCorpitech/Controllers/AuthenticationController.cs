using System;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using RestFullApiCorpitech.Authentication.Interfaces;
using RestFullApiCorpitech.Authentication.Model;

namespace RestFullApiCorpitech.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AuthenticationController : ControllerBase
    {
        [HttpPost]

        public ActionResult<string> Post(AuthenticationRequest authRequest,
            [FromServices] IJwtSigningEncodingKey signingEncodingKey)
        {
            //1 .-----------------

            var claims = new Claim[]
            {
                new Claim(ClaimTypes.NameIdentifier, authRequest.Login)
            };

            var token = new JwtSecurityToken(
                issuer: "App",
                audience: "AppClient",
                claims: claims,
                expires: DateTime.Now.AddMinutes(5),
                signingCredentials: new SigningCredentials(signingEncodingKey.GetKey(),
                    signingEncodingKey.SigningAlgorithm)
            );

            var jwtToken = new JwtSecurityTokenHandler().WriteToken(token);


            return jwtToken;
        }
    }
}
