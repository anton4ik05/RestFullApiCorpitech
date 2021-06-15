using Microsoft.IdentityModel.Tokens;

namespace RestFullApiCorpitech.Authentication.Interfaces
{
    public interface IJwtSigningEncodingKey
    {
        string SigningAlgorithm { get; }

        SecurityKey GetKey();
    }
}
