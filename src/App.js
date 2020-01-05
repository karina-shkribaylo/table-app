import React, { Component } from 'react';
import ReactPaginate from 'react-paginate';
import _ from 'lodash';
import Loader from './components/Loader/Loader';
import Table from './components/Table/Table';
import OpenTable from './components/OpenTable/OpenTable';
import Search from './components/Search/Search';

class App extends Component {
  state ={
    isOpenedTable: false,
    isLoading: false,
    data: [],
    search: '',
    sorting: 'asc', 
    sortBy: 'id',
    currentPage: 0,
  }
  async fetchUsers(url) {
    const response = await fetch(url)
    const data = await response.json()
   
    this.setState({
      isLoading: false,
      data: _.orderBy(data, this.state.sortBy, this.state.sorting)
    })

  }
  onSorting = sortBy => {
    const cloneData = this.state.data.concat();
    const sorting = this.state.sorting === 'asc' ? 'desc' : 'asc';
    const data = _.orderBy(cloneData, sortBy, sorting);
    this.setState({ data, sorting, sortBy })
  }

  openTableHandler = url => {
    // console.log(url)
    this.setState({
      isOpenedTable: true,
      isLoading: true,
    })
    this.fetchUsers(url)
  }


  changePage = ({selected}) => (
    this.setState({currentPage: selected})
  )

  searchHandler = search => {
    this.setState({search, currentPage: 0})
  }

  filterData(){
    const {data, search} = this.state

    if (!search) {
      return data
    }
   var result = data.filter(u => {
     return (
       u["name"].toLowerCase().includes(search.toLowerCase()) ||
       u["surname"].toLowerCase().includes(search.toLowerCase()) ||
       u["age"].toString().includes(search.toString())
     );
   });
   if(!result.length){
     result = this.state.data
   }
    return result
  }

  render() {
    const pageSize = 5;
    if(!this.state.isOpenedTable){
      return (
        <div className="container">
          <OpenTable onSelect={this.openTableHandler}/>
        </div>
      )
    }
   
    const filteredData = this.filterData();
    // debugger
    const pageCount = Math.ceil(filteredData.length / pageSize)
    const displayData = _.chunk(filteredData, pageSize)[this.state.currentPage]
    return (
      <div className="container">
      {
        this.state.isLoading 
        ? <Loader />
        : <React.Fragment>
            <Search onSearch={this.searchHandler}/>
            <Table 
              data={displayData}
              onSorting={this.onSorting}
              sorting={this.state.sorting}
              sortBy={this.state.sortBy}
            />
          </React.Fragment>

      }

       {
        this.state.data.length > pageSize
        ? <ReactPaginate
        previousLabel={'<'}
        nextLabel={'>'}
        breakLabel={'...'}
        breakClassName={'break-me'}
        pageCount={pageCount}
        marginPagesDisplayed={2}
        pageRangeDisplayed={5}
        onPageChange={this.changePage}
        containerClassName={'pagination'}
        activeClassName={'active'}
        pageClassName="page-item"
        pageLinkClassName="page-link"
        previousClassName="page-item"
        nextClassName="page-item"
        previousLinkClassName="page-link"
        nextLinkClassName="page-link"
        forcePage={this.state.currentPage}
      /> : null
      }

     
      </div>
    );
  }
}

export default App;
