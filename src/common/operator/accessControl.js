import { usuario_roles } from '../../client/clientActions'

export function checkPerm(allowedRoles){
    
  
    for(var i=0; i<allowedRoles.length; i++) {
      if(usuario_roles.includes(allowedRoles[i]))
        return true
    }
  
    return false
}