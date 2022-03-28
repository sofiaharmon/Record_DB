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
        releaseDate: '',
        inStock: 'all'
    })

    const handleSubmit = () => {
        //TODO: query db
        console.log("submitted")
    }

    const mainSearch = (
        <Container>
            <Header as='h3' attached='top'>
                Record Search
            </Header>
            <Segment attached>
                <Form.Group widths='equal'>
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
                <Form>
                    <Input
                        label='Title'
                        name='recordTitle'
                        onChange={onChange}
                        value={values.recordTitle}
                    />
                    <Input
                        label='Artist'
                        name='artist'
                        onChange={onChange}
                        value={values.artist}
                    />
                    <Form.Field control={Button} onSubmit={onSubmit}>Submit</Form.Field>
                </Form>
            </Segment>
        </Container>
    )

    return mainSearch;
}

export default MainSearch;

