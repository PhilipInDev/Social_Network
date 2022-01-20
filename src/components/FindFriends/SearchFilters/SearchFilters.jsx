import './SearchFilters.scss';
import {Formik} from "formik";

const SearchFilters = ({setQueryParams, setSearchConditions}) => {
    return(
        <div className='search-filter'>
            <p className="search-filter__title">Search Options</p>
            <Formik
                initialValues={{isOnlyFriends: null}}
                onSubmit={values => {
                    let value;
                    switch (values.isOnlyFriends){
                        case 'true':
                            value = true;
                            break;
                        case 'false':
                            value = false;
                            break;
                        default:
                            value = null;
                    }
                    setSearchConditions({isOnlyFriends: value});
                    setQueryParams('friends', value);
                }}
            >
                {
                    formik => (
                        <form action="" className="search-filter__form" >
                            <select name={"isOnlyFriends"} onChange={(e) => {
                                formik.handleChange(e);
                                formik.handleSubmit();
                            }} className='search-filter__select'>
                                <option value={''} className="search-filter__select-option">All</option>
                                <option value={'true'} className="search-filter__select-option">Only Friends</option>
                                <option value={'false'} className="search-filter__select-option">Except Friends</option>
                            </select>
                        </form>
                    )
                }
            </Formik>

        </div>
    )
}

export default SearchFilters;