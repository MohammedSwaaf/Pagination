import React, { Component } from 'react';
import FakeComments from '../../components/paginations/comments';


class Comments extends Component {
  
    render() {
        return (
            <div>
                <h3 style={{textAlign:'center'}}>Comments</h3>
                <FakeComments />
            </div>
        )
    }
}
export default Comments
