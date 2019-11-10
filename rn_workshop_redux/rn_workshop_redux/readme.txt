1. npm i --save redux react-redux redux-thunk
2. mkdir src
3. touch src/app.js
4. touch src/constants.js
5. touch src/configureStore.js
6. Open configureStore.js and shortkey 'createStore'
7. In configureStore.js create store that includes both redecuer and redux-thunk
8. Revise root index.js to cover with Provider from react-redux
9. Define action's type (all possible stages that can happen in the action) in constants.js
10. mkdir src/actions
11. touch src/actions/index.js 
12. touch src/actions/api.js
13. revise actions/index.js with shortkey 'rxaction' - to generate sub-functions return action's type
14. mkdir src/reducers
15. touch src/reducers/fetchReducer.js
16. touch src/reducers/index.js
17. revise fetchReducer.js with shortkey 'rxreducer' to generate reducer (handle action's type change)
18. revise reducers/index.js to combines all reducers with shortkey 'combineReducers' 
19. revise src/app.js to :
    - define jsx
    - Using shortkey 'rxmap' to :
        - define mapReducer-To-Props
        - define mapAction(Dispath)-To-Props
        - link them all with :
            - export default connect(mapStateToProps, mapDispatchToProps)(App)
    
const mapStateToProps = (state) => ({
    fetchReducer: state.fetchReducer
})

const mapDispatchToProps = {
    fetchData
}
