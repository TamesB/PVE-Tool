import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { addItem } from '../../actions/pveitems'
import { Fragment } from 'react/cjs/react.production.min';
import { Header, Form, Button, Label, Checkbox } from 'semantic-ui-react'

export class ItemsForm extends Component {
    state = {
        versie: '',
        hoofdstuk: '',
        paragraaf: '',
        inhoud: '',
        basisregel: false,
        bijlage: null,
    }
    
    static propTypes = {
        addItem: PropTypes.func.isRequired,
        isLoading: PropTypes.bool
    };

    onChange = e => this.setState({ [e.target.name]: e.target.value });

    fileChange = e => {
        this.setState({ [e.target.name]: e.target.files[0] });
    };

    onSubmit = e => {
        e.preventDefault();
        const { versie, hoofdstuk, paragraaf, inhoud, basisregel, bijlage } = this.state;
        const item = { versie, hoofdstuk, paragraaf, inhoud, basisregel, bijlage };
        this.props.addItem(item)
        this.setState({
            versie: '',
            hoofdstuk: '',
            paragraaf: '',
            inhoud: '',
            basisregel: false,
            bijlage: null,
        })
    };

    render() {
        const { versie, hoofdstuk, paragraaf, inhoud, basisregel, bijlage } = this.state;
        const form_padding = {
            padding: "0 10vw 0 10vw"
        }
        return (
            <Fragment>
                    <div style={form_padding}>
                        <Header as='h2'>Voeg PVE Item Toe</Header>
                        <Form onSubmit={this.onSubmit}>
                                <Form.Input
                                    type="text"
                                    name="versie"
                                    label="PVE Versie"
                                    onChange={this.onChange}
                                    value={versie}
                                />  
                                <Form.Input
                                    type="text"
                                    name="hoofdstuk"
                                    label="Hoofdstuk"
                                    onChange={this.onChange}
                                    value={hoofdstuk}
                                />  
                                <Form.Input
                                    type="text"
                                    name="paragraaf"
                                    label="Paragraaf"
                                    onChange={this.onChange}
                                    value={paragraaf}
                                />  
                                <Form.Input
                                    type="text"
                                    name="inhoud"
                                    label="Inhoud"
                                    onChange={this.onChange}
                                    value={inhoud}
                                />  
                                <Form.Field
                                    control={Checkbox}
                                    value={basisregel}
                                    label={{ children: 'BASIS Regel' }}
                                />
                                <Form.Input 
                                    type="file" 
                                    id="file" 
                                    name="bijlage"
                                    hidden 
                                    label="Upload Bijlage"
                                    onChange={this.fileChange} 
                                />
                                <Button type="submit" loading={this.props.isLoading} primary>Voeg toe</Button>
                        </Form>
                    </div>
                </Fragment>
        )
    }
}

const mapStateToProps = state => ({
    isLoading: state.pveitems.isLoading
});

export default connect(mapStateToProps, { addItem })(ItemsForm);
