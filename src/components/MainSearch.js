import React, { useContext, useState } from 'react'
import {
    Button,
    Form,
    Radio,
    Container,
    Header,
    Segment
} from 'semantic-ui-react'
import { useForm } from '../util/hooks';

function MainSearch(props) {
    const handleSubmit = () => {
        props.callback(values)
        console.log("submitted")
    }

    const [values, setVals] = useState({
        title: '',
        artist: '',
        seller: '',
        priceLow: '',
        priceHigh: '',
        inStock: 'all'
    })

    const onChange = (event) => {
        setVals({ ...values, [event.target.name]: event.target.value })
    }

    const mainSearch = (
        <Container>
            <Segment>
                <Header as='h3' >
                    Record Search
                </Header>
                <Form onSubmit={handleSubmit}>
                    <Form.Group>
                        <Form.Field>
                            <Radio
                                onChange={() => setVals({ ...values, inStock: 'all' })}
                                label="All Records"
                                name="inStock"
                                checked={values.inStock == 'all'}
                            />
                        </Form.Field>
                        <Form.Field>
                            <Radio
                                onChange={() => setVals({ ...values, inStock: 'stock' })}
                                label="In-Stock Only"
                                name="inStock"
                                checked={values.inStock === 'stock'}
                            />
                        </Form.Field>
                    </Form.Group>
                    <Form.Group>
                        <Form.Input
                            width='8'
                            label='Title'
                            name='title'
                            onChange={onChange}
                            value={values.title}
                        />
                        <Form.Input
                            width='4'
                            label='Price Low'
                            name='priceLow'
                            onChange={onChange}
                            value={values.priceLow}
                        />
                        <Form.Input
                            width='4'
                            label='Price High'
                            name='priceHigh'
                            onChange={onChange}
                            value={values.priceHigh}
                        />
                    </Form.Group>
                    <Form.Group widths='equal'>
                        <Form.Input
                            label='Artist'
                            name='artist'
                            onChange={onChange}
                            value={values.artist}
                        />
                        <Form.Input
                            label='Seller'
                            name='seller'
                            onChange={onChange}
                            value={values.seller}
                        />
                    </Form.Group>
                    <Button type='submit' primary>
                        Submit
                    </Button>
                    {/* <Form.Field control={Button} onSubmit={onSubmit}>Submit</Form.Field> */}
                </Form>
            </Segment>
        </Container>
    )

    return mainSearch;
}

export default MainSearch;

