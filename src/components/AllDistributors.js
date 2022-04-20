import React from 'react'
import {
    Container,
    Header
} from 'semantic-ui-react'
import gql from 'graphql-tag'
import { useQuery } from '@apollo/client'
import DistributorCard from './DistributorCard'


function AllDistributors() {
    const {
        loading,
        error,
        data
    } = useQuery(FETCH_SELLERS);

    const resPage = (
        <div>
            <div>
                <Container className={loading ? 'loading' : ''}>
                    <Header as='h2'>All Distributors</Header>
                    {data ? data.getSellers.map(tmp => (
                        <div key={tmp.name}>
                            <DistributorCard
                                name={tmp.name}
                                phone={tmp.phone}
                                email={tmp.email}
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
        getSellers {
            name,
            phone,
            email
        }
    }
`

export default AllDistributors;