import React, { useContext, useState, useEffect } from 'react'
import {
    Container,
    Header,
    Segment
} from 'semantic-ui-react'
import gql from 'graphql-tag'
import { useQuery, useMutation } from '@apollo/client'
import { useNavigate } from 'react-router-dom'

import MainSearch from '../components/MainSearch';
import SearchResCell from '../components/SearchResCell';
import getCurrUser from '../util/context'

// props is the img, title, quantity, artist, release date
function SearchPage() {
    const history = useNavigate()

    useEffect(() => {
        if (!getCurrUser()) {
            history('/login')
        }
    })

    const [searchRes, setRes] = useState([])
    const [vals, setVals] = useState({})

    const searchCallback = (res) => {
        const searchIn = {}
        if (res.title) searchIn.title = res.title
        if (res.artist) searchIn.artist = res.artist
        if (res.seller) searchIn.seller = res.seller
        if (res.inStock != '') { 
            if (res.inStock == 'all') {
                searchIn.inStock = false
            }
            else {
                searchIn.inStock = true
            }
        }
        if (res.priceHigh) searchIn.priceHigh = res.priceHigh
        if (res.priceLow) searchIn.priceLow = res.priceLow

        console.log(res)
        setVals(searchIn)
        recordSearch();
    }

    const {
        loading,
        error,
        data
    } = useQuery(FETCH_RECORDS, {
        onCompleted: (res) => { setRes(res.getRecords) }
    });

    const [recordSearch, { loadingSearch }] = useMutation(RECORD_SEARCH, {
        update(proxy, result) {
            setRes(result.data.recordSearch)
            console.log(result)
        },
        onError(err) {
            console.log(err.graphQLErrors[0])
            // setErr(err.graphQLErrors[0].extensions.err)
            // console.log(errors)
        },
        variables: vals
    })

    const resPage = (
        <div >
            <div className='background-body'>
                <br/>
                <MainSearch
                    callback={searchCallback}
                />
                <br />
                <Container className={loading ? 'loading' : ''}>
                    <Header as='h4'>
                        Results:
                    </Header>
                    {searchRes ? searchRes.map(tmp => (
                        <div key={tmp.title + tmp.artist}>
                            <SearchResCell
                                artist={tmp.artist}
                                title={tmp.title}
                                price={tmp.price}
                                quantity={tmp.quantity}
                                img={tmp.img}
                                seller={tmp.seller}
                            />
                            <br />
                        </div>
                    )) : <p>no records</p>}
                </Container>
                <br/>
                <br/>
            </div>
        </div>
    )

    return resPage;
}

const RECORD_SEARCH = gql`
    mutation recordSearch(
        $title: String
        $artist: String
        $seller: String
        $inStock: Boolean
        $priceHigh: Float
        $priceLow: Float
    ) {
        recordSearch(
            searchInput: {
                title: $title 
                artist: $artist
                seller: $seller
                inStock: $inStock
                priceHigh: $priceHigh
                priceLow: $priceLow
            }
        ) {
            title,
            artist,
            seller,
            quantity,
            price,
            img
        }
    }
`

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