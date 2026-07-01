import {
  Injectable,
  CanActivate,
  ExecutionContext,
  ForbiddenException,
} from '@nestjs/common';
import { ConsentService } from './consent.service';

@Injectable()
export class ConsentGuard implements CanActivate {
  constructor(private consentService: ConsentService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const user = request.user;

    if (!user) {
      return false;
    }

    const status = await this.consentService.getConsentStatus(user.id);

    if (!status.hasConsented) {
      throw new ForbiddenException({
        message: 'Consent required',
        missingDocuments: status.missingDocuments,
      });
    }

    return true;
  }
}
