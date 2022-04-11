import React, { useContext, useState } from 'react'
import {
    Button,
    Card,
    Form,
    Icon,
    Image,
    Radio,
    Input,
    Container,
    Modal,
    Header,
    Segment,
    Grid
} from 'semantic-ui-react'
import { useForm } from '../util/hooks';

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

// props is the img, title, quantity, artist, release date
function SearchResCell(props) {
    const [state, dispatch] = React.useReducer(exampleReducer, {
        open: false,
        dimmer: undefined,
    })
    const { open, dimmer } = state

    const resCell = (
        // header, meta, description
        // meta (subline under header)
        <div>
            <Container>
                <Card fluid onClick={() => dispatch({ type: 'OPEN_MODAL' })}>
                    <Card.Content
                    >
                        <Grid columns={5} divided>
                            <Grid.Row>
                                <Grid.Column textAlign='center' width={2}>
                                    <Image
                                        floated="left"
                                        size="small"
                                        src={props.img}
                                    />
                                </Grid.Column>
                                <Grid.Column>
                                    <Card.Header floated='left'>{props.title}</Card.Header>
                                </Grid.Column>
                                <Grid.Column>
                                    <Card.Header>{props.artist}</Card.Header>
                                </Grid.Column>
                                <Grid.Column>
                                    <Card.Meta>Quantity: {props.quantity}</Card.Meta>
                                </Grid.Column>
                                <Grid.Column>
                                    <Card.Meta>Price: ${props.price.toFixed(2)}</Card.Meta>
                                </Grid.Column>
                            </Grid.Row>
                        </Grid>
                    </Card.Content>
                </Card>
            </Container>

            <Modal
                closeIcon
                dimmer="inverted"
                open={open}
                onClose={() => dispatch({ type: 'CLOSE_MODAL' })}
            >
                <Card fluid>
                    <Card.Content>
                        <Grid>
                            <Grid.Row>
                                <Grid.Column width={8}>
                                    <Image
                                        floated="left"
                                        size="small"
                                        src="https://react.semantic-ui.com/images/avatar/large/daniel.jpg"
                                    />
                                </Grid.Column>
                                <Grid.Column width={8}>
                                    <Modal.Header>{props.title}</Modal.Header>
                                    <Modal.Content>
                                        {props.artist}
                                    </Modal.Content>
                                    <Modal.Actions>
                                        <Button negative onClick={() => dispatch({ type: 'CLOSE_MODAL' })}>
                                            Disagree
                                        </Button>
                                        <Button positive onClick={() => dispatch({ type: 'CLOSE_MODAL' })}>
                                            Agree
                                        </Button>
                                    </Modal.Actions>
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

export default SearchResCell;