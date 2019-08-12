import React, {Component} from 'react';
import axios from 'axios';
import { renderClientInfo } from '../service/ClientService.js';
import { Formik, Form, Field, ErrorMessage } from 'formik';

function calculate_age(dob) { 
    var diff_ms = Date.now() - dob.getTime();
    var age_dt = new Date(diff_ms); 
  
    return Math.abs(age_dt.getUTCFullYear() - 1970);
}

class ClientsContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            clients: []
        }
    }

    getClients() {
        axios.get('https://service.reto-mch.name/api/v1/cliente/listclientes')
            .then(response => {                
                this.setState({ clients: response.data });
            })
            .catch(error => console.log(error));                
    }    

    componentDidMount() {
        this.getClients()
    }

    render() {
        return (
            <div>
                <div className="inputContainer">
                    <Formik
                        initialValues={{ name: '', lastName: '', birthDate: '', age: ''}}
                        validate={values => {
                            let errors = {};                            
                            if (!values.name || !values.name.trim()) {                                
                                errors.name = 'Required';
                            } if(!values.lastName || !values.lastName.trim()) {
                                errors.lastName = 'Required';
                            } if(!values.age) {
                                errors.age = 'Required';
                            } if(!values.birthDate) {
                                errors.birthDate = 'Required';
                            } else if((new Date(values.birthDate).getTime() > new Date().getTime())) {
                                errors.birthDate = "Hey Doc! Did you get a Delorean???";
                            } else if(calculate_age(new Date(values.birthDate)) !== parseInt(values.age)) {                                
                                errors.age = "You are faking your age";
                            }
                            
                                
                            return errors; 
                        }}
                        onSubmit={(values, {setSubmitting}) => {
                            setTimeout(() => {
                                //alert(JSON.stringify(values, null, 2));
                                axios.post('https://service.reto-mch.name/api/v1/cliente/creacliente', values)
                                    .then(response => {
                                        alert("Created!");
                                    })
                                    .catch(error => console.log(error));
                                setSubmitting(false);
                            }, 400);
                        }}          
                    >
                        {({ isSubmitting}) => (
                            <Form>
                                <p><Field type="text" name="name" placeholder="Enter your name" maxLength="50" minLength="1"/></p>
                                <ErrorMessage name="name" component="div" />
                                <p><Field type="text" name="lastName" placeholder="Enter your last name" maxLength="50" minLength="1"/></p>
                                <ErrorMessage name="lastName" component="div" />
                                <p><Field type="number" name="age" placeholder="Enter your age" min="0" max="200"/></p>
                                <ErrorMessage name="age" component="div" />
                                <p>Birth Date: <Field type="date" name="birthDate" placeholder="Enter your birthdate" min="1900-01-01" max="2219-12-31"/></p>
                                <ErrorMessage name="birthDate" component="div" />
                                <button type="submit" disabled={isSubmitting}>
                                    Submit
                                </button>
                            </Form>
                        )}    
                    </Formik>                                  
                </div>
                <div className="ListWrapper">
                    <ul className="clientList">
                        {this.state.clients.map((client) => {
                            console.log(client.client.name);
                            return(                                
                                <li className="client" client={client.client} key={client.client.name}>                                    
                                    <p><label className="clientLabel">{ renderClientInfo(client) }</label></p>
                                    <p><label className="clientLabel">Possible Death Date: { new Date(client.possibleDeathDate).toDateString() }</label></p>                                    
                                </li>
                            );
                        })}
                    </ul>
                </div>
            </div>            
        )
    }
}

export default ClientsContainer;



