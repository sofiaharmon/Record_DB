import React, { useContext, useState } from 'react'
import {
    Container,
    Header,
    Grid,
    Menu,
    Segment
} from 'semantic-ui-react'
import Register from '../components/Register';
import ManageUsers from '../components/ManageUsers';

function UsersPage() {
    const [values, setValues] = useState({
        activeItem: 'Manage Users'
    });

    const onChange = (event, { name }) => {
        setValues({ ...values, activeItem: name });
        console.log(values);
    };

    const userPage = (
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
                        <ManageUsers/> :
                        <Register/>
                    }
                </Grid.Column>
            </Grid>
        </Container>
    )

    return userPage;
}

export default UsersPage;