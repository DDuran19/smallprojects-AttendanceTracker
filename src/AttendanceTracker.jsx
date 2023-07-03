import { NavigationPanel } from "./components/NavigationPanel";
import { useDatabase } from "./context/DatabaseContext";
import Login from "./pages/Login";

export default function AttendanceTracker() {

    const { loggedInUser } = useDatabase()

    return (<>
        {loggedInUser ? (<NavigationPanel/>)
        
        
        
        : <Login/>}
    </>
    )
}
