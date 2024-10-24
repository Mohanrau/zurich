import { SetMetadata } from '@nestjs/common';

// Define the 'roles' metadata key and pass the roles array as metadata
export const Roles = (...roles: string[]) => SetMetadata('roles', roles);
