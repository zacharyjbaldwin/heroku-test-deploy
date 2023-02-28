import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import LoadingSpinner from '../components/LoadingSpinner';
import TutorCard from '../components/TutorList/TutorCard';
import { AuthContext } from '../shared/context/auth-context';


const TutorList = props => {
    const ctx = useContext(AuthContext);
    const [tutors, setTutors] = useState();

    const [pageCount, setPageCount] = useState(0);
    // const [tutorCount, setTutorCount] = useState(0);
    const [pageNumber, setPageNumber] = useState(0);
    const [isLoading, setIsLoading] = useState(false);
    const [loadError, setLoadError] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');

    const loadTutors = () => {
        axios.get(`${process.env.REACT_APP_API_URL}/tutors?pageNumber=${pageNumber}&pageSize=6&searchQuery=${searchQuery}`, { headers: { Authorization: `Bearer ${ctx.token}` } }) // TODO change this to token
            .then(response => {
                setTutors(response.data.tutors);
                setPageCount(response.data.pageCount);
                // setTutorCount(response.data.tutorCount);
                setIsLoading(false);
                setLoadError(false);
            })
            .catch(error => {
                setLoadError(true);
                console.log(error);
            });
    };

    const generatePagination = () => {
        let pages = [];
        for (let i = 0; i < pageCount; i++) {
            pages.push(<li key={i} className="page-item"><span className="page-link cursor-pointer" onClick={() => { setPageNumber(i); }}>{i+1}</span></li>);
        }
        return pages;
    };

    const generateOptions = (min, max) => {
        let options = [];
        for (let i = min; i <= max; i++) {
            options.push(<option value={i} key={i}>{(i % 12 === 0 ? '12' : i % 12) + (i > 11 ? ':00 PM' : ':00 AM')}</option>)
        }
        return options;
    };

    useEffect(() => {
        setIsLoading(true);
    }, []);

    useEffect(() => {
        loadTutors();
        // eslint-disable-next-line
    }, [pageNumber]);

    const onSubmitHander = (event) => {
        event.preventDefault();
        setPageNumber(0);
        loadTutors();
    }

    const onClearFilters = (event) => {
        setSearchQuery('');
        setPageNumber(0);
        loadTutors();
    };

    // TODO get date and availablility dropdowns to work
    // TODO figure out issues with clearFilter

    return (
        <React.Fragment>
            {isLoading && !loadError && <div className='text-center'><LoadingSpinner /></div>}
            {loadError && <div className='col-md-4 offset-md-4'>
                <div className='alert alert-danger text-center'>An error occured while trying to load the data.</div>
            </div>}

            {!isLoading && !loadError && tutors && <div className='row'>
                <div className='col-md-3'>
                    <h2>Filters</h2>
                    <form onSubmit={onSubmitHander}>
                        <div className='form-group mb-3'>
                            <label className='form-label'>Search</label>
                            <input type='text' className='form-control' placeholder='Filter by name or subject' value={searchQuery} onChange={(e) => { setSearchQuery(e.target.value) }}></input>
                        </div>
                        <div className="form-group mb-3">
                            <label className="form-label">Date</label>
                            <input type="date" className="form-control" id="date-picker" />
                        </div>
                        <div className="form-group mb-3">
                            <div className="row">
                                <div className="col-md-6">
                                    <label className="form-label">Available from</label>
                                    <select className="form-select">
                                        {generateOptions(0, 23)}
                                    </select>
                                </div>
                                <div className="col-md-6">
                                    <label className="form-label">Available to</label>
                                    <select className="form-select">
                                        {generateOptions(1, 24)}
                                    </select>
                                </div>
                            </div>
                        </div>
                        <button type='submit' className="btn btn-success col-12 mb-2">Search</button>
                        <button type='button' className="btn btn-link col-12" onClick={onClearFilters}>Clear filters</button>
                    </form>
                </div>
                <div className='col-md-9'>
                    <div className='row'>
                        <div className='d-flex justify-content-between align-items-center'>
                            <h2>Tutors</h2>
                            {pageCount > 1 && <nav>
                                <ul className='pagination'>
                                    {generatePagination()}
                                </ul>
                            </nav>}
                        </div>
                    </div>
                    <div className='row'>
                        {tutors.length > 0 && tutors.map(tutor => <div key={tutor._id} className='col-md-4 mb-3'> <TutorCard tutor={tutor} /> </div>)}
                        {tutors.length === 0 && <div className='text-center'>
                            <span>The given search criteria yielded no results.</span>
                        </div>}
                    </div>
                </div>
            </div>}
        </React.Fragment>
    );
};

export default TutorList;