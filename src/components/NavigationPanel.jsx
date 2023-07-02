import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { useDatabase } from '../context/DatabaseContext';
import { Dropdown } from 'react-bootstrap';

export function NavigationPanel() {
    const { loggedInUser, setLoggedInUser } = useDatabase();

    return (<>
        <Navbar bg="dark" data-bs-theme="dark">
            <Container>
                <Navbar.Brand href="#home">Attendance Tracker</Navbar.Brand>
                <Nav className="me-auto">
                    <Nav.Link href="#home">Events</Nav.Link>
                    <Nav.Link href="#admin">Admin</Nav.Link>
                </Nav>
                <Navbar.Toggle />
                <Navbar.Collapse className="justify-content-end">
                    <Dropdown>
                        <Dropdown.Toggle variant="secondary" id="dropdown-basic">
                        {loggedInUser.name}
                        </Dropdown.Toggle>
                        <Dropdown.Menu>
                            <Dropdown.Item onClick={() => setLoggedInUser(null)}>Sign out</Dropdown.Item>
                            <Dropdown.Item href="#something-else">
                                Change password
                            </Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    </>)
}