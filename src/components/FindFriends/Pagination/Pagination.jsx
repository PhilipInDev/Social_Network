import './Pagination.scss'
import React from 'react';
import {NavLink} from "react-router-dom";
import axios from "axios";
import {getUsers} from "../../../api/api";

class Pagination extends React.Component{


    mapPageLinks = (startNum = 1) => {
        let linksCount = this.props.pagesCount;
        let linksArr = [];
        const numOfLinks = 7;
        const additionalLinks = this.props.currentPage % numOfLinks;
        let getLink = (page) =>{
            return(
                <NavLink to={`/users/${page}`}
                         className={page !== this.props.currentPage ? 'pagination__number-box' : 'pagination__number-box pagination__current-page'}
                         onClick={() => this.changeCurrentPageOnClick(page)}
                >
                        <span className="pagination__number">
                            {page}
                        </span>
                </NavLink>
            )
        }
        const space = <div className='pagination__number-box'><span className="pagination__number">...</span></div>;

        if(additionalLinks === 0 && this.props.currentPage >= 7){startNum = this.props.currentPage - 6;}
        if(additionalLinks === 1 && this.props.currentPage > 7) startNum = this.props.currentPage;
        if(additionalLinks > 1 && this.props.currentPage > 7) startNum = this.props.currentPage - additionalLinks + 1;
        if(this.props.currentPage <= this.props.pagesCount - 7) linksCount = startNum + 6;
        if(this.props.currentPage > this.props.pagesCount - 7){
            linksCount = this.props.pagesCount;
            startNum = this.props.pagesCount - 7;
        }
        if(this.props.pagesCount === 0){ linksCount = 1; startNum = 1}

        if(this.props.currentPage > 7){
            linksArr.push(getLink(1));
            linksArr.push(space);
        }
        for(let i = startNum; i <= linksCount; i++){
            linksArr.push(getLink(i));
        }
        if(this.props.currentPage <= this.props.pagesCount - numOfLinks){
            linksArr.push(space);
            linksArr.push(getLink(this.props.pagesCount));
        }
        return linksArr;
    }
    changeCurrentPageOnClick = (page) => {
        this.props.toggleIsFetching(true);
        this.props.changeCurrentPage(page);
        window.scrollTo( 0, 0 );
        getUsers(this.props.usersCount, page)
            .then((data) => {
                    this.props.setUsers(data.items);
                    this.props.toggleIsFetching(false);
                })
    }
    arrowOnClick = (mod) =>{
        window.scrollTo( 0, 0 );
        if(this.props.currentPage > 1 && !(mod+1)){
            this.props.changeCurrentPage(this.props.currentPage + mod);
            this.changeCurrentPageOnClick(this.props.currentPage + mod);
        }
        if(this.props.currentPage + 1 <= this.props.pagesCount && (mod+1)){
            this.props.changeCurrentPage(this.props.currentPage + mod);
            this.changeCurrentPageOnClick(this.props.currentPage + mod);
        }
    }
    render() {
        return (
            <div className={this.props.isFetching ? 'pagination pagination__number-box--is-fetching' : 'pagination'}>
                <NavLink to={`/users/${this.props.currentPage > 1 ? this.props.currentPage - 1 : this.props.currentPage}`}
                         onClick={() => this.arrowOnClick(-1)}
                         className="pagination__arrow pagination__arrow-prev" />
                <div className={this.props.isFetching ? "pagination__numbers-box pagination__number-box--is-fetching" :
                    "pagination__numbers-box"} >
                    {this.mapPageLinks()}
                </div>
                <NavLink
                    to={`/users/${this.props.currentPage < this.props.pagesCount ? this.props.currentPage + 1 : this.props.currentPage}`}
                    onClick={() => this.arrowOnClick(1)}
                    className="pagination__arrow pagination__arrow-next" />
            </div>
        )
    }
}

export default Pagination;