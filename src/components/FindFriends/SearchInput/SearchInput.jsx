import {Formik} from "formik";
import * as Yup from "yup";
import React from "react";
import './SearchInput.scss';

const SearchInput = ({getUsers, setSearchCondition}) => {
    const searchFieldOnSubmit = (term) => {
        getUsers(10, 1, term);
        setSearchCondition(term);
    }
    return(
        <Formik
            initialValues={{termFindFriends: ''}}
            validationSchema={Yup.object({
                termFindFriends: Yup.string().required('You should use some key words').max(100, 'Search keys must be less than 100 characters')
            })}
            onSubmit={(values) => searchFieldOnSubmit(values.termFindFriends)}
        >
            {formik => (
                <form className="search-input__search-box" onSubmit={formik.handleSubmit}>
                    <input onChange={formik.handleChange} type="text" className="search-input__search-input" name={'termFindFriends'} placeholder='Search...'/>
                    <button className="search-input__search-btn-submit" type='submit'>
                        <i className="fas fa-search "/>
                    </button>
                </form>
            )}
        </Formik>
    )
}

export default SearchInput;