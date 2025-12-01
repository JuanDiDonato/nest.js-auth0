import { Module, Provider } from '@nestjs/common';
import { ManagementClient } from 'auth0';

export const MANAGEMENT_CLIENT: string = 'MANAGEMENT_CLIENT';

const managementClientProvider: Provider<ManagementClient> = {
  provide: MANAGEMENT_CLIENT,
  useFactory: () => {
    const domain = process.env.AUTH0_DOMAIN;
    const clientId = process.env.AUTH0_CLIENT_ID;
    const clientSecret = process.env.AUTH0_CLIENT_SECRET;

    if (!domain || !clientId || !clientSecret) {
      throw new Error('Undefined auth0 credentials');
    }

    return new ManagementClient({ domain, clientId, clientSecret });
  },
};

@Module({
  providers: [managementClientProvider],
  exports: [MANAGEMENT_CLIENT],
})
export class Auth0ManagementModule {}
