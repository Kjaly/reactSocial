import React from "react";
import Profile from "./Profile";
import {connect} from "react-redux";
import {getStatus, getUserProfile, updateStatus,} from "../../redux/profileReducer";
import {withRouter} from "react-router-dom";
import {compose} from "redux";


class ProfileContainer extends React.Component {

    componentDidMount() {
        let userId = this.props.match.params.userId;
        if (!userId) {
            userId = this.props.authUserId ;
            if (!userId){
                this.props.history.push('/login');
            }
        }

        this.props.getUserProfile(userId);
        this.props.getStatus(userId);
    }

    render() {

        return (
            <Profile {...this.props}
                     profile={this.props.profile}
                     status = {this.props.status}
                     updateStatus ={this.props.updateStatus}/>
        )
    }
}



let mapStateToProps = (state) => ({
    profile: state.profilePage.profile,
    status:state.profilePage.status,
    authUserId: state.auth.userId,
    isAuth: state.auth.isAuth,

})

// let AuthRedirectComponent = withAuthRedirect(ProfileContainer);
// let WithUrlDataContainerComponent = withRouter(AuthRedirectComponent);                         //СТАРЫЙ ВАРИАНТ
// export default connect(mapStateToProps, {getUserProfile})(WithUrlDataContainerComponent);
export default compose(
    connect(mapStateToProps, {getUserProfile, getStatus, updateStatus}),                        //УПРОЩЕННЫЙ ВАРИАНТ
    withRouter,
    // withAuthRedirect
)(ProfileContainer)


