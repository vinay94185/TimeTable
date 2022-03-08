import React,{ useState, useEffect } from 'react';
import './App.css';
import Sidebar from './components/sidebar/sidebar'
import Navbar from './components/navbar/navbar'
import { Switch, Route, Router } from 'react-router-dom'
import { BASE_URL, AUTH_TYPE } from './config'

import Home from './pages/home/home'
import AddTable from './pages/table/addtable'
import EditTable from './pages/table/edittable'
import DeleteTable from './pages/table/deletetable'
import AddTeacher from './pages/teacher/addteacher'
import EditTeacher from './pages/teacher/editteacher'
import UpdateTeacher from './pages/teacher/updateteacher'
import DeleteTeacher from './pages/teacher/deleteteacher'
import AddSubject from './pages/subject/addSubject'
import EditSubject from './pages/subject/editSubject'
import UpdateSubject from './pages/subject/updateSubject'
import DeleteSubject from './pages/subject/deleteSubject'
import ExportAll from './pages/export/exportall'
import ExportOne from './pages/export/exportone'
import ExportCustom from './pages/export/exportcustom'
import LabManagement from './pages/extra/labmanagement'
import ChangePassword  from './pages/extra/changepassword'
import Login  from './pages/extra/login'
import Logout  from './pages/extra/logout'
import Spinner from './components/spinner/Spinner';


const checkAuth = async () => {
  const response = await fetch(BASE_URL + 'api/authstatus.php',{ credentials: AUTH_TYPE })
  const rdata = await response.text()
  return (rdata === "true")
}

function App() {

  const [login,setLogin] = useState({ login: true })
  const [loading,setLoading] = useState(true)

  useEffect(() => {
    (async () => {
      const login_state = await checkAuth()
      setLogin({login: login_state})
      setLoading(false)
    })()
  }, [])

  return (
  <div>
  { loading && <Spinner white="true" /> }
  { login.login ? null : (<Route path="/" > <Login setLogin={setLogin} /> </Route>) }
  { login.login ?
  <Sidebar>
    <Navbar/>
      <Switch>
          <Route exact path="/" component={Home} /> 
          <Route exact path="/addtable" component={AddTable} />
          <Route exact path="/edittable" component={EditTable} />
          <Route exact path="/deletetable" component={DeleteTable} />
          <Route exact path="/addteacher" component={AddTeacher} />
          <Route exact path="/editteacher" component={EditTeacher} />
          <Route exact path="/updateteacher/:id" component={UpdateTeacher} />
          <Route exact path="/deleteteacher" component={DeleteTeacher} />
          <Route exact path="/addsubject" component={AddSubject} />
          <Route exact path="/editsubject" component={EditSubject} />
          <Route exact path="/updatesubject/:id" component={UpdateSubject} />
          <Route exact path="/deletesubject" component={DeleteSubject} />
          <Route exact path="/exportall" component={ExportAll} />
          <Route exact path="/exportone" component={ExportOne} />
          <Route exact path="/exportcustom" component={ExportCustom} />
          <Route exact path="/labmanagement" component={LabManagement} />
          <Route exact path="/Changepass" component={ChangePassword} />
          <Route exact path="/logout" > <Logout setLogin={setLogin} /> </Route>
      </Switch>
    </Sidebar> : null
  }
    </div>
  );
}

export default App;
