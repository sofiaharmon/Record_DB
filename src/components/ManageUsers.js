import React, { useState } from 'react';
import {
    Button,
    Container,
    Card,
    Grid,
    Header,
    Icon,
    Image
} from 'semantic-ui-react'
import { useQuery, useMutation } from '@apollo/client'
import gql from 'graphql-tag'

function ManageUsers() {

    const [username, setUsername] = useState({ username: '' })

    const {
        loading,
        data
    } = useQuery(FETCH_USERS);

    const handleDelete = () => {
        deleteUser();
    }

    const [deleteUser, {
        loading: loadingDel
    }] = useMutation(DELETE_USER, {
        update(proxy, result) {
            console.log(result);
        },
        onError(err) {
            console.log(err)
            // console.log(err.graphQLErrors[0].extensions.errors)
        },
        variables: username
    });

    const manageUsers = (
        <Container className={loading ? 'loading' : ''}>
            <Header as='h2'>Manage Admin Users</Header>
            {data ? data.getUsers.map((temp) =>
                <Card fluid key={temp.id}>
                    <Card.Content>
                        <Grid>
                            <Grid.Row columns={2}>
                                <Grid.Column>
                                    <Card.Header floated='left'>{temp.username}</Card.Header>
                                    <Card.Meta>{temp.email}</Card.Meta>
                                </Grid.Column>
                                <Grid.Column>
                                    <Button floated='right' icon onClick={() => {
                                        setUsername({ username: temp.username })
                                        handleDelete();
                                    }}>
                                        <Icon name='trash alternate outline' />
                                    </Button>
                                </Grid.Column>
                            </Grid.Row>
                        </Grid>
                    </Card.Content>
                </Card>
            ) : <div />}
        </Container>
    )
    return manageUsers;
}

const FETCH_USERS = gql`
    {
        getUsers {
            id,
            username,
            email,
            createdAt
        }
    }  
`

const DELETE_USER = gql`
    mutation($username: String!) {
        deleteUser(username: $username)
    }
`

export default ManageUsers;