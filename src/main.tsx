import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import {Routes} from "./routes";
import {BrowserRouter} from "react-router-dom";
import Auth from "./container/auth.tsx";
import {QueryParamProvider} from 'use-query-params';
import {
  ReactRouter6Adapter
} from 'use-query-params/adapters/react-router-6';


ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <QueryParamProvider adapter={ReactRouter6Adapter}>
        <Auth>
          <Routes/>
        </Auth>
      </QueryParamProvider>

    </BrowserRouter>
  </React.StrictMode>,
)
