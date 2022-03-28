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
    Header,
    Segment
} from 'semantic-ui-react'
import { useForm } from '../util/hooks';

// props is the img, title, quantity, artist, release date
function SearchResCell(props) {

    const resCell = (
        // <Card fluid>
        //     <Card.Content>
        //         <Image
        //             floated="left"
        //             size="small"
        //             src="https://www.freeiconspng.com/img/23485"
        //         />
        //     </Card.Content>
        // </Card>
        <Card>
            <Image src='https://react.semantic-ui.com/images/avatar/large/matthew.png' wrapped ui={false} />
            <Card.Content>
                <Card.Header>Matthew</Card.Header>
                <Card.Meta>
                    <span className='date'>Joined in 2015</span>
                </Card.Meta>
                <Card.Description>
                    Matthew is a musician living in Nashville.
                </Card.Description>
            </Card.Content>
            <Card.Content extra>
                <a>
                    <Icon name='user' />
                    22 Friends
                </a>
            </Card.Content>
        </Card>
    )

    return resCell;
}

export default SearchResCell;