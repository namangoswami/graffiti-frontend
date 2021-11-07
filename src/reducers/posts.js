export default (posts=[], action)=>{
    switch(action.type){
        case 'FETCH_ALL':
          //  console.log("CHECK LIKES", action.payload);
            return action.payload.reverse();
        case 'CREATE':
            return [ action.payload, ...posts];
        case 'DELETE':
        return action.payload.reverse();
        case 'LIKEPLUS':
        return  action.payload.reverse();
        case 'UPDATE':
            return posts.map((post)=>post._id===action.payload._id?action.payload:post);
        default: return posts;
    }
}