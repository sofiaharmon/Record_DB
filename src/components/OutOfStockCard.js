import React, { useContext, useState } from 'react'
import {
    Card,
    Container,
    Modal,
    List,
    Grid
} from 'semantic-ui-react'
import gql from 'graphql-tag'
import { useMutation } from '@apollo/client'

function exampleReducer(state, action) {
    switch (action.type) {
        case 'OPEN_MODAL':
            return { open: true, dimmer: action.dimmer }
        case 'CLOSE_MODAL':
            return { open: false }
        default:
            throw new Error()
    }
}

// props is the name, email, phone
function OutOfStockCard(props) {

    const [recData, setRecData] = useState([])

    const [state, dispatch] = React.useReducer(exampleReducer, {
        open: false,
        dimmer: undefined,
    })

    const [outOfStockBySeller, { loadingRecs }] = useMutation(OUT_OF_STOCK, {
        update(proxy, result) {
            setRecData(result.data.outOfStockBySeller)
            console.log(result.data)
        },
        onError(err) {
            console.log(err)
        },
        variables: {seller: props.name}
    })

    const openCallback = (name) => {
        outOfStockBySeller();
    }

    const { open, dimmer } = state

    const resCell = (
        <div>
            <Container>
                <Card fluid onClick={() => {
                    openCallback(props.name)
                    dispatch({ type: 'OPEN_MODAL' })
                }} key={props.name}>
                    <Card.Content
                    >
                        <Grid columns={4}>
                            <Grid.Row>
                                <Grid.Column>
                                    <Card.Header floated='left'>{props.name}</Card.Header>
                                </Grid.Column>
                                <Grid.Column floated='right'>
                                    <Card.Header>{props.email}</Card.Header>
                                </Grid.Column>
                                <Grid.Column floated='right'>
                                    <Card.Meta>{props.phone}</Card.Meta>
                                </Grid.Column>
                            </Grid.Row>
                        </Grid>
                    </Card.Content>
                </Card>
            </Container>
            <br />

            <Modal
                closeIcon
                dimmer="inverted"
                open={open}
                onClose={() => dispatch({ type: 'CLOSE_MODAL' })}
                key={props.name}
            >
                <Card fluid>
                    <Card.Content>
                        <Grid>
                            <Grid.Row>
                                <Grid.Column>
                                    <Modal.Header as='h2'>{props.name}</Modal.Header>
                                    <Modal.Content as='h3'>
                                        {props.email}
                                    </Modal.Content>
                                    <Modal.Content as='h3'>
                                        {props.phone}
                                    </Modal.Content>
                                    <br />
                                    <p>Records:</p>
                                    <Modal.Description>
                                        <List divided relaxed className={loadingRecs ? 'loading' : ''}>
                                            {recData.map(recTmp =>
                                                <List.Item key={recTmp.title}>
                                                    <List.Content>
                                                        <List.Header as='a'>{recTmp.title}</List.Header>
                                                        <List.Description as='a'>{recTmp.artist}</List.Description>
                                                    </List.Content>
                                                </List.Item>
                                            )}
                                        </List>
                                    </Modal.Description>
                                </Grid.Column>
                            </Grid.Row>
                        </Grid>
                    </Card.Content>
                </Card>
            </Modal>
        </div>
    )

    return resCell;
}

export default OutOfStockCard;

const OUT_OF_STOCK = gql`
    mutation($seller: String!) {
        outOfStockBySeller(seller: $seller) {
            title
            artist
        }
    }
`