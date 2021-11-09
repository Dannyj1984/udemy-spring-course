import React, { useState, useEffect } from "react";
import * as apiCalls from '../api/apiCalls';
import UserListItem from './UserListItem';

export const UserList = () => {
  const [myDataObject, setmyDataObject] = useState({
    user: undefined,
    loggedInUser: undefined,
    userNotFound: true,
    loadError: undefined,
    page: {
      content: [],
      number: 0,
      size: 9,
    },
  });

  useEffect(() => {
    loadData();
  }, []);

  const loadData = (requestedPage = 0) => {
    apiCalls
      .listUsers({ page: requestedPage, size: myDataObject.page.size })
      .then((response) => {
        setmyDataObject({ ...myDataObject, page: response.data, loadError: undefined });
        console.log(myDataObject.page.content)
      })
      .catch((error) => {
        setmyDataObject({ ...myDataObject, loadError: "User load failed" });
      });
  };

  const onClickNext = () => {
    setmyDataObject({ ...myDataObject, page: { ...myDataObject.page, number: myDataObject.page.number + 1 } });
  };

  const onClickPrevious = () => {
    setmyDataObject({ ...myDataObject, page: { ...myDataObject.page, number: myDataObject.page.number - 1 } });
  };

  return (
    <div>
      <h3 className="card-title m-auto text-center">Members</h3>
      <hr></hr>
      <div className="list-group list-group-flush" data-testid="usergroup">
        <div className="row">
          {myDataObject.page.content.map((user) => (
            <div key={user.id} className="col-xl-4 col-m-12 mb-4">
              <UserListItem
                user={user}
                onClickDeleteMember={() => {
                  apiCalls.deleteMember(user.id);
                }}
              />
            </div>
          ))}
        </div>
      </div>
      <div className="clearfix">
        {!myDataObject.page.first && (
          <span className="badge badge-light float-left" style={{ cursor: "pointer" }} onClick={onClickPrevious}>
            <button className="btn btn-primary">Previous</button>
          </span>
        )}
        {!myDataObject.page.last && (
          <span className="badge badge-light float-right" style={{ cursor: "pointer" }} onClick={onClickNext}>
            <button className="btn btn-primary">Next</button>
          </span>
        )}
      </div>
      {myDataObject.loadError && <span className="text-center text-danger">{myDataObject.loadError}</span>}
    </div>
  );
};

export default UserList;



// import React from 'react';
// import * as apiCalls from '../api/apiCalls';
// import UserListItem from './UserListItem';

// class UserList extends React.Component {
//   state = {
//     user: undefined,
//     loggedInUser: undefined,
//     userNotFound: true,
//     loadError: undefined,
//     page: {
//       content: [],
//       number: 0,
//       size: 9
//     }
//   };
  
//   componentDidMount() {
//     this.loadData();
//   }

//   loadData = (requestedPage = 0) => {
//     apiCalls
//       .listUsers({ page: requestedPage, size: this.state.page.size })
//       .then((response) => {
//         this.setState({
//           page: response.data,
//           loadError: undefined
//         });
//       })
//       .catch((error) => {
//         this.setState({ loadError: 'User load failed' });
//       });
//     };


//     onClickNext = () => {
//       this.loadData(this.state.page.number + 1);
//     };
  
//     onClickPrevious = () => {
//       this.loadData(this.state.page.number - 1);
//     };

//   render() {
//     return (
//       <div >
//         <h3 className="card-title m-auto text-center">Members</h3>
//         <hr></hr>
//         <div className="list-group list-group-flush" data-testid="usergroup">
//           <div className="row">
//           {this.state.page.content.map((user) => (
//               <div key={user.id} className="col-xl-4 col-m-12 mb-4">
//               <UserListItem user={user} onClickDeleteMember= { () => {apiCalls.deleteMember(user.id)}}  />
//               </div>
//             ))}
//           </div>
//         </div>
//         <div className="clearfix">
//           {!this.state.page.first && (
//             <span
//               className="badge badge-light float-left"
//               style={{ cursor: 'pointer' }}
//               onClick={this.onClickPrevious}
//             ><button className="btn btn-primary">Previous</button></span>
//           )}
//           {!this.state.page.last && (
//             <span
//               className="badge badge-light float-right"
//               style={{ cursor: 'pointer' }}
//               onClick={this.onClickNext}
//             >
//               <button className="btn btn-primary">Next</button>
//             </span>
//           )}
//         </div>
//         {this.state.loadError && (
//           <span className="text-center text-danger">
//             {this.state.loadError}
//           </span>
//         )}
//       </div>
//     );
//   }
// }

// export default UserList;