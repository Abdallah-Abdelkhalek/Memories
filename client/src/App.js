import React,{useEffect} from "react";
import { Container } from '@material-ui/core'
import { getPosts  } from "./reducers/postsSlice";
import Navbar from "./components/Navbar/Navbar";
import { useDispatch } from "react-redux";
import { BrowserRouter , Switch , Route } from "react-router-dom";
import Home from "./components/Home/Home";
import Auth from "./components/Auth/Auth";
const App = () => {
    
    const dispatch = useDispatch();
    
    useEffect(() => {
        dispatch(getPosts());
    }, [dispatch]);
    return(
        <BrowserRouter>
            <Container maxWidth="lg">
                <Navbar/>
                <Switch>
                    <Route path="/" exact component={Home}/>
                    <Route path="/auth" exact component={Auth}/>
                </Switch>
            </Container>
        </BrowserRouter>
    );
}

export default App;