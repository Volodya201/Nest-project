import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common'
import { Reflector } from '@nestjs/core'
import { Roles } from './roles.decorator'

@Injectable()
export class RolesGuard implements CanActivate {
    constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
      const roles = this.reflector.get(Roles, context.getHandler())
      if (!roles) {
        return true
      }
      const request = context.switchToHttp().getRequest()
      const user = request.user

      console.log("roles: ", roles)
      console.log("user: ", user)

      const userRoles = user.roles.map(role => role.role)

      console.log("userRoles: ", userRoles)
      

      return matchRoles(roles, user.roles)
    }
}



function matchRoles(roles, userRoles): boolean {
  return true
}