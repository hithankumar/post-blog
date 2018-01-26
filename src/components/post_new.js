import React, {Component} from 'react';
import {Field, reduxForm} from 'redux-form';
import { Link } from 'react-router-dom';
import {connect} from 'react-redux';
import {createPost } from '../actions';
import _ from 'lodash';

const FIELDS = {
    title:{
        type:'input',
        label: 'Enter the post title'
    },
    category:{
        type: 'input',
        label: 'Enter the category of the post'
    },
    content: {
        type:'textarea',
        label: 'Enter the content'
    }
}
class PostNew extends Component{
    renderInputField(field){
        const {meta: {touched, error}} = field;
        const className=`form-group ${touched && error ? 'has-danger' : ''}` 
        return(
            <div className={className}>
                <label>{field.label}</label>
                <input
                    className="form-control"
                    type="text"
                    {...field.input}
                />
                <div className="text-help">
                    {touched ? error: ''}
                </div>               
            </div>
        )
    }
    renderField(fieldConfig, field){
        const fieldHelper = this.props.fields[field];
        return(
            <Field
                label ={fieldConfig.label}
                name = {field}
                component = {this.renderInputField}
             />
        )
    }
    onSubmit(values){
        this.props.createPost(values,()=>{
            this.props.history.push("/");
        });
    }
    render(){
        const {handleSubmit} = this.props; //redux form side of things

        return(
            <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
                <h3>Create New Post</h3>
                {_.map(FIELDS,this.renderField.bind(this))}
                <button type="submit" className="btn btn-primary">Submit</button>
                <Link className="btn btn-danger" to="/">
                        Cancel
                </Link>
            </form>
        )
    }
}
//automatically called when submit is entered
function validate(values){
    const errors = {};

    _.each(FIELDS, (type,field) => {
        if(!values[field]){
            errors[field] = `Enter a ${field}`;
        }
    })
    // if(!values.title){
    //     errors.title = "Enter a title";
    // }
    // if(!values.categories){
    //     errors.categories = "Enter a Category";
    // }
    // if(!values.content){
    //     errors.content = "Enter appropriate content";
    // }
    return errors;
}

export default reduxForm({
    validate,
    fields: _.keys(FIELDS), //array of strings
    form:'PostNewForm' //a unique id for each form
})(
    connect(null, {createPost})(PostNew)
);