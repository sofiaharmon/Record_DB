import React, { useContext, useState } from 'react'
import {
    Button,
    Form,
    Radio,
    Input,
    Container,
    Header,
    Segment
} from 'semantic-ui-react'
import { useForm } from '../util/hooks';

function MainSearch() {
    // const [err, setErr] = useState({});
    // const [submitted, setSubmitted] = useState(false);

    const handleSubmitCallback = () => {
        // TODO: form validator for errs
        handleSubmit();
    }

    // TODO: diff search params?
    const { values, onChange, onSubmit } = useForm(handleSubmitCallback, {
        recordTitle: '',
        artist: '',
        seller: '',
        priceLow: '',
        priceHigh: '',
        quantity: '',
        inStock: ''
    })

    const handleSubmit = () => {
        //TODO: query db
        console.log("submitted")
    }

    const mainSearch = (
        <Container>
            <Segment>
                <Header as='h3' >
                    Record Search
                </Header>
                <Form>
                    <Form.Group>
                        <Form.Field>
                            <Radio
                                onChange={onChange}
                                label="All Records"
                                name="inStock"
                                value="all"
                                checked={values.inStock === 'all'}
                            />
                        </Form.Field>
                        <Form.Field>
                            <Radio
                                onChange={onChange}
                                label="In-Stock Only"
                                name="inStock"
                                value="stock"
                                checked={values.inStock === 'stock'}
                            />
                        </Form.Field>
                    </Form.Group>
                    <Form.Group>
                        <Form.Input
                            width='8'
                            label='Title'
                            name='recordTitle'
                            onChange={onChange}
                            value={values.recordTitle}
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
                    <Form.Field control={Button} onSubmit={onSubmit}>Submit</Form.Field>
                </Form>
            </Segment>
        </Container>
    )

    return mainSearch;
}

export default MainSearch;

