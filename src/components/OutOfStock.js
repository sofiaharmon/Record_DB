import React from 'react'
import {
    Container,
    Header
} from 'semantic-ui-react'
import gql from 'graphql-tag'
import { useQuery } from '@apollo/client'
import OutOfStockCard from './OutOfStockCard'



// props is the img, title, quantity, artist, release date
function OutOfStock() {
    const {
        loading,
        error,
        data
    } = useQuery(FETCH_SELLERS);

    const resPage = (
        <div>
            <div className='dist'>
                <Container className={loading ? 'loading' : ''}>
                    <Header as='h2'>Out of Stock Records by Distributor</Header>
                    {data ? data.getOutOfStockSellers.map(tmp => (
                        <div key={tmp.name}>
                            <OutOfStockCard
                                name={tmp.name}
                                email={tmp.email}
                                phone={tmp.phone}
                            />
                        </div>
                    )) : <p>no distributors</p>}
                </Container>
            </div>
        </div>
    )

    return resPage;
}

const FETCH_SELLERS = gql`
    {
        getOutOfStockSellers {
            name,
            phone,
            email
        }
    }
`

export default OutOfStock;