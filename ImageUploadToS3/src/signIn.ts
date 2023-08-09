import {
  CognitoIdentityProviderClient,
  InitiateAuthCommand,
} from "../opt/nodejs/node16/node_modules/@aws-sdk/client-cognito-identity-provider";

const { USER_POOL_CLIENT_ID, REGION } = process.env;
const cognitoClient = new CognitoIdentityProviderClient({ region: REGION });

exports.signIn = async (event: any, context: any, callback: any) => {
  try {
    const { email, password } = JSON.parse(event.body);
    if (!email || !password) {
      throw new Error("Email and password should be passed");
    }
    const input = {
      AuthFlow: "USER_PASSWORD_AUTH",
      ClientId: USER_POOL_CLIENT_ID,
      AuthParameters: {
        USERNAME: email,
        PASSWORD: password,
      },
    };
    const command = new InitiateAuthCommand(input);
    const response = await cognitoClient.send(command);
    const accessToken = response.AuthenticationResult!.IdToken;
    return {
      statusCode: 200,
      body: JSON.stringify({ token: accessToken }),
    };
  } catch (err: any) {
    callback(null, {
      body: JSON.stringify({ "Error Message:": JSON.stringify(err.message) }),
    });
  }
};
