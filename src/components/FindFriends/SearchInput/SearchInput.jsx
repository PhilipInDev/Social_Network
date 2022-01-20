import {Formik} from "formik";
import * as Yup from "yup";
import React, {useEffect, useState} from "react";
import './SearchInput.scss';

const SearchInput = ({setQueryParams, setSearchConditions}) => {
    const [searchTerm, setOutput] = useState(null);
    const searchFieldOnSubmit = (term) => {
        setSearchConditions({term});
        setQueryParams('term', term);
    }
    useEffect(() => {
        let timeout;
        if(searchTerm !== null){
             timeout = setTimeout(() => {
                searchFieldOnSubmit(searchTerm);
            }, 1600);
        }
        return () => {
            clearTimeout(timeout);
        };
    }, [searchTerm]);
    return(
        <Formik
            initialValues={{termFindFriends: searchTerm}}
            validationSchema={Yup.object({
                termFindFriends: Yup.string().max(100, 'Search keys must be less than 100 characters')
            })}
            onSubmit={(values) => searchFieldOnSubmit(values.termFindFriends)}
        >
            {formik => (
                <form className="search-input__search-box" onSubmit={formik.handleSubmit}>
                    <input onChange={(e) => {
                        formik.handleChange(e);
                        setOutput(e.currentTarget.value);
                    }} type="text" className="search-input__search-input" name={'termFindFriends'} placeholder='Search...'/>
                    <button className="search-input__search-btn-submit" type='submit'>
                        <i className="fas fa-search "/>
                    </button>
                </form>
            )}
        </Formik>
    )
}

export default SearchInput;