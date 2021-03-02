import React, { Fragment } from 'react'
import LeadsForm from './LeadsForm';
import Leads from './Leads';

export default function Dashboard() {
    return (
        <Fragment>
            <LeadsForm />
            <Leads />
        </Fragment>
    )
}
