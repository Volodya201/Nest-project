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

      const userRoles = user.roles.map(role => role.role.role)
      
      return matchRoles(roles, userRoles)
    }
}



function matchRoles(roles, userRoles): boolean {
    console.log("roles: ", roles)
    console.log("userRoles: ", userRoles)

    if (roles.length === 0) return true

    for (let roleIndex = 0; roleIndex < roles.length; roleIndex++) {
        const role = roles[roleIndex]
        
        const coincidence = userRoles.find(userRole => userRole === role)

        if (coincidence) return true
    }

    return false
}