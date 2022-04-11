import React from 'react';
import { Button, Container, Form, Header } from 'semantic-ui-react';
import { useForm } from '../util/hooks';


function Login() {

    const submitCallback = () => {
        console.log("submitted")
    }

    const { values, onChange, onSubmit } = useForm(submitCallback, {
        username: '',
        password: ''
    })

    const loading = '';


    const login = (
        <Container>
            <Header as='h1'>Hear Again Records</Header>
            <Header as='h2'>Admin Login</Header>
            <Form onSubmit={onSubmit} className={loading ? 'loading' : ''}>
                <Form.Input
                    placeholder="Username"
                    name="username"
                    //error
                    value={values.username}
                    onChange={onChange}
                />
                <Form.Input
                    placeholder="Password"
                    name="password"
                    //error
                    value={values.password}
                    onChange={onChange}
                />
                <Button type='submit' primary>
                    Login
                </Button>
            </Form>
        </Container>

    )

    return login;
}

export default Login;