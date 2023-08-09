import {
  CognitoIdentityProviderClient,
  SignUpCommand,
  CognitoIdentityProvider,
  AdminConfirmSignUpCommand,
} from "../opt/nodejs/node16/node_modules/@aws-sdk/client-cognito-identity-provider";
const { USER_POOL_CLIENT_ID, USER_POOL_ID, REGION } = process.env;

const cognitoClient = new CognitoIdentityProviderClient({ region: REGION });
const identityProvider = new CognitoIdentityProvider({ region: REGION });

exports.signUp = async (event: any, context: any, callback: any) => {
  try {
    const { email, password } = JSON.parse(event.body);
    if (!email || !password) {
      throw new Error("Email and password should be passed");
    }
    const signUpInput = {
      ClientId: USER_POOL_CLIENT_ID,
      Username: email,
      Password: password,
      UserAttributes: [
        {
          Name: "email",
          Value: email,
        },
      ],
    };
    let command = new SignUpCommand(signUpInput);
    const response = await cognitoClient.send(command);
    const confirmInput = {
      UserPoolId: USER_POOL_ID,
      Username: email,
    };
    await identityProvider.adminUpdateUserAttributes({
      UserAttributes: [
        {
          Name: "email_verified",
          Value: "true",
        },
      ],
      ...confirmInput,
    });
    await cognitoClient.send(new AdminConfirmSignUpCommand(confirmInput));
    return {
      statusCode: 200,
      body: JSON.stringify({ response: response }),
    };
  } catch (err: any) {
    callback(null, {
      body: JSON.stringify({ "Error Message:": JSON.stringify(err.message) }),
    });
  }
};
