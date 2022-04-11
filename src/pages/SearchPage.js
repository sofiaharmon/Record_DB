import React, { useContext, useState } from 'react'
import {
    Container,
    Header,
    Segment
} from 'semantic-ui-react'
import gql from 'graphql-tag'
import { useQuery } from '@apollo/client'

import MainSearch from '../components/MainSearch';
import SearchResCell from '../components/SearchResCell';

// props is the img, title, quantity, artist, release date
function SearchPage() {

    const {
        loading,
        error,
        data
    } = useQuery(FETCH_RECORDS);

    const tempStuff = [
        {
            title: "Rumors",
            artist: "Fleetwood Mac",
            release: "February 4, 1977",
            quantity: 5
        },
        {
            title: "The Dark Side of the Moon",
            artist: "Pink Floyd",
            release: "March 1, 1973",
            quantity: 4
        },
        {
            title: "Abbey Road",
            artist: "The Beatles",
            release: "September 26, 1969",
            quantity: 7
        },
        {
            title: "Nevermind",
            artist: "Nirvana",
            release: "1991",
            quantity: 7
        }
    ]

    const resPage = (
        <div>
            <MainSearch />
            <br />
            <Container className={loading ? 'loading' : ''}>
                <Header as='h4'>
                    Results:
                </Header>
                {console.log(error)}
                {data ? data.getRecords.map(tmp => (
                    <div>
                        <SearchResCell
                            artist={tmp.artist}
                            title={tmp.title}
                            price={tmp.price}
                            quantity={tmp.quantity}
                            img={tmp.img}
                        />
                        <br />
                    </div>
                )) : <p>no records</p>}
            </Container>
        </div>
    )

    return resPage;
}

const FETCH_RECORDS = gql`
    {
        getRecords {
            title,
            artist,
            seller,
            quantity,
            price,
            img,
        }
    }
`

export default SearchPage;