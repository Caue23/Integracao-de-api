import { BrowserRouter, Routes, Route } from "react-router-dom";
import {Logar} from "../pages/login";
import {CadastroForm} from "../pages/cadastro";
import {HamburgerMenu} from "../pages/home";
import { Navigate, Outlet } from "react-router-dom";



export const AppRoutes = () => {
    const  PrivateRoutes = () => {
        const userData = JSON.parse(sessionStorage.getItem("userData"));;
        return userData ? <Outlet/> : <Navigate to="/" />
    }

    return(
    <BrowserRouter>
        <Routes>
            <Route path="/" element={<Logar/>}/>
            <Route path="/cadastro" element={<CadastroForm/>}/>
            <Route path="/home" element={<PrivateRoutes/>}>
                <Route path="/home" element={<HamburgerMenu/>}/>
            </Route>

        </Routes>
    </BrowserRouter>
    )
}

/**/