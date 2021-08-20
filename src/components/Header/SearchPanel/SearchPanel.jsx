import './SearchPanel.scss';

const SearchPanel = (props) => {
    return(
        <div className='search-panel'>
            <input type="text" className="search-panel__input" placeholder='Search here users or pages...'/>
            <button className='search-panel__search-button'>
                <i className="fas fa-search " />
            </button>
        </div>
    )
}

export default SearchPanel;