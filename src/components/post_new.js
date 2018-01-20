import React, {Component} from 'react';
import {Field, reduxForm} from 'redux-form';
import { Link } from 'react-router-dom';
import {connect} from 'react-redux';
import {createPost } from '../actions';

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
    onSubmit(values){
        this.props.createPost(values,()=>{
            this.props.history.push("/");
        });
    }
    render(){
        const {handleSubmit} = this.props; //redux form side of things

        return(
            <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
                <Field
                    label="Title" //display name
                    name="title" //for validation of fields
                    component={this.renderInputField}
                />
                <Field
                    label="Categories"
                    name="categories"
                    component={this.renderInputField}
                />
                 <Field
                    label="Post Content"
                    name="content"
                    component={this.renderInputField}
                />
                <button type="submit" className="btn btn-primary">Submit</button>
                <Link className="btn btn-danger" to="/">
                        Cancel
                </Link>
                {/* <button type="submit" className="btn btn-secondary">Cancel</button> */}
            </form>
        )
    }
}
//automatically called when submit is entered
function validate(values){
    const errors = {};
    if(!values.title){
        errors.title = "Enter a title";
    }
    if(!values.categories){
        errors.categories = "Enter a Category";
    }
    if(!values.content){
        errors.content = "Enter appropriate content";
    }
    return errors;
}

export default reduxForm({
    validate,
    form:'PostNewForm' //a unique id for each form
})(
    connect(null, {createPost})(PostNew)
);