import { combineReducers } from 'redux'
import { reducer as formReducer } from 'redux-form'
import { reducer as toastrReducer } from 'react-redux-toastr'

import DashboardReducer from '../dashboard/dashboardReducer'
import TabReducer from '../common/tab/tabReducer'
import ClientReducer from '../client/clientReducer'
import ModalRecucer from '../common/widget/modal/modalReducer'
import LoginReducer from '../login/loginReducer'

const rootReducer = combineReducers({
    dashboard: DashboardReducer,
    tab: TabReducer,
    client: ClientReducer,
    modals: ModalRecucer,
    form: formReducer,
    toastr: toastrReducer,
    login: LoginReducer,    
})

export default rootReducer