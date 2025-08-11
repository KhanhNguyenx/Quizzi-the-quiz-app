import LayoutDefault from "../layout/LayoutDefault";
import Home from "../pages/home";
import Topics from "../pages/topic";
import Answers from "../pages/answer";
import PrivateRoutes from "../components/PrivateRoutes";
import Login from "../pages/login";
import Register from "../pages/register";
import Quiz from "../pages/quiz";
import Result from "../pages/result";
import Logout from "../pages/logout";
import Flashcard from "../pages/flashcard";
import Blog from "../pages/blog";

export const routes = [
  {
    path: "/",
    element: <LayoutDefault />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "register",
        element: <Register />,
      },
      {
        path: "logout",
        element: <Logout />,
      },
      {
        path: "flashcards",
        element: <Flashcard />,
      },
      {
        path: "blogs",
        element: <Blog />,
      },
      {
        path: "topics",
        element: <Topics />,
      },
      {
        element: <PrivateRoutes />,
        children: [
          {
            path: "answers",
            element: <Answers />,
          },
          {
            path: "quiz/:id",
            element: <Quiz />,
          },
          {
            path: "result/:id",
            element: <Result />,
          },
        ],
      },
    ],
  },
];
