import './Pagination.scss';
import React, {useState} from 'react';
import {nanoid} from "nanoid";

const space = (onClick, mod) => <div key={nanoid()} onClick={() => onClick(mod)} className='pagination__number-box'><span className="pagination__number">...</span></div>;

const Pagination = ({ currentPage, itemsCount, totalCount, getItems, numOfLinks}) => {
    const pagesCount = Math.ceil(totalCount / itemsCount);
    let linksCount = pagesCount;
    let [startLinkNum, setStartLinkNum] = useState(null);
    let startLinkNumVar = 1;
    const linkSize = (currentPage + '').length >= 5 ? 'pagination__number-box--large' : '';

    const getLink = (page) => {
        return (
            <div key={nanoid()}
                     className={page !== currentPage ? `pagination__number-box ${linkSize}` : `pagination__number-box pagination__current-page ${linkSize}`}
                     onClick={() => {
                         changeCurrentPageOnClick(page);
                         setStartLinkNum(null);
                     }}
            >
                <span className="pagination__number"
                      data-testid = {page === currentPage ? 'current page' : 'link'}
                >
                    {page}
                </span>
            </div>
        )
    }
    const getStartNumAndFinishNumByCurrentPage = (currentPage, pagesCount, additionalLinks, numOfLinks) => {
        let start = 1;
        let finish = numOfLinks;
        let additionalLinksForLastPage = pagesCount % numOfLinks;

        if(additionalLinks === 0 && currentPage >= numOfLinks) start= currentPage - (numOfLinks - 1);
        if(additionalLinks === 1 && currentPage > numOfLinks) start = currentPage;
        if(additionalLinks > 1 && currentPage > numOfLinks) start = currentPage - additionalLinks + 1;
        if(currentPage > pagesCount - additionalLinksForLastPage){
            finish = pagesCount;
            start = pagesCount - (additionalLinksForLastPage - 1);
        }
        if(currentPage <= pagesCount - additionalLinksForLastPage) finish = start + (numOfLinks - 1);
        if(pagesCount === 0){ finish = 1; start = 1 }
        return [start, finish];
    }
    const mapPageLinks = (startNumAfterSpaceClick) => {
        let linksArr = [];
        const additionalLinks = currentPage % numOfLinks;

        if(startNumAfterSpaceClick){
            startLinkNumVar = startNumAfterSpaceClick;
            linksCount = startNumAfterSpaceClick + numOfLinks - 1 <= pagesCount
                ? startNumAfterSpaceClick + numOfLinks - 1
                : pagesCount;
        }
        if(!startNumAfterSpaceClick){
            [startLinkNumVar, linksCount] = getStartNumAndFinishNumByCurrentPage(currentPage, pagesCount, additionalLinks, numOfLinks)
        }

        //creating linksArr
        if((currentPage > numOfLinks && !startNumAfterSpaceClick) || startNumAfterSpaceClick > numOfLinks){
            linksArr.push(getLink(1));
            linksArr.push(space(watchAdditionalLinksOnClick, -numOfLinks));
        }
        for(let i = startLinkNumVar; i <= linksCount; i++){
            linksArr.push(getLink(i));
        }
        if((currentPage < pagesCount - (pagesCount % numOfLinks) && !startNumAfterSpaceClick)
            || (startNumAfterSpaceClick && startNumAfterSpaceClick < pagesCount - (pagesCount % numOfLinks))) {
            linksArr.push(space(watchAdditionalLinksOnClick, numOfLinks));
            linksArr.push(getLink(pagesCount));
        }
        return linksArr;
    }
    const changeCurrentPageOnClick = (page) => {
        window.scrollTo( 0, 0 );
        getItems(itemsCount, page);
    }
    const watchAdditionalLinksOnClick = (mod = numOfLinks) => {
        if(startLinkNumVar > numOfLinks && Math.sign(mod) === -1){
            setStartLinkNum(startLinkNumVar + mod)
        }
        if(startLinkNumVar < pagesCount - numOfLinks &&  Math.sign(mod) === 1){
            setStartLinkNum(startLinkNumVar + mod)
        }
    }
    const arrowOnClick = (mod) =>{
        if(currentPage > 1 && !(mod+1)){
            changeCurrentPageOnClick(currentPage + mod);
        }
        if(currentPage + 1 <= pagesCount && (mod+1)){
            changeCurrentPageOnClick(currentPage + mod);
        }
        setStartLinkNum(null);
    }
    return (
        <div className={'pagination'}>
            <div onClick={() => arrowOnClick(-1)}
                 className="pagination__arrow pagination__arrow-prev"
                 data-testid={'prev'}
            />
            <div className={"pagination__numbers-box"} >
                {mapPageLinks(startLinkNum)}
            </div>
            <div onClick={() => arrowOnClick(1)}
                 className="pagination__arrow pagination__arrow-next"
                 data-testid={'next'}
            />
        </div>
    )
}

export default Pagination;