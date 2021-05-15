import React, { Component } from 'react'
import ReactPaginate from "react-paginate";
import axios from "axios";

export class FakeComments extends Component {
    state = {
        comments: [],
        page_number: 0,
        comments_per_page: 10,
        are_comments: false,
        error: false
    }
    componentDidMount() {
        this.setState({ are_comments: true })
        this.getComments()
    }
    // for get all comments 
    getComments = () => {
        axios.get('https://jsonplaceholder.typicode.com/comments')
            .then(response => {
                if (response.status === 200) {
                    this.setState({ comments: response.data.slice(0, 493), are_comments: false })
                } else {
                    this.setState({ message: 'Something went wrong, please try again', are_comments: false, error: true })
                }
                console.log(response.data)

            }).catch(error => {
                this.setState({ message: 'Something went wrong, please try again', are_comments: false, error: true })
                console.log(error);
            })
    }

    changePage = ({ selected }) => {
        window.scrollTo(0, 0)
        console.log(selected);
        this.setState({ page_number: selected })
    };
    relaod = () => {
        window.location.reload();
    }
    render() {
        let page_count = Math.ceil(this.state.comments.length / this.state.comments_per_page)
        let active_page = this.state.page_number * this.state.comments_per_page;
        const displayComments = this.state.comments
            .slice(active_page, active_page + this.state.comments_per_page)
            .map((user, idx) => {
                return (
                    <div className="user" key={idx} >
                        <h3>Name: <span>{user.name}</span></h3>
                        <h3>Email: <span>{user.email}</span></h3>
                        <h3>Comment: <span>{user.body}</span></h3>
                    </div>
                );
            });

        return (
            <div>
                {this.state.are_comments ? <h2>Loading....</h2> : this.state.error ? <><h2>{this.state.message}</h2><br />
                    <button style={{ display: 'flex', margin: '-15px auto 5px auto', padding: '5px' }} onClick={this.relaod}>Reload</button></>
                    : this.state.comments.length === 0 ? <h2>No Comments Yet</h2> :
                        <>
                            {displayComments}
                            <ReactPaginate
                                previousLabel={"Previous"}
                                nextLabel={"Next"}
                                pageCount={page_count}
                                onPageChange={this.changePage}
                                containerClassName={"paginationBttns"}
                                previousLinkClassName={"previousBttn"}
                                nextLinkClassName={"nextBttn"}
                                disabledClassName={"paginationDisabled"}
                                activeClassName={"paginationActive"}
                                breakLabel={'...'}

                                marginPagesDisplayed={2}
                                pageRangeDisplayed={5}
                            />
                        </>}

            </div>
        )
    }
}

export default FakeComments
