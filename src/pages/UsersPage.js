import React, { useEffect, useState } from 'react'
import {
    Container,
    Header,
    Grid,
    Menu,
    Segment
} from 'semantic-ui-react'
import { useNavigate } from 'react-router-dom'

import Register from '../components/Register';
import ManageUsers from '../components/ManageUsers';
import getCurrUser from '../util/context';

function UsersPage() {
    const history = useNavigate();
    const [values, setValues] = useState({
        activeItem: 'Manage Users'
    });

    const onChange = (event, { name }) => {
        setValues({ ...values, activeItem: name });
        console.log(values);
    };

    useEffect(() => {
        if (!getCurrUser()) {
            history('/login')
        }
    })

    const userPage = (
        <div className='background-body dist'>
            <br/>
            <Container>
                <Grid>
                    <Grid.Column width={4}>
                        <Menu fluid vertical tabular>
                            <Menu.Item
                                name='Manage Users'
                                active={values.activeItem == 'Manage Users'}
                                onClick={onChange}
                            />
                            <Menu.Item
                                name='Register New User'
                                active={values.activeItem == 'Register New User'}
                                onClick={onChange}
                            />
                        </Menu>
                    </Grid.Column>

                    <Grid.Column stretched width={12}>
                        {
                            values.activeItem == 'Manage Users' ?
                                <ManageUsers /> :
                                <Register />
                        }
                    </Grid.Column>
                </Grid>
            </Container>
        </div>
    )

    return userPage;
}

export default UsersPage;