import React, { useContext, useState } from 'react'
import {
    Container,
    Header,
    Segment
} from 'semantic-ui-react'
import MainSearch from '../components/MainSearch';
import SearchResCell from '../components/SearchResCell';

// props is the img, title, quantity, artist, release date
function SearchPage() {

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
            <Container>
                <Header as='h4'>
                    Results:
                </Header>
                {tempStuff.map(tmp => (
                    <div>
                        <SearchResCell
                            artist={tmp.artist}
                            title={tmp.title}
                            year={tmp.release}
                            quantity={tmp.quantity}
                        />
                        <br />
                    </div>
                ))}
            </Container>
        </div>
    )

    return resPage;
}

export default SearchPage;