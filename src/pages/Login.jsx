import { Button, Card, Image, InputGroup } from 'react-bootstrap';
import Form from 'react-bootstrap/Form';
import './css/login.css'
import logo from '../data/images/attendanceTracker.svg'
import { useState } from 'react';
import Register from '../components/Register';
import { useDatabase } from '../context/DatabaseContext';


export default function Login() {
    const [showPassword, setShowPassword] = useState(false)
    const [isRegister, setIsRegister] = useState(false)
    const { readUser, setLoggedInUser } = useDatabase()
    function togglePassword() {
        setShowPassword(!showPassword)
    }

    function toggleRegister() {
        setIsRegister(!isRegister)
    }

    function handleLoginForm(event) {
        event.preventDefault();
        const email = event.target.elements.email.value;
        const password = event.target.elements.password.value
        readUser(email)
           .then((userData) => {
                userData ? 
                    (userData.password == password ?
                        setLoggedInUser(userData) :
                        alert('Incorrect Password!')) :
                    alert('No such email, Register now?')
            })
           .catch()
    }


    return (<>
        <div className="d-flex align-items-center justify-content-center loginComponent">

            <Card className='p-4 loginCard'>
                <Form onSubmit={handleLoginForm}>
                    <Image src={logo} fluid />
                    <Form.Group className="mb-3" id="formGroupEmail">
                        <Form.Label>Email address</Form.Label>
                        <Form.Control type="email" name='email' placeholder="Enter email" autoComplete="true" />
                    </Form.Group>
                    <InputGroup className="mb-3" id="formGroupPassword">
                        <Form.Control type={showPassword ? "text" : "password"} name='password' placeholder="Password"
                            autoComplete="true" />
                        <InputGroup.Checkbox aria-label="Checkbox for following text input"
                            onClick={togglePassword} />
                    </InputGroup>

                    Forgot Password?

                    <div className="d-grid gap-2">
                        <Button variant="primary" size="lg" type='submit'>
                            Login
                        </Button>
                        <Button variant="secondary" size="lg" onClick={toggleRegister}>
                            Register
                        </Button>
                    </div>
                </Form>
                {isRegister ? <Register /> : null}
            </Card>
        </div>
    </>)
}