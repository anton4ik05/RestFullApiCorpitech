using Microsoft.IdentityModel.Tokens;

namespace RestFullApiCorpitech.Authentication.Interfaces
{
    public interface IJwtSigningDecodingKey
    {
        SecurityKey GetKey();

    }
}
