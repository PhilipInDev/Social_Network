import './SearchFilters.scss'

const SearchFilters = () => {
    return(
        <div className='search-filter'>
            <p className="search-filter__title">Search Options</p>
            <form action="" className="search-filter__form">
                <select className='search-filter__select'>
                    <option value='default' className="search-filter__select-option">Choose country</option>
                    <option value="Ukraine" className="search-filter__select-option">Ukraine</option>
                    <option value="USA" className="search-filter__select-option">USA</option>
                    <option value="Great Britain" className="search-filter__select-option">Great Britain</option>
                    <option value="Australia" className="search-filter__select-option">Australia</option>
                    <option value="New Zeland" className="search-filter__select-option">New Zeland</option>
                    <option value="Canada" className="search-filter__select-option">Canada</option>
                </select>
            </form>
        </div>
    )
}

export default SearchFilters;