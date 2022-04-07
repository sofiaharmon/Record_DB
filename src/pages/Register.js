import React, { useState } from 'react'
import { Button, Container, Form, Header } from 'semantic-ui-react'
import { useMutation } from '@apollo/client'
import gql from 'graphql-tag'
import { useForm } from '../util/hooks'

function Register() {
    // const [values, setValues] = useState({
    //     username: '',
    //     email: '',
    //     password: '',
    //     confirmPassword: ''
    // })

    const handleSubmitCallback = () => {
        //validation
        addUser();
    }

    const { values, onChange, onSubmit } = useForm(handleSubmitCallback, {
        username: '',
        email: '',
        password: '',
        confirmPassword: ''
    })

    // const onChange = (event) => {
    //     setValues({ ...values, [event.target.name]: event.target.value })
    // }

    const [addUser, { loading }] = useMutation(REGISTER_USER, {
        update(proxy, result) {
            console.log(result)
        },
        variables: values
    })

    // const onSubmit = (event) => {
    //     event.preventDefault();
    //     addUser()
    // }

    return (
        <div>
            <Container>
                <br/>
                <Form onSubmit={onSubmit} noValidate>
                    <Header as='h2'>Register a New Admin User</Header>
                    <Form.Input
                        label="Username"
                        placeholder="Username..."
                        name="username"
                        value={values.username}
                        onChange={onChange}
                    />
                    <Form.Input
                        label="Email"
                        placeholder="Email..."
                        name="email"
                        value={values.email}
                        onChange={onChange}
                    />
                    <Form.Input
                        label="Password"
                        placeholder="Password..."
                        name="password"
                        type="password"
                        value={values.password}
                        onChange={onChange}
                    />
                    <Form.Input
                        label="Confirm Password"
                        placeholder="Confirm Password..."
                        name="confirmPassword"
                        type="password"
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