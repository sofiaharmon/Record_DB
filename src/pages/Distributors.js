import React, { useEffect, useState } from 'react'
import {
    Container,
    Header,
    Grid,
    Menu,
    Segment
} from 'semantic-ui-react'
import { useNavigate } from 'react-router-dom'

import getCurrUser from '../util/context';
import AllDistributors from '../components/AllDistributors';
import OutOfStock from '../components/OutOfStock';
import AddDistributor from '../components/AddDistributor';

function Distributors() {
    const history = useNavigate();
    const [values, setValues] = useState({
        activeItem: 'All Distributors'
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
        <div>
            <div className='background-body '>
                <br/>
                <Container>
                    <Grid>
                        <Grid.Column width={4}>
                            <Menu fluid vertical tabular>
                                <Menu.Item
                                    name='All Distributors'
                                    active={values.activeItem == 'All Distributors'}
                                    onClick={onChange}
                                />
                                <Menu.Item
                                    name='Out of Stock'
                                    active={values.activeItem == 'Out of Stock'}
                                    onClick={onChange}
                                />
                                <Menu.Item
                                    name='Add Distributor'
                                    active={values.activeItem == 'Add Distributor'}
                                    onClick={onChange}
                                />
                            </Menu>
                        </Grid.Column>

                        <Grid.Column stretched width={12}>
                            {
                                values.activeItem == 'All Distributors' ?
                                    <AllDistributors /> :
                                    values.activeItem == 'Out of Stock' ?
                                        <OutOfStock /> :
                                        <AddDistributor />
                            }
                        </Grid.Column>
                    </Grid>
                </Container>
                <br/>
                <br/>
            </div>
        </div>
    )

    return userPage;
}

export default Distributors;