import React, { useState } from 'react';
import { Button, Container, Form, Header } from 'semantic-ui-react';
import { useForm } from '../util/hooks';
import gql from 'graphql-tag'
import { useNavigate } from "react-router-dom";
import { useMutation } from '@apollo/client'

function Login(props) {
    const history = useNavigate();

    const [errors, setErr] = useState({})
    const [values, setValues] = useState({
        username: '',
        password: ''
    })

    const checkIn = () => {
        const err = {};
        let valid = true;
        if (values.username.trim() == '') {
            err.username = 'Username cannot be empty.'
        }
        if (values.password.trim() == '') {
            err.password = 'Password cannot be empty.'
        }
        setErr(err);
        return Object.keys(err).length < 1;
    }

    const submitCallback = (event) => {
        event.preventDefault()
        if (checkIn()) {
            login().then(response => {
                if (response.data.login.token) {
                    localStorage.setItem("token", response.data.login.token);
                }
                history('/');
            });
        }
    }

    const [login, { loading }] = useMutation(LOGIN, {
        update(proxy, result) {
            console.log(result)
        },
        onError(err) {
            console.log(err.graphQLErrors[0])
            setErr(err.graphQLErrors[0].extensions.err)
            console.log(errors)
        },
        variables: values
    })



    const loginRes = (
        <div className='background-body dist'>
            <br/>
            <Container >
                <Header as='h2'>Admin Login</Header>
                <Form onSubmit={submitCallback} className={loading ? 'loading' : ''}>
                    <Form.Input
                        placeholder="Username"
                        name="username"
                        error={errors.username ? errors.username : false}
                        value={values.username}
                        onChange={(event) => setValues({ ...values, "username": event.target.value })}
                    />
                    <Form.Input
                        placeholder="Password"
                        name="password"
                        type="password"
                        error={errors.password ? errors.password : false}
                        value={values.password}
                        onChange={(event) => setValues({ ...values, "password": event.target.value })}
                    />
                    {errors == 'Username not found.' && (
                        <div className="ui error message">
                            <p>hi error</p>
                        </div>
                    )}
                    <Button type='submit' primary>
                        Login
                    </Button>
                </Form>
            </Container>
            <br/>
            <br/>
        </div>
    )

    return loginRes;
}

const LOGIN = gql`
    mutation login(
        $username: String!,
        $password: String!
    ) {
        login(
            username: $username,
            password: $password
        ) {
            token username
        }
    }
`

export default Login;