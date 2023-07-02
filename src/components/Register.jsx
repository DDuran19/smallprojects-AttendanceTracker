import { Button, Form } from "react-bootstrap";


export default function Register() {
    return (<>
        <Form className="mt-3 p-2" style={{"border": "1px dotted black"}}>
            <Form.Group className="mb-2" id="formGroupRegisterEmail">
                <Form.Control type="email" placeholder="Enter your email" />
            </Form.Group>
            <Form.Group className="mb-2" id="formGroupRegisterPassword">
                <Form.Control type="password" placeholder="Enter your password" autoComplete="true" />
            </Form.Group>
            <Form.Group className="mb-2" id="formGroupRegisterName">
                <Form.Control type="text" placeholder="Enter your name" />
            </Form.Group>
            <Form.Group className="mb-2" id="formGroupRegisterName">
                <Form.Control type="text" placeholder="Write your own Secret Question" />
            </Form.Group>
            <Form.Group className="mb-2" id="formGroupRegisterName">
                <Form.Control type="text" placeholder="Write your own Secret Answer" />
            </Form.Group>

            <div className="mb-2">
                <Button variant="success" type="submit">
                    Submit
                </Button>
            </div>
        </Form>

    </>)
}