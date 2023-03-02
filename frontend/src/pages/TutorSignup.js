import { useReducer } from "react";

const EMAIL_REGEX = /^[A-Za-z0-9\.]+@[A-Za-z0-9\.]+$/; // eslint-disable-line

const formReducer = (state, action) => {
    switch (action.type) {
        case 'FNAME_INPUT':
            return {
                ...state,
                fname: {
                    value: action.value,
                    isValid: action.value.length >0,
                    touched: true
                },
                isValid: state.email.isValid && state.password.isValid&& action.value.length>0 
            }
            case 'LNAME_INPUT':
                return {
                    ...state,
                    lname: {
                        value: action.value,
                        isValid: action.value.length >0,
                        touched: true
                    },
                    isValid: state.email.isValid && state.password.isValid&& state.fname.isValid&&  action.value.length>0 
                }
        case 'FNAME_BLUR':
                return {
                    ...state,
                    fname: { ...state.fname, touched: true }
                }
        case 'LNAME_BLUR':
                return {
                    ...state,
                    lname: { ...state.lname, touched: true }
                }
        case 'EMAIL_INPUT':
            return {
                ...state,
                email: {
                    value: action.value,
                    isValid: action.value.match(EMAIL_REGEX) !== null,
                    touched: true
                },
                isValid: action.value.match(EMAIL_REGEX) !== null && state.password.isValid
            }
        case 'EMAIL_BLUR':
            return {
                ...state,
                email: { ...state.email, touched: true }
            }
        case 'PASSWORD_INPUT':
            return {
                ...state,
                password: {
                    value: action.value,
                    isValid: action.value.length >= 6,
                    touched: true
                },
                isValid: state.email.isValid && action.value.length >= 6
            }
        case 'PASSWORD_BLUR':
            return {
                ...state,
                password: { ...state.password, touched: true }
            }
        case 'ABOUTME_INPUT':
            return {
                ...state,
                aboutme: {
                    value: action.value,
                    isValid: action.value.length >0,
                    touched: true
                },
                isValid: state.email.isValid && state.password.isValid&& state.fname.isValid&& state.lname.isValid &&  action.value.length>0 
            }
        case 'ABOUTME_BLUR':
            return {
                ...state,
                aboutme: { ...state.aboutme, touched: true }
            }
        case 'SUBJECTS_INPUT':
            return {
                ...state,
                subjects: {
                    value: action.value,
                    isValid: action.value.length >0,
                    touched: true
                },
                isValid: state.email.isValid && state.password.isValid&& state.fname.isValid&& state.lname.isValid &&state.aboutme.isValid &&  action.value.length>0 
            }
        case 'SUBJECTS_BLUR':
            return {
                ...state,
                subjects: { ...state.aboutme, touched: true }
            }
        case 'TIME_INPUT':
            return {
                ...state,
                timeAva: {
                    value: action.value,
                    isValid: action.value.length >0,
                    touched: true
                },
                isValid: state.email.isValid && state.password.isValid&& state.fname.isValid&& state.lname.isValid &&state.aboutme.isValid &&state.subjects.isValid &&  action.value.length>0 
            }
        case 'TIME_BLUR':
            return {
                ...state,
                timeAva: { ...state.aboutme, touched: true }
            }
        case 'IMG_INPUT':
            return {
                ...state,
                img: {
                    value: action.value,
                    isValid: action.value.length >0,
                    touched: true
                },
                isValid: state.email.isValid && state.password.isValid&& state.fname.isValid&& state.lname.isValid &&state.aboutme.isValid &&state.subjects.isValid &&state.timeAva.isValid &&  action.value.length>0 
            }
        case 'IMG_BLUR':
            return {
                ...state,
                img: { ...state.aboutme, touched: true }
            }

        default: return state;
    }
};

const TutorSignup = props => {

    const [formState, dispatch] = useReducer(formReducer, {
        fname: {
            value: '',
            isValid: false,
            touched: false
        },
        lname: {
            value: '',
            isValid: false,
            touched: false
        },

        email: {
            value: '',
            isValid: false,
            touched: false
        },
        password: {
            value: '',
            isValid: false,
            touched: false
        },
        isTutor: {
            value: '',
            isValid: false,
            touched: false
        },
        aboutme: {
            value: '',
            isValid: false,
            touched: false
        },
        subjects: {
            value: '',
            isValid: false,
            touched: false
        },
        timeAva: {
            value: '',
            isValid: false,
            touched: false
        },
        img: {
            value: '',
            isValid: false,
            touched: false
        },
        isValid: false
    });

    const onSubmit = e => {
        e.preventDefault();
        alert('501 not implemented')
    }

    return (
        <div className="col-md-4 offset-md-4">
            <div className="card">
                <div className="card-body">
                    <h5 className="card-title">Tutor signup</h5>
                    <form onSubmit={onSubmit}>
                        <div className="form-group mb-3">
                            <label className="form-label">First name</label>
                            <input type="fname" 
                                id="fname" 
                                className={`form-control ${!formState.fname.isValid && formState.fname.touched ? 'is-invalid' : ''}`}
                                onChange={e => { dispatch({ type: 'FNAME_INPUT', value: e.target.value }) }}
                                onBlur={() => { dispatch({ type: 'FNAME_BLUR' }) }}
                                ></input>
                            {!formState.fname.isValid && formState.fname.touched && <small className="invalid-feedback form-text">First name is required.</small>}
                        </div>

                        <div className="form-group mb-3">
                            <label className="form-label">Last name</label>
                            <input type="lname" 
                                id="lname"
                                className={`form-control ${!formState.lname.isValid && formState.lname.touched ? 'is-invalid' : ''}`}
                                onChange={e => { dispatch({ type: 'LNAME_INPUT', value: e.target.value }) }}
                                onBlur={() => { dispatch({ type: 'LNAME_BLUR' }) }}
                                ></input>
                            {!formState.lname.isValid && formState.lname.touched && <small className="invalid-feedback form-text">Last name is required.</small>}
                        </div>

                        <div className="form-group mb-3">
                            <label className="form-label">Email Address</label>
                            <input type="email"
                                id="email"
                                className={`form-control ${!formState.email.isValid && formState.email.touched ? 'is-invalid' : ''}`}
                                onChange={e => { dispatch({ type: 'EMAIL_INPUT', value: e.target.value }) }}
                                onBlur={() => { dispatch({ type: 'EMAIL_BLUR' }) }}
                                ></input>
                            {!formState.email.isValid && formState.email.touched && <small className="invalid-feedback form-text">Email address is required.</small>}
                        </div>
                        <div className="form-group mb-3">
                            <label className="form-label">Password</label>
                            <input type="password"
                                id="password"
                                className={`form-control ${!formState.password.isValid && formState.password.touched ? 'is-invalid' : ''}`}
                                onChange={e => { dispatch({ type: 'PASSWORD_INPUT', value: e.target.value }) }}
                                onBlur={() => { dispatch({ type: 'PASSWORD_BLUR' }) }}
                                ></input>
                            {!formState.password.isValid && formState.password.touched && <small className="invalid-feedback form-text">Password must be at least 6 characters in length.</small>}
                        </div>
                        
                        <div className="form-group mb-3">
                            <label className="form-label">Please describe yourself</label>
                            <textarea type="aboutme"
                                id="aboutme"
                                rows="5"
                                cols="50"
                                className={`form-control ${!formState.aboutme.isValid && formState.aboutme.touched ? 'is-invalid' : ''}`}
                                onChange={e => { dispatch({ type: 'ABOUTME_INPUT', value: e.target.value }) }}
                                onBlur={() => { dispatch({ type: 'ABOUTME_BLUR' }) }}
                                ></textarea>
                            {!formState.aboutme.isValid && formState.aboutme.touched && <small className="invalid-feedback form-text">The about me section is required.</small>}
                        </div>
                
                        <div className="form-group mb-3">
                            <label className="form-label">Please list the subject/s you'd like to teach </label>
                            <textarea type="subjects"
                                id="subjects"
                                rows="2"
                                cols="50"
                                className={`form-control ${!formState.subjects.isValid && formState.subjects.touched ? 'is-invalid' : ''}`}
                                onChange={e => { dispatch({ type: 'SUBJECTS_INPUT', value: e.target.value }) }}
                                onBlur={() => { dispatch({ type: 'SUBJECTS_BLUR' }) }}
                                ></textarea>
                            {!formState.subjects.isValid && formState.subjects.touched && <small className="invalid-feedback form-text">The subjects section is required.</small>}
                        </div>
                        <div className="form-group mb-3">
                            <label className="form-label">Please enter your time availabilty </label>
                            <input type="timeAva"
                                id="timeAva"
                                className={`form-control ${!formState.timeAva.isValid && formState.timeAva.touched ? 'is-invalid' : ''}`}
                                onChange={e => { dispatch({ type: 'TIME_INPUT', value: e.target.value }) }}
                                onBlur={() => { dispatch({ type: 'TIME_BLUR' }) }}
                                ></input>
                            {!formState.timeAva.isValid && formState.timeAva.touched && <small className="invalid-feedback form-text">The time availabilty section is required.</small>}
                        </div>

                        <div className="form-group mb-3">
                            <label className="form-label">Please upload your profile picture </label>
                            <input type="file"
                                id="img"
                                className={`form-control ${!formState.img.isValid && formState.img.touched ? 'is-invalid' : ''}`}
                                onChange={e => { dispatch({ type: 'IMG_INPUT', value: e.target.value }) }}
                                onBlur={() => { dispatch({ type: 'IMG_BLUR' }) }}
                                accept="image/*"
                                ></input>
                            {!formState.img.isValid && formState.img.touched && <small className="invalid-feedback form-text">The profile picture is required.</small>}
                        </div>
                        
                        <button disabled={!formState.isValid} type="submit" className="btn btn-success col-12">Sign up</button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default TutorSignup;