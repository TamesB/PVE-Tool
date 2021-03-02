import React, { Fragment } from 'react'
import ItemsForm from './ItemsForm';
import Items from './Items';

export default function Dashboard() {
    return (
        <Fragment>
            <ItemsForm />
            <Items />
        </Fragment>
    )
}
