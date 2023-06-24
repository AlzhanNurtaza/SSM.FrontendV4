import { Authenticated, Refine } from "@refinedev/core";
import { RefineKbar, RefineKbarProvider } from "@refinedev/kbar";

import {
  ErrorComponent,
  notificationProvider,
  RefineSnackbarProvider,
  ThemedLayoutV2,
  ThemedTitleV2,
} from "@refinedev/mui";

import CssBaseline from "@mui/material/CssBaseline";
import GlobalStyles from "@mui/material/GlobalStyles";
import routerBindings, {
  CatchAllNavigate,
  NavigateToResource,
  UnsavedChangesNotifier,
} from "@refinedev/react-router-v6";
import dataProvider from "@refinedev/simple-rest";
import { useTranslation } from "react-i18next";
import { BrowserRouter, Outlet, Route, Routes } from "react-router-dom";
import { authProvider } from "./authProvider";
import { AppIcon } from "./components/app-icon";
import { Header } from "./components/header";
import { ColorModeContextProvider } from "./contexts/color-mode";
import {
  DepartmentList,
  DepartmentShow,
  DepartmentEdit,
  DepartmentCreate
} from "./pages/departments";
import {
  CourseList,
  CourseCreate,
  CourseShow,
  CourseEdit
} from "./pages/courses";
import {
  SpecialityList,
  SpecialityCreate,
  SpecialityShow,
  SpecialityEdit
} from "./pages/specialities";
import {
  GroupList,
  GroupCreate,
  GroupShow,
  GroupEdit
} from "./pages/groups";
import {
  ClassroomList,
  ClassroomCreate,
  ClassroomShow,
  ClassroomEdit
} from "./pages/classrooms";
import {
  EnrollmentList,
  EnrollmentCreate,
  EnrollmentShow,
  EnrollmentEdit
} from "./pages/enrollments";
import {
  UserList,
  UserCreate,
  UserShow,
  UserEdit
} from "./pages/users";
import {
  ScheduleView
} from "./pages/schedules";
import {HomePage} from "./pages/home/home";
import "./App.css";

import { ToastContainer } from 'react-toastify';

import { ForgotPassword } from "./pages/forgotPassword";
import { Login } from "./pages/login";
import { Register } from "./pages/register";
import { UpdatePassword } from "./pages/updatePassword";


import RoomPreferencesOutlinedIcon from '@mui/icons-material/RoomPreferencesOutlined';
import BookOutlinedIcon from '@mui/icons-material/BookOutlined';
import AssignmentIndOutlinedIcon from '@mui/icons-material/AssignmentIndOutlined';
import RecentActorsOutlinedIcon from '@mui/icons-material/RecentActorsOutlined';
import LivingOutlinedIcon from '@mui/icons-material/LivingOutlined';
import PermContactCalendarOutlinedIcon from '@mui/icons-material/PermContactCalendarOutlined';
import CalendarMonthOutlinedIcon from '@mui/icons-material/CalendarMonthOutlined';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import GroupOutlinedIcon from '@mui/icons-material/GroupOutlined';

import axios from "axios";


const axiosInstance:any = axios.create();


function App() {
  axiosInstance.interceptors.request.use((request: any) => {
    // Retrieve the token from local storage
    const token = localStorage.getItem("ssm-auth");
    // Check if the header property exists
    if (request.headers) {
        // Set the Authorization header if it exists
        request.headers["Authorization"] = `Bearer ${token}`;
    } else {
        // Create the headers property if it does not exist
        request.headers = {
            Authorization: `Bearer ${token}`,
        };
    }
  
    return request;
  });

  const { t, i18n } = useTranslation();

  const i18nProvider = {
    translate: (key: string, params: object) => t(key, params),
    changeLocale: (lang: string) => i18n.changeLanguage(lang),
    getLocale: () => i18n.language,
  };

  return (
    <BrowserRouter>
      <RefineKbarProvider>
        <ColorModeContextProvider>
          <CssBaseline />
          <GlobalStyles styles={{ html: { WebkitFontSmoothing: "auto" } }} />
          <RefineSnackbarProvider>
            <Refine
              dataProvider={dataProvider("https://localhost:7262/api", axiosInstance)}
              notificationProvider={notificationProvider}
              authProvider={authProvider}
              i18nProvider={i18nProvider}
              routerProvider={routerBindings}
              resources={[
                { 
                  name: "homePage", 
                  list: () => null,
                  icon:<HomeOutlinedIcon/>,
                },
                {
                  name: "Department",
                  list: "/departments",
                  create: "/departments/create",
                  edit: "/departments/edit/:id",
                  show: "/departments/show/:id",
                  meta: {
                    canDelete: true,
                  },
                  icon: <RoomPreferencesOutlinedIcon />,
                },
                {
                  name: "Course",
                  list: "/courses",
                  create: "/courses/create",
                  edit: "/courses/edit/:id",
                  show: "/courses/show/:id",
                  meta: {
                    canDelete: true,
                  },
                  icon:<BookOutlinedIcon/>
                },
                {
                  name: "Speciality",
                  list: "/specialities",
                  create: "/specialities/create",
                  edit: "/specialities/edit/:id",
                  show: "/specialities/show/:id",
                  meta: {
                    canDelete: true,
                  },
                  icon:<AssignmentIndOutlinedIcon/>
                },
                {
                  name: "Group",
                  list: "/groups",
                  create: "/groups/create",
                  edit: "/groups/edit/:id",
                  show: "/groups/show/:id",
                  meta: {
                    canDelete: true,
                  },
                  icon: <RecentActorsOutlinedIcon />,
                },
                {
                  name: "Classroom",
                  list: "/classrooms",
                  create: "/classrooms/create",
                  edit: "/classrooms/edit/:id",
                  show: "/classrooms/show/:id",
                  meta: {
                    canDelete: true,
                  },
                  icon:<LivingOutlinedIcon/>
                },
                {
                  name: "Enrollment",
                  list: "/enrollments",
                  create: "/enrollments/create",
                  edit: "/enrollments/edit/:id",
                  show: "/enrollments/show/:id",
                  meta: {
                    canDelete: true,
                  },
                  icon:<PermContactCalendarOutlinedIcon/>
                },
                { 
                  name: "scheduleView", 
                  list: () => null,
                  icon:<CalendarMonthOutlinedIcon/>,
                },
                {
                  name: "UserAuth",
                  list: "/users",
                  create: "/users/create",
                  edit: "/users/edit/:id",
                  show: "/users/show/:id",
                  meta: {
                    canDelete: true,
                  },
                  icon:<GroupOutlinedIcon/>
                },
              ]}
              options={{
                syncWithLocation: true,
                warnWhenUnsavedChanges: true,
              }}
            >
              <ToastContainer />
              <Routes>
                <Route
                  element={
                    <Authenticated fallback={<CatchAllNavigate to="/login" />}>
                      <ThemedLayoutV2
                        Header={() => <Header sticky />}
                        Title={({ collapsed }) => (
                          <ThemedTitleV2
                            collapsed={collapsed}
                            text="SSM Project"
                            icon={<AppIcon />}
                          />
                        )}
                      >
                        <Outlet />
                      </ThemedLayoutV2>
                    </Authenticated>
                  }
                >
                  <Route
                    index
                    element={<NavigateToResource resource="homePage" />}
                  />
                  <Route path="/departments">
                    <Route index element={<DepartmentList />} />
                    <Route path="create" element={<DepartmentCreate />} />
                    <Route path="edit/:id" element={<DepartmentEdit />} />
                    <Route path="show/:id" element={<DepartmentShow />} />
                  </Route>
                  <Route path="/courses">
                    <Route index element={<CourseList />} />
                    <Route path="create" element={<CourseCreate />} />
                    <Route path="edit/:id" element={<CourseEdit />} />
                    <Route path="show/:id" element={<CourseShow />} />
                  </Route>
                  <Route path="/specialities">
                    <Route index element={<SpecialityList />} />
                    <Route path="create" element={<SpecialityCreate />} />
                    <Route path="edit/:id" element={<SpecialityEdit />} />
                    <Route path="show/:id" element={<SpecialityShow />} />
                  </Route>
                  <Route path="/groups">
                    <Route index element={<GroupList />} />
                    <Route path="create" element={<GroupCreate />} />
                    <Route path="edit/:id" element={<GroupEdit />} />
                    <Route path="show/:id" element={<GroupShow />} />
                  </Route>
                  <Route path="/classrooms">
                    <Route index element={<ClassroomList />} />
                    <Route path="create" element={<ClassroomCreate />} />
                    <Route path="edit/:id" element={<ClassroomEdit />} />
                    <Route path="show/:id" element={<ClassroomShow />} />
                  </Route>
                  <Route path="/enrollments">
                    <Route index element={<EnrollmentList />} />
                    <Route path="create" element={<EnrollmentCreate />} />
                    <Route path="edit/:id" element={<EnrollmentEdit />} />
                    <Route path="show/:id" element={<EnrollmentShow />} />
                  </Route>
                  <Route
                      path="scheduleView"
                      element={<ScheduleView />}
                  />
                  <Route path="/users">
                    <Route index element={<UserList />} />
                    <Route path="create" element={<UserCreate />} />
                    <Route path="edit/:id" element={<UserEdit />} />
                    <Route path="show/:id" element={<UserShow />} />
                  </Route>
                  
                  <Route
                      path="homePage"
                      element={<HomePage />}
                  />
                  
                  <Route path="*" element={<ErrorComponent />} />
                </Route>
                <Route
                  element={
                    <Authenticated fallback={<Outlet />}>
                      <NavigateToResource />
                    </Authenticated>
                  }
                >
                  <Route path="/login" element={<Login/>} />
                  <Route path="/register" element={<Register />} />
                  <Route path="/forgot-password" element={<ForgotPassword />} />
                  <Route
                            path="/update-password"
                            element={<UpdatePassword />}
                  />
                </Route>
              </Routes>

              <RefineKbar />
              <UnsavedChangesNotifier />
            </Refine>
          </RefineSnackbarProvider>
        </ColorModeContextProvider>
      </RefineKbarProvider>
    </BrowserRouter>
  );
}

export default App;
