import { createBrowserRouter, Navigate } from "react-router-dom";
import Acceuil from '../components/Acceuil.jsx';
import TableData from '../components/TableData.jsx';
import {columnsNames} from "../../util/ColumnsName.js"
import Login from '../components/Login.jsx';
import WelcomeMessage from "../components/Welcome.jsx";
import ProtectedRoute from "../components/ProtectedRoute.jsx";

const router = createBrowserRouter([
    {
        path: "/",
        element: (
            <ProtectedRoute redirectTo={"/login/"}>
                <Navigate to="/welcome/" />
            </ProtectedRoute>
        )
    },
    {
        path: "/login/",
        element: (
            <Login />
        )
    },
    {
        path: "/welcome/",
        element: (
            <ProtectedRoute redirectTo={"/login/"}>
                <Acceuil key={"login"} />
            </ProtectedRoute>
        ),
        children: [
            {
                index: true,
                element: <WelcomeMessage/>
            },
            {
                path: "event",
                element: <TableData columnsNames={columnsNames.event} componentKey={"event"} key={"event"} />
            },
            {
                path: "category",
                element: <TableData columnsNames={columnsNames.categoryName} componentKey={"category"} key={"category"} />
            },
            {
                path: "user",
                element: <TableData columnsNames={columnsNames.userName} componentKey={"admin"} key={"user"} />
            },
            {
                path: "location",
                element: <TableData columnsNames={columnsNames.locationName} componentKey={"location"} key={"location"} />
            },
            {
                path: "linkUserEvent",
                element: <TableData columnsNames={columnsNames.linkUserEvent} componentKey={"linkUserEvent"} key={"linkUserEvent"} />
            },
            {
                path: "notification",
                element: <TableData columnsNames={columnsNames.notificationName} componentKey={"notification"} key={"notification"} />
            },
            {
                path: "message",
                element: <TableData columnsNames={columnsNames.messageName} componentKey={"message"} key={"message"} />
            },
            {
                path: "discussionEvent",
                element: <TableData columnsNames={columnsNames.discussionEventName} componentKey={"discussionEvent"} key={"discussionEvent"} />
            },
        ],
    },

]);

export default router;