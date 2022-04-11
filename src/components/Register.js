import React, { useState } from 'react'
import { Button, Container, Form, Header } from 'semantic-ui-react'
import { useMutation } from '@apollo/client'
import gql from 'graphql-tag'
import { useForm } from '../util/hooks'

function Register() {

    const [err, setErr] = useState({});

    const handleSubmitCallback = () => {
        addUser();
        
    }

    const { values, onChange, onSubmit, clearForm } = useForm(handleSubmitCallback, {
        username: '',
        email: '',
        password: '',
        confirmPassword: ''
    })

    const [addUser, { loading }] = useMutation(REGISTER_USER, {
        update(proxy, result) {
            console.log(result)
            window.location.reload(false);
        },
        onError(err) {
            setErr(err.graphQLErrors[0].extensions.errors);
            console.log(err.graphQLErrors[0].extensions.errors)
        },
        variables: values
    })

    const hasValue = (obj, key) => {
        if (obj != undefined) {
            return obj.hasOwnProperty(key);
            
        }
        console.log(err)
    };

    return (
        <div>
            <Container>
                <br />
                <Form onSubmit={onSubmit} noValidate className={loading ? 'loading' : ''}>
                    <Header as='h2'>Register a New Admin User</Header>
                    <Form.Input
                        label="Username"
                        placeholder="Username..."
                        name="username"
                        error={hasValue(err, 'username') ? err.username : false}
                        value={values.username}
                        onChange={onChange}
                    />
                    <Form.Input
                        label="Email"
                        placeholder="Email..."
                        name="email"
                        error={hasValue(err, 'email') ? err.email : false}
                        value={values.email}
                        onChange={onChange}
                    />
                    <Form.Input
                        label="Password"
                        placeholder="Password..."
                        name="password"
                        type="password"
                        error={hasValue(err, 'password') ? err.password: false}
                        value={values.password}
                        onChange={onChange}
                    />
                    <Form.Input
                        label="Confirm Password"
                        placeholder="Confirm Password..."
                        name="confirmPassword"
                        type="password"
                        error={hasValue(err, 'confirmPassword') ? err.confirmPassword : false}
                        value={values.confirmPassword}
                        onChange={onChange}
                    />
                    <Button type='submit' primary>
                        Register
                    </Button>
                </Form>
            </Container>
        </div>
    )
}

const REGISTER_USER = gql`
    mutation register(
        $username: String!
        $email: String!
        $password: String!
        $confirmPassword: String!
    ) {
        register(
            registerInput: {
                username: $username 
                email: $email
                password: $password
                confirmPassword: $confirmPassword
            }
        ) {
            id email username createdAt token
        }
    }
`

export default Register;