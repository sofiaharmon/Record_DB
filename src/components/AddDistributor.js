import React, { useState } from 'react'
import { Button, Container, Form, Header } from 'semantic-ui-react'
import { useMutation } from '@apollo/client'
import gql from 'graphql-tag'
import { useForm } from '../util/hooks'

function AddDistributor() {
    const handleSubmitCallback = () => {
        addSeller();
    }

    const [errs, setErrs] = useState({})

    const { values, onChange, onSubmit } = useForm(handleSubmitCallback, {
        name: '',
        phone: '',
        email: ''
    })

    const [addSeller, { loading }] = useMutation(ADD_SELLLER, {
        update(proxy, result) {
            console.log(result)
            window.location.reload(false);
        },
        onError(err) {
            setErrs(err.graphQLErrors[0].extensions.errors)
            console.log(err)
        },
        variables: values
    })

    return (
        <div className='dist'>
            <Container>
                <br />
                <Form onSubmit={onSubmit} noValidate className={loading ? 'loading' : ''}>
                    <Header as='h2'>Add New Record</Header>
                    <Form.Input
                        label="Distributor Name"
                        name="name"
                        error={errs.name ? errs.name : false}
                        value={values.name}
                        onChange={onChange}
                    />
                    <Form.Input
                        label="Phone Number"
                        name="phone"
                        error={errs.phone ? errs.phone : false}
                        value={values.phone}
                        onChange={onChange}
                    />
                    <Form.Input
                        label="Email"
                        name="email"
                        error={errs.email ? errs.email : false}
                        value={values.email}
                        onChange={onChange}
                    />
                    <Button type='submit' primary>
                        Add to Database
                    </Button>
                </Form>
            </Container>
        </div>
    )
}

const ADD_SELLLER = gql`
    mutation addSeller (
        $name: String!,
        $phone: String!,
        $email: String!
    ) {
        addSeller(
            name: $name,
            phone: $phone,
            email: $email
        ) {
            name phone email
        }
    }
`

export default AddDistributor;