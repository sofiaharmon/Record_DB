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

// props is the img, title, quantity, artist, release date
function SearchResCell(props) {

    const callbackFunc = () => {

    }

    const [values, setValues] = useState({
        quantity: props.quantity,
        price: props.price,
        amtToDec: 1,
        amtToInc: 0,
        newPrice: ''
    });

    const onChange = (event) => {
        setValues({ ...values, [event.target.name]: event.target.value });
    };

    const [state, dispatch] = React.useReducer(exampleReducer, {
        open: false,
        dimmer: undefined,
    })

    const onClickButtons = (isInc) => {
        if (isInc) {
            increment()
            console.log(values)
            setValues({ ...values, "amtToInc": 0 });

        } else {
            decrement();
            setValues({ ...values, "amtToDec": 1 });
        }
    }

    const { open, dimmer } = state

    const [decrement] = useMutation(DEC_INV, {
        onError(err) {
            console.log(err)
        },
        variables: {
            title: props.title,
            amtToDec: parseInt(values.amtToDec)
        }
    })

    const [changePrice] = useMutation(CHANGE_PRICE, {
        update(proxy, result) {
            console.log(result)
        },
        onError(err) {
            console.log(err)
        },
        variables: {
            title: props.title,
            newPrice: parseFloat(values.newPrice)
        }
    })

    const [increment] = useMutation(INC_INV, {
        onError(err) {
            console.log(err)
        },
        variables: {
            title: props.title,
            amtToInc: parseInt(values.amtToInc)
        }
    })

    const resCell = (
        // header, meta, description
        // meta (subline under header)
        <div>
            <Container>
                <Card fluid onClick={() => dispatch({ type: 'OPEN_MODAL' })} key={props.title + props.artist}>
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
                                    <Card.Meta>Quantity: {values.quantity}</Card.Meta>
                                </Grid.Column>
                                <Grid.Column>
                                    <Card.Meta>Price: ${values.price.toFixed(2)}</Card.Meta>
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
                                <Grid.Column width={4}>
                                    <Image
                                        floated="left"
                                        size="small"
                                        src={props.img}
                                    />
                                </Grid.Column>
                                <Grid.Column width={12}>
                                    <Modal.Header as='h2'>{props.title}</Modal.Header>
                                    <Modal.Content as='h3'>
                                        {props.artist}
                                    </Modal.Content>
                                    <Modal.Description>
                                        <p>Price: ${props.price.toFixed(2)}</p>
                                        <p>Quantity: {props.quantity}</p>
                                        <p>Distributor: {props.seller}</p>
                                    </Modal.Description>
                                </Grid.Column>
                            </Grid.Row>
                            <Grid.Row columns={6} width="equal">
                                <Grid.Column>
                                    <Form.Input
                                    fluid
                                        name="amtToInc"
                                        type="number"
                                        value={values.amtToInc}
                                        onChange={onChange}
                                    />
                                </Grid.Column>
                                <Grid.Column >
                                    <Button fluid onClick={() => { onClickButtons(true) }}>
                                        Increase Inventory
                                    </Button>
                                </Grid.Column>
                                <Grid.Column >
                                    <Form.Input
                                    fluid
                                        name="amtToDec"
                                        type="number"
                                        value={values.amtToDec}
                                        onChange={onChange}
                                    />
                                </Grid.Column>
                                <Grid.Column >
                                    <Button onClick={() => { onClickButtons(false) }}>
                                        Decrease Inventory
                                    </Button>
                                </Grid.Column>
                                <Grid.Column >
                                    <Form.Input
                                    fluid
                                        name="newPrice"
                                        value={values.newPrice}
                                        onChange={onChange}
                                    />
                                </Grid.Column>
                                <Grid.Column >
                                    <Button onClick={() => { changePrice() }}>
                                        Update Price
                                    </Button>
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

const INC_INV = gql`
    mutation increment(
        $title: String!,
        $amtToInc: Int!
    ) {
        increment(
            title: $title,
            amtToInc: $amtToInc
        ) {
            quantity
        }
    }
`

const DEC_INV = gql`
    mutation decrement(
        $title: String!,
        $amtToDec: Int!
    ) {
        decrement(
            title: $title,
            amtToDec: $amtToDec
        ) {
            quantity
        }
    }
`

const CHANGE_PRICE = gql`
    mutation changePrice(
        $title: String!,
        $newPrice: Float!
    ) {
        changePrice(
            title: $title,
            newPrice: $newPrice
        ) {
            price
        }
    }
`

export default SearchResCell;