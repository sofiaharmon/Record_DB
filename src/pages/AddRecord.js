import React, { useEffect } from 'react'
import { Button, Container, Form, Header } from 'semantic-ui-react'
import { useMutation } from '@apollo/client'
import gql from 'graphql-tag'
import { useForm } from '../util/hooks'
import { useNavigate } from 'react-router-dom'
import getCurrUser from '../util/context'

function AddRecord() {
    const history = useNavigate();

    const handleSubmitCallback = () => {
        console.log(getValues())
        addRecord();
    }

    useEffect(() => {
        if (!getCurrUser()) {
            history('/login')
        }
    })

    const { values, onChange, onSubmit } = useForm(handleSubmitCallback, {
        title: '',
        artist: '',
        seller: '',
        quantity: '',
        price: '',
        img: ''
    })

    const getValues = () => {
        if (values.img == '') {
            const res = {
                title: values.title,
                artist: values.artist,
                seller: values.seller,
                quantity: parseInt(values.quantity),
                price: parseFloat(values.price),
                img: "https://icon-library.com/images/no-photo-available-icon/no-photo-available-icon-8.jpg"
            }
            return res
        } else {
            const res = {
                title: values.title,
                artist: values.artist,
                seller: values.seller,
                quantity: parseInt(values.quantity),
                price: parseFloat(values.price),
                img: values.img
            }
            return res
        }
    }

    const [addRecord, { loading }] = useMutation(ADD_RECORD_MUT, {
        update(proxy, result) {
            console.log(result)
            window.location.reload(false);
        },
        onError(err) {
            console.log(err)
        },
        variables: getValues()
    })

    return (
        <div className='background-body'>
            <Container>
                <br />
                <Form onSubmit={onSubmit} noValidate className={loading ? 'loading' : ''}>
                    <Header as='h2'>Add New Record</Header>
                    <Form.Input
                        label="Record Title"
                        name="title"
                        value={values.title}
                        onChange={onChange}
                    />
                    <Form.Input
                        label="Artist"
                        name="artist"
                        value={values.artist}
                        onChange={onChange}
                    />
                    <Form.Input
                        label="Distributor Name"
                        name="seller"
                        value={values.seller}
                        onChange={onChange}
                    />
                    <Form.Input
                        label="Quantity"
                        name="quantity"
                        type="number"
                        value={values.quantiy}
                        onChange={onChange}
                    />
                    <Form.Input
                        label="Price"
                        placeholder="$x.xx"
                        name="price"
                        type="number"
                        value={values.price}
                        onChange={onChange}
                    />
                    <Form.Input
                        label="Image URL"
                        name="img"
                        value={values.img}
                        onChange={onChange}
                    />
                    <Button type='submit' primary>
                        Add to Database
                    </Button>
                </Form>
                <br/>
                <br/>
            </Container>
        </div>
    )
}

const ADD_RECORD_MUT = gql`
    mutation addRecord (
        $title: String!,
        $artist: String!,
        $seller: String!,
        $quantity: Int!,
        $price: Float!,
        $img: String!
    ) {
        addRecord(
            addRecordInput: {
                title: $title,
                artist: $artist,
                seller: $seller,
                quantity: $quantity,
                price: $price,
                img: $img
            }
        ) {
            title
        }
    }
`

export default AddRecord;