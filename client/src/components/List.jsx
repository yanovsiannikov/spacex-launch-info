import React from 'react';
import {connect} from 'react-redux';
import {fetchData, successData, errorData} from '../reducers/actions'

const mapStateToProps = (state) => ({
    loading : state.loading,
})

class List extends React.Component {
    componentDidMount = async () => {
        this.props.getLaunches();
        try {
            let data = await fetch ('/launches/all')
            this.props.getLaunchesSuccess(await data.json())
        }
        catch {
            this.props.getLaunchesError();
        }
    }

    render() {
        return (
            <div>
                {this.props.loading && 'LOADING...'}
                {this.props.error && 'Server Down'}
            </div>
        )
    }

}

const mapDispatchToProps = (dispatch) => {
    return {
        getLaunches : () => dispatch(fetchData()),
        getLaunchesSuccess : (data) => dispatch(successData(data)),
        getLaunchesError : () => dispatch(errorData())
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(List)