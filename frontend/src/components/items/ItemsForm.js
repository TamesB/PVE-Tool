import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { addItem } from '../../actions/pveitems'
import { Fragment } from 'react/cjs/react.production.min';
import { Header, Form, Button, Label, Checkbox, Select } from 'semantic-ui-react'
import { getHoofdstukken } from '../../actions/hoofdstukken';
import { getParagraven } from '../../actions/paragraven';

export class ItemsForm extends Component {
    state = {
        versie: 1,
        hoofdstuk: '',
        paragraaf: '',
        inhoud: '',
        basisregel: false,
        bijlage: null,
    }
    
    static propTypes = {
        addItem: PropTypes.func.isRequired,
        isLoading: PropTypes.bool,
        paragraven: PropTypes.array.isRequired,
        getParagraven: PropTypes.func.isRequired,
        paragravenIsLoading: PropTypes.bool,
        hoofdstukken: PropTypes.array.isRequired,
        getHoofdstukken: PropTypes.func.isRequired,
        hoofdstukkenIsLoading: PropTypes.bool,
    };

    onChange = e => this.setState({ [e.target.name]: e.target.value });

    versieChange = (e, { value }) => this.setState({ versie: value })

    hoofdstukChange = (e, { value }) => this.setState({ hoofdstuk: value, paragraaf: "" }, () => {
            this.props.getParagraven(this.state.versie, this.state.hoofdstuk);
        }
    )

    paragraafChange = (e, { value }) => this.setState({ paragraaf: value })

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

    componentDidMount() {
        this.props.getHoofdstukken(this.state.versie);
        this.props.getParagraven(this.state.versie, this.state.hoofdstuk);
    }

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
                                <Form.Group widths='equal'>
                                <Form.Input
                                    control={Select}
                                    type="text"
                                    name="hoofdstuk"
                                    placeholder='Kies hoofdstuk...'
                                    label="Hoofdstuk"
                                    onChange={this.hoofdstukChange}
                                    options={this.props.hoofdstukken.map(hoofdstuk => ({key: hoofdstuk.id, text: hoofdstuk.hoofdstuk, value: hoofdstuk.id}))}
                                    value={hoofdstuk}
                                />  
                                <Form.Input
                                    control={Select}
                                    type="text"
                                    name="paragraaf"
                                    label="Paragraaf"
                                    placeholder='Kies paragraaf...'
                                    onChange={this.paragraafChange}
                                    options={this.props.paragraven.map(paragraaf => ({key: paragraaf.id, text: paragraaf.paragraaf, value: paragraaf.id}))}
                                    value={paragraaf}
                                /> 
                                </Form.Group>
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
    isLoading: state.pveitems.isLoading,
    hoofdstukken: state.hoofdstukken.hoofdstukken,
    hoofdstukkenIsLoading: state.hoofdstukken.hoofdstukkenIsLoading,
    paragraven: state.paragraven.paragraven,
    paragravenIsLoading: state.paragraven.paragravenIsLoading,
});

export default connect(mapStateToProps, { getHoofdstukken, getParagraven, addItem })(ItemsForm);
