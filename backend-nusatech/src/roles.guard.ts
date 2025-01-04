import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const permissionReq = this.reflector.get<string[]>(
      'permissions',
      context.getHandler(),
    );
    if (!permissionReq) return true;

    const request = context.switchToHttp().getRequest();
    const user = request.user;

    return this.matchRoles(permissionReq, user);
  }

  matchRoles(permissionReq: string[], user: any): boolean {
    const userPermissions = user.role.permissions.map(({ name }) => name);

    return userPermissions.some(
      (userPermission) => userPermission === permissionReq[0],
    );
  }
}
